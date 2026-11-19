
// Load and display all orders
function loadOrders() {

    let orders = getOrders();

    let orderList = document.getElementById("orderList");

    orderList.innerHTML = "";

    // Check if there are no orders
    if (orders.length === 0) {
        orderList.innerHTML = "<p>No orders available.</p>";
        return;
    }

    // Display each order
    orders.forEach(function(order) {

        let itemsText = "";

        order.items.forEach(function(item) {
            itemsText += item.name + " x " + item.quantity + "<br>";
        });

        let button = "";

        // Check the current status
        if (order.status === "Placed") {
            button = "Mark Preparing";
        }
        else if (order.status === "Preparing") {
            button = "Mark Ready";
        }
        else if (order.status === "Ready") {
            button = "Mark Collected";
        }

        orderList.innerHTML += `
            <div class="order">

                <h3>Token: ${order.token}</h3>

                <p><b>Items:</b><br>${itemsText}</p>

                <p><b>Pickup Time:</b> ${order.pickupTime}</p>

                <p class="status">
                    Status: ${order.status}
                </p>

                ${order.status !== "Collected"
                    ? `<button onclick="updateStatus('${order.token}')">
                        ${button}
                       </button>`
                    : '<p class="complete">Complete - Pickup finished</p>'
                }

            </div>
        `;
    });
}


// Update order status
function updateStatus(token) {

    advanceOrder(token);

    // Display updated orders
    loadOrders();
}


// Load orders when page opens
loadOrders();
