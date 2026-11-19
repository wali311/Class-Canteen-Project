
const cartItems = document.getElementById("cart-items");
const totalElement = document.getElementById("total");
const prepElement = document.getElementById("prep-time");
const pickupSelect = document.getElementById("pickup-time");
const placeButton = document.getElementById("place-order");
const message = document.getElementById("message");
const confirmation = document.getElementById("confirmation");
const tokenElement = document.getElementById("order-token");
const detailsElement = document.getElementById("confirmation-details");
const trackLink = document.getElementById("track-link");

let cart = [];
let total = 0;
let estimatedPrepMinutes = 0;

// Food image paths
const foodImages = {
    "burger": "image/burger.jpg",
    "juice": "image/juice.jpg",
    "rice": "image/rice.jpg",
    "samosa": "image/samosa.jpg",
    "sandwich": "image/sandwich.jpg",
    "chicken sandwich": "image/sandwich.jpg",
    "tea": "image/tea.jpg",
    "milk tea": "image/tea.jpg"
};




function displayCart() {

    if (typeof getCart !== "function") {
        cartItems.textContent = "Waiting for store.js integration...";
        placeButton.disabled = true;
        return;
    }

    cart = getCart() || [];
    total = 0;
    estimatedPrepMinutes = 0;
    cartItems.innerHTML = "";

    if (cart.length === 0) {
        cartItems.textContent = "Your cart is empty!";
        placeButton.disabled = true;
        totalElement.textContent = "0";
        prepElement.textContent = "0";
        return;
    }

    cart.forEach(function(item) {

        const itemTotal = item.price * item.quantity;

        total += itemTotal;
        estimatedPrepMinutes +=
            item.prepMinutes * item.quantity;

        const div = document.createElement("div");
        div.className = "cart-item";

        // Food image
        const img = document.createElement("img");

        const imageKey = item.name.toLowerCase().trim();

        img.src = foodImages[imageKey] || "";
        img.alt = item.name;
        img.className = "food-image";

        if (!foodImages[imageKey]) {
            img.hidden = true;
        }

        // Food details
        const details = document.createElement("div");
        details.className = "food-details";

        const name = document.createElement("strong");
        name.textContent = item.name;

        const quantity = document.createElement("p");
        quantity.textContent = "Quantity: " + item.quantity;

        const price = document.createElement("p");
        price.textContent = "Tk " + itemTotal;

        details.appendChild(name);
        details.appendChild(quantity);
        details.appendChild(price);

        div.appendChild(img);
        div.appendChild(details);

        cartItems.appendChild(div);
    });

    totalElement.textContent = total;
    prepElement.textContent = estimatedPrepMinutes;
    placeButton.disabled = false;
}

placeButton.addEventListener("click", function() {

    message.textContent = "";

    if (typeof addOrder !== "function" ||
        typeof getOrders !== "function" ||
        typeof saveCart !== "function") {

        message.textContent = "Store.js is not connected yet!";
        return;
    }

    if (cart.length === 0) {
        message.textContent = "Your cart is empty!";
        return;
    }

    const pickupTime = pickupSelect.value;

    if (pickupTime === "") {
        message.textContent = "Please select a pickup time!";
        return;
    }

    const nextNumber = getOrders().length + 1;

    const token =
        "QL-" + String(nextNumber).padStart(3, "0");

    const order = {
        token: token,
        items: cart.map(item => ({...item})),
        total: total,
        pickupTime: pickupTime,
        estimatedPrepMinutes: estimatedPrepMinutes,
        status: "Placed"
    };

    try {
        addOrder(order);
        saveCart([]);

        tokenElement.textContent = token;

        detailsElement.textContent =
            "Pickup: " + pickupTime +
            " | Preparation: " +
            estimatedPrepMinutes + " minutes";

        trackLink.href =
            "track.html?token=" + encodeURIComponent(token);

        confirmation.hidden = false;
        placeButton.disabled = true;
        placeButton.textContent = "Order Placed";
        pickupSelect.disabled = true;

    } catch (error) {
        message.textContent = "Order could not be saved!";
        console.error(error);
    }
});

displayCart();
