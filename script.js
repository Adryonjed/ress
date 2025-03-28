function toggleMenu(event) {
  const menuLinks = document.querySelectorAll('.menu-links a');
  const activePortfolio = document.querySelector('.portfolio-content.active');

  // Ensure the active portfolio exists
  if (!activePortfolio) return;

  // Add event listeners to menu links
  menuLinks.forEach((link) => {
    const sectionId = link.getAttribute('data-section'); // Use the custom data-section attribute
    if (sectionId) {
      const targetSection = activePortfolio.querySelector(sectionId);
      if (targetSection) {
        // Scroll to the target section within the active portfolio
        link.addEventListener('click', (e) => {
          e.preventDefault(); // Prevent default anchor behavior
          targetSection.scrollIntoView({ behavior: 'smooth' });
        });
      }
    }
  });

  // Toggle the menu visibility (for mobile)
  const menu = document.querySelector('.menu-links');
  menu.classList.toggle('open');
  if (event) event.stopPropagation();
}

// Restore dark mode based on localStorage preference
document.addEventListener('DOMContentLoaded', () => {
  const tabs = document.querySelectorAll('.tab-btn');
  const contents = document.querySelectorAll('.portfolio-content');

  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => {
      // Add fade-out class to the currently active content
      const activeContent = document.querySelector('.portfolio-content.active');
      if (activeContent) {
        activeContent.classList.add('fade-out');

        // Wait for the fade-out animation to complete before switching
        setTimeout(() => {
          activeContent.classList.remove('active', 'fade-out');
          contents[index].classList.add('active');
        }, 300); // Match this duration to your CSS transition time
      } else {
        // If no active content, directly activate the new one
        contents[index].classList.add('active');
      }

      // Update active tab button
      tabs.forEach((t) => t.classList.remove('active'));
      tab.classList.add('active');
    });
  });
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




