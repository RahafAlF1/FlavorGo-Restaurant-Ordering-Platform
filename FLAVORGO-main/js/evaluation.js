  const themeToggle = document.getElementById("theme-toggle");

  if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark-mode");
    themeToggle.src = "img/moon.png";
  }

  themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");

    if (document.body.classList.contains("dark-mode")) {
      localStorage.setItem("theme", "dark");
      themeToggle.src = "img/moon.png";
    } else {
      localStorage.setItem("theme", "light");
      themeToggle.src = "img/sun.png";
    }
  });

  let selectedImages = 0;
  const starButtons = document.querySelectorAll(".star-btn");

  function updateStars(value) {
    starButtons.forEach((star, index) => {
      if (index < value) {
        star.textContent = "★";
        star.classList.add("active");
      } else {
        star.textContent = "☆";
        star.classList.remove("active");
      }
    });
  }

  starButtons.forEach(button => {
    button.addEventListener("click", () => {
      const value = parseInt(button.dataset.value, 10);
      selectedImages = 1;
      localStorage.setItem("myRate", value + (value === 1 ? " Star" : " Stars"));
      updateStars(value);
    });
  });

  function checkSelection() {
    const selectElement = document.getElementById("restSelect");
    const restaurantName = selectElement.options[selectElement.selectedIndex].text;

    if (selectElement.value === "") {
      alert("you must choose a restaurant before submitting the form!");
      return false;
    } else if (selectedImages === 0) {
      alert("you must rate the restaurant before submitting the form !");
      return false;
    } else {
      alert("Thank you for your feedback!\nYour rating for restaurant " + restaurantName + " is " + localStorage.getItem("myRate"));
      window.location.href = "index.html";
      return false;
    }
  }

  document.getElementById("evaluationForm").addEventListener("submit", function (e) {
    e.preventDefault();
    checkSelection();
  });