// Protect page (only merchant allowed)
const role = localStorage.getItem("loggedInRole");

if (role !== "merchant") {
  window.location.href = "../login.html";
}

// Welcome text
document.getElementById("welcome").innerText = "Welcome, Merchant!";

const serviceList = document.getElementById("serviceList");
const bookingList = document.getElementById("bookingList");

const merchantEmail = localStorage.getItem("loggedInUserEmail");

// ================== DISPLAY SERVICES ==================
function displayServices() {
  let services = JSON.parse(localStorage.getItem("services")) || [];
  serviceList.innerHTML = "";

  // Show only this merchant's services
  const myServices = services.filter(
    service => service.merchant === merchantEmail
  );

  myServices.forEach((service, index) => {
    const li = document.createElement("li");

    li.innerHTML = `
      <strong>${service.name}</strong> - ₹${service.price}
      <button onclick="deleteService(${index})">Delete</button>
    `;

    serviceList.appendChild(li);
  });
}

// ================== DELETE SERVICE ==================
function deleteService(index) {
  let services = JSON.parse(localStorage.getItem("services")) || [];

  // Remove only this merchant's service properly
  const myServices = services.filter(
    service => service.merchant === merchantEmail
  );

  const serviceToDelete = myServices[index];

  services = services.filter(
    service =>
      !(service.name === serviceToDelete.name &&
        service.merchant === merchantEmail)
  );

  localStorage.setItem("services", JSON.stringify(services));

  alert("Service Deleted!");

  displayServices();
}

// ================== ADD SERVICE ==================
document.getElementById("serviceForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const serviceName = document.getElementById("serviceName").value;
  const servicePrice = document.getElementById("servicePrice").value;

  let services = JSON.parse(localStorage.getItem("services")) || [];

  const newService = {
    name: serviceName,
    price: servicePrice,
    merchant: merchantEmail
  };

  services.push(newService);

  localStorage.setItem("services", JSON.stringify(services));

  displayServices();
  e.target.reset();
});

// ================== DISPLAY BOOKINGS ==================
function displayBookings() {
let bookings = JSON.parse(localStorage.getItem("bookings")) || [];
const merchantEmail = localStorage.getItem("loggedInUserEmail");

const myBookings = bookings.filter(
  booking => booking.merchant === merchantEmail
);

bookingList.innerHTML = "";

myBookings.forEach((booking) => {
  const li = document.createElement("li");

  li.innerText = `
    ${booking.service} - ₹${booking.price}
    Booked by: ${booking.customer}
  `;

  bookingList.appendChild(li);
});
}

// Load on page start
displayServices();
displayBookings();

// Logout
function logout() {
  localStorage.removeItem("loggedInRole");
  localStorage.removeItem("loggedInUserEmail");
  window.location.href = "../login.html";
}
