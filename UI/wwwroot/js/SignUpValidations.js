

let form = document.getElementById('SignUpForm')

form.addEventListener('submit', (e) => {

    let FirstName = document.getElementById('FirstName').value
    let LastName = document.getElementById('LastName').value
    let Email = document.getElementById('Email').value
    let Password = document.getElementById('Password').value
    let ConfirmPassword = document.getElementById('ConfirmPassword').value

    let errors = []

    if (FirstName.trim() === "") {
        e.preventDefault()
        errors.push("Please enter your First Name. ")
    }

    if (LastName.trim() === "") {
        e.preventDefault()
        errors.push("Please enter your Last Name. ")
    }

    if (Email.trim() === "") {
        e.preventDefault()
        errors.push("Please enter your Email Address. ")
    } else if (!isValidEmail(Email)) {
        e.preventDefault()
        errors.push("Please enter valid Email Address. ")
    }

    if (Password.trim() === "") {
        e.preventDefault()
        errors.push("Please enter your Password. ")
    } else if (Password.length < 6) {
        e.preventDefault()
        errors.push("Password must be at least 6 characters long.")
    } else if (!isValidPassword(Password)) {
        e.preventDefault()
        errors.push("Password must have at least a number, and at least a special character.")
    }       


    if (Password != ConfirmPassword) {
        e.preventDefault()
        errors.push("Password & Confirm Password is Not Matching. ")
    }


    function isValidEmail(Email) {
        const EmailRegEx = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        return EmailRegEx.test(Email);
    }

    function isValidPassword(Password) {
        const PasswordRegEx = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
        return PasswordRegEx.test(Password);
    }

    if (errors.length > 0) {
        Swal.fire({
            icon: 'error',
            title: 'Validation Error',
            html: errors.join('</br>')
        })
        return false
    }

})

$(document).ready(function () {
    IncorrectSignUp();
});

function IncorrectSignUp() {

    let ErrorSpan = document.getElementById('errorSpan')
    if (ErrorSpan.firstChild != null) {
        Swal.fire({
            icon: 'error',
            title: 'Sign Up Failed',
            text: 'This Email is already registered !!!'
        })
    }
}

