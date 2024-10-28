document.getElementById(
  "footer-text"
).innerHTML = `@${new Date().getFullYear()} Bryan's Café`;

document.getElementById("currentYear").textContent = new Date().getFullYear();
function toggleMenu() {
  const navLinks = document.querySelector(".nav-links");
  navLinks.classList.toggle("active");
}
