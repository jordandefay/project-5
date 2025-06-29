// script_essai_gratuit.js
// Logique spécifique pour le formulaire d'essai gratuit
document.addEventListener("DOMContentLoaded", () => {
  const essaiGratuitForm = document.getElementById("essaiGratuitForm");
  const formMessageEssai = document.getElementById("formMessageEssai"); // L'élément pour afficher les messages

  if (essaiGratuitForm && formMessageEssai) {
    essaiGratuitForm.addEventListener("submit", function(event) {
        event.preventDefault(); // Empêche la soumission traditionnelle

        const formData = new FormData(essaiGratuitForm);
        const submitButton = essaiGratuitForm.querySelector('button[type="submit"]');
        const originalButtonText = submitButton.textContent;

        // Désactiver le bouton et afficher un message de chargement
        submitButton.disabled = true;
        submitButton.textContent = "Envoi en cours...";
        formMessageEssai.className = "mt-6 text-center p-4 rounded-md text-sm text-gray-600"; // Classe neutre pour message d'attente
        formMessageEssai.textContent = "Traitement de votre demande...";

        fetch("handle_essai_gratuit.php", { // Appel au script PHP réel
            method: "POST",
            body: formData,
        })
        .then(response => {
            if (!response.ok) {
                // Essayer de lire le corps de l'erreur comme JSON
                return response.json().then(errData => {
                    throw new Error(errData.message || `Erreur HTTP ${response.status}`);
                }).catch(() => { // Si le corps de l'erreur n'est pas JSON
                    throw new Error(`Erreur HTTP ${response.status} - ${response.statusText}`);
                });
            }
            return response.json();
        })
        .then(data => {
            if (data.status === "success") {
                formMessageEssai.textContent = data.message;
                formMessageEssai.className = "mt-6 text-center p-4 rounded-md text-sm bg-green-100 text-green-700";
                essaiGratuitForm.reset(); // Réinitialiser le formulaire

                // Optionnel : Rediriger vers une page de confirmation dédiée si vous en créez une pour les essais
                // Exemple :
                // const queryParams = new URLSearchParams({
                //    status: data.status,
                //    message: data.message
                // }).toString();
                // window.location.href = `essai_confirmation.html?${queryParams}`;

            } else { // 'error' ou 'partial_success' géré comme une erreur pour l'utilisateur ici
                formMessageEssai.textContent = data.message || "Une erreur est survenue lors de la soumission.";
                formMessageEssai.className = "mt-6 text-center p-4 rounded-md text-sm bg-red-100 text-red-700";
            }
        })
        .catch(error => {
            console.error("Erreur lors de la soumission du formulaire d'essai gratuit:", error);
            formMessageEssai.textContent = "Erreur de communication avec le serveur: " + error.message;
            formMessageEssai.className = "mt-6 text-center p-4 rounded-md text-sm bg-red-100 text-red-700";
        })
        .finally(() => {
            // Réactiver le bouton et restaurer son texte
            submitButton.disabled = false;
            submitButton.textContent = originalButtonText;
        });
    });
  } else {
    if (!essaiGratuitForm) console.warn("Le formulaire #essaiGratuitForm n'a pas été trouvé.");
    if (!formMessageEssai) console.warn("L'élément #formMessageEssai n'a pas été trouvé.");
  }
});