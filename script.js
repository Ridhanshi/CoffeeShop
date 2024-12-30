let selectedItems = [];

function addToOrder(itemName, itemPrice) {
    selectedItems.push({ name: itemName, price: itemPrice });

    // Update the order summary in the UI
    const orderSummary = document.getElementById("order-summary");
    orderSummary.innerText = selectedItems
        .map((item) => `${item.name} - Rs.${item.price}`)
        .join("\n");
}

document.getElementById("place-order").addEventListener("click", async () => {
    if (selectedItems.length === 0) {
        alert("Please select at least one item!");
        return;
    }

    try {
        const response = await fetch("https://coffeeshop-bx7e.onrender.com", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ order: selectedItems }),
        });

        const result = await response.json();

        // Display the total for the current customer
        alert(`Order placed! Total: Rs. ${result.total}`);

        // Clear the selected items and reset the total for the next customer
        selectedItems = [];
        document.getElementById("order-summary").innerText = "";
    } catch (error) {
        console.error("Error placing order:", error);
    }
});

    
