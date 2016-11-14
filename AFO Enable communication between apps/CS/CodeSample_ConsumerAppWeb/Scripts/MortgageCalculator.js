// Calculate the monthly payment for the mortgage.
function calculatePayment(loanAmount, loanTerm, percentage) {

    // The following formula is used to calculate the fixed monthly payment (P) 
    // required to fully amortize a loan of L dollars over a term of n months 
    // at a monthly interest rate of c. [If the quoted rate is 6%, for example, c is .06/12 or .005]. 
    //P = L[c(1 + c)n]/[(1 + c)n - 1]

    var monthlyPayment; // = 1978.85;
    var monthlyInterestRate = (percentage / 100) / 12;

    monthlyPayment = loanAmount * ((monthlyInterestRate * Math.pow(1 + monthlyInterestRate, loanTerm)) / (Math.pow(1 + monthlyInterestRate, loanTerm) - 1));

    monthlyPayment = monthlyPayment.toFixed(2);
    return monthlyPayment
}