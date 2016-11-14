
var s43 = s43 || {};

s43.libraryFunction4 = function () {
    s43.logMessage("Function4 called");
    
}



s43.library4LoadedFlag = true;


SP.SOD.notifyScriptLoadedAndExecuteWaitingJobs("s43.Library4");
