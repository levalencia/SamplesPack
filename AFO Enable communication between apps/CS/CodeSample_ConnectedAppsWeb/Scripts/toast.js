// Add a dynamically-created div "toast" for displaying errors to the user.
var Toast = (function () {

    var Toast = "divToast",
        Close = "btnClose",
        Notice = "lblNotice",
        Output = "lblOutput",
        divToast;

    // Create new HTMl elements dynamically.
    function buildNode(elementType, options, text) {
        var newElement = document.createElement(elementType);
        for (var i = 0; i < options.length; i++) {
            newElement.setAttribute(options[i][0], options[i][1]);
        }
        if (text) { newElement.innerHTML = text; }
        return newElement;
    }

    // Show the toast with the specified information.
    function showToast(title, message) {

        if (document.getElementById(Toast) == null) {
            createToast();
        }

        document.getElementById(Notice).innerText = title;
        document.getElementById(Output).innerText = message;

        // Provide implementations for solutions with and without jQuery.
        if (typeof $ !== 'undefined') {
            $("#" + Toast).hide();
            $("#" + Toast).show("slow");
        }
        else {
            divToast.style.display = "none";
            divToast.style.display = "block";
        }
    }

    // Create the display for the toast.
    function createToast() {
        var  lblClose, btnClose, divOutput;

        // Create the container div.
        var toastStyle = "background-color:rgba(128, 128, 128, 0.77);" +
            "position:absolute;" +
            "bottom:0px;" +
            "width:90%;" +
            "text-align:center;" +
            "font-size:11pt;";
        divToast = buildNode("div", [["style", toastStyle], ["id", Toast]]);

        // Create the close button as a div with a single span.
        var btnStyle = "text-align:right;" +
            "padding-right:10px;" +
            "font-size:10pt;" +
            "cursor:default";
        lblClose = buildNode("div", [["style", btnStyle], ["id", Close]], "CLOSE ");
        btnClose = buildNode("span", [["style", "cursor:pointer;"], ["onclick", "Toast.close()"]], "X");
        lblClose.appendChild(btnClose);

        // Create the div with the toast title and message.
        divOutput = buildNode("div", [["id", "divOutput"], ["style", "margin-top:0px"]],
            "<span id='lblNotice' style='font-weight:bold;margin-top:0px;'></span><br />" +
            "<span id='lblOutput'></span>");

        // Add the child nodes to the toast div.
        divToast.appendChild(lblClose);
        divToast.appendChild(divOutput);

        // Add the toast div to the document body.
        document.body.appendChild(divToast);
    }

    // Close the toast.
    function close() {

        // Provide implementations for solutions with and without jQuery.
        if (typeof $ !== 'undefined') {
            $("#" + Toast).hide("slow");
        }
        else {
            divToast.style.display = "none";
        }
    }

    return {
        showToast: showToast,
        close: close
    };

})();