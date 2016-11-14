var s43 = s43 || {};

s43.libraryFunction3 = function () {
    var msg = $('#message').html();
    msg += "<br />Function3 called";
    $('#message').html(msg);

}
var msg = $('#message').html();
msg += "<br />Library3 loaded.";
$('#message').html(msg);


SP.SOD.notifyScriptLoadedAndExecuteWaitingJobs("s43.Library3");
