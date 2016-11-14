var s43 = s43 || {};

s43.libraryFunction2 = function () {
    $('#message').html("This text added via a function call to a statically loaded library using DEFER.");
}


SP.SOD.notifyScriptLoadedAndExecuteWaitingJobs("s43.Library2");
