"use strict";

// element toggle function
const elementToggleFunc = function (elem) {
  elem.classList.toggle("active");
};

// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () {
  elementToggleFunc(sidebar);
});

// testimonials variables
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");
// modal variable
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

// modal toggle function
const testimonialsModalFunc = function () {
  modalContainer.classList.toggle("active");
  overlay.classList.toggle("active");
};

// add click event to all modal items
for (let i = 0; i < testimonialsItem.length; i++) {
  testimonialsItem[i].addEventListener("click", function () {
    modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
    modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
    modalTitle.innerHTML = this.querySelector(
      "[data-testimonials-title]"
    ).innerHTML;
    modalText.innerHTML = this.querySelector(
      "[data-testimonials-text]"
    ).innerHTML;

    testimonialsModalFunc();
  });
}

emailjs.init("QrluvtrVsO1J6jKu_");

document.querySelector(".form").addEventListener("submit", function (event) {
  event.preventDefault();

  // Use EmailJS to send form data
  emailjs.sendForm("service_xp7xtdm", "template_d8ptr1h", this).then(
    function () {
      console.log("SUCCESS!");
      alert("Message sent successfully!");
    },
    function (error) {
      console.log("FAILED...", error);
      alert("Message failed to send!");
    }
  );
});
// add click event to modal close button
modalCloseBtn.addEventListener("click", testimonialsModalFunc);
overlay.addEventListener("click", testimonialsModalFunc);

// custom select variables
const select = document.querySelectorAll("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-select-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");
const selectCat = document.querySelector("#select-cat");

for (let i = 0; i < select.length; i++) {
  select[i].addEventListener("click", function () {
    elementToggleFunc(this);
  });
}

// add event in all select items
for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {
    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = selectedValue;
    selectCat.innerText = selectedValue;
    if (i >= 0 && i <= 4) {
      elementToggleFunc(select[0]);
    } else {
      elementToggleFunc(select[1]);
    }
    filterFunc(selectedValue);
  });
}

// filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {
  for (let i = 0; i < filterItems.length; i++) {
    if (selectedValue === "all") {
      filterItems[i].classList.add("active");
    } else if (selectedValue === filterItems[i].dataset.category) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }
  }
};

// add event in all filter button items for large screen
let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {
  filterBtn[i].addEventListener("click", function () {
    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    filterFunc(selectedValue);

    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;
  });
}

// contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

// add event to all form input field
for (let i = 0; i < formInputs.length; i++) {
  formInputs[i].addEventListener("input", function () {
    // check form validation
    if (form.checkValidity()) {
      formBtn.removeAttribute("disabled");
    } else {
      formBtn.setAttribute("disabled", "");
    }
  });
}

// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// add event to all nav link
// Add event listener to navigation links
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {
    // Loop through pages and set the active page
    for (let j = 0; j < pages.length; j++) {
      if (this.innerHTML.toLowerCase() === pages[j].dataset.page) {
        pages[j].classList.add("active");
        navigationLinks[j].classList.add("active");
        window.scrollTo(0, 0);
      } else {
        pages[j].classList.remove("active");
        navigationLinks[j].classList.remove("active");
      }
    }

    filterFunc("all");
  });
}

// POP-UP on Certification Portion**************

const certItems = document.querySelectorAll(".cert-item a");

// Create the popup element
const popup = document.createElement("div");
popup.classList.add("popup");
popup.innerHTML = `
  <div class="popup-content">
    <span class="close">&times;</span>
    <img src="" alt="Certificate Image" style="width:70%;margin:auto">
    <h3 class="popup-title"></h3>
    <p class="popup-category-date"></p>
  </div>
`;
document.body.appendChild(popup);

// Get popup elements
const popupImg = popup.querySelector("img");
const popupTitle = popup.querySelector(".popup-title");
const popupCategoryDate = popup.querySelector(".popup-category-date");
const closeBtn = popup.querySelector(".close");

// Show popup on image click
certItems.forEach((item) => {
  item.addEventListener("click", function (event) {
    event.preventDefault();
    const imgSrc = this.querySelector("img").src;
    const title = this.querySelector(".cert-title").textContent;
    const categoryDate = this.querySelector(".cert-category").textContent;

    popupImg.src = imgSrc;
    popupTitle.textContent = title;

    // Display full category and date in the popup
    popupCategoryDate.textContent = categoryDate;
    popup.style.display = "block";
  });
});

// Hide popup on close click
closeBtn.addEventListener("click", function () {
  popup.style.display = "none";
});

// Transition on expertise ***********************

const expertiseContainer = document.querySelector(".expertise-container");
const expertiseList = [
  "Web Developer",
  "Software Engineer",
  "App Developer",
  "Full Stack Developer",
];
let currentIndex = 0;

setInterval(() => {
  expertiseContainer.textContent = expertiseList[currentIndex];
  currentIndex = (currentIndex + 1) % expertiseList.length;
}, 2500);

// PopUp Blog Image *******************************************

const createPopup = () => {
  const popupHTML = `
                              <div class="popup-container" data-popup>
                                <div class="popup-content">
                                  <button class="popup-close-btn" data-popup-close>&times;</button>
                                  <div class="slider">
                                    <button class="slider-prev" data-slider-prev>&#10094;</button>
                                    <div class="slider-wrapper">
                                      <div class="slider-images"></div>
                                    </div>
                                    <button class="slider-next" data-slider-next>&#10095;</button>
                                  </div>
                                  <div class="popup-text" data-popup-text></div>
                                  <p class="popup-date" data-popup-date></p>
                                </div>
                              </div>
                            `;
  document.body.insertAdjacentHTML("beforeend", popupHTML);
};

// Initialize popup and slider functionality
const initPopupAndSlider = () => {
  document.querySelectorAll(".certification-post-item").forEach((item) => {
    item.addEventListener("click", function () {
      const popup = document.querySelector("[data-popup]");
      const sliderImages = popup.querySelector(".slider-images");
      const popupText = popup.querySelector("[data-popup-text]");
      const popupDate = popup.querySelector("[data-popup-date]");
      const images = Array.from(this.querySelectorAll("img"));
      const text = this.querySelector(".certification-text").innerHTML;
      const date = this.querySelector(".certification-meta time").textContent;
      for (let i = 0; i < images.length; i++) {
        const img = images[i];
        const imageHTML = `<img src="${img.src}" alt="${
          img.alt
        }" class="slider-image" style="${
          i === 0 ? "display: block;" : "display: none;"
        }">`;
        sliderImages.innerHTML += imageHTML;
      }

      popupText.innerHTML = text;
      popupDate.textContent = date;

      let currentIndex = 0;

      const updateSlider = () => {
        sliderImages.querySelectorAll(".slider-image").forEach((img, index) => {
          img.style.display = index === currentIndex ? "block" : "none";
        });
      };

      popup
        .querySelector("[data-slider-prev]")
        .addEventListener("click", () => {
          currentIndex =
            currentIndex > 0 ? currentIndex - 1 : images.length - 1;
          updateSlider();
        });

      popup
        .querySelector("[data-slider-next]")
        .addEventListener("click", () => {
          currentIndex =
            currentIndex < images.length - 1 ? currentIndex + 1 : 0;
          updateSlider();
        });

      popup
        .querySelector("[data-popup-close]")
        .addEventListener("click", () => {
          popup.style.display = "none";
        });

      popup.style.display = "flex";
      updateSlider();
    });
  });
};

// Create popup and initialize functionality on DOMContentLoaded
document.addEventListener("DOMContentLoaded", () => {
  createPopup();
  initPopupAndSlider();
});
