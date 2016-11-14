﻿/// <reference path="../App.js" />

(function () {
    "use strict";

    // The initialize function must be run each time a new page is loaded
    Office.initialize = function (reason) {
        $(document).ready(function () {
            app.initialize();

            // Add event handler to button click event for the 'get-translation' button.
            $('#get-translation').click(getDataFromSelection);
        });
    };

    // Reads data from current document selection and displays a notification
    function getDataFromSelection() {
        $("#result-word")[0].innerText = "Working on it ...";
        Office.context.document.getSelectedDataAsync(Office.CoercionType.Text,
            function (result) {
                if (result.status === Office.AsyncResultStatus.Succeeded) {

                    // Make sure that a word is currently selected.
                    if ((result.value != "") &&
                        (result.value != undefined)) {

                        // Get a translation for the current selected word.
                        getTranslation(result.value);
                    }
                    else {
                        app.showNotification("Oops!", "Please select a word to translate.");
                    }

                } else {
                    app.showNotification('Error:', result.error.message);
                }
            }
        );
    }

    // Translates the specified source word from the user-defined 
    // source language to the user-defined target language.
    function getTranslation(sourceWord) {

        try {

            // Create a new HTTP request object and get the 
            // source and target language selections from the UI.
            var xhr = new XMLHttpRequest(),
                sourceLangList = $("#source-lang")[0],
                targetLangList = $("#target-lang")[0],
                sourceLang = sourceLangList[sourceLangList.selectedIndex].value,
                targetLang = targetLangList[targetLangList.selectedIndex].value;

            // Define the URL with parameters to call the Web service.
            var translateRequest = "../Translate.asmx/TranslateSelection?word=" +
                sourceWord + "&sourcelang=" + sourceLang + "&targetlang=" + targetLang;

            // Open the HTTP request and constrain the response type to a document.
            xhr.open("POST", translateRequest);
            xhr.responseType = 'document';

            // Define the onload event handler for the HTTP request object (callback).
            xhr.onload = function () {
                
                // Parse the response from the Web service and 
                // present the result to the user.
                var result = parseResponse(xhr.responseXML);
                $("#result-word")[0].innerText = result;
            }

            // Send the HTTP request.
            xhr.send();
        }
        catch (ex) {
            app.showNotification(ex.name, ex.message);
        }
    }

    // Read the XML from the response from the Web service
    // and extract the translation data from the XML.
    function parseResponse(responseText) {
        var response = "Cannot read response.",
            xmlDoc;

        try {
            // Read the node value of the first and only string
            // element included in the response from the server.
            response = responseText.getElementsByTagName("string")[0].firstChild.nodeValue;
        }
        catch (ex) {
            app.showNotification(ex.name, ex.message);
        }

        return response;
    }

})();