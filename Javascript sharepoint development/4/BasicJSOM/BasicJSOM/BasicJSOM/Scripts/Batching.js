"use strict"

var BasicJSOM = window.BasicJSOM || {};
BasicJSOM.Batching = BasicJSOM.Batching || {};

$(document).ready(function () {
    BasicJSOM.Batching.simpleDemo = new BasicJSOM.Batching.Simple();
    
    BasicJSOM.Batching.Init();

});


BasicJSOM.Batching.Init = function () {
    
    $("#simpleButton").click(function () { BasicJSOM.Batching.simpleDemo.simpleExample() });
    $("#errButton1").click(BasicJSOM.Batching.simpleDemo.errorExample1);
    $("#errButton2").click(BasicJSOM.Batching.simpleDemo.errorExample2);
    $("#errButton3").click(BasicJSOM.Batching.simpleDemo.mixedContextError);
    

}

BasicJSOM.Batching.Simple = function () {
    //#region private variables
    var _context;
    var _context2;
    var _web;
    var _lineNumber = 0;
    var _codeLines = new Array();
    var _resultLines = new Array();
    
   
   
    //#endregion private variables

    //#region private functions

    //#region DEMO SUPPORT

    function _resetDemo() {
        _codeLines = new Array();
        _resultLines = new Array();
    }

    function _stepThrough() {
        if (_lineNumber === 0)
        {
            $("#results").text("");
            $("#code").text("");
            _showCode();
        }
        if (_lineNumber < _codeLines.length)
        {
            highlightCodeLine();
            BasicJSOM.Utilities.LogResult(_resultLines[_lineNumber]);
            try
            {
                eval(_codeLines[_lineNumber]);
            }
            catch (err)
            {
                BasicJSOM.Utilities.LogResult(err);
            }

            if (_lineNumber === _codeLines.length - 1)
            {
                _lineNumber = 0;
                BasicJSOM.Utilities.LogResult("<p class='highlighted'>End of Code</p>");
            }
            else
            {
                _lineNumber++;

            }
        }



    }

    function highlightCodeLine() {
        $(".sampleCode p").removeClass("highlighted");

        $("#codeLine" + _lineNumber.toString()).addClass("highlighted");

    }

    function _addCode(value) {
        _codeLines[_codeLines.length] = value;
    }

    function _addResult(value) {
        _resultLines[_resultLines.length] = value;
    }

    function _showCode() {
        for (i = 0; i < _codeLines.length; i++)
        {
            $("#code").append("<p id='codeLine" + i.toString() + "' >" + _codeLines[i] + "</p>");
        }
    }

    function _addIndent(count) {
        for (var i = 0; i < count*4; i++)
        {
            $("#code").append("&nbsp;");
        }
    }

    //#endregion DEMO SUPPORT


    function _simpleExample() {
        //#region Code & Result Arrays
        _resetDemo();
        _addCode("_context = new SP.ClientContext();");
        _addCode("_web = _context.get_web();");
        _addCode("_context.load(_web, 'Title');");
        _addCode("_context.executeQueryAsync(_onSucceed, BasicJSOM.Utilities.Fail);");

        _addResult("No tangible result - we've just set up our connection to SharePoint.  We haven't left the client yet");
        _addResult("Still haven't left the client.  All we've done is queue up a command to retrieve the current SPWeb");
        _addResult("Still on the client.  Here we're saying we want to fill up the scalar properties of our 'web' object, but only just TITLE");
        _addResult("NOW we've left the client - our batch has been packaged and sent up the wire to the server.  We've registered two functions to be called depending on the outcome of the code executing on the server - one for success and one for failure");
        //#endregion Code & Result Arrays

        _stepThrough();
    }

    function _errorExample1() {
        //#region Code & Result Arrays
        _resetDemo();
        _addCode("_context = new SP.ClientContext();");
        _addCode("_web = _context.get_web();");
        _addCode("_context.load(_web, 'Title');");
        _addCode("var title = _web.get_title();");
        

        _addResult("No tangible result - we've just set up our connection to SharePoint.  We haven't left the client yet");
        _addResult("Still haven't left the client.  All we've done is queue up a command to retrieve the current SPWeb");
        _addResult("Still on the client.  Here we're saying we want to fill up the scalar properties of our 'web' object, but only just TITLE");
        _addResult("We've neglected to commit our batch, so _web is never filled up.  TITLE is not available.");
        //#endregion Code & Result Arrays
        _stepThrough();
    }

    function _errorExample2() {
        //#region Code & Result Arrays
        _resetDemo();
        _addCode("_context = new SP.ClientContext();");
        _addCode("_web = _context.get_web();");
        _addCode("_context.executeQueryAsync(_onSucceed, BasicJSOM.Utilities.Fail );");

        _addResult("No tangible result - we've just set up our connection to SharePoint.  We haven't left the client yet");
        _addResult("Still haven't left the client.  All we've done is queue up a command to retrieve the current SPWeb");
        _addResult("NOW we've left the client - our batch has been packaged and sent up the wire to the server.  We've registered two functions to be called depending on the outcome of the code executing on the server - one for success and one for failure");
        //#endregion Code & Result Arrays

        _stepThrough();
    }

    function _mixedContextError() {
        //#region Code & Result Arrays
        _resetDemo();
        _addCode("_context = new SP.ClientContext();");
        _addCode("_context2 = new SP.ClientContext();");
        _addCode("_web = _context.get_web();");
        _addCode("_context.load(_web, 'Title');");
        _addCode("_context2.executeQueryAsync(_onSucceed, BasicJSOM.Utilities.Fail );");
        _addCode("_context.executeQueryAsync(_onSucceed, BasicJSOM.Utilities.Fail );");

        _addResult("Get first context");
        _addResult("Get second context - same process as first");
        _addResult("Get web object on first context");
        _addResult("Load up web object, on first context");
        _addResult("Commit our batch, but notice we're using the second context");
        _addResult("Commit our batch again, this time using the correct first context");
        //#endregion Code & Result Arrays

        _stepThrough();

    }


    //#region Callbacks
    function _onSucceed() {
        if ($("#code").html().indexOf("Success Callback:") === -1)
        {
            $("#code").append("<hr><p>Success Callback:</p>");
            $("#code").append("function _onSucceed() {<br />");
            _addIndent(1);
            $("#code").append("try{<br />");
            _addIndent(2);
            $("#code").append("var title = _web.get_title();<br />");
            _addIndent(2);
            $("#code").append("[Write Title to Results pane]<br />");
            _addIndent(1);
            $("#code").append("}<br />");
            _addIndent(1);
            $("#code").append("catch (err){<br />");
            _addIndent(2);
            $("#code").append("[LOG ERROR INFO]<br />");
            _addIndent(1);
            $("#code").append("}<br />");
            $("#code").append("}");
        }
        BasicJSOM.Utilities.LogResult("Returned successfully from server - in Success callback");
        try{
            var title = _web.get_title();
            BasicJSOM.Utilities.LogResult("*****RESULT: Current site title is: " + title );
        }
        catch (err){
            BasicJSOM.Utilities.LogResult("An error has occurred accessing the Title property of the web object in the Success callback.  Message is:")
            BasicJSOM.Utilities.LogResult(err);

        }
        

    }


    
    //#endregion Callbacks

    //#endregion private functions

    //#region public members
    return {
        simpleExample: _simpleExample,
        errorExample1: _errorExample1,
        errorExample2: _errorExample2,
        mixedContextError: _mixedContextError
    }

    //#endregion public members


}
