<?php
// handle_inscription.php

// --- Configuration ---
require_once __DIR__ . '/../config_secure/db_config_inscription_secure.php';

// Indiquer que la réponse sera au format JSON
header('Content-Type: application/json; charset=UTF-8');

// Initialiser le tableau de réponse
$response_array = [
    'status' => 'error',
    'message' => 'Une erreur inconnue est survenue lors du traitement de l\'inscription.',
    'db_message' => '',
    'email_message' => ''
];

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Récupération des données du formulaire
    $nom = isset($_POST['nom']) ? trim($_POST['nom']) : '';
    $prenom = isset($_POST['prenom']) ? trim($_POST['prenom']) : '';
    $date_naissance = isset($_POST['date_naissance']) ? trim($_POST['date_naissance']) : '';
    $email = isset($_POST['email']) ? trim($_POST['email']) : '';
    $whatsapp = isset($_POST['whatsapp']) ? trim($_POST['whatsapp']) : '';
    
    $courseId = isset($_POST['courseId']) ? trim($_POST['courseId']) : 'non-spécifié';
    $courseName = isset($_POST['courseName']) ? trim($_POST['courseName']) : 'Non spécifié';
    $amountPaid = isset($_POST['amountPaid']) ? trim($_POST['amountPaid']) : '0.00';
    $currency = isset($_POST['currency']) ? trim($_POST['currency']) : 'EUR';
    $paypalTransactionId = isset($_POST['paypalTransactionId']) ? trim($_POST['paypalTransactionId']) : null;

    // --- Validation simple ---
    $errors = [];
    if (empty($nom)) $errors[] = 'Le nom est requis.';
    if (empty($prenom)) $errors[] = 'Le prénom est requis.';
    if (empty($email)) {
        $errors[] = 'L\'email est requis.';
    } elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $errors[] = 'L\'adresse e-mail n\'est pas valide.';
    }
    if (empty($date_naissance)) $errors[] = 'La date de naissance est requise.';
    // Autres validations possibles (format date, whatsapp, etc.)

    if (!empty($errors)) {
        $response_array['message'] = implode(' ', $errors);
        echo json_encode($response_array);
        exit;
    }

    // --- Opérations Base de Données ---
    $db_success = false;
    try {
        $dsn = "mysql:host=" . DB_INSCRIPTION_HOST . ";dbname=" . DB_INSCRIPTION_NAME . ";charset=utf8mb4";
        $options = [
            PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_EMULATE_PREPARES   => false,
        ];
        $pdo = new PDO($dsn, DB_INSCRIPTION_USER, DB_INSCRIPTION_PASS, $options);

        // Assurez-vous que la table 'inscriptions' existe avec les colonnes appropriées
        $sql = "INSERT INTO inscriptions (nom, prenom, date_naissance, email, whatsapp, course_id, course_name, amount_paid, currency, paypal_transaction_id, inscription_date) 
                VALUES (:nom, :prenom, :date_naissance, :email, :whatsapp, :course_id, :course_name, :amount_paid, :currency, :paypal_transaction_id, NOW())";
        $stmt = $pdo->prepare($sql);

        $stmt->bindParam(':nom', $nom);
        $stmt->bindParam(':prenom', $prenom);
        $stmt->bindParam(':date_naissance', $date_naissance);
        $stmt->bindParam(':email', $email);
        $stmt->bindParam(':whatsapp', $whatsapp);
        $stmt->bindParam(':course_id', $courseId);
        $stmt->bindParam(':course_name', $courseName);
        $stmt->bindParam(':amount_paid', $amountPaid);
        $stmt->bindParam(':currency', $currency);
        $stmt->bindParam(':paypal_transaction_id', $paypalTransactionId);

        if ($stmt->execute()) {
            $response_array['db_message'] = 'Inscription enregistrée dans la base de données.';
            $db_success = true;
        } else {
            $response_array['db_message'] = 'Erreur lors de l\'enregistrement de l\'inscription en BDD.';
        }
    } catch (PDOException $e) {
        $response_array['db_message'] = 'Erreur de connexion BDD: ' . $e->getMessage();
        error_log('PDO Error (Inscription): ' . $e->getMessage()); // Logger l'erreur côté serveur
    }

    // --- Envoi de l'email de notification à l'admin ---
    $email_sent_success = false;
    if ($db_success) { // Optionnel: N'envoyer l'email que si la BDD est OK
        $email_subject_admin = "Nouvelle Inscription: " . $courseName . " - " . $prenom . " " . $nom;

        $email_body_admin = "<h1>Nouvelle Inscription au Cours</h1>";
        $email_body_admin .= "<p>Une nouvelle inscription a été enregistrée :</p>";
        $email_body_admin .= "<ul>";
        $email_body_admin .= "<li><strong>Nom :</strong> " . htmlspecialchars($nom) . "</li>";
        $email_body_admin .= "<li><strong>Prénom :</strong> " . htmlspecialchars($prenom) . "</li>";
        $email_body_admin .= "<li><strong>Date de naissance :</strong> " . htmlspecialchars($date_naissance) . "</li>";
        $email_body_admin .= "<li><strong>Email :</strong> " . htmlspecialchars($email) . "</li>";
        $email_body_admin .= "<li><strong>Whatsapp :</strong> " . htmlspecialchars($whatsapp) . "</li>";
        $email_body_admin .= "<li><strong>Cours :</strong> " . htmlspecialchars($courseName) . " (ID: " . htmlspecialchars($courseId) . ")</li>";
        $email_body_admin .= "<li><strong>Montant Payé :</strong> " . htmlspecialchars($amountPaid) . " " . htmlspecialchars($currency) . "</li>";
        if ($paypalTransactionId) {
            $email_body_admin .= "<li><strong>ID Transaction PayPal :</strong> " . htmlspecialchars($paypalTransactionId) . "</li>";
        }
        $email_body_admin .= "</ul>";
        if (!$db_success) { // Au cas où on change la condition d'envoi d'email
             $email_body_admin .= "<p style='color:red;'><strong>Attention:</strong> L'inscription n'a PAS pu être enregistrée dans la base de données.</p>";
        }


        $headers_admin = "MIME-Version: 1.0" . "\r\n";
        $headers_admin .= "Content-type:text/html;charset=UTF-8" . "\r\n";
        $headers_admin .= "From: " . EMAIL_INSCRIPTION_FROM_NAME . " <" . EMAIL_INSCRIPTION_FROM . ">" . "\r\n";
        $headers_admin .= "Reply-To: " . htmlspecialchars($prenom) . " " . htmlspecialchars($nom) . " <" . htmlspecialchars($email) . ">" . "\r\n";

        if (mail(ADMIN_EMAIL_INSCRIPTION, $email_subject_admin, $email_body_admin, $headers_admin)) {
            $response_array['email_message'] = 'Email de notification admin envoyé.';
            $email_sent_success = true;
        } else {
            $response_array['email_message'] = 'Erreur lors de l\'envoi de l\'email de notification admin.';
            error_log('Mail Error (Inscription Admin): Failed to send to ' . ADMIN_EMAIL_INSCRIPTION);
        }
    } else {
        $response_array['email_message'] = 'Email admin non envoyé car l\'enregistrement BDD a échoué.';
    }
    
    // --- Envoi de l'email de confirmation à l'utilisateur ---
    // (Vous pouvez ajouter cette fonctionnalité si vous le souhaitez)
    // if ($db_success && $email_sent_success) { /* ... envoi email utilisateur ... */ }


    // --- Définition du statut final et du message global ---
    if ($db_success && $email_sent_success) {
        $response_array['status'] = 'success';
        $response_array['message'] = 'Votre inscription a été enregistrée avec succès. Un email de notification a été envoyé à l\'administration.';
    } elseif ($db_success && !$email_sent_success) {
        $response_array['status'] = 'partial_success';
        $response_array['message'] = 'Votre inscription a été enregistrée, mais l\'email de notification à l\'administration n\'a pas pu être envoyé.';
    } elseif (!$db_success && $email_sent_success) { // Cas peu probable si l'email dépend du succès BDD
        $response_array['status'] = 'partial_success';
        $response_array['message'] = 'L\'email de notification admin a été envoyé, mais votre inscription n\'a pas pu être enregistrée dans la base de données. Veuillez contacter le support.';
    } else { // Les deux ont échoué ou la BDD a échoué (et donc l'email n'a pas été tenté)
        $response_array['status'] = 'error';
        // Le message d'erreur principal sera celui de la BDD si elle a échoué, sinon un message générique.
        $response_array['message'] = 'Erreur lors de l\'enregistrement de l\'inscription. ' . $response_array['db_message'];
    }

} else {
    $response_array['message'] = 'Méthode de requête non autorisée.';
}

echo json_encode($response_array);
exit;
?>