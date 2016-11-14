// Get the values entered into the task pane.
var errTitle, errMessage;

// Add any initialization logic to this function
Office.initialize = function (reason) {
    $(document).ready(function () {

        errTitle = document.getElementById('error-title');
        errMessage = document.getElementById('error-message');

        // Detect the availability of the HTML5 placeholder attribute.
        // Otherwise, use the focusin/focusout events to dynamically change
        // placeholder text.
        if (typeof errTitle.placeholder !== 'undefined') {
            errTitle.placeholder = "Type an error name";
            errMessage.placeholder = "Type an error message";
        }
        else {
            errTitle.value = "Type an error name";
            errMessage.value = "Type an error message";

            // Wire up event listeners to input elements.
            errTitle.addEventListener("focusin", function (evt) {
                changeText(evt.target, false);
            });
            errTitle.addEventListener("focusout", function (evt) {
                changeText(evt.target, false);
            });
            errMessage.addEventListener("focusin", function (evt) {
                changeText(evt.target, false);
            });
            errMessage.addEventListener("focusout", function (evt) {
                changeText(evt.target, false);
            });
        }

        // Tell the user that the app has initialized.
        Toast.showToast("Event", "App initialized.")
    });
}

// Saves the specified settings typed into the textboxes and
// throws a custom defined error.
function throwError() {
    try {

        // Define and throw a custom error.
        var customError = { name: errTitle.value, message: errMessage.value }
        throw customError;

    }
    catch (err) {

        // Catch the error and display it to the user.
        Toast.showToast("Error: " + err.name, err.message);
    }
    finally {
        if (typeof errTitle.placeholder === 'undefined') {
            // Change the text in the text boxes.
            changeText(errTitle, true);
            changeText(errMessage, true);
        }
        else {
            errTitle.value = "";
            errMessage.value = "";

        }
    }
}

// Changes the UI text for onfocusin, onfocusout, and save/get events.
function changeText(node, isAction) {

    // Gets the id of the node that raised the event.
    var inputId = node.id;
    var inputText = "Type an error ";

    // Changes the text displayed in the text boxes.
    switch (inputId) {
        case "error-title":
            inputText += "name";
            break;
        case "error-message":
            inputText += "message";
            break;
    }

    // Determines whether an action has just taken place, 
    // or whether the user has started making changes to 
    // the text boxes.
    if (node.value == inputText) { node.value = ""; }
    else if (node.value != "" & !isAction) { }
    else { node.value = inputText; }

}
