document.getElementById("login-form").addEventListener("submit", async function(e) {
  e.preventDefault();
  const emailOrPhone = e.target.emailOrPhone.value;
  const password     = e.target.password.value;
  const statusDiv    = document.getElementById("login-status");

  try {
    const res = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ emailOrPhone, password }),
    });
    

    if (!res.ok) {
      const { detail } = await res.json();
      statusDiv.textContent = `❌ ${detail || "Login failed"}`;
      return;
    }

    const { token } = await res.json();
    localStorage.setItem("authToken", token);
    statusDiv.textContent = "✅ Login successful! Redirecting…";

    setTimeout(() => window.location.href = "dashboard.html", 700);
  } catch (err) {
    statusDiv.textContent = "❌ Server error. Try again.";
  }
});
