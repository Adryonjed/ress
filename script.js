function toggleMenu(event) {
  const menu = document.querySelector(".menu-links");
  const icon = document.querySelector(".hamburger-icon");

  // Check if the event is triggered by the dark mode toggle button
  if (event.target.id === "dark-mode-toggle") {
    const body = document.body;

    // Toggle dark mode class
    body.classList.toggle("dark-mode");

    // Save the user's preference to localStorage
    const currentTheme = body.classList.contains("dark-mode")
      ? "dark"
      : "light";
    localStorage.setItem("theme", currentTheme);

    return; // Stop further execution to avoid affecting the menu
  }

  // Toggle menu for other triggers
  menu.classList.toggle("open");
  icon.classList.toggle("open");
}

// Restore dark mode based on localStorage preference
document.addEventListener("DOMContentLoaded", () => {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    document.body.classList.add("dark-mode");
  }
});

function switchPortfolio(portfolioType) {
  // Get the currently active portfolio content
  const activePortfolio = document.querySelector(".portfolio-content.active");

  // If there's an active portfolio, apply fade-out transition and move left
  if (activePortfolio) {
    activePortfolio.classList.remove("active");
    activePortfolio.classList.add("fade-out");
  }

  // Remove active class from all buttons
  const buttons = document.querySelectorAll(".tab-btn");
  buttons.forEach((btn) => btn.classList.remove("active"));

  // Apply transition to the selected tab
  const selectedButton = document.querySelector(
    `.tab-btn[onclick="switchPortfolio('${portfolioType}')"]`
  );
  selectedButton.classList.add("active");

  // Show selected portfolio with fade-in effect and left to right transition
  const selectedPortfolio = document.getElementById(
    `${portfolioType}-portfolio`
  );

  // Reset the content to trigger the transition again
  selectedPortfolio.classList.remove("active");
  setTimeout(() => {
    selectedPortfolio.classList.add("active");
  }, 10); // Adding a small delay to allow the class removal to take effect

  // Remove the fade-out class once the previous content is fully hidden
  setTimeout(() => {
    const fadeOutPortfolios = document.querySelectorAll(
      ".portfolio-content.fade-out"
    );
    fadeOutPortfolios.forEach((portfolio) =>
      portfolio.classList.remove("fade-out")
    );
  }, 300); // Matches the fade transition duration
}




