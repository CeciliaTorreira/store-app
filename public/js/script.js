// https://developer.mozilla.org/en-US/docs/Web/API/Window/DOMContentLoaded_event
document.addEventListener("DOMContentLoaded", () => {
  console.log("store-app JS imported successfully!");
});


let cookieMessage = document.getElementById('cookie-message');

let cookiesAccepted = localStorage.getItem('cookiesAccepted');


if (!cookiesAccepted) {
  cookieMessage.style.display = 'block';
} else {
  cookieMessage.style.display = 'none';
}


function acceptCookies() {
  localStorage.setItem('cookiesAccepted', 'true');
  cookieMessage.style.display = 'none';
}

function rejectCookies() {
  cookieMessage.style.display = 'none';
}