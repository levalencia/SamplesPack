// This function is run when the app is ready to start interacting with the host application
// It ensures the DOM is ready before adding click handlers to buttons
Office.initialize = function (reason) {
    $(document).ready(function () {
        var panel;
        $('.tabs a').click(function () {
            // save $(this) in a variable for efficiency
            var $this = $(this);

            // hide panels
            $('.panel').hide();

            // remove the active state from the tabs if already set
            $('.tabs a.active').removeClass('active');

            // add active state to the tab
            $this.addClass('active').blur();
            // retrieve href from link (the id of panel to display)
            panel = $this.attr('href');
            // show panel
            $(panel).fadeIn(250);
            return (false);
        }); // end .tabs

        // open first tab
        $('.tabs li:first a').click();


        $('#setDataBtn').click(function () { setData($(panel).children('p')); });
            return (false);

    });
};

// Writes data from textbox to the current selection in the document
function setData(elementId) {
    Office.context.document.setSelectedDataAsync($(elementId).text());
}

