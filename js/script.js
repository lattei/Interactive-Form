
//Declaring variable for Name element, then focusing by default.
const nameInput = document.querySelector('#name');
nameInput.focus();

// Selecting Job Role's 'Other', hidden by default, but if selected, text field
const jobRole = document.querySelector('select[name="user-title"]');
const otherJob = document.querySelector('#other-job-role');
otherJob.style.display = 'none';

//Event listener, checks if Other was selected and to show the text if so.

jobRole.addEventListener('change', (e) => {

    if (e.target.value === 'other') {
        otherJob.style.display = 'block';
    } else {
        otherJob.style.display = 'none';
    }
    console.log(e.target.value);
});

//T-Shirt selected color and design elements, color is disabled by default
const shirtColor = document.querySelector('select[id=color]');
const shirtDesign = document.querySelector('select[name=user-design]');
const options = shirtColor.children;
//console.log(options[0].value);
shirtColor.style.display = 'none';

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

/* Registering for activities
Declared variables to target the form, and the activities cost per event
Created event listener to add to total cost when checked.

*/
const registerForm = document.querySelector('#activities');
const total = document.querySelector('p[id="activities-cost"]');
const activityBoxes = registerForm.querySelectorAll('input[type="checkbox"]');
console.log(activityBoxes);
let totalCost = 0;

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
Created variables to see which payment method user chooses for submission event handling
*/

const selectPayment = document.querySelector('select[id="payment"]');
let paidCredit = false;
let paidOther = false;
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

/* Form Validation */
const validateDoc = document.querySelector('form');
const emailInput = document.querySelector('#email');
// const ccCredentials = 
const zipCode = document.querySelector('#zip')
const ccNum = document.querySelector('#cc-num');
const ccCode = document.querySelector('#cvv');
/* Creating Validators for the Criteria needed
*/
const isValidName = () => {
    // nameInput.value.trim().length === 0 ? e.preventDefault() : nameInput.value;
    if (nameInput.value.trim().length !== 0) {
        return nameInput.value;
    }

}
const isValidEmail = () => /^[^@]+@[^@.]+\.[a-z]+$/i.test(emailInput.value);
const isZipCode = () => /^\d{5}$/.test(zipCode.value);
const isNum = () => /^\d{13,16}$/.test(ccNum.value.trim());
const isCvv = () => /^\d{3}$/.test(cvv.value);
function isValidCredit(){
    if (paidCredit && isZipCode() && isNum() && isCvv()) {
        ccNum.parentElement.classList.add('valid');
        zipCode.parentElement.classList.add('valid');
        cvv.parentElement.classList.add('valid');
        return true;
    } else {
        console.log('uh oh..');
    }
    
}




validateDoc.addEventListener('submit', (e) => {
    if (totalCost === 0) {
        e.preventDefault();
        console.log('choose an event!!');
        document.querySelector('[id="activities-hint"]').style.display = 'block';

    } else {

    }
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
    validation(zipCode.parentElement, isZipCode);
    validation(ccNum.parentElement, isNum);
    validation(cvv.parentElement, isCvv);

    //  else if (isValidCredit() || paidOther) {
    //     e.preventDefault();
    //     console.log('ooo you got adult money huh?');
    // } else {
    //     e.preventDefault();
    //     console.log('wait a min..');
    // }

});

