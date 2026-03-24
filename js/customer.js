// Protect page
const role = localStorage.getItem("loggedInRole");
if (role !== "customer") {
  window.location.href = "../login.html";
}

document.getElementById("welcome").innerText = "Welcome, Customer!";

// Get services
let services = JSON.parse(localStorage.getItem("services")) || [];
const list = document.getElementById("serviceList");

// Display services
services.forEach((service, index) => {
  const li = document.createElement("li");

  li.innerHTML = `
    <strong>${service.name}</strong> - ₹${service.price}
    <button onclick="bookService(${index})">Book</button>
  `;

  list.appendChild(li);
});

// Book service
function bookService(index) {
  let bookings = JSON.parse(localStorage.getItem("bookings")) || [];

 const customerEmail = localStorage.getItem("loggedInUserEmail");

const booking = {
  service: services[index].name,
  price: services[index].price,
  merchant: services[index].merchant,
  customer: customerEmail,
  date: new Date().toLocaleString()
};
  bookings.push(booking);

  localStorage.setItem("bookings", JSON.stringify(bookings));

  alert("Service Booked Successfully!");

  displayBookings();
}

// Display bookings
function displayBookings() {
let bookings = JSON.parse(localStorage.getItem("bookings")) || [];
const loggedInEmail = localStorage.getItem("loggedInUserEmail");

const myBookings = bookings.filter(
  booking => booking.customer === loggedInEmail
);

const bookingList = document.getElementById("bookingList");

bookingList.innerHTML = "";

myBookings.forEach((booking, index) => {
  const li = document.createElement("li");

  li.innerHTML = `
    ${booking.service} - ₹${booking.price}
    <button onclick="cancelBooking(${index})">Cancel</button>
  `;

  bookingList.appendChild(li);
});
}

// Cancel booking
function cancelBooking(index) {
  let bookings = JSON.parse(localStorage.getItem("bookings")) || [];

  bookings.splice(index, 1);

  localStorage.setItem("bookings", JSON.stringify(bookings));

  alert("Booking Cancelled!");

  displayBookings();
}

// Load bookings on page load
displayBookings();

// Logout
function logout() {
  localStorage.removeItem("loggedInRole");
  window.location.href = "../login.html";
}