//listen for Auth Status
auth.onAuthStateChanged(user => {
    //console.log(user); //test
    if (user) {
        console.log("User is logged in", user);
        adjustLinks(user);
    } else {
        console.log("User is logged out");
        adjustLinks();
    }
});

//register
const signupForm = document.querySelector('#signup-form');
signupForm.addEventListener('submit', (e) => {
    e.preventDefault();

    //get user info
    const email = signupForm['signup-email'].value;
    const password = signupForm['signup-password'].value;

    //console.log(email,password); //test

    //sign up the user
    auth.createUserWithEmailAndPassword(email, password).then(cred => {
        //console.log(cred); //test
        const modal = document.querySelector('#signupModal');
        signupForm.reset();
    });
});

//logout
const logout = document.querySelector('#logout');
logout.addEventListener('click', (e) => {
    e.preventDefault();
    auth.signOut().then(() => {
        console.log('user signed out');
    });
});


//login
const loginForm = document.querySelector('#login-form');
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    //get user info
    const email = loginForm['login-email'].value;
    const password = loginForm['login-password'].value;

     //login the user
     auth.signInWithEmailAndPassword(email, password).then(cred => {
        //console.log(cred.user); //test
        const modal = document.querySelector('#loginModal');
        loginForm.reset();
    });

});