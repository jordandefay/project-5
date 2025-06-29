const coursesData = [
  {
    id: "alphabétisation",
    name: "Programme Alphabétisation",
    status: "available",
    priceValue: "120.00",
    currency: "EUR",
    originalDisplayPrice: "",
    pricingOptions: [
      {
        label: "Classe en particulier:",
        displayValue: "63.90€/Personne (soit seulement 7,30€/h)",
        paypalValue: "63.90",
      },
      {
        label: "Classe 2 personnes:",
        displayValue: "57.90€/Personne (soit seulement 6,65€/h)",
        paypalValue: "57.90",
      },
      {
        label: "Classe 3 personnes:",
        displayValue: "53.90€/Personne (soit seulement 6,15€/h)",
        paypalValue: "53.90",
      },
      {
        label: "Classe 4 personnes:",
        displayValue: "44.90€/Personne (soit seulement 5,15€/h)",
        paypalValue: "44.90",
      },
    ],
  },
  {
    id: "kitab-medine",
    name: "Programme Kitab de Médine",
    status: "available",
    priceValue: "120.00",
    currency: "EUR",
    originalDisplayPrice: "",
    pricingOptions: [
      {
        label: "Classe en particulier:",
        displayValue: "63.90€/Personne (soit seulement 7,30€/h)",
        paypalValue: "63.90",
      },
      {
        label: "Classe 2 personnes:",
        displayValue: "57.90€/Personne (soit seulement 6,65€/h)",
        paypalValue: "57.90",
      },
      {
        label: "Classe 3 personnes:",
        displayValue: "53.90€/Personne (soit seulement 6,15€/h)",
        paypalValue: "53.90",
      },
      {
        label: "Classe 4 personnes:",
        displayValue: "44.90€/Personne (soit seulement 5,15€/h)",
        paypalValue: "44.90",
      },
    ],
  },
  {
    id: "al-forqane",
    name: "Programme Al Forqane",
    status: "available",
    priceValue: "130.00",
    currency: "EUR",
    originalDisplayPrice: "",
    pricingOptions: [
      {
        label: "Classe en particulier:",
        displayValue: "73.90€/Personne (soit seulement 7,39€/h)",
        paypalValue: "73.90",
      },
      {
        label: "Classe 2 personnes:",
        displayValue: "67.90€/Personne (soit seulement 6,79€/h)",
        paypalValue: "67.90",
      },
      {
        label: "Classe 3 personnes:",
        displayValue: "63.90€/Personne (soit seulement 6,39€/h)",
        paypalValue: "63.90",
      },
      {
        label: "Classe 4 personnes:",
        displayValue: "54.90€/Personne (soit seulement 5,49€/h)",
        paypalValue: "54.90",
      },
    ],
  },
  {
    id: "coran",
    name: "Programme de Coran",
    status: "soon",
    displayPrice: "Inscriptions fermées",
    priceValue: "110.00",
    currency: "EUR",
    originalDisplayPrice: "",
    pricingOptions: [
      {
        label: "Classe 2 personnes:",
        displayValue: "124€/Personne",
        paypalValue: "124.00",
      },
      {
        label: "Classe 4 personnes:",
        displayValue: "103.90€/Personne",
        paypalValue: "103.90",
      },
    ],
  },
  {
    id: "tajwid",
    name: "Programme Tajwid",
    status: "soon",
    displayPrice: "Inscriptions fermées",
    priceValue: "95.00",
    currency: "EUR",
    originalDisplayPrice: "",
    pricingOptions: [
      {
        label: "Classe 2 personnes:",
        displayValue: "134€/Personne",
        paypalValue: "134.00",
      },
      {
        label: "Classe 4 personnes:",
        displayValue: "113.90€/Personne",
        paypalValue: "113.90",
      },
    ],
  },
  {
    id: "al-ajroumiyah",
    name: "Programme Al Ajroumiyah",
    status: "soon",
    priceValue: "123.90",
    currency: "EUR",
    originalDisplayPrice: "",
    pricingOptions: [
      {
        label: "Classe 2 personnes:",
        displayValue: "159.90€/Personne",
        paypalValue: "159.90",
      },
      {
        label: "Classe 4 personnes:",
        displayValue: "123.90€/Personne",
        paypalValue: "123.90",
      },
    ],
    displayPrice: "Bientôt disponible",
  },
  {
    id: "session-ete",
    name: "Session Été",
    status: "available",
    priceValue: "65.00",
    currency: "EUR",
    originalDisplayPrice: "",
    pricingOptions: [
      {
        label: "Classe en particulier:",
        displayValue: "73.90€/Personne (soit seulement 7,39€/h)",
        paypalValue: "73.90",
      },
      {
        label: "Classe 2 personnes:",
        displayValue: "68.90€/Personne (soit seulement 6,79€/h)",
        paypalValue: "68.90",
      },
      {
        label: "Classe 3 personnes:",
        displayValue: "63.90€/Personne (soit seulement 6,39€/h)",
        paypalValue: "63.90",
      },
      {
        label: "Classe 4 personnes:",
        displayValue: "53.90€/Personne (soit seulement 5,49€/h)",
        paypalValue: "53.90",
      },
    ],
  },
];

let selectedCourse;
let currentOrderAmount = null;
let currentCurrency = null;
let currentItemName = null;

console.log("script.js: Données des cours définies.");

async function loadFooter() {
  const footerPlaceholder = document.getElementById("footer-placeholder");
  if (!footerPlaceholder) {
    // console.warn("loadFooter: #footer-placeholder non trouvé sur cette page.");
    return;
  }
  try {
    const response = await fetch("footer.html");
    if (response.ok) {
      const footerHTML = await response.text();
      if (footerHTML.trim()) {
        footerPlaceholder.innerHTML = footerHTML;
        const yearElementFooter = document.getElementById("currentYearFooter");
        if (yearElementFooter)
          yearElementFooter.textContent = new Date().getFullYear();

        const newsletterFormFooter = document.getElementById(
          "newsletterFormFooter"
        );
        const newsletterMessageFooter = document.getElementById(
          "newsletterMessageFooter"
        );
        if (newsletterFormFooter && newsletterMessageFooter) {
          newsletterFormFooter.addEventListener("submit", function (e) {
            e.preventDefault();
            newsletterMessageFooter.textContent =
              "Merci pour votre inscription !";
            newsletterMessageFooter.className = "mt-2 text-sm text-green-400";
            newsletterFormFooter.reset();
            setTimeout(() => {
              newsletterMessageFooter.textContent = "";
            }, 3000);
          });
        }
      } else {
        console.warn("loadFooter: footer.html est vide.");
      }
    } else {
      console.error(
        "loadFooter: Erreur HTTP",
        response.status,
        response.statusText
      );
      footerPlaceholder.innerHTML = `<p class="text-center text-red-500">Erreur chargement pied de page.</p>`;
    }
  } catch (error) {
    console.error("loadFooter: Erreur réseau", error);
    footerPlaceholder.innerHTML = `<p class="text-center text-red-500">Impossible de charger le pied de page.</p>`;
  }
}

function updateCoursePrices() {
  console.log("updateCoursePrices: Appelée.");
  const courseCardElements = document.querySelectorAll(".course-card");
  if (courseCardElements.length === 0) {
    console.log(
      "updateCoursePrices: Aucun .course-card trouvé sur cette page."
    );
    return;
  }
  console.log(
    "updateCoursePrices: .course-card trouvés:",
    courseCardElements.length
  );

  coursesData.forEach((course) => {
    const courseCard = document.querySelector(
      `.course-card[data-course-id="${course.id}"]`
    );
    if (!courseCard) {
      // console.warn(`updateCoursePrices: Carte HTML NON TROUVÉE pour ID: ${course.id}`);
      return;
    }
    console.log(
      `updateCoursePrices: Traitement de la carte pour ID: ${course.id}`
    );

    const priceDisplayArea = courseCard.querySelector(".price-display-area");
    const ctaButton =
      courseCard.querySelector("a.course-cta-button") ||
      courseCard.querySelector(".p-6 > a:last-of-type");

    if (!priceDisplayArea) {
      console.error(
        `updateCoursePrices: .price-display-area NON TROUVÉ pour ${course.id}. Les prix ne seront pas affichés.`
      );
    } else {
      priceDisplayArea.innerHTML = "";
      let htmlContent = "";
      if (course.status === "soon") {
        htmlContent = `<p class="text-lg text-gray-500 italic py-4">${
          course.displayPrice || "Bientôt disponible"
        }</p>`;
      } else if (course.pricingOptions && course.pricingOptions.length > 0) {
        // console.log(`updateCoursePrices: Génération des options de prix pour ${course.id}:`, course.pricingOptions);
        if (
          course.originalDisplayPrice &&
          course.originalDisplayPrice.trim() !== ""
        ) {
          htmlContent += `<span class="block text-gray-500 line-through text-sm mb-1">${course.originalDisplayPrice}</span>`;
        }
        course.pricingOptions.forEach((opt) => {
          if (opt.label && opt.displayValue) {
            htmlContent += `<div class="mb-1 text-center"><span class="text-gray-700 text-sm">${opt.label}</span> <span class="text-xl font-bold text-gray-800">${opt.displayValue}</span></div>`;
          } else {
            console.warn(
              `updateCoursePrices: Option de prix malformée pour ${course.id}:`,
              opt
            );
          }
        });
        priceDisplayArea.classList.add(
          "flex",
          "flex-col",
          "items-center",
          "justify-center"
        );
      } else {
        htmlContent = `<span class="course-price text-3xl font-bold text-gray-800">${
          course.displayPrice || course.priceValue + (course.currency || "€")
        }</span>`;
        if (
          course.originalDisplayPrice &&
          course.originalDisplayPrice.trim() !== ""
        ) {
          htmlContent += ` <span class="course-original-price text-gray-500 line-through ml-2">${course.originalDisplayPrice}</span>`;
        }
        priceDisplayArea.classList.add(
          "flex",
          "items-center",
          "justify-center"
        );
      }

      if (htmlContent.trim() === "" && course.status !== "soon") {
        console.error(
          `updateCoursePrices: HTML généré pour les prix de ${course.id} est VIDE (statut "${course.status}"). Données:`,
          JSON.stringify(course)
        );
        htmlContent = `<p class="text-sm text-red-500">Erreur d'affichage du prix.</p>`;
      }
      priceDisplayArea.innerHTML = htmlContent;
      // console.log(`updateCoursePrices: HTML prix final pour ${course.id} (longueur: ${htmlContent.length}): ${htmlContent.substring(0,150)}`);
    }

    if (ctaButton) {
      if (course.status === "soon") {
        ctaButton.textContent = "Bientôt disponible";
        ctaButton.href = "javascript:void(0);";
        ctaButton.classList.add(
          "opacity-75",
          "cursor-not-allowed",
          "bg-gray-400"
        );
        ctaButton.classList.remove(
          "hover:bg-amber-700",
          "hover:bg-blue-700",
          "hover:bg-green-700",
          "hover:bg-purple-700",
          "hover:bg-red-700",
          "hover:bg-pink-700",
          "hover:bg-teal-700",
          "bg-amber-600",
          "bg-blue-600",
          "bg-green-600",
          "bg-purple-600",
          "bg-red-600",
          "bg-pink-600",
          "bg-teal-600"
        );
      } else {
        ctaButton.textContent = "S'inscrire";
        if (course.id === "session-ete") {
          ctaButton.href = `session_ete.html`;
        } else {
          ctaButton.href = `inscription_cours.html?courseId=${course.id}`;
        }
        ctaButton.classList.remove(
          "opacity-75",
          "cursor-not-allowed",
          "bg-gray-400"
        );
        if (course.id === "alphabétisation")
          ctaButton.classList.add("bg-amber-600", "hover:bg-amber-700");
        else if (course.id === "kitab-medine")
          ctaButton.classList.add("bg-blue-600", "hover:bg-blue-700");
        else if (course.id === "al-forqane")
          ctaButton.classList.add("bg-green-600", "hover:bg-green-700");
        else if (course.id === "coran")
          ctaButton.classList.add("bg-purple-600", "hover:bg-purple-700");
        else if (course.id === "tajwid")
          ctaButton.classList.add("bg-teal-600", "hover:bg-teal-700");
        else if (course.id === "al-ajroumiyah")
          ctaButton.classList.add("bg-red-600", "hover:bg-red-700");
        else if (course.id === "session-ete")
          ctaButton.classList.add("bg-red-600", "hover:bg-red-700");
      }
    } else {
      console.warn(
        `updateCoursePrices: Bouton CTA NON TROUVÉ pour ${course.id}`
      );
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  console.log("script.js: Événement DOMContentLoaded déclenché.");

  loadFooter();
  updateCoursePrices();

  const faqToggles = document.querySelectorAll(".faq-toggle");
  faqToggles.forEach((button) => {
    button.addEventListener("click", () => {
      const content = button.nextElementSibling;
      const icon = button.querySelector("i");
      if (content) content.classList.toggle("hidden");
      if (icon) {
        icon.classList.toggle("fa-chevron-down");
        icon.classList.toggle("fa-chevron-up");
      }
    });
  });

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const targetId = this.getAttribute("href");
      if (
        targetId.startsWith("#") &&
        targetId.length > 1 &&
        document.getElementById(targetId.substring(1))
      ) {
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          e.preventDefault();
          targetElement.scrollIntoView({ behavior: "smooth" });
        }
      }
    });
  });

  const observerOptions = { threshold: 0.1 };
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("fade-in");
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);
  document
    .querySelectorAll("section:not(#footer-placeholder)")
    .forEach((section) => {
      if (
        section.id !== "contact" ||
        !document.getElementById("contactFormIndex")
      ) {
        observer.observe(section);
      }
    });

  const mobileMenuButton = document.getElementById("mobileMenuButton");
  const mobileMenu = document.getElementById("mobileMenu");
  if (mobileMenuButton && mobileMenu) {
    mobileMenuButton.addEventListener("click", () => {
      mobileMenu.classList.toggle("active");
    });
  }

  const yearElementPage = document.getElementById("currentYear");
  if (yearElementPage && !document.getElementById("currentYearFooter")) {
    yearElementPage.textContent = new Date().getFullYear();
  }

  const inscriptionFormElement = document.getElementById("inscriptionForm");
  if (inscriptionFormElement) {
    console.log("script.js: Page d'inscription détectée.");
    const courseNameEl = document.getElementById("selectedCourseName");
    const courseInfoNameEl = document.getElementById("courseName");
    const coursePriceDisplayEl = document.getElementById("coursePriceDisplay");
    const paymentAmountEl = document.getElementById("paymentAmount");
    const submitButton = document.getElementById("submitButton");
    const resultMessageContainer = document.getElementById("result-message");
    const paypalButtonContainer = document.getElementById(
      "paypal-button-container"
    );
    const paypalMessageContainer = document.getElementById(
      "paypal-message-container"
    );
    let priceOptionSelect = null;

    function resultMessage(message, isError = false) {
      if (resultMessageContainer) {
        resultMessageContainer.innerHTML = message;
        resultMessageContainer.className = isError
          ? "mt-4 text-center p-2 rounded-md bg-red-100 text-red-700 text-sm"
          : "mt-4 text-center p-2 rounded-md bg-green-100 text-green-700 text-sm";
      }
    }

    function renderPayPalButtons() {
      console.log("renderPayPalButtons - Appel avec:", {
        amount: currentOrderAmount,
        currency: currentCurrency,
        itemName: currentItemName,
      });
      if (
        !currentOrderAmount ||
        !currentCurrency ||
        !currentItemName ||
        parseFloat(currentOrderAmount) <= 0
      ) {
        if (paypalButtonContainer)
          paypalButtonContainer.innerHTML =
            "<p class='text-red-500'>Erreur: Détails de commande invalides.</p>";
        return;
      }
      if (
        typeof PayPalSDK === "undefined" ||
        typeof PayPalSDK.Buttons !== "function"
      ) {
        console.error(
          "renderPayPalButtons: Objet PayPalSDK ou PayPalSDK.Buttons non défini."
        );
        if (paypalButtonContainer)
          paypalButtonContainer.innerHTML =
            "<p class='text-red-500'>Erreur: SDK PayPal non disponible.</p>";
        return;
      }
      if (!paypalButtonContainer) return;

      paypalButtonContainer.innerHTML = "";
      PayPalSDK.Buttons({
        style: {
          shape: "rect",
          layout: "vertical",
          color: "gold",
          label: "paypal",
        },
        createOrder: function (data, actions) {
          console.log("PayPal Client: createOrder", {
            amount: currentOrderAmount,
            currency: currentCurrency,
            itemName: currentItemName,
          });
          return actions.order.create({
            purchase_units: [
              {
                description: currentItemName,
                amount: {
                  currency_code: currentCurrency,
                  value: currentOrderAmount,
                },
              },
            ],
          });
        },
        onApprove: function (data, actions) {
          console.log("PayPal Client: onApprove", data);
          return actions.order.capture().then(function (details) {
            const transaction = details.purchase_units[0].payments.captures[0];
            resultMessage(
              `Transaction ${transaction.status}: ${transaction.id}<br>Paiement réussi ! Vous pouvez soumettre votre inscription.`,
              false
            );
            if (submitButton) {
              submitButton.disabled = false;
              submitButton.classList.remove("opacity-50", "cursor-not-allowed");
            }
            const paypalTransactionIdInput = document.createElement("input");
            paypalTransactionIdInput.type = "hidden";
            paypalTransactionIdInput.name = "paypalTransactionId";
            paypalTransactionIdInput.value = transaction.id;
            inscriptionFormElement.appendChild(paypalTransactionIdInput);
          });
        },
        onError: function (err) {
          resultMessage(`Erreur PayPal: ${err.toString()}`, true);
        },
      })
        .render("#paypal-button-container")
        .catch((err) => {
          resultMessage(`Erreur rendu boutons PayPal: ${err.toString()}`, true);
        });
    }

    const urlParams = new URLSearchParams(window.location.search);
    const courseIdFromUrl = urlParams.get("courseId");
    console.log("script.js (Inscription): courseIdFromUrl:", courseIdFromUrl);

    if (courseIdFromUrl) {
      selectedCourse = coursesData.find((c) => c.id === courseIdFromUrl);
      console.log(
        "script.js (Inscription): selectedCourse trouvé:",
        selectedCourse
      );
    }

    if (selectedCourse) {
      if (courseInfoNameEl) courseInfoNameEl.textContent = selectedCourse.name;
      if (courseNameEl) courseNameEl.textContent = selectedCourse.name;

      if (coursePriceDisplayEl) {
        coursePriceDisplayEl.innerHTML = "";
        if (selectedCourse.status === "soon") {
          coursePriceDisplayEl.innerHTML = `<p class="text-lg text-gray-600 italic">${
            selectedCourse.displayPrice || "Bientôt disponible"
          }</p>`;
          if (paymentAmountEl) paymentAmountEl.textContent = "N/A";
          if (paypalMessageContainer)
            paypalMessageContainer.style.display = "none";
        } else if (
          selectedCourse.pricingOptions &&
          selectedCourse.pricingOptions.length > 0
        ) {
          let optionsHTML =
            '<p class="text-gray-700 mb-2 text-sm">Veuillez sélectionner une option :</p><select id="priceOptionSelect" class="w-full p-2 border border-gray-300 rounded-md mb-2 text-sm">';
          selectedCourse.pricingOptions.forEach((option, index) => {
            optionsHTML += `<option value="${
              option.paypalValue
            }" data-currency="${
              selectedCourse.currency
            }" data-label="${option.label.replace(":", "")}" ${
              index === 0 ? "selected" : ""
            }>${option.label} ${option.displayValue}</option>`;
          });
          optionsHTML += "</select>";
          coursePriceDisplayEl.innerHTML = optionsHTML;

          priceOptionSelect = document.getElementById("priceOptionSelect");
          if (priceOptionSelect) {
            function updatePaymentDetailsAndRenderButtons() {
              const selectedOptionElement =
                priceOptionSelect.options[priceOptionSelect.selectedIndex];
              currentOrderAmount = selectedOptionElement.value;
              currentCurrency = selectedOptionElement.dataset.currency;
              currentItemName = `${selectedCourse.name} - ${selectedOptionElement.dataset.label}`;
              if (paymentAmountEl) {
                paymentAmountEl.textContent = `${currentOrderAmount} ${currentCurrency}`;
                console.log(
                  "Page Inscription: paymentAmountEl mis à jour:",
                  paymentAmountEl.textContent
                );
              }

              if (paypalMessageContainer) {
                paypalMessageContainer.setAttribute(
                  "data-pp-amount",
                  currentOrderAmount
                );
                if (typeof PayPalSDK !== "undefined" && PayPalSDK.Messages) {
                  PayPalSDK.Messages().render("#paypal-message-container");
                }
              }
              if (selectedCourse.status !== "soon") {
                renderPayPalButtons();
              }
            }
            updatePaymentDetailsAndRenderButtons();
            priceOptionSelect.addEventListener(
              "change",
              updatePaymentDetailsAndRenderButtons
            );
          }
        } else {
          currentOrderAmount = selectedCourse.priceValue;
          currentCurrency = selectedCourse.currency;
          currentItemName = selectedCourse.name;
          coursePriceDisplayEl.innerHTML = `<p class="text-xl font-bold text-amber-600">Prix : ${
            selectedCourse.displayPrice ||
            currentOrderAmount + (currentCurrency || "€")
          }</p>`;
          if (paymentAmountEl) {
            paymentAmountEl.textContent = `${currentOrderAmount} ${currentCurrency}`;
            console.log(
              "Page Inscription (prix unique): paymentAmountEl mis à jour:",
              paymentAmountEl.textContent
            );
          }
          if (paypalMessageContainer) {
            paypalMessageContainer.setAttribute(
              "data-pp-amount",
              currentOrderAmount
            );
            if (typeof PayPalSDK !== "undefined" && PayPalSDK.Messages) {
              PayPalSDK.Messages().render("#paypal-message-container");
            }
          }
          if (selectedCourse.status !== "soon") {
            renderPayPalButtons();
          }
        }
      }

      if (selectedCourse.status === "soon") {
        if (paypalButtonContainer)
          paypalButtonContainer.innerHTML =
            '<p class="text-center text-gray-600 font-semibold">Ce cours est en préparation.</p>';
        if (submitButton) submitButton.style.display = "none";
        if (paypalMessageContainer)
          paypalMessageContainer.style.display = "none";
      } else {
        if (paypalMessageContainer)
          paypalMessageContainer.style.display = "block";
      }
    } else {
      console.error("script.js (Inscription): selectedCourse est indéfini.");
      if (courseInfoNameEl) courseInfoNameEl.textContent = "Cours non trouvé";
      if (courseNameEl) courseNameEl.textContent = "N/A";
      if (coursePriceDisplayEl)
        coursePriceDisplayEl.innerHTML =
          "<p class='text-red-500'>Détails du cours non disponibles.</p>";
      if (paymentAmountEl) paymentAmountEl.textContent = "N/A";
      if (paypalButtonContainer)
        paypalButtonContainer.innerHTML =
          "<p class='text-gray-500'>Veuillez sélectionner un cours valide.</p>";
      if (submitButton) submitButton.style.display = "none";
      if (paypalMessageContainer) paypalMessageContainer.style.display = "none";
    }

    inscriptionFormElement.addEventListener("submit", async function (event) {
      event.preventDefault();
      if (submitButton.disabled) {
        resultMessage("Veuillez d'abord compléter le paiement PayPal.", true);
        return;
      }
      const formData = new FormData(inscriptionFormElement);
      const data = {};
      formData.forEach((value, key) => {
        if (key === "email") {
          data["email_inscription"] = value;
        } else {
          data[key] = value;
        }
      });

      data.courseId = selectedCourse ? selectedCourse.id : "non-spécifié";
      data.courseNameOption = currentItemName;
      data.amountPaid = currentOrderAmount;
      data.currencyPaid = currentCurrency;

      const paypalTransactionIdField = inscriptionFormElement.querySelector(
        'input[name="paypalTransactionId"]'
      );
      data.paypalTransactionId = paypalTransactionIdField
        ? paypalTransactionIdField.value
        : "CLIENT_SIDE_PAYMENT";

      console.log("Données d'inscription à envoyer:", data);
      resultMessage("Envoi de l'inscription...", false);

      try {
        const response = await fetch("handle_inscription.php", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });
        const phpResult = await response.json();
        if (
          phpResult.status === "success" ||
          phpResult.status.startsWith("partial_success")
        ) {
          resultMessage(phpResult.message || "Inscription traitée !", false);
          // ... (reset formulaire, etc.)
        } else {
          resultMessage(
            phpResult.message ||
              "Une erreur est survenue lors de l'inscription.",
            true
          );
        }
      } catch (error) {
        console.error("Erreur soumission formulaire inscription:", error);
        resultMessage(
          "Erreur de communication avec le serveur pour l'inscription.",
          true
        );
      }
    });
  }

  const contactFormIndex = document.getElementById("contactFormIndex");
  const contactFormIndexMessage = document.getElementById(
    "contactFormIndexMessage"
  );
  if (contactFormIndex && contactFormIndexMessage) {
    contactFormIndex.addEventListener("submit", async function (event) {
      /* ... */
    });
  }

  const mainNewsletterForm = document.getElementById("newsletterForm");
  const mainNewsletterMessage = document.getElementById("newsletterMessage");
  if (mainNewsletterForm && mainNewsletterMessage) {
    /* ... */
  }

  console.log("script.js: Fin de l'exécution après DOMContentLoaded.");
});
console.log("script.js: Fin du fichier.");
