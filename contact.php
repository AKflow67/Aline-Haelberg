<?php
// Anti-spam honeypot
if (!empty($_POST['website'])) {
    http_response_code(403);
    exit;
}

// Validation
$prenom = htmlspecialchars(trim($_POST['prenom'] ?? ''));
$nom = htmlspecialchars(trim($_POST['nom'] ?? ''));
$email = filter_var(trim($_POST['email'] ?? ''), FILTER_VALIDATE_EMAIL);
$telephone = htmlspecialchars(trim($_POST['telephone'] ?? ''));
$sujet = htmlspecialchars(trim($_POST['sujet'] ?? ''));
$message = htmlspecialchars(trim($_POST['message'] ?? ''));

if (!$nom || !$prenom || !$email || !$message) {
    http_response_code(400);
    echo 'Champs obligatoires manquants.';
    exit;
}

// Configuration
$destinataire = 'contact@alinehaelberg.fr';
$objet = 'Nouveau message depuis le site - ' . $prenom . ' ' . $nom;

// Corps du mail
$corps = "Prenom : $prenom\n";
$corps .= "Nom : $nom\n";
$corps .= "Email : $email\n";
if ($telephone) $corps .= "Telephone : $telephone\n";
if ($sujet) $corps .= "Objet : $sujet\n";
$corps .= "\nMessage :\n$message\n";

// En-tetes
$headers = "From: noreply@alinehaelberg.fr\r\n";
$headers .= "Reply-To: $email\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

// Envoi
$sent = mail($destinataire, $objet, $corps, $headers);

if ($sent) {
    header('Location: /#contact');
    exit;
} else {
    http_response_code(500);
    echo 'Erreur lors de l\'envoi. Veuillez reessayer.';
}
?>
