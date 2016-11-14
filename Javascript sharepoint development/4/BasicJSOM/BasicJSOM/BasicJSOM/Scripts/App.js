"use strict"

var BasicJSOM = window.BasicJSOM || {};
BasicJSOM.Batching = BasicJSOM.Batching || {};
BasicJSOM.Utilities = BasicJSOM.Utilities || {};
BasicJSOM.Demo = BasicJSOM.Demo || {};

BasicJSOM.Utilities.LogResult = function (msg) {
    $(".resultsDisplaySingle p").removeClass("highlighted");
    $(".resultsDisplay p").removeClass("highlighted");
    $("#results").append("<p class='highlighted'>" + msg + "</p>");
    $("#results").append("<hr>");
}

BasicJSOM.Utilities.Fail = function (sender, args, msg) {
    BasicJSOM.Utilities.LogResult("Error occurred on server - in Failure callback");
    msg = msg ? msg : "Error";
    BasicJSOM.Utilities.LogResult(msg + ": " + args.get_message());
}



