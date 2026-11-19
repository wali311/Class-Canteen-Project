
const foods = [
    {
        id: 1,
        name: "Burger",
        price: 120,
        prepMinutes: 12,
        icon: "🍔",
        image: "image/burger.jpg"
    },
    {
        id: 2,
        name: "Juice",
        price: 40,
        prepMinutes: 5,
        icon: "🧃",
        image: "image/juice.jpg"
    },
    {
        id: 3,
        name: "Rice",
        price: 80,
        prepMinutes: 10,
        icon: "🍚",
        image: "image/rice.jpg"
    },
    {
        id: 4,
        name: "Samosa",
        price: 15,
        prepMinutes: 5,
        icon: "🥟",
        image: "image/samosa.jpg"
    },
    {
        id: 5,
        name: "Sandwich",
        price: 60,
        prepMinutes: 8,
        icon: "🥪",
        image: "image/sandwich.jpg"
    },
    {
        id: 6,
        name: "Milk Tea",
        price: 15,
        prepMinutes: 2,
        icon: "☕",
        image: "image/tea.jpg"
    }
];


// Display Food Items

function displayFoods() {
    const foodList = document.getElementById("food-list");

    foodList.innerHTML = "";

    foods.forEach(food => {

        const foodCard = document.createElement("div");
        foodCard.className = "food-card";

        foodCard.innerHTML = `
            <img
                src="${food.image}"
                alt="${food.name}"
                class="food-image"
            >

            <div class="food-information">

                <h3>${food.icon} ${food.name}</h3>

                <p class="price">
                    Tk ${food.price}
                </p>

                <p class="preparation">
                    Preparation Time: ${food.prepMinutes} minutes
                </p>

                <button
                    class="add-button"
                    onclick="addToCart(${food.id})"
                >
                    Add to Cart
                </button>

            </div>
        `;

        const image = foodCard.querySelector("img");

        image.onerror = function () {
            this.style.display = "none";
        };

        foodList.appendChild(foodCard);
    });
}


// Add Food to Cart

function addToCart(foodId) {

    const selectedFood = foods.find(food => food.id === foodId);

    let cart = getCart();

    const existingItem = cart.find(item => item.id === foodId);

    if (existingItem) {

        existingItem.quantity += 1;

    } else {

        cart.push({
            id: selectedFood.id,
            name: selectedFood.name,
            price: selectedFood.price,
            quantity: 1,
            prepMinutes: selectedFood.prepMinutes
        });

    }

    saveCart(cart);

    document.getElementById("message").textContent =
        selectedFood.name + " added to cart successfully!";

    displayCart();
}


// Display Cart Items

function displayCart() {

    const cartItems = document.getElementById("cart-items");
    const cartTotal = document.getElementById("cart-total");

    const cart = getCart();

    if (cart.length === 0) {

        cartItems.innerHTML = "Your cart is empty!";
        cartTotal.textContent = "0";

        return;
    }

    let total = 0;

    cartItems.innerHTML = "";

    cart.forEach(item => {

        const itemTotal = item.price * item.quantity;

        total += itemTotal;

        const cartItem = document.createElement("div");

        cartItem.className = "cart-item";

        cartItem.innerHTML = `
            <span>
                ${item.name} × ${item.quantity}
            </span>

            <strong>
                Tk ${itemTotal}
            </strong>
        `;

        cartItems.appendChild(cartItem);

    });

    cartTotal.textContent = total;
}


// Initialize Menu

displayFoods();
displayCart();
