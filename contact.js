const form = document.getElementById("contactForm");
const nameInput = document.getElementById("ContactName");
const phoneInput = document.getElementById("number");
const emailInput = document.getElementById("ContactMail");
const messageInput = document.getElementById("ContactMessage");

const nameError = document.getElementById("nameError");
const phoneError = document.getElementById("phoneError");
const emailError = document.getElementById("emailError");
const messageError = document.getElementById("messageError");
const formSuccess = document.getElementById("formSuccess");

function isValidName(name) {
return name.trim().length >= 2;
}
function isValidPhone(phone) {
return /^\d{10}$/.test(phone);
}
function isValidEmail(email) {
return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
function isValidMessage(msg) {
return msg.trim().length >= 5;
}

// Real-time validation
nameInput.addEventListener("input", () => {
nameError.textContent = isValidName(nameInput.value) ? "" : "Enter a valid name (min 2 letters)";
});
phoneInput.addEventListener("input", () => {
phoneError.textContent = isValidPhone(phoneInput.value) ? "" : "Enter a valid 10-digit phone number";
});
emailInput.addEventListener("input", () => {
emailError.textContent = isValidEmail(emailInput.value) ? "" : "Enter a valid email address";
});
messageInput.addEventListener("input", () => {
messageError.textContent = isValidMessage(messageInput.value) ? "" : "Message should be at least 5 characters";
});

form.addEventListener("submit", function(e) {
e.preventDefault();
let valid = true;

if (!isValidName(nameInput.value)) {
nameError.textContent = "Enter a valid name (min 2 letters)";
nameInput.focus();
valid = false;
} else {
nameError.textContent = "";
}

if (!isValidPhone(phoneInput.value)) {
phoneError.textContent = "Enter a valid 10-digit phone number";
if (valid) phoneInput.focus();
valid = false;
} else {
phoneError.textContent = "";
}

if (!isValidEmail(emailInput.value)) {
emailError.textContent = "Enter a valid email address";
if (valid) emailInput.focus();
valid = false;
} else {
emailError.textContent = "";
}

if (!isValidMessage(messageInput.value)) {
messageError.textContent = "Message should be at least 5 characters";
if (valid) messageInput.focus();
valid = false;
} else {
messageError.textContent = "";
}

if (valid) {
formSuccess.innerHTML = `
    <span class="success-check"><i class="fa-solid fa-circle-check"></i></span>
    <span>Thank you! Your message has been sent.</span>
`;
form.reset();
setTimeout(() => { formSuccess.innerHTML = ""; }, 4000);
} else {
formSuccess.innerHTML = "";
}
});
