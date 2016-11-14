alert("lib4 Loaded");
var s43 = s43 || {};

s43.libraryFunction4 = function () {
    var msg = $('#message').html();
    msg += "<br />Function4 called";
    $('#message').html(msg);

}


var msg = $('#message').html();
msg += "<br />Library4 loaded.";
$('#message').html(msg);


s43.library4LoadedFlag = true;
SP.SOD.notifyScriptLoadedAndExecuteWaitingJobs("s43.Library4");
