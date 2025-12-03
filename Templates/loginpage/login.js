

document.addEventListener("DOMContentLoaded", function () {
  const loginForm = document.getElementById("login-form");
  const emailInput = document.getElementById("login-email");
  const passwordInput = document.getElementById("login-password");

  const emailError = document.getElementById("login-email-error");
  const passwordError = document.getElementById("login-password-error");

  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  
  emailInput.addEventListener("input", () => {
    if (!emailRegex.test(emailInput.value.trim())) {
      emailError.style.display = "block";
      emailError.textContent = "Please enter a valid email address.";
      emailInput.classList.add("invalid");
    } else {
      emailError.style.display = "none";
      emailInput.classList.remove("invalid");
    }
  });

  passwordInput.addEventListener("input", () => {
    if (passwordInput.value.length < 6) {
      passwordError.style.display = "block";
      passwordError.textContent = "Password must be at least 6 characters.";
      passwordInput.classList.add("invalid");
    } else {
      passwordError.style.display = "none";
      passwordInput.classList.remove("invalid");
    }
  });

  
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault(); 

    const emailValid = emailRegex.test(emailInput.value.trim());
    const passwordValid = passwordInput.value.length >= 6;

    if (!emailValid) {
      emailError.style.display = "block";
      emailError.textContent = "Please enter a valid email address.";
      emailInput.focus();
    }

    if (!passwordValid) {
      passwordError.style.display = "block";
      passwordError.textContent = "Password must be at least 6 characters.";
      if (emailValid) passwordInput.focus();
    }

    
    if (emailValid && passwordValid) {
      alert("Login successful! Proceeding...");
    
    }
  });

  
  const pwToggle = document.getElementById("login-pw-toggle");
  if (pwToggle) {
    pwToggle.addEventListener("click", () => {
      const type = passwordInput.type === "password" ? "text" : "password";
      passwordInput.type = type;
      pwToggle.title = type === "password" ? "Show password" : "Hide password";
    });
  }
});
