//listen for submit
const card = document.querySelector('.card');
const heading = document.querySelector('.heading');
const loanForm = document.querySelector('#loanForm');
const amount = document.querySelector('#amount');
const interest = document.querySelector('#interest');
const years = document.querySelector('#years');
const loader = document.querySelector('#loading');
const results = document.querySelector('#results');
const monthlyPayment = document.querySelector('#monthlyPayment');
const totalPayment = document.querySelector('#totalPayment');
const totalInterest = document.querySelector('#totalInterest');

loadEventListeners();

function loadEventListeners(){
    loanForm.addEventListener('submit', (event) => {
        //hide results
        results.style.display = 'none';
        //hide loader
        loader.style.display = 'block';
        //call calculate results after a second
        setTimeout(calculateResults, 1000);

        event.preventDefault();
    });
}

function calculateResults(){
    const principal = parseFloat(amount.value);
    const calculatedInterest = parseFloat(interest.value)/100/12;
    const calculatedPayments = parseFloat(years.value) * 12;
    
    //calculate monthly payment
    const x = Math.pow(1 + calculatedInterest, calculatedPayments);
    const monthly = (principal * x * calculatedInterest)/(x-1);

    if(isFinite(monthly)){
        monthlyPayment.value = monthly.toFixed(2);
        totalPayment.value = (monthly * calculatedPayments).toFixed(2);
        totalInterest.value = ((monthly * calculatedPayments) - principal).toFixed(2);
        results.style.display = 'block';
    }else{
        monthlyPayment.value ='';
        totalPayment.value = '';
        totalInterest.value = '';
        showError('Please check your numbers');
    }
    loader.style.display = 'none';
    console.log('test');
}

function showError(error){
    //create div
    const errorDiv = document.createElement('div');
    errorDiv.className = 'alert alert-danger';
    //create text node and append to div
    errorDiv.appendChild(document.createTextNode(error));
    //insert error above heading
    card.insertBefore(errorDiv, heading);

    //clear error after 3 seconds
    setTimeout(clearError, 3000);
}

function clearError(){
    document.querySelector('.alert').remove();
}