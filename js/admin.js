// Protect page
const role = localStorage.getItem("loggedInRole");
if (role !== "admin") {
  window.location.href = "../login.html";
}

document.getElementById("welcome").innerText = "Welcome, Admin!";

// Get Data
let users = JSON.parse(localStorage.getItem("users")) || [];
let services = JSON.parse(localStorage.getItem("services")) || [];
let bookings = JSON.parse(localStorage.getItem("bookings")) || [];

// ====== SHOW STATS ======
const statsList = document.getElementById("statsList");

statsList.innerHTML = `
  <li><strong>Total Users:</strong> ${users.length}</li>
  <li><strong>Total Services:</strong> ${services.length}</li>
  <li><strong>Total Bookings:</strong> ${bookings.length}</li>
`;

// ====== SHOW USERS ======
const userList = document.getElementById("userList");
userList.innerHTML = "";

users.forEach((user, index) => {
  const li = document.createElement("li");
  li.innerHTML = `
    <strong>User ${index + 1}</strong><br>
    Name: ${user.name}<br>
    Email: ${user.email}<br>
    Role: ${user.role}
  `;
  userList.appendChild(li);
});

// Logout
function logout() {
  localStorage.removeItem("loggedInRole");
  window.location.href = "../login.html";
}