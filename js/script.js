
//Declaring variable for Name element, then focusing by default.
const nameInput = document.querySelector('#name');
nameInput.focus();

// Selecting Job Role's 'Other', hidden by default, but if selected, text field
const jobRole = document.querySelector('select[name="user-title"]');
const otherJob = document.querySelector('#other-job-role');
// console.log(jobRole);
// console.log(otherJob);
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

// Register for Activities
const registerForm = document.querySelector('#activities');
const total = document.querySelector('p[id="activities-cost"]');
let totalCost = 0;
console.log(totalCost);

registerForm.addEventListener('change', (e) => {

    const choice = e.target
    const cost = parseInt(choice.dataset.cost);
    // if (choice.checked) {
    //     totalCost += cost;
    // } else {
    //     totalCost -=cost;
    // }
    choice.checked ? totalCost += cost : totalCost -= cost;
    console.log(totalCost);
    total.innerHTML = `Total: $${totalCost}`;
});
