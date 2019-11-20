//customize navbar links based on if user is logged in or out
const LoggedOutLinks = document.querySelectorAll('.logged-out');
const LoggedInLinks = document.querySelectorAll('.logged-in');
const welcomeMessage = document.querySelector('#welcomeMessage');

const adjustLinks = (user) => {
    if (user) {
        //toggle NavBar and Footer elements
        LoggedInLinks.forEach(item => item.style.display='block');
        LoggedOutLinks.forEach(item => item.style.display='none');

        //Login personalized message
        const html=`
            Welcome ${user.email}
        `;
        welcomeMessage.innerHTML = html;
    } else {
        LoggedInLinks.forEach(item => item.style.display='none');
        LoggedOutLinks.forEach(item => item.style.display='inline');

         // hide login personalized message
         welcomeMessage.innerHTML = '';
    }
}

