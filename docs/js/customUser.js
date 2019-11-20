const LoggedOutLinks = document.querySelectorAll('.logged-out');
const LoggedInLinks = document.querySelectorAll('.logged-in');

const adjustLinks = (user) => {
    if (user) {
        //toggle NavBar and Footer elements
        LoggedInLinks.forEach(item => item.style.display='block');
        LoggedOutLinks.forEach(item => item.style.display='none');
    } else {
        LoggedInLinks.forEach(item => item.style.display='none');
        LoggedOutLinks.forEach(item => item.style.display='inline');
    }
}

