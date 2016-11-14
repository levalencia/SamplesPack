var s43 = s43 || {};

s43.logMessage = function (newMsg) {
    var fullMsg = $('#message').html();
    fullMsg += "<br />" + newMsg + " -- " + new Date().getMilliseconds();
    $('#message').html(fullMsg);

}

function LoadLibrary(libPath) {
    s43.logMessage("trying to load " + libPath);

    var dfd = $.Deferred();

    $.ajaxSetup({
        cache: true
    });

    $.getScript(libPath)
        .done(function () {
            s43.logMessage("done loading " + libPath);
            dfd.resolve();
        })
        .fail(function () {
            s43.logMessage("failed loading " + libPath);
            dfd.reject();
        })
    return dfd.promise();
}


s43.LoadScriptWithFallback = function (primaryLocation, fallbackLocation, successCallback, failureCallback, successCheck) {

    LoadLibrary(primaryLocation)
        .done(function () {
            s43.logMessage("checking if load was successful");
            if (successCheck())
            {
                s43.logMessage("load was successful");
                successCallback();
            }
            else
            {
                processRetry();
            }
        })
        .fail(function () {
            processRetry();
        });

    function processRetry() {
        s43.logMessage("load was not successful - trying fallback");
        LoadLibrary(fallbackLocation)
            .then(function () {
                s43.logMessage("checking if load was successful");
                if (successCheck())
                {
                    s43.logMessage("load was successful");
                    successCallback();
                }
                else
                {
                    s43.logMessage("load was not successful - failing");
                    failureCallback();
                }
            });
    }
}
