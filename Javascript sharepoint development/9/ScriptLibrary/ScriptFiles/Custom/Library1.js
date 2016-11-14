var s43 = s43 || {};

s43.libraryFunction1 = function () {
    var msg = "<br /> This text added via a function call to a statically loaded library.";
    msg += "<br /> &nbsp;&nbsp;- The library cannot be loaded with the 'defer' attribute because we try to call into it immediately!";
    $('#message').html(msg);
}


