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

//logout
const logout = document.querySelector('#logout');
logout.addEventListener('click', (e) => {
    e.preventDefault();
    auth.signOut().then(() => {
        console.log('user signed out');
        $('#logoutModal').modal('show');
    });
});


//login auth
const loginForm = document.querySelector('#login-form');
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    //get user info
    const email = loginForm['login-email'].value;
    const password = loginForm['login-password'].value;

     //login the user
     auth.signInWithEmailAndPassword(email, password).then(cred => {
        //console.log(cred.user); //test
        // const modal = document.querySelector('#loginModal');
        $('#loginModal').modal('hide');
        loginForm.reset();
    });

});