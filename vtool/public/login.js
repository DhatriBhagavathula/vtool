document.getElementById("login-form").addEventListener("submit", function (e) {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const phone = document.getElementById("phone").value;
  const loginStatus = document.getElementById("login-status");
  const loginBox = document.querySelector(".login-box"); // Add this to target the box

  // Simple format check
  if (email.includes("@") && phone.length >= 10) {
    localStorage.setItem("userEmail", email);
    localStorage.setItem("userPhone", phone);
    loginStatus.textContent = "✅ Login successful! Redirecting...";
    loginStatus.style.color = "green";

    // Trigger the 3D rotation effect
    loginBox.classList.add("rotate");

    // Redirect to dashboard after animation
    setTimeout(() => {
      window.location.href = "dashboard.html";
    }, 1000); // Match this with your CSS transition time (1s)
  } else {
    loginStatus.textContent = "❌ Invalid email or phone number.";
    loginStatus.style.color = "red";
  }
});
