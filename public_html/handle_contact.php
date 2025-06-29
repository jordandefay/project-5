<?php
// handle_contact.php

// Inclure le fichier de configuration
require_once __DIR__ . '/../config_secure/config.php';

// Indiquer que la réponse sera au format JSON
header('Content-Type: application/json');

// Initialiser le tableau de réponse
$response_array = [
    'status' => 'error', // Peut devenir 'success' ou 'partial_success'
    'message' => 'Une erreur inconnue est survenue.',
    'db_message' => '',   // Message spécifique à l'opération BDD
    'email_message' => '' // Message spécifique à l'envoi d'email
];

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $contact_name = isset($_POST['contact_name']) ? trim($_POST['contact_name']) : '';
    $contact_email = isset($_POST['contact_email']) ? trim($_POST['contact_email']) : '';
    $contact_subject_form = isset($_POST['contact_subject']) ? trim($_POST['contact_subject']) : '';
    $contact_message_text = isset($_POST['contact_message']) ? trim($_POST['contact_message']) : '';

    // --- Validation simple ---
    if (empty($contact_name) || empty($contact_email) || empty($contact_subject_form) || empty($contact_message_text)) {
        $response_array['message'] = 'Tous les champs sont requis.';
        echo json_encode($response_array);
        exit;
    }

    if (!filter_var($contact_email, FILTER_VALIDATE_EMAIL)) {
        $response_array['message'] = 'L\'adresse e-mail n\'est pas valide.';
        echo json_encode($response_array);
        exit;
    }

    // --- Opérations Base de Données ---
    $db_success = false;
    try {
        // Connexion à la base de données via PDO
        $dsn = "mysql:host=" . DB_HOST . ";dbname=" . DB_NAME . ";charset=utf8mb4";
        $options = [
            PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_EMULATE_PREPARES   => false,
        ];
        $pdo = new PDO($dsn, DB_USER, DB_PASS, $options);

        // Préparation de la requête d'insertion
        // Assurez-vous que la table 'contact_messages' existe avec les colonnes : name, email, subject, message
        $sql = "INSERT INTO contact_messages (name, email, subject, message, submission_date) VALUES (:name, :email, :subject, :message, NOW())";
        $stmt = $pdo->prepare($sql);

        // Liaison des paramètres
        $stmt->bindParam(':name', $contact_name);
        $stmt->bindParam(':email', $contact_email);
        $stmt->bindParam(':subject', $contact_subject_form);
        $stmt->bindParam(':message', $contact_message_text);

        // Exécution de la requête
        if ($stmt->execute()) {
            $response_array['db_message'] = 'Message enregistré dans la base de données avec succès.';
            $db_success = true;
        } else {
            $response_array['db_message'] = 'Erreur lors de l\'enregistrement du message dans la base de données.';
        }
    } catch (PDOException $e) {
        $response_array['db_message'] = 'Erreur de connexion à la base de données: ' . $e->getMessage();
        // Pour le débogage, ne pas afficher $e->getMessage() en production.
        // error_log('PDO Error: ' . $e->getMessage()); // Écrire dans les logs serveur
    }

    // --- Envoi de l'email ---
    // Utilise les constantes de config.php
    $to_email = ADMIN_EMAIL; // Défini dans config.php
    $email_subject_prefix = defined('EMAIL_SUBJECT_PREFIX_CONTACT') ? EMAIL_SUBJECT_PREFIX_CONTACT : "Contact Formulaire"; // Vous pourriez ajouter une constante pour cela dans config.php
    $email_subject = $email_subject_prefix . ": " . $contact_subject_form;

    $email_body = "<p>Vous avez reçu un nouveau message via le formulaire de contact de votre site.</p>";
    $email_body .= "<h3>Détails du message :</h3>";
    $email_body .= "<ul>";
    $email_body .= "<li><strong>Nom :</strong> " . htmlspecialchars($contact_name) . "</li>";
    $email_body .= "<li><strong>Email :</strong> " . htmlspecialchars($contact_email) . "</li>";
    $email_body .= "<li><strong>Sujet Formulaire :</strong> " . htmlspecialchars($contact_subject_form) . "</li>";
    $email_body .= "<li><strong>Message :</strong><br>" . nl2br(htmlspecialchars($contact_message_text)) . "</li>";
    $email_body .= "</ul>";
    if (!$db_success) {
        $email_body .= "<p style='color:red;'><strong>Attention:</strong> Le message n'a PAS pu être enregistré dans la base de données.</p>";
    }


    // En-têtes de l'email
    $headers = "MIME-Version: 1.0" . "\r\n";
    $headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
    $headers .= "From: " . EMAIL_FROM_NAME . " <" . EMAIL_FROM . ">" . "\r\n"; // Défini dans config.php
    $headers .= "Reply-To: " . htmlspecialchars($contact_name) . " <" . htmlspecialchars($contact_email) . ">" . "\r\n";

    $email_sent_success = false;
    if (mail($to_email, $email_subject, $email_body, $headers)) {
        $response_array['email_message'] = 'Email de notification envoyé avec succès.';
        $email_sent_success = true;
    } else {
        $response_array['email_message'] = 'Erreur lors de l\'envoi de l\'email de notification.';
    }

    // --- Définition du statut final et du message global ---
    if ($db_success && $email_sent_success) {
        $response_array['status'] = 'success';
        $response_array['message'] = 'Merci ! Votre message a été envoyé et enregistré.';
    } elseif ($db_success || $email_sent_success) {
        $response_array['status'] = 'partial_success';
        if ($db_success) {
            $response_array['message'] = 'Votre message a été enregistré, mais l\'email de notification n\'a pas pu être envoyé.';
        } else {
            $response_array['message'] = 'Votre message a été envoyé par email, mais n\'a pas pu être enregistré dans la base de données.';
        }
    } else {
        $response_array['status'] = 'error';
        $response_array['message'] = 'Une erreur est survenue lors du traitement de votre message (BDD et Email ont échoué).';
    }

} else {
    $response_array['message'] = 'Méthode de requête non autorisée.';
}

echo json_encode($response_array);
?>