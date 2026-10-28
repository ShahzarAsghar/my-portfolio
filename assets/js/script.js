"use strict";

// element toggle function
const elementToggleFunc = function (elem) {
  if (!elem) return;
  elem.classList.toggle("active");
};

// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
if (sidebarBtn && sidebar) {
  sidebarBtn.addEventListener("click", function () {
    elementToggleFunc(sidebar);
  });
}

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
  if (!modalContainer || !overlay) return;
  modalContainer.classList.toggle("active");
  overlay.classList.toggle("active");
};

// add click event to all modal items
for (let i = 0; i < testimonialsItem.length; i++) {
  testimonialsItem[i].addEventListener("click", function () {
    if (!modalImg || !modalTitle || !modalText) return;
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

if (window.emailjs?.init) {
  window.emailjs.init("QrluvtrVsO1J6jKu_");
}

const emailForm = document.querySelector(".form");
if (emailForm && window.emailjs?.sendForm) {
  emailForm.addEventListener("submit", function (event) {
    event.preventDefault();

    // Use EmailJS to send form data
    window.emailjs.sendForm("service_xp7xtdm", "template_d8ptr1h", this).then(
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
}
// add click event to modal close button
if (modalCloseBtn) modalCloseBtn.addEventListener("click", testimonialsModalFunc);
if (overlay) overlay.addEventListener("click", testimonialsModalFunc);

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
    if (selectValue) selectValue.innerText = selectedValue;
    if (selectCat) selectCat.innerText = selectedValue;
    if (i >= 0 && i <= 4) {
      if (select[0]) elementToggleFunc(select[0]);
    } else {
      if (select[1]) elementToggleFunc(select[1]);
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
    if (selectValue) selectValue.innerText = this.innerText;
    filterFunc(selectedValue);

    if (lastClickedBtn) lastClickedBtn.classList.remove("active");
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
    if (!form || !formBtn) return;
    if (form.checkValidity()) formBtn.removeAttribute("disabled");
    else formBtn.setAttribute("disabled", "");
  });
}

// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

const activatePage = (pageName) => {
  if (!pages.length || !navigationLinks.length) return;

  for (let j = 0; j < pages.length; j++) {
    if (pageName === pages[j].dataset.page) {
      pages[j].classList.add("active");
      navigationLinks[j]?.classList.add("active");
      window.scrollTo(0, 0);
    } else {
      pages[j].classList.remove("active");
      navigationLinks[j]?.classList.remove("active");
    }
  }

  filterFunc("all");
};

// add event to all nav link
// Add event listener to navigation links
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {
    const pageName = (this.innerHTML || "").toLowerCase().trim();
    activatePage(pageName);
    try {
      if (pageName) window.history.replaceState(null, "", `#${pageName}`);
    } catch (_) {}
  });
}

// POP-UP on Certification Portion**************

const certItems = document.querySelectorAll(".cert-item a");

if (certItems.length) {
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
      const imgSrc = this.querySelector("img")?.src || "";
      const title = this.querySelector(".cert-title")?.textContent || "";
      const categoryDate = this.querySelector(".cert-category")?.textContent || "";

      if (popupImg) popupImg.src = imgSrc;
      if (popupTitle) popupTitle.textContent = title;
      if (popupCategoryDate) popupCategoryDate.textContent = categoryDate;
      popup.style.display = "block";
    });
  });

  // Hide popup on close click
  if (closeBtn) {
    closeBtn.addEventListener("click", function () {
      popup.style.display = "none";
    });
  }
}

// Transition on expertise ***********************

const expertiseContainer = document.querySelector(".expertise-container");
const expertiseList = [
  "Full Stack Developer",
  "Mobile App Developer",
  "Shopify Developer",
  "WordPress Developer",
  "Software Engineer",
];
let currentIndex = 0;

let expertiseIntervalId = null;

const initExpertiseRotation = () => {
  if (expertiseIntervalId) return;
  const container = document.querySelector(".expertise-container");
  if (!container) return;

  expertiseIntervalId = window.setInterval(() => {
    container.textContent = expertiseList[currentIndex];
    currentIndex = (currentIndex + 1) % expertiseList.length;
  }, 1200);
};

initExpertiseRotation();
document.addEventListener("sohail:sidebar-hydrated", initExpertiseRotation);

/* ===================== BLOG POPUP (FINAL FIX) ===================== */

const createBlogPopup = () => {
  if (document.querySelector("[data-popup]")) return;

  document.body.insertAdjacentHTML(
    "beforeend",
    `
    <div class="popup-container" data-popup style="display:none">
      <div class="popup-content">
        <button class="popup-close-btn">&times;</button>

        <div class="slider">
          <button class="slider-prev">&#10094;</button>
          <div class="slider-images"></div>
          <button class="slider-next">&#10095;</button>
        </div>

        <div class="popup-text"></div>
        <p class="popup-date"></p>
      </div>
    </div>
    `
  );
};

let sliderIndex = 0;

const initBlogPopup = () => {
  const popup = document.querySelector("[data-popup]");
  if (!popup) return;
  const sliderBox = popup.querySelector(".slider-images");
  const textBox = popup.querySelector(".popup-text");
  const dateBox = popup.querySelector(".popup-date");
  const prevBtn = popup.querySelector(".slider-prev");
  const nextBtn = popup.querySelector(".slider-next");
  const closeBtn = popup.querySelector(".popup-close-btn");

  const updateSlider = () => {
    sliderBox.querySelectorAll("img").forEach((img, i) => {
      img.style.display = i === sliderIndex ? "block" : "none";
    });
  };

  prevBtn.onclick = () => {
    const imgs = sliderBox.querySelectorAll("img");
    if (!imgs.length) return;
    sliderIndex = sliderIndex > 0 ? sliderIndex - 1 : imgs.length - 1;
    updateSlider();
  };

  nextBtn.onclick = () => {
    const imgs = sliderBox.querySelectorAll("img");
    if (!imgs.length) return;
    sliderIndex = sliderIndex < imgs.length - 1 ? sliderIndex + 1 : 0;
    updateSlider();
  };

  closeBtn.onclick = () => {
    popup.style.display = "none";
  };

  /* 🔥 CLICK MUST BE ON <a> TAG */
  document.querySelectorAll(".certification-post-item a").forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();       // 🚨 VERY IMPORTANT
      e.stopPropagation();      // 🚨 VERY IMPORTANT

      const item = link.closest(".certification-post-item");

      const images = item.querySelectorAll("img");
      const text = item.querySelector(".certification-text").innerHTML;
      const date = item.querySelector(".certification-meta time").textContent;

      // RESET OLD DATA
      sliderBox.innerHTML = "";
      sliderIndex = 0;

      images.forEach((img, i) => {
        sliderBox.insertAdjacentHTML(
          "beforeend",
          `<img src="${img.src}" alt="${img.alt}" style="display:${i === 0 ? "block" : "none"}">`
        );
      });

      textBox.innerHTML = text;
      dateBox.textContent = date;

      popup.style.display = "flex";
      updateSlider();
    });
  });
};

document.addEventListener("DOMContentLoaded", () => {
  // LinkedIn follow gate (note: can't truly verify follow; this unlocks on click)
  const FOLLOW_GATE_STORAGE_KEY = "sohail_portfolio_li_followed_v1";

  const initFollowGate = () => {
    const gate = document.querySelector("[data-follow-gate]");
    if (!gate) return;

    const followLink = gate.querySelector("[data-follow-link]");

    const safeStorageGet = (key) => {
      try {
        return window.localStorage.getItem(key);
      } catch (_) {
        return null;
      }
    };

    const safeStorageSet = (key, value) => {
      try {
        window.localStorage.setItem(key, value);
        return true;
      } catch (_) {
        return false;
      }
    };

    const unlock = () => {
      gate.classList.remove("active");
      gate.setAttribute("aria-hidden", "true");
      document.documentElement.classList.remove("follow-gate-lock");
      document.body.classList.remove("follow-gate-lock");
    };

    const shouldShow = safeStorageGet(FOLLOW_GATE_STORAGE_KEY) !== "1";
    if (!shouldShow) {
      unlock();
      return;
    }

    gate.classList.add("active");
    gate.setAttribute("aria-hidden", "false");
    document.documentElement.classList.add("follow-gate-lock");
    document.body.classList.add("follow-gate-lock");

    if (followLink) {
      followLink.addEventListener("click", () => {
        safeStorageSet(FOLLOW_GATE_STORAGE_KEY, "1");
        // Small delay so the click is registered before hiding.
        window.setTimeout(unlock, 150);
      });

      // Focus for keyboard users.
      followLink.focus();
    }
  };

  // Open specific section via hash (e.g. /#portfolio)
  try {
    const pageName = (window.location.hash || "").replace("#", "").trim().toLowerCase();
    if (pageName) activatePage(pageName);
  } catch (_) {}

  initFollowGate();

  const hasCertPosts = !!document.querySelector(".certification-post-item");
  if (hasCertPosts) {
    createBlogPopup();
    initBlogPopup();
  }
});
