// to toglle the password hide unhide
function togglePassword() {
    const passwordInput = document.getElementById('password');
    const toggleIcon = document.getElementById('toggleIcon');

    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        toggleIcon.src = '/images/eye.svg';  
    } else {
        passwordInput.type = 'password';
        toggleIcon.src = '/images/eye-off.svg';  
    }
}


//flash message fade animation
window.addEventListener('DOMContentLoaded', () => {
const flashMessages = document.querySelectorAll('.flash-message');

flashMessages.forEach(msg => {
    setTimeout(() => {
        msg.classList.add('opacity-0', 'transition-opacity', 'duration-500');  // Add fade classes

        setTimeout(() => {
            msg.remove();  
        }, 500);  
    }, 1000); 
});
});



// time update 
function updateDateTime() {
const now = new Date();
const day = now.toLocaleDateString('en-US', { weekday: 'long' });
const date = now.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
const time = now.toLocaleTimeString('en-US');

document.getElementById('datetime').innerHTML = `
    <div class="text-2xl md:text-4xl  ">${day}</div>
    <div class="text-xs md:text-sm">${date}</div>
    <div class="text-2xl md:text-3xl mb-20 md:mb-2"> ${time}</div>
`;
}

setInterval(updateDateTime, 1000);  
updateDateTime();  


// email validator
async function validateEmail() {
    const email = document.getElementById("email").value;
    const apiKey = "a84c7fb312224cea9a63469748e80a43"; // Replace with actual API key
    const url = `https://api.hunter.io/v2/email-verifier?email=${email}&api_key=${apiKey}`;
  
    const response = await fetch(url);
    const data = await response.json();
  
    if (data.data.status === "valid") {
      req.flash('success', 'valid email');
    } else {
      req.flash('error' , 'invalid email');
    }
  }
  