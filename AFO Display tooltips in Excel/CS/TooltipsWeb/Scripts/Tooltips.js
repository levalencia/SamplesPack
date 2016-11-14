// This function is run when the app is ready to start 
// interacting with the host application. It ensures 
// the DOM is ready before running the rest of the code.
Office.initialize = function (reason) {
    $(document).ready(function () {
        $('#span_help_01').hide();
        $('#span_help_02').hide();
        // Get the position of the keywords.
        var tooltip01Position = $('#keyword01').offset();
        var tooltip02Position = $('#keyword02').offset();
        $('#keyword01').mouseover(function () {
            // Show the tool tip at the specified position
            // and then slowly fade away.
           $('#span_help_01').show();
           $('#span_help_01').css({
            'position': 'absolute',
            'left': tooltip01Position.left,
            'top': tooltip01Position.top + 20
           }).fadeOut(4500);
        }); //end of keyword01 mouseover
        $('#keyword02').mouseover(function() {
            $('#span_help_02').show();
            $('#span_help_02').css({
                'position': 'absolute',
                'left': tooltip02Position.left,
                'top': tooltip02Position.top + 20
            }).fadeOut(4500);
        }); //end of keyword02 mouseover
    });
};

