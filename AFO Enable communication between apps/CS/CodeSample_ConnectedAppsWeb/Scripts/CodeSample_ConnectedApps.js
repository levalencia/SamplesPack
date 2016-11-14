// Declare global variables for storing user data.
var percentage;
var downPayment;
var loanTerm;

// This function is run when the app is ready to start interacting with the host application.
// It ensures the DOM is ready before adding click handlers to buttons
Office.initialize = function (reason) {
    $(document).ready(function () {

        // Remove data from localStorage on unload.
        window.onunload = function () {
            localStorage.removeItem("percentage");
            localStorage.removeItem("downpayment");
            localStorage.removeItem("loanterm");
        }
    });
};

// NOTE: If you are using live data to set the values communicated to the other app
// for Office, you can set an interval to get and store the data on an intermittent
// basis.
//var providerInterval;

//function startTimer() {
//    providerInterval = setInterval(setValue, 100);

//}

// Set the current values to the localStorage.
function setValue() {

    try {
        // Get the user-selected values from the interface.
        percentage = document.getElementById('percentagerate').value;
        downPayment = document.getElementById('downpayment').value;

        var loanTermList = document.getElementById('loanterm');
        var index = loanTermList.selectedIndex;
        var termSelected = loanTermList.options[index];
        loanTerm = termSelected.value;

        // Define a function to make sure that the percentage
        // is a number between 0 and 10.
        var percentValid = function (value) {
            return (Number(value) < 10) &
                   (Number(value) > 0) &
                   !isNaN(value);
        }

        // Define a function to make sure that the down payment 
        // is a number greater than $1,000.00.
        var downValid = function (value) {
            return (Number(value) > 1000) &
                    !isNaN(value);
        }

        // Validate the user-entered values.
        if (validate(percentage, percentValid) &
            validate(downPayment, downValid)) {

            // Values are valid; update the data source.
            localStorage.setItem('percentage', percentage);
            localStorage.setItem('downpayment', downPayment);
            localStorage.setItem('loanterm', loanTerm);
        }
        else {
            var dataError = { name: "Data error", message: "Please check your data to make sure that it is correct." };
            throw dataError;
        }
    }
    catch (err) {
        Toast.showToast(err.name, err.message);
    }
}

// Check the value to make sure that it is within the accepted range.
function validate(value, compareFunction) {

    if (compareFunction(value)) {
        return true;
    }
    else {

        Toast.showToast("Data entry", value + " is not a valid value. <br />Please enter a valid value.");
        return false;
    }

}
