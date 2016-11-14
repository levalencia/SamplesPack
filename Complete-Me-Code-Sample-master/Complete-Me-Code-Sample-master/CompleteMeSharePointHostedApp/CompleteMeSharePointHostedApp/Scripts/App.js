'use strict';
var TaskListName = 'Tasks';
var myApp = angular.module('myApp', ['ui.bootstrap']);

var hostweburl;
var appweburl;
var currentUser;

// This code runs when the DOM is ready and creates a context object which is needed to use the SharePoint object model
$(document).ready(function () {
    SP.SOD.executeOrDelayUntilScriptLoaded(runMyCode, "SP.js");
    function runMyCode() {

    }
});