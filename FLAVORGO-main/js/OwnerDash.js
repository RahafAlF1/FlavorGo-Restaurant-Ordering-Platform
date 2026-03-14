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

    // Delete meal logic
    function deleteMeal(button) {
      const mealCard = button.closest(".meal-card");
      if (mealCard) {
        mealCard.remove();
      }
    }
