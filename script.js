// Replace your existing JavaScript with this updated version
function toggleMenu(event) {
  const menu = document.querySelector(".menu-links");
  const icon = document.querySelector(".hamburger-icon");

  if (event.target.id === "dark-mode-toggle") {
    const body = document.body;
    body.classList.toggle("dark-mode");
    const currentTheme = body.classList.contains("dark-mode") ? "dark" : "light";
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
      const activePortfolio = document.querySelector(".portfolio-content.active");
      const targetSection = activePortfolio.querySelector(targetId);

      if (targetSection) {
        targetSection.scrollIntoView({ behavior: "smooth" });
      }
      
      // Close mobile menu if open
      const menu = document.querySelector(".menu-links");
      const icon = document.querySelector(".hamburger-icon");
      if (menu.classList.contains("open")) {
        menu.classList.remove("open");
        icon.classList.remove("open");
      }
    });
  });

  // Handle arrow navigation
  document.querySelectorAll(".icon.arrow").forEach((arrow) => {
    arrow.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("onclick").match(/location\.href='\.\/(.*?)'/)[1];
      const activePortfolio = document.querySelector(".portfolio-content.active");
      const targetSection = activePortfolio.querySelector(targetId);

      if (targetSection) {
        targetSection.scrollIntoView({ behavior: "smooth" });
      }
    });
  });
}

document.addEventListener('DOMContentLoaded', function() {
  const tabs = document.querySelectorAll('.wrap input[type="radio"]');
  const developerContent = document.getElementById('developer-portfolio');
  const editorContent = document.getElementById('editor-portfolio');
  
  // Initialize the first tab as active
  developerContent.classList.add('active');
  
  tabs.forEach(tab => {
    tab.addEventListener('change', function() {
      // Get the currently active content
      const currentActive = document.querySelector('.portfolio-content.active');
      
      if (this.id === 'rd-1') { // Switching to Developer tab
        // Set up transition classes
        currentActive.classList.add('fade-right');
        developerContent.classList.add('fade-left');
        
        // Show the new content before animation
        developerContent.classList.add('active');
        developerContent.style.opacity = '0';
        
        // Trigger the animation
        setTimeout(() => {
          currentActive.classList.remove('active');
          developerContent.classList.remove('fade-left');
          developerContent.style.opacity = '1';
        }, 10);
      } else { // Switching to Editor tab
        // Set up transition classes
        currentActive.classList.add('fade-left');
        editorContent.classList.add('fade-right');
        
        // Show the new content before animation
        editorContent.classList.add('active');
        editorContent.style.opacity = '0';
        
        // Trigger the animation
        setTimeout(() => {
          currentActive.classList.remove('active');
          editorContent.classList.remove('fade-right');
          editorContent.style.opacity = '1';
        }, 10);
      }
      
      // Reinitialize navigation for the new active content
      setTimeout(handleAnchorLinks, 300);
    });
  });
  
  // Initialize navigation
  handleAnchorLinks();
});

const toggles = document.querySelectorAll("#dark-mode-toggle, #dark-mode-toggle-mobile");
const body = document.body;

// Apply saved theme preference
const isDarkMode = localStorage.getItem("theme") === "dark";
body.classList.toggle("dark-mode", isDarkMode);
toggles.forEach(toggle => toggle.textContent = isDarkMode ? "☀️" : "🌙");

// Toggle dark mode with animation
const toggleDarkMode = () => {
  const isDarkMode = body.classList.toggle("dark-mode");
  localStorage.setItem("theme", isDarkMode ? "dark" : "light");
  toggles.forEach(toggle => toggle.textContent = isDarkMode ? "☀️" : "🌙");
};

// Add event listeners to all toggles
toggles.forEach(toggle => toggle.addEventListener("click", toggleDarkMode));

