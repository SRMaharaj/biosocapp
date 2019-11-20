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
        // const modal = document.querySelector('#signupModal');
        $('#signupModal').modal('hide');
        signupForm.reset();
        $('#successModal').modal('show');
    });
});