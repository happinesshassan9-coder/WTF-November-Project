
document.addEventListener("DOMContentLoaded", function () {
  const signupForm = document.getElementById("signup-form");
  const nameInput = document.getElementById("signup-name");
  const emailInput = document.getElementById("signup-email");
  const passwordInput = document.getElementById("signup-password");

  const nameError = document.getElementById("signup-name-error");
  const emailError = document.getElementById("signup-email-error");
  const passwordError = document.getElementById("signup-password-error");

  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  
  nameInput.addEventListener("input", () => {
    if (nameInput.value.trim().length < 2) {
      nameError.style.display = "block";
      nameError.textContent = "Please enter your full name.";
      nameInput.classList.add("invalid");
    } else {
      nameError.style.display = "none";
      nameInput.classList.remove("invalid");
    }
  });


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

  
  signupForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const nameValid = nameInput.value.trim().length >= 2;
    const emailValid = emailRegex.test(emailInput.value.trim());
    const passwordValid = passwordInput.value.length >= 6;

    if (!nameValid) {
      nameError.style.display = "block";
      nameError.textContent = "Please enter your full name.";
      nameInput.focus();
    }

    if (!emailValid) {
      emailError.style.display = "block";
      emailError.textContent = "Please enter a valid email address.";
      if (nameValid) emailInput.focus();
    }

    if (!passwordValid) {
      passwordError.style.display = "block";
      passwordError.textContent = "Password must be at least 6 characters.";
      if (nameValid && emailValid) passwordInput.focus();
    }

    if (nameValid && emailValid && passwordValid) {
      alert("Signup successful! Proceeding...");
      
    }
  });

  
  const pwToggle = document.getElementById("signup-pw-toggle");
  if (pwToggle) {
    pwToggle.addEventListener("click", () => {
      const type = passwordInput.type === "password" ? "text" : "password";
      passwordInput.type = type;
      pwToggle.title = type === "password" ? "Show password" : "Hide password";
    });
  }
});
