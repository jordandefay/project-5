#!/bin/bash

echo "=== Configuration SSL pour voixdumondearabe.fr ==="

# Vérifier que le domaine pointe vers ce serveur
echo "Vérification DNS..."
dig +short voixdumondearabe.fr
dig +short www.voixdumondearabe.fr

echo ""
echo "Assurez-vous que les DNS pointent vers votre IP: 82.165.173.218"
echo "Appuyez sur Entrée pour continuer une fois que les DNS sont propagés..."
read

# Obtenir le certificat SSL
echo "Obtention du certificat SSL..."
sudo certbot --nginx -d voixdumondearabe.fr -d www.voixdumondearabe.fr --non-interactive --agree-tos --email contact@voixdumondearabe.fr

# Vérifier le certificat
echo "Vérification du certificat..."
sudo certbot certificates

# Configurer le renouvellement automatique
echo "Configuration du renouvellement automatique..."
sudo systemctl enable certbot.timer
sudo systemctl start certbot.timer

# Test du renouvellement
echo "Test du renouvellement..."
sudo certbot renew --dry-run

echo ""
echo "=== Configuration terminée ==="
echo "Votre site devrait maintenant être accessible en HTTPS:"
echo "https://voixdumondearabe.fr"
echo "https://www.voixdumondearabe.fr"