//Declaring variable for Name element, then focusing by default.
const nameInput = document.querySelector('#name');
nameInput.focus();
// Selecting Job Role's 'Other', hidden by default, but if selected, text field
const jobRole = document.querySelector('select[name="user-title"]');
const otherJob = document.querySelector('#other-job-role');
otherJob.style.display = 'none';
//T-Shirt selected color and design elements, color is disabled by default
const shirtColor = document.querySelector('select[id=color]');
const shirtDesign = document.querySelector('select[name=user-design]');
const options = shirtColor.children;
shirtColor.disabled = true;
//Registering for activities
//Declared variables to target the form, and the activities cost per event
const registerForm = document.querySelector('#activities');
const total = document.querySelector('[id="activities-cost"]');
const activityBoxes = registerForm.querySelectorAll('input[type="checkbox"]');
let totalCost = 0;
//Payment Info
const selectPayment = document.querySelector('select[id="payment"]');
const paypal = document.querySelector('#paypal');
const bitcoin = document.querySelector('#bitcoin');
let paidCredit = true;
let paidOther = false;
/* Form Validation */
const validateDoc = document.querySelector('form');
const emailInput = document.querySelector('#email');
const checkedActivities = document.getElementById('activities-hint')
const zipCode = document.querySelector('#zip')
const ccNum = document.querySelector('#cc-num');
const ccCode = document.querySelector('#cvv');
const isValidName = () => {
    if (nameInput.value.trim().length !== 0) {
        return nameInput.value;
    }
};
const isValidEmail = () => /^[^@]+@[^@.]+\.[A-za-z]+$/i.test(emailInput.value);
const isActivity = () => {
    return totalCost > 0;
};
const isZipCode = () => /^\d{5}$/.test(zipCode.value);
const isNum = () => /^\d{13,16}$/.test(ccNum.value.trim());
const isCvv = () => /^\d{3}$/.test(cvv.value);
//Event listeners for Job Role, Shirt Design, and Activities

jobRole.addEventListener('change', (e) => {

    if (e.target.value === 'other') {
        otherJob.style.display = 'block';
    } else {
        otherJob.style.display = 'none';
    }
    console.log(e.target.value);
});

shirtDesign.addEventListener('change', (e) => {
    shirtColor.disabled = false;
    const selectedOption = e.target.value;
    for (let i = 0; i < options.length; i++) {
        options[0].selected = true;
        if (selectedOption !== options[i].getAttribute('data-theme')) {
            options[i].hidden = true;
            options[i].disabled = true; 
        } else {
            options[i].hidden = false;
            options[i].disabled = false;
        }
    }; 
});

registerForm.addEventListener('change', (e) => {
    const choice = e.target;
    const cost = parseInt(choice.dataset.cost);
    choice.checked ? totalCost += cost : totalCost -= cost;
    total.innerHTML = `Total: $${totalCost}`;

});

/* Activities Section
Accessbility */
activityBoxes.forEach(box => {
    box.addEventListener('focus', () => box.parentElement.classList.add('focus'));
    box.addEventListener('blur', () => box.parentElement.classList.remove('focus'));
});

/* Payment Info
Stored paymentOptions into a dictionary, keeping it hidden until choice was made
Created variables to see which payment method user chooses for submission event handling */
selectPayment.options[1].selected = true;
if (selectPayment.options[1].selected = true) {
    paypal.hidden = true;
    bitcoin.hidden = true;
}

function showPaymentOptions(paymentChoice) {
    const paymentOption = {
    "credit-card": document.querySelector('#credit-card'),
    "paypal": document.querySelector('#paypal'),
    "bitcoin": document.querySelector('#bitcoin')
};
    for (let option in paymentOption) {
        paymentOption[option].hidden = true;
    }

    if (paymentOption[paymentChoice]) {
        paymentOption[paymentChoice].hidden = false;
    }
};

selectPayment.addEventListener('change', (e) => {
    const choice = e.target.value;
    showPaymentOptions(choice);
    if (choice === 'paypal' || choice === 'bitcoin') {
        paidOther = true;
        paidCredit = false;
    } else if (choice === 'credit-card') {
        paidCredit = true;
    }
    
});

function validation(inputElement, fn, e) {
    if (fn()) {
        inputElement.className = "valid";
        inputElement.classList.remove("not-valid");
        inputElement.lastElementChild.style.display = "none";
        return true;
    } else {
        if (e) e.preventDefault();
        inputElement.className = "not-valid";
        inputElement.lastElementChild.style.display = "block";
        return false;
    }
};

validateDoc.addEventListener('submit', (e) => {
    validation(nameInput.parentElement, isValidName, e);
    validation(emailInput.parentElement, isValidEmail, e);
    validation(registerForm, isActivity, e);
    /* Just in case the activityForm doesn't need to have valid + not-valid classNames */
    // if (totalCost === 0) {
    //     registerForm.lastElementChild.style.display = "block";
    // } else {
    //     registerForm.lastElementChild.style.display = "none";
    // }

    //Conditional messaging for payment method
    if (paidCredit) {
        validation(zipCode.parentElement, isZipCode, e);
        validation(ccNum.parentElement, isNum, e);
        validation(cvv.parentElement, isCvv, e);
    }
    //Conditional messaging for email
    if (!emailInput.value) {
        emailInput.parentElement.lastElementChild.textContent = "Please provide an email address";
    } else {
        emailInput.parentElement.lastElementChild.textContent = "Please check your email address formatting."
    }
    
});

/* Exceeds Expectations - Real Time Validator */
ccNum.addEventListener('keyup', () => {
    validation(ccNum.parentElement, isNum);
});

nameInput.addEventListener('keyup', () => {
    validation(nameInput.parentElement, isValidName);
})

/* Exceeds Expectations - Conflicting Events */

function ConflictingChecks(e) {
    const selectedCheck = e.target;
    const selectedTime = selectedCheck.getAttribute('data-day-and-time');
    const allCheckboxes = document.querySelectorAll('input[type="checkbox"]'); 

    allCheckboxes.forEach(check => {
        if (check !== selectedCheck && check.getAttribute('data-day-and-time') === selectedTime) {
            check.disabled = selectedCheck.checked;
        }
    });
}
activityBoxes.forEach(check => {
    check.addEventListener('change', ConflictingChecks)
});
