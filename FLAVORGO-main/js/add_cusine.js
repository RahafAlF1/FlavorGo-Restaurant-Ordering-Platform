
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('cform');

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        
        const name = document.getElementById('namet').value.trim();
        const calories = document.getElementById('calot').value.trim();
        const price = document.getElementById('pricet').value.trim();
        const description = document.getElementById('dest').value.trim();
        const photo = document.getElementById('photot').files[0]; 

        if (!name || !calories || !price || !description || !photo) {
            alert('Please fill in all fields.');
            return;
        }

       
        if (isNaN(calories) || isNaN(price)) {
            alert('Calories and price must be numeric values.');
            return;
        }

    
        const formData = new FormData();
        formData.append('name', name);
        formData.append('calories', calories);
        formData.append('price', price);
        formData.append('description', description);
        formData.append('photo', photo);

        let meals = JSON.parse(localStorage.getItem('meals')) || [];
        meals.push(formData); 
        localStorage.setItem('meals', JSON.stringify(meals));

       
        alert(`Meal "${name}" has been successfully added.`);

                                           
        form.reset();
    });
});

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