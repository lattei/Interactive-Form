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
shirtColor.style.display = 'none';
//Registering for activities
//Declared variables to target the form, and the activities cost per event
const registerForm = document.querySelector('#activities');
const total = document.querySelector('[id="activities-cost"]');
const activityBoxes = registerForm.querySelectorAll('input[type="checkbox"]');
let totalCost = 0;
//Payment Info
const selectPayment = document.querySelector('select[id="payment"]');
let paidCredit = false;
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
const isValidEmail = () => /^[^@]+@[^@.]+\.[a-z]+$/i.test(emailInput.value);
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
    shirtColor.style.display = 'block';
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
    if (choice === 'credit-card') {
        paidCredit = true;
        console.log("they're using the card, sir");
    } else if (choice === 'paypal' || choice === 'bitcoin') {
        paidOther = true;
    }
    
});

validateDoc.addEventListener('submit', (e) => {
    // if (totalCost === 0) {
    //     e.preventDefault();
    //     registerForm.className = "not-valid";
    //     document.getElementById('activities-hint').style.display = 'block';
    // } else {
    //     registerForm.className = "valid";
    //     registerForm.classList.remove("not-valid");
    //     document.getElementById('activities-hint').style.display = 'none';
    // }
    const validation = (inputElement, fn) => {
        if (fn()) {
            inputElement.className = "valid";
            inputElement.classList.remove("not-valid");
            inputElement.lastElementChild.style.display = "none";
            
        } else {
            e.preventDefault();
            inputElement.className = "not-valid";
            inputElement.lastElementChild.style.display = "block";
        }
    };
    validation(nameInput.parentElement, isValidName);
    validation(emailInput.parentElement, isValidEmail);
    validation(registerForm, isActivity);
    if (paidCredit) {
        validation(zipCode.parentElement, isZipCode);
        validation(ccNum.parentElement, isNum);
        validation(cvv.parentElement, isCvv);
    } else if (!paidOther) {
        e.preventDefault();
        console.log('Select a payment method!')
    }
});

