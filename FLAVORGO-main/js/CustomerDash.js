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



    // More button 
    const moreButton = document.getElementById("moreButton");
    const extraRestaurants = document.querySelectorAll(".extra-restaurant");
    let expanded = false;

    moreButton.addEventListener("click", () => {
      expanded = !expanded;

      extraRestaurants.forEach(card => {
        card.style.display = expanded ? "flex" : "none";
      });

      moreButton.textContent = expanded ? "Show Less" : "More";
    });