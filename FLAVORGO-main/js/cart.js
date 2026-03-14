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

    const cartContent = document.getElementById("cartContent");
    const totalText = document.getElementById("Ctotal-price");
    const subtotalText = document.getElementById("subtotalText");
    const itemsCount = document.getElementById("itemsCount");
    const totalCount = document.getElementById("totalCount");
    const emptyCartButton = document.getElementById("emptyCartButton");

    function getCart() {
      return JSON.parse(localStorage.getItem("cart")) || [];
    }

    function saveCart(cart) {
      localStorage.setItem("cart", JSON.stringify(cart));
    }

    function formatPrice(value) {
      return `$${value.toFixed(2)}`;
    }

    function renderCart() {
      const cart = getCart();
      cartContent.innerHTML = "";

      if (cart.length === 0) {
        cartContent.innerHTML = `
          <div class="empty-state">
            <h3>Your cart is empty</h3>
            <p>Looks like you have not added any meals yet.</p>
            <a href="Restaurant.html">Start Ordering</a>
          </div>
        `;
        totalText.textContent = "$0.00";
        subtotalText.textContent = "$0.00";
        itemsCount.textContent = "0";
        totalCount.textContent = "$0";
        return;
      }

      let total = 0;
      let totalItems = 0;

      cart.forEach((item, index) => {
        total += item.price * item.quantity;
        totalItems += item.quantity;

        const itemElement = document.createElement("div");
        itemElement.className = "cart-item";
        itemElement.innerHTML = `
          <img src="${item.image}" alt="${item.name}" class="cart-item-image">

          <div class="cart-item-info">
            <h3>${item.name}</h3>
            <p>Quantity can be adjusted directly from your cart.</p>
            <div class="cart-item-price">${formatPrice(item.price)} each</div>
          </div>

          <div class="quantityadjustment">
            <button class="btn-minus" data-index="${index}">-</button>
            <input type="text" class="quantityinput" value="${item.quantity}" readonly>
            <button class="btn-plus" data-index="${index}">+</button>
          </div>

          <button class="delete-meal-btn" data-index="${index}" title="Remove Item">✕</button>
        `;

        cartContent.appendChild(itemElement);
      });

      totalText.textContent = formatPrice(total);
      subtotalText.textContent = formatPrice(total);
      itemsCount.textContent = totalItems;
      totalCount.textContent = formatPrice(total);
      attachCartEvents();
    }

    function attachCartEvents() {
      document.querySelectorAll(".btn-minus").forEach(button => {
        button.addEventListener("click", () => {
          const index = parseInt(button.dataset.index, 10);
          const cart = getCart();

          if (cart[index].quantity > 1) {
            cart[index].quantity -= 1;
          } else {
            cart.splice(index, 1);
          }

          saveCart(cart);
          renderCart();
        });
      });

      document.querySelectorAll(".btn-plus").forEach(button => {
        button.addEventListener("click", () => {
          const index = parseInt(button.dataset.index, 10);
          const cart = getCart();
          cart[index].quantity += 1;
          saveCart(cart);
          renderCart();
        });
      });

      document.querySelectorAll(".delete-meal-btn").forEach(button => {
        button.addEventListener("click", () => {
          const index = parseInt(button.dataset.index, 10);
          const cart = getCart();
          cart.splice(index, 1);
          saveCart(cart);
          renderCart();
        });
      });
    }

    emptyCartButton.addEventListener("click", () => {
      localStorage.removeItem("cart");
      renderCart();
    });

    renderCart();