//listen for submit
const loanForm = document.querySelector('#loanForm');
const amount = document.querySelector('#amount');
const interest = document.querySelector('#interest');
const years = document.querySelector('#years');
const monthlyPayment = document.querySelector('#monthlyPayment');
const totalPayment = document.querySelector('#totalPayment');
const totalInterest = document.querySelector('#totalInterest');

loadEventListeners();

function loadEventListeners(){
    loanForm.addEventListener('submit', calculateResults);
}

function calculateResults(e){

    e.preventDefault();
}