"use strict";

const getProjectSlug = () => {
  const params = new URLSearchParams(window.location.search);
  const fromQuery = (params.get("p") || "").trim();
  if (fromQuery) return fromQuery;

  const attr =
    document.body?.getAttribute("data-project-slug") ||
    document.documentElement?.getAttribute("data-project-slug") ||
    "";
  if (attr.trim()) return attr.trim();

  return "";
};

const byId = (id) => document.getElementById(id);

const siteRootUrl = new URL("../../", window.location.href);

const resolveMaybeRelativeUrl = (value) => {
  const url = (value || "").trim();
  if (!url) return "";

  if (
    url.startsWith("http://") ||
    url.startsWith("https://") ||
    url.startsWith("mailto:") ||
    url.startsWith("tel:") ||
    url.startsWith("data:")
  ) {
    return url;
  }

  // Treat `./assets/...` as "from site root"
  const normalized = url.startsWith("./") ? url.slice(2) : url;
  return new URL(normalized, siteRootUrl).toString();
};

const rewriteAssetUrls = (rootEl) => {
  if (!rootEl) return;

  const rewrite = (value) => {
    const v = (value || "").trim();
    if (!v) return v;
    if (v.startsWith("http://") || v.startsWith("https://")) return v;
    if (v.startsWith("mailto:") || v.startsWith("tel:") || v.startsWith("data:"))
      return v;

    if (v.startsWith("./assets/")) return `../../${v.slice(2)}`;
    if (v.startsWith("assets/")) return `../../${v}`;
    if (v.startsWith("/assets/")) return `../..${v}`;
    return v;
  };

  rootEl.querySelectorAll("[src]").forEach((el) => {
    el.setAttribute("src", rewrite(el.getAttribute("src")));
  });
  rootEl.querySelectorAll("[href]").forEach((el) => {
    el.setAttribute("href", rewrite(el.getAttribute("href")));
  });
};

const injectSidebarFromHome = async () => {
  const placeholder = document.getElementById("project-sidebar");
  if (!placeholder) return;
  if (placeholder.dataset.hydrated === "1") return;

  try {
    const res = await fetch("../../index.html", { cache: "force-cache" });
    if (!res.ok) return;
    const text = await res.text();
    const doc = new DOMParser().parseFromString(text, "text/html");
    const sidebar = doc.querySelector("aside.sidebar[data-sidebar]");
    if (!sidebar) return;

    rewriteAssetUrls(sidebar);
    placeholder.className = sidebar.className;
    placeholder.setAttribute("data-sidebar", "");
    placeholder.innerHTML = sidebar.innerHTML;
    placeholder.dataset.hydrated = "1";
    try {
      document.dispatchEvent(new Event("sohail:sidebar-hydrated"));
    } catch (_) {}
  } catch (_) {
    // Ignore: project page still works without sidebar.
  }
};

const setText = (el, text) => {
  if (!el) return;
  el.textContent = text || "";
};

const setLink = (el, href, { download = false } = {}) => {
  if (!el) return;
  if (!href) {
    el.style.display = "none";
    return;
  }
  el.style.display = "";
  el.setAttribute("href", href);
  if (download) el.setAttribute("download", "");
};

const normalizeCategory = (category) => (category || "").trim().toLowerCase();

const buildDefaults = ({ title, category }) => {
  const cat = normalizeCategory(category);

  if (cat.includes("shopify")) {
    return {
      overview: `Shopify store work for ${title} focused on clean UI, performance, and conversion-friendly pages.`,
      sections: [
        {
          title: "About",
          body: [
            `${title} is a Shopify storefront project focused on clarity, speed, and a conversion-friendly shopping experience.`,
          ],
        },
        {
          title: "The Problem",
          body: [
            "The existing storefront needed a more consistent visual identity, better mobile UX, and cleaner product/collection browsing.",
            "Performance and layout consistency were also key priorities for reducing bounce and improving conversions.",
          ],
        },
        {
          title: "The Solution",
          body: [
            "Implemented structured theme sections and improved key templates (home, collections, product pages).",
            "Optimized assets and UI patterns for faster load times and a smoother mobile checkout flow.",
          ],
        },
        {
          title: "Results & Outcomes",
          body: [
            "A more professional storefront experience with improved responsiveness and a stronger foundation for ongoing marketing and sales growth.",
          ],
        },
      ],
      highlights: [
        "Theme customization and reusable sections",
        "Mobile-first, fast storefront UI",
        "Product/collection page improvements",
        "Speed and UX tweaks",
      ],
      features: [
        "Homepage sections (hero, featured products, collections)",
        "Product page layout improvements",
        "Cart and checkout UX enhancements",
        "Performance-oriented assets",
      ],
      tech: ["Shopify", "Liquid", "HTML", "CSS", "JavaScript"],
    };
  }

  if (cat.includes("wordpress")) {
    return {
      overview: `WordPress website work for ${title} with a modern layout and easy content editing.`,
      sections: [
        {
          title: "About",
          body: [
            `${title} is a WordPress website project built for a clean user experience and easy content updates.`,
          ],
        },
        {
          title: "The Problem",
          body: [
            "The site required a modern layout, better mobile experience, and a structure that supports SEO-friendly pages and content.",
          ],
        },
        {
          title: "The Solution",
          body: [
            "Created a responsive page structure with reusable sections and consistent styling.",
            "Improved content layout and ensured key pages guide users to clear calls-to-action.",
          ],
        },
        {
          title: "Results & Outcomes",
          body: [
            "A professional web presence with improved usability, maintainability, and a stronger base for growth.",
          ],
        },
      ],
      highlights: [
        "Responsive layout for all devices",
        "Editable pages and sections",
        "Clean UI and consistent styling",
        "Basic SEO-ready structure",
      ],
      features: [
        "Custom pages (Home, About, Services, Contact)",
        "Reusable sections/components",
        "Contact/lead form page",
        "Basic performance optimizations",
      ],
      tech: ["WordPress", "HTML", "CSS", "JavaScript"],
    };
  }

  if (cat.includes("app")) {
    return {
      overview: `Mobile app project: ${title}. Add your APK link and screenshots in the project data file.`,
      sections: [
        {
          title: "About",
          body: [
            `${title} is a mobile app project designed for smooth navigation, clear UI, and a reliable user experience.`,
          ],
        },
        {
          title: "The Problem",
          body: [
            "The goal was to build a clean, user-friendly app experience that works well across different devices.",
          ],
        },
        {
          title: "The Solution",
          body: [
            "Implemented a structured screen flow with reusable components and consistent UI patterns.",
            "Prepared the project for distribution with an APK download link and a gallery of screenshots.",
          ],
        },
        {
          title: "Results & Outcomes",
          body: [
            "A scalable app foundation ready for iterative improvements and broader release.",
          ],
        },
      ],
      highlights: [
        "App UI with smooth navigation",
        "Reusable components/screens",
        "Optimized layout for multiple devices",
        "Ready for APK distribution link",
      ],
      features: [
        "Onboarding / main screens",
        "Core workflow screens",
        "Error/loading states",
        "APK download button support",
      ],
      tech: ["Mobile App", "Android"],
    };
  }

  return {
    overview: `Web project for ${title} with a responsive layout and modern UI focused on clarity and usability.`,
    sections: [
      {
        title: "About",
        body: [
          `${title} is a web project built with a focus on clean presentation, responsive layout, and a professional user experience.`,
        ],
      },
      {
        title: "The Problem",
        body: [
          "The project required a modern UI, improved mobile responsiveness, and a structure that clearly communicates the service/value to visitors.",
        ],
      },
      {
        title: "The Solution",
        body: [
          "Designed and implemented a responsive layout with clear navigation and user-friendly content sections.",
          "Optimized assets and UI patterns to keep the site fast and consistent across devices.",
        ],
      },
      {
        title: "Results & Outcomes",
        body: [
          "A strong, professional web presence with improved usability and a solid base for SEO and lead generation.",
        ],
      },
    ],
    highlights: [
      "Responsive, mobile-first UI",
      "Clean layout and consistent design",
      "Performance-focused assets",
      "Contact/lead-friendly experience",
    ],
    features: [
      "Core pages/sections (Home, About/Services, Contact)",
      "Responsive navigation and layout",
      "SEO-friendly HTML structure",
      "Fast loading images",
    ],
    tech: ["HTML", "CSS", "JavaScript"],
  };
};

const normalizeProject = (project) => {
  const base = buildDefaults({
    title: project?.title || "Project",
    category: project?.category || "",
  });

  return {
    ...base,
    ...project,
    overview: (project?.overview || project?.summary || base.overview || "").trim(),
    sections:
      Array.isArray(project?.sections) && project.sections.length
        ? project.sections
        : base.sections || [],
    highlights:
      Array.isArray(project?.highlights) && project.highlights.length
        ? project.highlights
        : base.highlights,
    features:
      Array.isArray(project?.features) && project.features.length
        ? project.features
        : base.features,
    tech:
      Array.isArray(project?.tech) && project.tech.length ? project.tech : base.tech,
  };
};

const renderTags = (container, tags) => {
  if (!container) return;
  container.innerHTML = "";
  const list = Array.isArray(tags) ? tags.filter(Boolean) : [];
  if (!list.length) {
    container.parentElement?.classList.add("is-hidden");
    return;
  }
  container.parentElement?.classList.remove("is-hidden");
  for (const tag of list) {
    const li = document.createElement("li");
    li.className = "project-detail__tag";
    li.textContent = tag;
    container.appendChild(li);
  }
};

const renderList = (container, items) => {
  if (!container) return;
  container.innerHTML = "";
  const list = Array.isArray(items) ? items.filter(Boolean) : [];
  if (!list.length) {
    container.parentElement?.classList.add("is-hidden");
    return;
  }
  container.parentElement?.classList.remove("is-hidden");

  for (const text of list) {
    const li = document.createElement("li");
    li.textContent = text;
    container.appendChild(li);
  }
};

const renderBlocks = (container, blocks) => {
  if (!container) return;
  container.innerHTML = "";
  const list = Array.isArray(blocks) ? blocks.filter(Boolean) : [];

  if (!list.length) {
    container.parentElement?.classList.add("is-hidden");
    return;
  }
  container.parentElement?.classList.remove("is-hidden");

  for (const block of list) {
    const title = (block.title || "").trim();
    const body = block.body;
    const lines = Array.isArray(body)
      ? body.filter(Boolean)
      : typeof body === "string"
        ? [body]
        : [];

    if (!title && !lines.length) continue;

    const section = document.createElement("section");
    section.className = "project-detail__block";

    if (title) {
      const h = document.createElement("h4");
      h.className = "h4 project-detail__block-title";
      h.textContent = title;
      section.appendChild(h);
    }

    for (const line of lines) {
      const p = document.createElement("p");
      p.textContent = line;
      section.appendChild(p);
    }

    container.appendChild(section);
  }
};

const readGalleryItems = (gallery) => {
  const raw = Array.isArray(gallery) ? gallery : [];
  return raw
    .filter(Boolean)
    .map((item) => {
      if (typeof item === "string")
        return { src: resolveMaybeRelativeUrl(item), caption: "" };
      if (item && typeof item === "object" && item.src) {
        return {
          src: resolveMaybeRelativeUrl(item.src),
          caption: item.caption || "",
        };
      }
      return null;
    })
    .filter(Boolean);
};

let lightboxState = null;

const ensureLightbox = () => {
  const existing = document.querySelector("[data-project-lightbox]");
  if (existing) return existing;

  const root = document.createElement("div");
  root.className = "project-lightbox";
  root.setAttribute("data-project-lightbox", "true");
  root.setAttribute("aria-hidden", "true");
  root.innerHTML = `
    <div class="project-lightbox__backdrop" data-project-lightbox-close></div>
    <div class="project-lightbox__dialog" role="dialog" aria-modal="true" aria-label="Image preview">
      <button class="project-lightbox__close" type="button" data-project-lightbox-close aria-label="Close">×</button>
      <button class="project-lightbox__nav project-lightbox__nav--prev" type="button" data-project-lightbox-prev aria-label="Previous">‹</button>
      <button class="project-lightbox__nav project-lightbox__nav--next" type="button" data-project-lightbox-next aria-label="Next">›</button>
      <figure class="project-lightbox__figure">
        <img class="project-lightbox__img" alt="" />
        <figcaption class="project-lightbox__caption"></figcaption>
      </figure>
    </div>
  `;
  document.body.appendChild(root);

  const closeEls = root.querySelectorAll("[data-project-lightbox-close]");
  closeEls.forEach((el) =>
    el.addEventListener("click", () => {
      root.classList.remove("active");
      root.setAttribute("aria-hidden", "true");
      lightboxState = null;
    })
  );

  root
    .querySelector("[data-project-lightbox-prev]")
    ?.addEventListener("click", () => navigateLightbox(-1));
  root
    .querySelector("[data-project-lightbox-next]")
    ?.addEventListener("click", () => navigateLightbox(1));

  document.addEventListener("keydown", (e) => {
    const active = root.classList.contains("active");
    if (!active) return;
    if (e.key === "Escape") {
      root.classList.remove("active");
      root.setAttribute("aria-hidden", "true");
      lightboxState = null;
    } else if (e.key === "ArrowLeft") {
      navigateLightbox(-1);
    } else if (e.key === "ArrowRight") {
      navigateLightbox(1);
    }
  });

  return root;
};

const renderLightbox = () => {
  const root = ensureLightbox();
  if (!lightboxState) return;

  const { items, index, title } = lightboxState;
  const current = items[index];
  if (!current) return;

  const img = root.querySelector(".project-lightbox__img");
  const caption = root.querySelector(".project-lightbox__caption");
  if (img) {
    img.src = current.src;
    img.alt = title ? `${title} screenshot` : "Project screenshot";
  }
  if (caption) caption.textContent = current.caption || "";
};

const navigateLightbox = (delta) => {
  if (!lightboxState) return;
  const { items } = lightboxState;
  const nextIndex = (lightboxState.index + delta + items.length) % items.length;
  lightboxState = { ...lightboxState, index: nextIndex };
  renderLightbox();
};

const openLightbox = ({ items, index, title }) => {
  const root = ensureLightbox();
  lightboxState = { items, index, title };
  renderLightbox();
  root.classList.add("active");
  root.setAttribute("aria-hidden", "false");
};

const bindHeroPreview = ({ projectTitle, gallery }) => {
  const hero = byId("project-hero");
  const openBtn = byId("project-open-media");
  const media = byId("project-media");

  const items = readGalleryItems(gallery);
  if (!items.length) {
    if (openBtn) openBtn.style.display = "none";
    if (media) media.classList.add("is-hidden");
    return;
  }

  const open = () => openLightbox({ items, index: 0, title: projectTitle });
  if (hero) hero.addEventListener("click", open);
  if (openBtn) openBtn.addEventListener("click", open);
};

const renderGallery = (container, gallery, title) => {
  if (!container) return;
  container.innerHTML = "";
  const items = readGalleryItems(gallery);
  if (!items.length) {
    container.parentElement?.classList.add("is-hidden");
    return;
  }
  container.parentElement?.classList.remove("is-hidden");

  items.forEach((item, idx) => {
    const a = document.createElement("a");
    a.className = "project-detail__shot";
    a.href = item.src;
    a.rel = "noopener noreferrer";
    a.addEventListener("click", (e) => {
      e.preventDefault();
      openLightbox({ items, index: idx, title });
    });

    const img = document.createElement("img");
    img.loading = "lazy";
    img.src = item.src;
    img.alt = title ? `${title} screenshot` : "Project screenshot";

    a.appendChild(img);
    container.appendChild(a);
  });

  if (items.length < 2) {
    const placeholder = document.createElement("div");
    placeholder.className = "project-detail__shot project-detail__shot--placeholder";
    placeholder.innerHTML =
      "<strong>Add more photos</strong><span>Edit <code>assets/js/projects-data.js</code> and add more screenshots to <code>gallery</code>.</span>";
    container.appendChild(placeholder);
  }
};

const renderDescription = (container, project) => {
  if (!container) return;
  container.innerHTML = "";

  const overview = (project.overview || project.summary || "").trim();
  const details = Array.isArray(project.details) ? project.details : [];

  if (!overview && !details.length) {
    container.innerHTML =
      '<p>Add details in <code>assets/js/projects-data.js</code>.</p>';
    return;
  }

  if (overview) {
    const p = document.createElement("p");
    p.textContent = overview;
    container.appendChild(p);
  }

  for (const item of details.filter(Boolean)) {
    const p = document.createElement("p");
    p.textContent = item;
    container.appendChild(p);
  }
};

const renderProject = () => {
  const slug = getProjectSlug();
  const projects = Array.isArray(window.SOHAIL_PROJECTS)
    ? window.SOHAIL_PROJECTS
    : [];
  const rawProject = projects.find((p) => p?.slug === slug);
  const project = rawProject ? normalizeProject(rawProject) : null;

  if (!project) {
    setText(byId("project-title"), "Project not found");
    setText(
      byId("project-subtitle"),
      slug ? `No project found for slug: ${slug}` : "Missing project slug."
    );
    setLink(byId("project-live"), "");
    setLink(byId("project-github"), "");
    setLink(byId("project-apk"), "");
    renderList(byId("project-highlights"), []);
    renderList(byId("project-features"), []);
    renderTags(byId("project-tags"), []);
    renderGallery(byId("project-gallery"), [], "");
    renderDescription(byId("project-description"), { summary: "", details: [] });
    document.title = "Project • Not found";
    return;
  }

  // If this page is opened via `/projects/view/?p=<slug>`, keep the URL clean.
  try {
    const path = window.location.pathname || "";
    if (path.includes("/projects/view/") && slug) {
      window.history.replaceState(null, "", `../${slug}/`);
    }
  } catch (_) {
    // ignore
  }

  setText(byId("project-title"), project.title);
  setText(byId("project-subtitle"), project.category || "");

  const category = normalizeCategory(project.category);
  const isAppProject = category.includes("app");

  const liveBtn = byId("project-live");
  const githubBtn = byId("project-github");
  const apkBtn = byId("project-apk");

  // Web/Shopify/WordPress: show "Visit Website"
  if (!isAppProject) {
    setText(liveBtn, "Visit Website");
    setLink(liveBtn, project.liveUrl || "");

    // Hide APK for non-app projects
    setLink(apkBtn, "");
  } else {
    // App development: show "Download APK"
    setText(apkBtn, "Download APK");
    setLink(apkBtn, resolveMaybeRelativeUrl(project.apkUrl || ""), {
      download: true,
    });

    // Hide website link unless explicitly provided (optional for apps)
    setText(liveBtn, "Visit Website");
    setLink(liveBtn, project.liveUrl || "");
  }

  // GitHub link (optional)
  setText(githubBtn, "GitHub");
  setLink(githubBtn, project.githubUrl || "");

  renderBlocks(byId("project-sections"), project.sections || []);
  renderList(byId("project-highlights"), project.highlights || []);
  renderList(byId("project-features"), project.features || []);
  renderTags(byId("project-tags"), project.tech || []);
  renderGallery(byId("project-gallery"), project.gallery || [], project.title);
  renderDescription(byId("project-description"), project);

  const hero = byId("project-hero");
  if (hero) {
    const src =
      resolveMaybeRelativeUrl(project.thumbnail || "") ||
      resolveMaybeRelativeUrl(
        Array.isArray(project.gallery) && project.gallery.length
          ? project.gallery[0]?.src || project.gallery[0]
          : ""
      ) ||
      "";
    if (src) {
      hero.src = src;
      hero.alt = project.title || "Project";
      hero.style.display = "";
    } else {
      hero.style.display = "none";
    }
  }

  bindHeroPreview({ projectTitle: project.title || project.slug, gallery: project.gallery || [] });

  document.title = `Project • ${project.title || project.slug}`;
};

document.addEventListener("DOMContentLoaded", async () => {
  await injectSidebarFromHome();
  renderProject();
});
