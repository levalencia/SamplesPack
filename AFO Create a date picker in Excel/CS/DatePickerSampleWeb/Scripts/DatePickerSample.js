// This function is run when the app is ready to start interacting with the host application
// It ensures the DOM is ready before adding click handlers to buttons
Office.initialize = function (reason) {
    $(document).ready(function () {
        // Set various options of the datepicker such as display
        // multiple years in a downdown list, provide alternate
        // date formatting, and prev and next month options.
        var options = {
            numberOfMonths: 1,
            changeYear: true,
            yearRange: "-2:+2",
            altField: "#alternate",
            altFormat: "DD, d MM, yy"
        }
        $("#datepicker").datepicker(options).click(function () {
            $('#alternate').css('visibility', 'visible');
        });

        $('#setDateBtn').click(function () {
            setData('#alternate');
        });

    });
};

// Writes data from textbox to the current selection in the document
function setData(elementId) {
    Office.context.document.setSelectedDataAsync($(elementId).val());
}