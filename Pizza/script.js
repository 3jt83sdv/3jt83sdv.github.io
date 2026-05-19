// Hämtar alla ingredienser och pizzan från HTML
const ingredients = document.querySelectorAll(".ingredient");
const pizza = document.getElementById("pizza");

// Variabel som sparar vilken ingrediens som dras
let draggedItem = null;

// Loopar igenom alla ingredienser
ingredients.forEach(item => {

    // När användaren börjar dra en ingrediens
    item.addEventListener("dragstart", (e) => {

        // Sparar den dragna ingrediensen
        draggedItem = e.target;
    });
});

// Gör så att pizzan kan ta emot dragna objekt
pizza.addEventListener("dragover", (e) => {
    e.preventDefault();
});

// När ingrediensen släpps på pizzan
pizza.addEventListener("drop", (e) => {

    // Stoppar standardbeteendet
    e.preventDefault();

    // Om ingen ingrediens dras -> avsluta
    if (!draggedItem) return;

    // Hämtar pizzans position och storlek
    const rect = pizza.getBoundingClientRect();

    // Räknar ut pizzans radie
    const pizzaRadius = rect.width / 2;

    // Position där användaren släppte ingrediensen
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Storlek på topping-bilden
    const toppingSize = 90;
    const halfTopping = toppingSize / 2;

    // Pythagoras sats för att räkna avstånd från mitten
    const distance = Math.sqrt(
        Math.pow(x - pizzaRadius, 2) +
        Math.pow(y - pizzaRadius, 2)
    );

    // Kontrollerar att topping inte hamnar utanför pizzan
    if (distance + (halfTopping - 10) > pizzaRadius) {
        return;
    }

    // Skapar en ny bild för topping
    const newItem = document.createElement("img");

    // Sätter samma bild som den dragna ingrediensen
    newItem.src = draggedItem.src;

    // Lägger till css-klassen topping
    newItem.classList.add("topping");

    // Placerar topping där användaren släppte den
    newItem.style.left = (x - halfTopping) + "px";
    newItem.style.top = (y - halfTopping) + "px";

    // Lägger topping på pizzan
    pizza.appendChild(newItem);
});


// Hämtar knapparna från HTML
const resetBtn = document.getElementById("resetBtn");
const undoBtn = document.getElementById("undoBtn");


// Reset-knapp -> tar bort alla toppings
resetBtn.addEventListener("click", () => {

    // Tömmer allt innehåll i pizzan
    pizza.innerHTML = "";
});


// Undo-knapp -> tar bort senaste topping
undoBtn.addEventListener("click", () => {

    // Hämtar alla toppings på pizzan
    const toppings = pizza.querySelectorAll(".topping");

    // Om det finns toppings
    if (toppings.length > 0) {

        // Tar bort den senaste topping
        toppings[toppings.length - 1].remove();
    }
});