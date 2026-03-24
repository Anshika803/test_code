// LOGIN AUTHENTICATION
document.getElementById("loginForm")?.addEventListener("submit", function (e) {
  e.preventDefault();

  const role = document.getElementById("role").value;
  const email = document.getElementById("email").value;

  // Save login session
  localStorage.setItem("loggedInRole", role);
  localStorage.setItem("loggedInUserEmail", email);

  if (role === "admin") {
    window.location.href = "admin/admin-dashboard.html";
  } else if (role === "merchant") {
    window.location.href = "merchant/merchant-dashboard.html";
  } else {
    window.location.href = "customer/customer-dashboard.html";
  }
});

// SIGNUP AUTHENTICATION
document.getElementById("signupForm")?.addEventListener("submit", function (e) {
  e.preventDefault();

  const newUser = {
    name: document.getElementById("name").value,
    email: document.getElementById("signupEmail").value,
    role: document.getElementById("signupRole").value
  };

  // GET existing users array
  let users = JSON.parse(localStorage.getItem("users")) || [];

  // ADD new user
  users.push(newUser);

  // SAVE updated array
  localStorage.setItem("users", JSON.stringify(users));

  alert("Signup successful!");
  window.location.href = "login.html";
});


// LOGOUT
function logout() {
  localStorage.removeItem("loggedInRole");
  window.location.href = "../login.html";
}
