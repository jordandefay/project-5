<?php
// handle_newsletter.php

// --- Configuration ---
// Utilisation du fichier de configuration existant (celui pour le formulaire de contact)
// Assurez-vous que ce fichier est accessible et contient les bonnes constantes DB_HOST, DB_USER, DB_PASS, DB_NAME
// pour la base de données u274793444_form.
$configPath = __DIR__ . '/../config_secure/config.php'; // Adaptez si votre config.php est ailleurs

if (file_exists($configPath)) {
    require_once $configPath;
} else {
    header('Content-Type: application/json; charset=UTF-8');
    echo json_encode([
        'status' => 'error',
        'message' => 'Erreur critique de configuration du serveur (newsletter).',
    ]);
    error_log("Fichier config.php introuvable pour handle_newsletter.php à: " . $configPath);
    exit;
}

// Vérifier si les constantes de BDD sont définies
if (!defined('DB_HOST') || !defined('DB_USER') || !defined('DB_PASS') || !defined('DB_NAME')) {
    header('Content-Type: application/json; charset=UTF-8');
    echo json_encode([
        'status' => 'error',
        'message' => 'Constantes de configuration BDD manquantes pour la newsletter.',
    ]);
    error_log("Constantes de configuration BDD manquantes pour handle_newsletter.php après inclusion de " . $configPath);
    exit;
}

header('Content-Type: application/json; charset=UTF-8');
$response = ['status' => 'error', 'message' => 'Une erreur est survenue.'];

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $email = isset($_POST['newsletter_email_footer']) ? trim($_POST['newsletter_email_footer']) : '';

    if (empty($email)) {
        $response['message'] = 'L\'adresse e-mail ne peut pas être vide.';
        echo json_encode($response);
        exit;
    }

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $response['message'] = 'Veuillez fournir une adresse e-mail valide.';
        echo json_encode($response);
        exit;
    }

    try {
        $dsn = "mysql:host=" . DB_HOST . ";dbname=" . DB_NAME . ";charset=utf8mb4";
        $options = [
            PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_EMULATE_PREPARES   => false,
        ];
        $pdo = new PDO($dsn, DB_USER, DB_PASS, $options);

        // Vérifier si l'email existe déjà
        $stmt_check = $pdo->prepare("SELECT COUNT(*) FROM newsletter_subscriptions WHERE email = :email");
        $stmt_check->bindParam(':email', $email);
        $stmt_check->execute();
        $email_exists = $stmt_check->fetchColumn();

        if ($email_exists) {
            $response['status'] = 'success'; // Ou 'info' si vous voulez un message différent
            $response['message'] = 'Vous êtes déjà inscrit à notre newsletter !';
        } else {
            // Insérer le nouvel email
            // La table newsletter_subscriptions doit avoir une colonne 'email' et 'subscription_date' (TIMESTAMP DEFAULT CURRENT_TIMESTAMP)
            $sql = "INSERT INTO newsletter_subscriptions (email, subscription_date) VALUES (:email, NOW())";
            $stmt = $pdo->prepare($sql);
            $stmt->bindParam(':email', $email);

            if ($stmt->execute()) {
                $response['status'] = 'success';
                $response['message'] = 'Merci pour votre inscription à la newsletter !';
            } else {
                $response['message'] = 'Erreur lors de l\'enregistrement de votre e-mail.';
            }
        }
    } catch (PDOException $e) {
        $response['message'] = 'Erreur de base de données. Veuillez réessayer plus tard.';
        // En production, logguez $e->getMessage() au lieu de l'exposer.
        error_log('PDO Error (Newsletter): ' . $e->getMessage());
        // Si l'erreur est due à une violation de contrainte UNIQUE (code 23000), cela signifie que l'email existe déjà.
        // Vous pourriez affiner la gestion ici si vous n'utilisez pas la vérification SELECT COUNT(*) d'abord.
        // if ($e->getCode() == 23000) { // Code pour violation de contrainte d'unicité
        //    $response['status'] = 'success';
        //    $response['message'] = 'Vous êtes déjà inscrit à notre newsletter ! (via exception)';
        // }
    }
} else {
    $response['message'] = 'Méthode non autorisée.';
}

echo json_encode($response);
?>