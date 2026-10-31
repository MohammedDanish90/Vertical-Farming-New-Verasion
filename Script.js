
const page = document.body.dataset.page || "home";

const pages = [
  { id: "home", label: "Home", href: "index.html" },
  { id: "technology", label: "Technology", href: "technology.html" },
  { id: "crops", label: "Crops & Benefits", href: "crops.html" },
  { id: "dashboard", label: "Dashboard", href: "dashboard.html" }
];

const header = document.getElementById("site-header");

if (header) {
  header.innerHTML = `
    <nav class="site-nav">
      <a class="logo" href="index.html">Vertical<span>Grow.</span></a>
      <button class="menu-toggle" id="menu-toggle"
        aria-label="Open navigation" aria-expanded="false">☰</button>
      <div class="nav-links" id="nav-links">
        ${pages.map(item => `
          <a href="${item.href}"
            class="${page === item.id ? "active" : ""}"
            ${page === item.id ? 'aria-current="page"' : ""}>
            ${item.label}
          </a>
        `).join("")}
        <a class="btn" href="dashboard.html#contact">Get Started ↗</a>
      </div>
    </nav>
  `;

  const menuButton = document.getElementById("menu-toggle");
  const navLinks = document.getElementById("nav-links");

  menuButton.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");
    menuButton.setAttribute("aria-expanded", String(isOpen));
    menuButton.textContent = isOpen ? "✕" : "☰";
  });

  navLinks.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
      menuButton.setAttribute("aria-expanded", "false");
      menuButton.textContent = "☰";
    });
  });
}

const footer = document.getElementById("site-footer");

if (footer) {
  footer.innerHTML = `
    <footer class="site-footer">
      <a class="logo" href="index.html">Vertical<span>Grow.</span></a>
      <p>Growing a greener future, one layer at a time.</p>
      <p>© ${new Date().getFullYear()} VerticalGrow · Educational project</p>
    </footer>
  `;
}

// Dashboard demo values: these are simulated, not sensor readings.
const refreshButton = document.getElementById("refresh-btn");

if (refreshButton) {
  refreshButton.addEventListener("click", () => {
    document.getElementById("temp").textContent =
      (22 + Math.floor(Math.random() * 6)) + "°C";

    document.getElementById("humidity").textContent =
      (55 + Math.floor(Math.random() * 21)) + "%";

    document.getElementById("light").textContent =
      (60 + Math.floor(Math.random() * 36)) + "%";

    document.getElementById("refresh-note").textContent =
      "Demo values updated. No physical sensors are connected.";
  });
}

// Educational crop suggestion rules.
const cropForm = document.getElementById("crop-form");

if (cropForm) {
  cropForm.addEventListener("submit", event => {
    event.preventDefault();

    const method = document.getElementById("method").value;
    const space = document.getElementById("space").value;
    const goal = document.getElementById("goal").value;

    let crop = "Lettuce";
    let reason =
      "Lettuce is a common starting crop for hydroponic growing systems. Manage light, nutrients and temperature carefully.";

    if (goal === "herbs") {
      crop = "Basil & Herbs";
      reason =
        "Herbs may suit your goal. Choose suitable varieties and provide appropriate light, airflow and nutrients.";
    } else if (goal === "quick") {
      crop = "Microgreens";
      reason =
        "Microgreens are harvested young and can have short growing cycles. Actual timing depends on the variety and conditions.";
    } else if (method === "soil") {
      crop = space === "small" ? "Microgreens" : "Leafy Greens";
      reason =
        "These can be practical options for soil-based growing. Choose containers, light and varieties suited to your available space.";
    } else if (method === "aeroponics") {
      crop = "Leafy Greens";
      reason =
        "Some leafy greens can be grown aeroponically, but the system needs reliable mist delivery and careful monitoring.";
    }

    document.getElementById("crop-result").textContent = crop;
    document.getElementById("crop-reason").textContent = reason;
    document.getElementById("recommendation").hidden = false;
    document.getElementById("recommendation").scrollIntoView({
      behavior: "smooth",
      block: "nearest"
    });
  });
}

// Contact form demo. It does not transmit or save personal information.
const contactForm = document.getElementById("contact-form");

if (contactForm) {
  contactForm.addEventListener("submit", event => {
    event.preventDefault();

    if (!contactForm.reportValidity()) return;

    document.getElementById("contact-note").textContent =
      "Demo successful! The form works, but no enquiry was sent. Connect a backend to receive real submissions.";

    contactForm.reset();
  });
}
