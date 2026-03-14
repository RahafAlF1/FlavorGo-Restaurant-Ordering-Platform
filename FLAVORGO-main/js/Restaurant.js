  /* Theme toggle */
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

  /* Quantity buttons */
  document.querySelectorAll(".meal-card").forEach(card => {
    const minusBtn = card.querySelector(".minus");
    const plusBtn = card.querySelector(".plus");
    const input = card.querySelector(".quantity-input");

    minusBtn.addEventListener("click", () => {
      let value = parseInt(input.value, 10);
      if (value > 1) input.value = value - 1;
    });

    plusBtn.addEventListener("click", () => {
      let value = parseInt(input.value, 10);
      input.value = value + 1;
    });
  });

  /* Add to cart */
  document.querySelectorAll(".meal-card").forEach(card => {
    const addButton = card.querySelector(".add-to-cart-button");

    addButton.addEventListener("click", () => {
      const name = card.dataset.name;
      const price = parseFloat(card.dataset.price);
      const quantity = parseInt(card.querySelector(".quantity-input").value, 10);
      const image = card.querySelector(".meal-image-wrap img").getAttribute("src");

      let cart = JSON.parse(localStorage.getItem("cart")) || [];

      const existingItem = cart.find(item => item.name === name);

      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        cart.push({
          name: name,
          price: price,
          quantity: quantity,
          image: image
        });
      }

      localStorage.setItem("cart", JSON.stringify(cart));
    });
  });

  /* Sort meals */
  const sortSelect = document.getElementById("sortSelect");

  sortSelect.addEventListener("change", function () {
    const mealGrids = document.querySelectorAll(".meal-grid");

    mealGrids.forEach(grid => {
      const cards = Array.from(grid.querySelectorAll(".meal-card"));

      if (this.value === "nameAsc") {
        cards.sort((a, b) => a.dataset.name.localeCompare(b.dataset.name));
      } else if (this.value === "nameDesc") {
        cards.sort((a, b) => b.dataset.name.localeCompare(a.dataset.name));
      } else if (this.value === "price") {
        cards.sort((a, b) => parseFloat(a.dataset.price) - parseFloat(b.dataset.price));
      }

      cards.forEach(card => grid.appendChild(card));
    });
  });


