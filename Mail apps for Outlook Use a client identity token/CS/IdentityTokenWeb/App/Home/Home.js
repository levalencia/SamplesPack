﻿/// <reference path="../App.js" />
var xhr;
var token;

// Update the service URL to point to your service location.
var serviceURL = "https://localhost:44311/api/IdentityToken/";

(function () {
    "use strict";

    // The Office initialize function must be run each time a new page is loaded
    Office.initialize = function (reason) {
        $(document).ready(function () {
            app.initialize();

            initApp();
        });
    };

  // Initialize the mail app for Outlook.
    function initApp() {
      $("#content-footer").hide();
    };
})();

// Makes a request to the Exchange server for an identity token.
// Note: This function saves the identity token for later use; however, it does
//       not check that the token is still valid before using it. In your application,
//       you should check the expiration date and time of the token before using it.
function useIdentityToken() {
  // If the token has not been requested, get a token from the Exchange server.
  if (token == null) {
    Office.context.mailbox.getUserIdentityTokenAsync(serviceCallback);
  } else {
    // There is already a token available, so use it to make a request to the service.
    makeServiceRequest(token, "", "");
  };
};

// Function called when the request for an identity token is complete.
function serviceCallback(asyncResult, userContext) {
  // Cache the token from the Exchange server.
  token = asyncResult.value;
  // Make a request to the service.
  makeServiceRequest(token, "", "");
};

// Create a XML request to the JSON web service.
function makeServiceRequest(token, serviceUserName, password) {
  xhr = new XMLHttpRequest();

  xhr.open("POST", serviceURL);
  xhr.setRequestHeader("Content-Type", "application/json; charset=utf-8");
  xhr.onreadystatechange = requestReadyStateChange;

  var request = new Object();
  request.token = token;
  request.serviceUserName = serviceUserName;
  request.password = password;

  // Send the request. The response is handled in the requestReadyStateChange function.
  xhr.send(JSON.stringify(request));
};

// Handles the response from the JSON web service.
function requestReadyStateChange() {
  if (xhr.readyState == 4 && xhr.status == 200) {
    var response = JSON.parse(xhr.responseText);

    if (response.isValidToken) {
      if (response.isKnown) {
        // The response indicates that the server recognized the 
        // client identity. Update the instructions and show the response.

        var first = document.getElementById("first");
        first.setAttribute("class", "hiddenPage");
        var second = document.getElementById("second");
        second.setAttribute("class", "displayedPage");

        app.showNotification("Response", response.message);
      } else {
        // The response indicates that the server did not 
        // recognize the client identity. Get credentials from the user.
        getCredentials();
      }
    }
    else {
      app.showNotification("Error", "Invalid identity token.");
    }
  }
};

// Shows the interface for getting credentials from the user.
function getCredentials() {
  app.showNotification("Login required", "Your Exchange ID is not associated with a service user. Login to access the service.");

  var header = document.getElementById("header");
  header.setAttribute("class", "hiddenPage");

  var logonForm = document.getElementById("logonForm");
  logonForm.setAttribute("class", "displayedPage");
};

// Pass the user's credentials to the JSON web service.
function login() {

  var serviceUserName = document.getElementById("serviceUserName");
  var password = hash(document.getElementById("password"));

  var logonForm = document.getElementById("logonForm");
  logonForm.setAttribute("class", "hiddenPage");

  var header = document.getElementById("header");
  header.setAttribute("class", "displayedPage");

  makeServiceRequest(token, serviceUserName.value, password);
};

// It's a good idea to hash or encrypt a password before
// sending to the service. To keep this sample readable,
// the hashing function returns a simple string for all
// requests. You should make sure that you send passwords
// over the network in a form that meets the security
// requirements of your organization.
function hash(element) {
  return element.value + "NOT_HASHED";
}