function toggleMenu(event) {
  const menu = document.querySelector(".menu-links");
  const icon = document.querySelector(".hamburger-icon");

  if (event.target.id === "dark-mode-toggle") {
    const body = document.body;
    body.classList.toggle("dark-mode");
    const currentTheme = body.classList.contains("dark-mode")
      ? "dark"
      : "light";
    localStorage.setItem("theme", currentTheme);
    return;
  }

  menu.classList.toggle("open");
  icon.classList.toggle("open");
}

function handleAnchorLinks() {
  // Handle regular anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href");
      const activePortfolio = document.querySelector(
        ".portfolio-content.active"
      );
      const targetSection = activePortfolio.querySelector(targetId);

      if (targetSection) {
        targetSection.scrollIntoView({ behavior: "smooth" });
      }
    });
  });

  // Handle arrow navigation
  document.querySelectorAll(".icon.arrow").forEach((arrow) => {
    arrow.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("onclick").match(
        /location\.href='\.\/(.*?)'/
      )[1];
      const activePortfolio = document.querySelector(
        ".portfolio-content.active"
      );
      const targetSection = activePortfolio.querySelector(targetId);

      if (targetSection) {
        targetSection.scrollIntoView({ behavior: "smooth" });
      }
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") document.body.classList.add("dark-mode");

  const tabs = document.querySelectorAll(".tab-btn");
  const contents = document.querySelectorAll(".portfolio-content");

  handleAnchorLinks();

  tabs.forEach((tab, index) => {
    tab.addEventListener("click", () => {
      const activeContent = document.querySelector(".portfolio-content.active");
      if (activeContent) {
        activeContent.classList.add("fade-out");
        setTimeout(() => {
          activeContent.classList.remove("active", "fade-out");
          contents[index].classList.add("active");
          handleAnchorLinks(); // Reinitialize after content switch
        }, 300);
      } else {
        contents[index].classList.add("active");
      }

      tabs.forEach((t) => t.classList.remove("active"));
      tab.classList.add("active");
    });
  });
});
