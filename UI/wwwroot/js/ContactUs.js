

//let form = document.getElementById('LoginForm')

//form.addEventListener('submit', (e) => {
    
//    let Email = document.getElementById('Email').value
//    let Password = document.getElementById('Password').value

//    let errors = []

//    if (Email.trim() === "") {
//        e.preventDefault()
//        errors.push("Please enter your Email Address.")
//    } else if (!isValidEmail(Email)) {
//        e.preventDefault()
//        errors.push("Please enter valid Email Address.")
//    }

//    if (Password.trim() === "") {
//        e.preventDefault()
//        errors.push("Please enter your Password.")
//    } 


//    function isValidEmail(Email) {
//        const EmailRegEx = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
//        return EmailRegEx.test(Email);
//    }

//    if (errors.length > 0) {
//        Swal.fire({            
//            icon: 'error',
//            title: 'Validation Error',
//            html: errors.join("</br>")
            
//        })
//        return false
//    }

//})

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
