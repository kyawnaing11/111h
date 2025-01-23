// Define the API endpoint
const API_URL = 'API_client.php';

// Sample data for services (can be fetched from the backend if needed)
const services = {
    facebook: [
        { id: 1, name: "Page Like & Follower", price: 0.10 },
        { id: 2, name: "Page Follower", price: 0.15 },
        { id: 3, name: "Profile Follower", price: 0.20 },
        { id: 4, name: "Post Reactions", price: 0.05 },
        { id: 5, name: "Random Comments", price: 0.10 },
        { id: 6, name: "Custom Comments", price: 0.25 },
        { id: 7, name: "Share", price: 0.15 },
        { id: 8, name: "Views", price: 0.01 },
        { id: 9, name: "Group Members", price: 0.50 },
        { id: 10, name: "Page Reviews", price: 0.30 },
        { id: 11, name: "Live View", price: 0.40 }
    ],
    tiktok: [
        { id: 12, name: "Follower", price: 0.30 },
        { id: 13, name: "Like", price: 0.10 },
        { id: 14, name: "Views", price: 0.01 },
        { id: 15, name: "Share", price: 0.20 },
        { id: 16, name: "Save", price: 0.15 },
        { id: 17, name: "Battle Point", price: 0.50 },
        { id: 18, name: "Custom Comment", price: 0.25 },
        { id: 19, name: "Random Comment", price: 0.10 },
        { id: 20, name: "Verified Comment", price: 0.40 }
    ],
    telegram: [
        { id: 21, name: "Active Group Members", price: 0.50 },
        { id: 22, name: "Group Members", price: 0.30 },
        { id: 23, name: "Channel Members", price: 0.40 },
        { id: 24, name: "Positive Reactions", price: 0.10 },
        { id: 25, name: "Negative Reactions", price: 0.10 },
        { id: 26, name: "Post/Video Views", price: 0.05 },
        { id: 27, name: "Bot Start", price: 0.20 },
        { id: 28, name: "Premium Group Members", price: 1.00 },
        { id: 29, name: "Premium Channel Members", price: 1.20 },
        { id: 30, name: "Premium Positive Reactions", price: 0.30 },
        { id: 31, name: "Premium Negative Reactions", price: 0.30 }
    ],
    instagram: [
        { id: 32, name: "Like", price: 0.10 },
        { id: 33, name: "Comment", price: 0.20 },
        { id: 34, name: "Share", price: 0.15 }
    ],
    twitter: [
        { id: 35, name: "Like", price: 0.10 },
        { id: 36, name: "Comment", price: 0.20 },
        { id: 37, name: "Re-tweet", price: 0.15 }
    ]
};

// Track the selected service
let selectedService = null;

// Select a service
function selectService(platform) {
    const serviceItems = document.querySelectorAll(".service-item");
    const details = document.getElementById("serviceDetails");

    // Remove border from all icons
    serviceItems.forEach(item => item.classList.remove("selected"));

    // Add border to the clicked icon
    event.currentTarget.classList.add("selected");

    // Display service details
    details.innerHTML = `
        <h3>${platform.charAt(0).toUpperCase() + platform.slice(1)} Services</h3>
        <select id="serviceSelect" onchange="updateServiceDetails('${platform}')">
            <option value="">Select a service</option>
            ${services[platform].map(service => `
                <option value="${service.id}">${service.name} - $${service.price.toFixed(2)}</option>
            `).join("")}
        </select>
        <input type="text" placeholder="Paste service link" id="serviceLink">
        <input type="number" placeholder="Enter amount" id="serviceAmount" oninput="calculateCost('${platform}')">
        <p class="cost">Total Cost: $<span id="totalCost">0.00</span></p>
        <button onclick="confirmPayment()">Submit Payment</button>
    `;
}

// Update service details when a service is selected from the dropdown
function updateServiceDetails(platform) {
    const select = document.getElementById("serviceSelect");
    const selectedId = select.value;
    const selectedService = services[platform].find(service => service.id == selectedId);

    if (selectedService) {
        document.getElementById("totalCost").textContent = "0.00"; // Reset total cost
    }
}

// Calculate total cost
function calculateCost(platform) {
    const select = document.getElementById("serviceSelect");
    const selectedId = select.value;
    const selectedService = services[platform].find(service => service.id == selectedId);

    if (selectedService) {
        const amount = document.getElementById("serviceAmount").value;
        const totalCost = (selectedService.price * amount).toFixed(2);
        document.getElementById("totalCost").textContent = totalCost;
    }
}

// Confirm payment and send data to the backend
function confirmPayment() {
    const select = document.getElementById("serviceSelect");
    const link = document.getElementById("serviceLink").value;
    const amount = document.getElementById("serviceAmount").value;

    if (!select.value || !link || !amount) {
        alert("Please fill in all fields.");
        return;
    }

    // Prepare the data to send to the backend
    const data = {
        serviceId: select.value,
        serviceLink: link,
        amount: amount,
        totalCost: document.getElementById("totalCost").textContent
    };

    // Send the data to the backend using fetch API
    fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert("Payment confirmed! Thank you for your purchase.");
        } else {
            alert("Payment failed. Please try again.");
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert("An error occurred. Please try again.");
    });
}
