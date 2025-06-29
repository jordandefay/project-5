<?php
// handle_essai_gratuit.php

// --- Configuration Sécurisée pour la BDD d'inscription ---
$inscriptionConfigPath = __DIR__ . '/../config_secure/db_config_inscription_secure.php'; // Adaptez si nécessaire

if (file_exists($inscriptionConfigPath)) {
    require_once $inscriptionConfigPath;
} else {
    header('Content-Type: application/json; charset=UTF-8');
    echo json_encode([
        'status' => 'error',
        'message' => 'Erreur critique de configuration du serveur (EG). Veuillez contacter l\'administrateur.',
    ]);
    error_log("Fichier db_config_inscription_secure.php introuvable pour handle_essai_gratuit.php à: " . $inscriptionConfigPath);
    exit;
}

// Vérifier les constantes de BDD
if (!defined('DB_INSCRIPTION_HOST') || !defined('DB_INSCRIPTION_USER') || !defined('DB_INSCRIPTION_PASS') || !defined('DB_INSCRIPTION_NAME')) {
    header('Content-Type: application/json; charset=UTF-8');
    echo json_encode([
        'status' => 'error',
        'message' => 'Erreur critique: constantes de configuration BDD (EG) manquantes.',
    ]);
    error_log("Constantes de configuration BDD (EG) manquantes après inclusion de " . $inscriptionConfigPath);
    exit;
}

// Configuration Email (vous pouvez aussi mettre ces constantes dans votre fichier config sécurisé)
define('EMAIL_ESSAI_ADMIN_DESTINATAIRE', 'inscription@voixdumondearabe.fr');
define('EMAIL_ESSAI_FROM', defined('EMAIL_INSCRIPTION_FROM') ? EMAIL_INSCRIPTION_FROM : 'noreply@votredomaine.com'); // Réutilise ou définit une valeur par défaut
define('EMAIL_ESSAI_FROM_NAME', defined('EMAIL_INSCRIPTION_FROM_NAME') ? EMAIL_INSCRIPTION_FROM_NAME : 'Voix du Monde Arabe - Essai Gratuit');

header('Content-Type: application/json; charset=UTF-8');
$response_array = [
    'status' => 'error',
    'message' => 'Une erreur inconnue est survenue lors de la soumission de votre demande.',
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

    // --- Validation ---
    $errors = [];
    if (empty($nom)) $errors[] = 'Le nom est requis.';
    if (empty($prenom)) $errors[] = 'Le prénom est requis.';
    if (empty($date_naissance)) $errors[] = 'La date de naissance est requise.';
    if (empty($email)) {
        $errors[] = 'L\'email est requis.';
    } elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $errors[] = 'L\'adresse e-mail n\'est pas valide.';
    }
    if (empty($whatsapp)) $errors[] = 'Le numéro Whatsapp est requis.';
    // Vous pouvez ajouter d'autres validations (ex: format du numéro WhatsApp)

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

        $sql = "INSERT INTO demandes_essai (nom, prenom, date_naissance, email, whatsapp, demande_date) 
                VALUES (:nom, :prenom, :date_naissance, :email, :whatsapp, NOW())";
        $stmt = $pdo->prepare($sql);

        $stmt->bindParam(':nom', $nom);
        $stmt->bindParam(':prenom', $prenom);
        $stmt->bindParam(':date_naissance', $date_naissance);
        $stmt->bindParam(':email', $email);
        $stmt->bindParam(':whatsapp', $whatsapp);

        if ($stmt->execute()) {
            $response_array['db_message'] = 'Demande d\'essai gratuit enregistrée en base de données.';
            $db_success = true;
        } else {
            $response_array['db_message'] = 'Erreur lors de l\'enregistrement de la demande en BDD.';
        }
    } catch (PDOException $e) {
        $response_array['db_message'] = 'Erreur de connexion BDD (Essai Gratuit): ' . $e->getMessage();
        error_log('PDO Error (Essai Gratuit): ' . $e->getMessage());
    }

    // --- Envoi de l'email de notification à l'admin ---
    $email_sent_success = false;
    if ($db_success) { // Envoyer l'email seulement si la BDD est OK
        $email_subject_admin = "Nouvelle Demande de Cours d'Essai Gratuit - " . $prenom . " " . $nom;

        $email_body_admin = "<h1>Nouvelle Demande de Cours d'Essai Gratuit</h1>";
        $email_body_admin .= "<p>Une nouvelle demande pour un cours d'essai gratuit a été soumise :</p>";
        $email_body_admin .= "<ul>";
        $email_body_admin .= "<li><strong>Nom :</strong> " . htmlspecialchars($nom) . "</li>";
        $email_body_admin .= "<li><strong>Prénom :</strong> " . htmlspecialchars($prenom) . "</li>";
        $email_body_admin .= "<li><strong>Date de naissance :</strong> " . htmlspecialchars($date_naissance) . "</li>";
        $email_body_admin .= "<li><strong>Email :</strong> " . htmlspecialchars($email) . "</li>";
        $email_body_admin .= "<li><strong>Whatsapp :</strong> " . htmlspecialchars($whatsapp) . "</li>";
        $email_body_admin .= "</ul>";
        $email_body_admin .= "<p>Veuillez contacter cette personne pour planifier son cours d'essai.</p>";

        $headers_admin = "MIME-Version: 1.0" . "\r\n";
        $headers_admin .= "Content-type:text/html;charset=UTF-8" . "\r\n";
        $headers_admin .= "From: " . EMAIL_ESSAI_FROM_NAME . " <" . EMAIL_ESSAI_FROM . ">" . "\r\n";
        $headers_admin .= "Reply-To: " . htmlspecialchars($prenom) . " " . htmlspecialchars($nom) . " <" . htmlspecialchars($email) . ">" . "\r\n";

        if (mail(EMAIL_ESSAI_ADMIN_DESTINATAIRE, $email_subject_admin, $email_body_admin, $headers_admin)) {
            $response_array['email_message'] = 'Email de notification admin (essai gratuit) envoyé.';
            $email_sent_success = true;
        } else {
            $response_array['email_message'] = 'Erreur lors de l\'envoi de l\'email de notification admin (essai gratuit).';
            error_log('Mail Error (Essai Gratuit Admin): Failed to send to ' . EMAIL_ESSAI_ADMIN_DESTINATAIRE);
        }
    } else {
        $response_array['email_message'] = 'Email admin (essai gratuit) non envoyé car l\'enregistrement BDD a échoué.';
    }

    // --- Définition du statut final et du message global ---
    if ($db_success && $email_sent_success) {
        $response_array['status'] = 'success';
        $response_array['message'] = 'Merci ! Votre demande de cours d\'essai gratuit a bien été envoyée. Nous vous contacterons prochainement.';
    } elseif ($db_success && !$email_sent_success) {
        $response_array['status'] = 'partial_success';
        $response_array['message'] = 'Votre demande a été enregistrée, mais la notification à l\'administration n\'a pas pu être envoyée. Nous vous contacterons manuellement.';
    } else {
        $response_array['status'] = 'error';
        $response_array['message'] = 'Erreur lors de la soumission de votre demande. ' . $response_array['db_message'];
    }

} else {
    $response_array['message'] = 'Méthode de requête non autorisée.';
}

echo json_encode($response_array);
exit;
?>