
function getCart() {
    return JSON.parse(localStorage.getItem("queueless-cart")) || [];
}

function saveCart(cart) {
    localStorage.setItem("queueless-cart", JSON.stringify(cart));
}


// Get all orders
function getOrders() {
    return JSON.parse(
        localStorage.getItem("queueless.orders") || "[]"
    );
}

// Add a new order
function addOrder(order) {
    const orders = getOrders();

    orders.push(order);

    localStorage.setItem(
        "queueless.orders",
        JSON.stringify(orders)
    );

    return true;
}

// Advance order status
function advanceOrder(token) {
    const orders = getOrders();

    const order = orders.find(
        item => item.token === token
    );

    if (!order) {
        return false;
    }

    const statuses = [
        "Placed",
        "Preparing",
        "Ready",
        "Collected"
    ];

    const currentIndex =
        statuses.indexOf(order.status);

    if (currentIndex < statuses.length - 1) {
        order.status = statuses[currentIndex + 1];
    }

    localStorage.setItem(
        "queueless.orders",
        JSON.stringify(orders)
    );

    return true;
}
