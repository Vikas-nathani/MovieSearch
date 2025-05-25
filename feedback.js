// --- Form Elements ---
const nameInput = document.getElementById("Name");
const emailInput = document.getElementById("mail");
const ratingInput = document.getElementById("rating");
const feedbackInput = document.getElementById("feedbackMsg");
const form = document.getElementById("feedbackForm");

const nameError = document.getElementById("nameError");
const emailError = document.getElementById("emailError");
const ratingError = document.getElementById("ratingError");
const feedbackError = document.getElementById("feedbackError");
const formSuccess = document.getElementById("formSuccess");

// --- Progress Bar Elements ---
const progressBar = document.getElementById("progressBar");
const progressText = document.getElementById("progressText");
const badge = document.getElementById("badge");

// --- Voice Input Setup ---
const voiceBtns = document.querySelectorAll(".voice-btn");
let recognition;
if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
recognition = new SpeechRecognition();
recognition.lang = 'en-US';
recognition.interimResults = false;
recognition.maxAlternatives = 1;
} else {
voiceBtns.forEach(btn => btn.style.display = "none");
}

// --- Validation Functions ---
function isValidName(name) {
return name.trim().length >= 2;
}
function isValidEmail(email) {
return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
function isValidRating(rating) {
return !isNaN(rating) && rating >= 1 && rating <= 5;
}
function isValidFeedback(msg) {
return msg.trim().length >= 5;
}

// --- Progress Calculation ---
function getProgress() {
let filled = 0;
if (isValidName(nameInput.value)) filled++;
if (isValidEmail(emailInput.value)) filled++;
if (isValidRating(ratingInput.value)) filled++;
if (isValidFeedback(feedbackInput.value)) filled++;
return filled / 4;
}
function updateProgress() {
const progress = getProgress();
const percent = Math.round(progress * 100);
progressBar.style.width = percent + "%";
progressText.textContent = `Progress: ${percent}%`;

// Badges
if (percent === 100) {
badge.innerHTML = '<i class="fa-solid fa-medal"></i> Pro Feedbacker!';
badge.classList.add("visible");
} else if (percent >= 75) {
badge.innerHTML = '<i class="fa-solid fa-star"></i> Almost there!';
badge.classList.add("visible");
} else if (percent >= 50) {
badge.innerHTML = '<i class="fa-solid fa-bolt"></i> Halfway!';
badge.classList.add("visible");
} else if (percent >= 25) {
badge.innerHTML = '<i class="fa-solid fa-seedling"></i> Getting started!';
badge.classList.add("visible");
} else {
badge.classList.remove("visible");
badge.innerHTML = "";
}
}

// --- Real-time Validation & Progress ---
[nameInput, emailInput, ratingInput, feedbackInput].forEach(input => {
input.addEventListener("input", () => {
validateField(input);
updateProgress();
});
});
ratingInput.addEventListener("change", updateProgress);

// --- Field Validation ---
function validateField(input) {
if (input === nameInput)
nameError.textContent = isValidName(input.value) ? "" : "Enter a valid name (min 2 letters)";
if (input === emailInput)
emailError.textContent = isValidEmail(input.value) ? "" : "Enter a valid email address";
if (input === ratingInput)
ratingError.textContent = isValidRating(input.value) ? "" : "Select a rating between 1 and 5";
if (input === feedbackInput)
feedbackError.textContent = isValidFeedback(input.value) ? "" : "Feedback should be at least 5 characters";
}

// --- Form Submission ---
form.addEventListener("submit", function(e) {
e.preventDefault();
let valid = true;

if (!isValidName(nameInput.value)) {
nameError.textContent = "Enter a valid name (min 2 letters)";
nameInput.focus();
valid = false;
} else { nameError.textContent = ""; }
if (!isValidEmail(emailInput.value)) {
emailError.textContent = "Enter a valid email address";
if (valid) emailInput.focus();
valid = false;
} else { emailError.textContent = ""; }
if (!isValidRating(ratingInput.value)) {
ratingError.textContent = "Select a rating between 1 and 5";
if (valid) ratingInput.focus();
valid = false;
} else { ratingError.textContent = ""; }
if (!isValidFeedback(feedbackInput.value)) {
feedbackError.textContent = "Feedback should be at least 5 characters";
if (valid) feedbackInput.focus();
valid = false;
} else { feedbackError.textContent = ""; }

if (valid) {
formSuccess.innerHTML = `
    <span class="success-check"><i class="fa-solid fa-circle-check"></i></span>
    <span>Thank you! Your feedback has been submitted.</span>
`;
form.reset();
updateProgress();
setTimeout(() => { formSuccess.innerHTML = ""; }, 4000);
} else {
formSuccess.innerHTML = "";
}
});

// --- Gamification: Streaks (localStorage) ---
function updateStreak() {
const today = new Date().toISOString().slice(0,10);
let streak = Number(localStorage.getItem("feedbackStreak") || 0);
let last = localStorage.getItem("feedbackLast") || "";
if (last !== today) {
streak = (last === new Date(Date.now() - 86400000).toISOString().slice(0,10)) ? streak + 1 : 1;
localStorage.setItem("feedbackStreak", streak);
localStorage.setItem("feedbackLast", today);
}
if (streak > 1 && formSuccess) {
formSuccess.innerHTML += `<div class="streak-badge"><i class="fa-solid fa-fire"></i> Streak: ${streak} days!</div>`;
}
}

// --- Voice Input Handler ---
voiceBtns.forEach(btn => {
btn.addEventListener("click", function() {
if (!recognition) return;
const targetId = btn.getAttribute("data-for");
const target = document.getElementById(targetId);
btn.classList.add("active");
recognition.start();
recognition.onresult = function(event) {
    const transcript = event.results[0][0].transcript;
    if (target.tagName === "TEXTAREA" || target.tagName === "INPUT") {
    target.value = transcript;
    target.dispatchEvent(new Event("input"));
    }
    btn.classList.remove("active");
};
recognition.onerror = function() {
    btn.classList.remove("active");
};
recognition.onend = function() {
    btn.classList.remove("active");
};
});
});

// --- Initial Progress ---
updateProgress();
