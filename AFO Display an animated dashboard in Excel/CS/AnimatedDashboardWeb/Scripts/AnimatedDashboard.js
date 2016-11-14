// This function is run when the app is ready to start interacting with the host application
// It ensures the DOM is ready before adding event handlers.
// The techniques illustrated in this sample are described in the book
// "JavaScript & jQuery: the Missing Manual" by David Sawyer McFarland.
Office.initialize = function (reason) {
    $(document).ready(function () {
        $('#dashboard').hover(
   function() {
       $(this).stop().animate(
       {
           left: '0'
       },
       500,
       'easeInSine'
       ); // end animate
   }, 
   function() {
       $(this).stop().animate(
      {
          left: '-92px'
      },
      1500,
      'easeOutBounce'
      ); // end animate
   }
); // end hover

        $('#getDataBtn').click(function () { getData('#selectedDataTxt'); });

        $('#setDataBtn').click(function () { setData('#selectedDataTxt'); });
    }); 
}; 

// Writes data from textbox to the current selection in the document
function setData(elementId) {
    Office.context.document.setSelectedDataAsync($(elementId).val());
}

// Reads the data from current selection of the document and displays it in a textbox
function getData(elementId) {
    Office.context.document.getSelectedDataAsync(Office.CoercionType.Text,
    function (result) {
        if (result.status === 'succeeded') {
            $(elementId).val(result.value);
        }
    });
}