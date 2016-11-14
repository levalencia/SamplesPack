/// <reference path="../App.js" />

(function () {
    "use strict";

    // The initialize function must be run each time a new page is loaded
    Office.initialize = function (reason) {
        $(document).ready(function () {
            app.initialize();

            $('#update-client').click(updateClient);
            $('#show-is-built-in').click(showXMLPartBuiltIn);
            $('#add-part').click(addCustomXMLPart);
            $('#delete-part').click(deleteCustomXMLPart);

        });
    };


    function updateClient() {
        // Get Custom XML Part object
        Office.context.document.customXmlParts.getByNamespaceAsync("TimeSummary", onGotXml);
    }


    function onGotXml(asyncResult) {

        // Get the client-level node
        if (asyncResult.value.length > 0)
            asyncResult.value[0].getNodesAsync("/ns0:TimeSummary[1]/ns0:Client[1]", onGotNode);

    }


    function onGotNode(asyncResult) {

        var clientName = document.getElementById("txtClientName").value;

        // Set client-node XML
        asyncResult.value[0].setXmlAsync("<Client xmlns='TimeSummary'>" + " " + clientName + "</Client>");

    }

    function addCustomXMLPart() {
        Office.context.document.customXmlParts.addAsync("<book xmlns='NewCustomXmlPart'>" +
            "<page number='1'>Hello</page>" +
            "<page number='2'>World!</page></book>")
    }

    function deleteCustomXMLPart() {
        Office.context.document.customXmlParts.getByNamespaceAsync("NewCustomXmlPart", deletePart);

    }

    function deletePart(asyncResult) {
        if (asyncResult.value.length > 0) {
            for (var i = 0; i < asyncResult.value.length; i++) {
                asyncResult.value[i].deleteAsync();
            }
        }
    }

    function showXMLPartBuiltIn() {
        Office.context.document.customXmlParts.getByIdAsync("{B5BE1450-13E1-4511-B22C-03F95E715B17}", function (result) {
            var xmlPart = result.value;
            if (xmlPart.builtIn)
                app.showNotification('CustomXML part is built in!');
            else
                app.showNotification('CustomXML part is not built in');
        });
    }

})();


