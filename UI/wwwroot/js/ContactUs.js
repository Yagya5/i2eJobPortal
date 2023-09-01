

let form = document.getElementById('ContactForm')

form.addEventListener('submit', (e) => {

    let FirstName = document.getElementById('FirstName').value
    let LastName = document.getElementById('LastName').value
    let Phone = document.getElementById('Phone').value
    let Email = document.getElementById('Email').value
    let Message = document.getElementById('Message').value

    let errors = []

    if (FirstName.trim() === "") {
        e.preventDefault()
        errors.push("Please enter your First Name.")
    } 

    if (LastName.trim() === "") {
        e.preventDefault()
        errors.push("Please enter your Last Name.")
    } 

    if (Phone.trim() === "") {
        e.preventDefault()
        errors.push("Please enter your Phone Number.")
    } else if (!isValidPhone(Phone)) {
        e.preventDefault()
        errors.push("Please enter valid Phone Number.");
    }

    if (Email.trim() === "") {
        e.preventDefault()
        errors.push("Please enter your Email Address.")
    } else if (!isValidEmail(Email)) {
        e.preventDefault()
        errors.push("Please enter valid Email Address.")
    }

    if (Message.trim() === "") {
        e.preventDefault()
        errors.push("Please enter your Message/Query.")
    } 

    


    function isValidEmail(Email) {
        const EmailRegEx = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        return EmailRegEx.test(Email);
    }

    function isValidPhone(Phone) {
        const PhoneRegEx = /^(\+91[\-\s]?)?[0]?(91)?[789]\d{9}$/;
        return PhoneRegEx.test(Phone);
    }

    if (errors.length > 0) {
        Swal.fire({            
            icon: 'error',
            title: 'Validation Error',
            html: errors.join("</br>")
            
        })
        return false
    }

})

$(document).ready(function () {
    MessageSubmitted();
});

function MessageSubmitted() {
    
    let SuccessMessage = document.getElementById('SuccessMessage')
    if (SuccessMessage.firstChild != null) {
        Swal.fire({
            icon: 'success',
            title: 'Submitted',
            text: 'Your Message/Query Has Been Submitted.'
        })
    }
}
