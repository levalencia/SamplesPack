"use strict" 

var BasicJSOM = window.BasicJSOM || {};
BasicJSOM.Exception = BasicJSOM.Exception || {};

$(document).ready(function () {
    BasicJSOM.Exception.SimpleDemo = new BasicJSOM.Exception.Simple();
    BasicJSOM.Exception.Init();
});


BasicJSOM.Exception.Init = function () {
    $("#exceptionButton").click(BasicJSOM.Exception.SimpleDemo.simpleExample);
}

BasicJSOM.Exception.Simple = function () {
    //#region private variables
    var _web;
    var errScope;
    var listName
   
    //#endregion private variables

    //#region private functions

    function getRandomListName() {
        var now = new Date();
        return "sampleList_" + now.getMilliseconds().toString() + (Math.floor(Math.random() * 100) + 1).toString();
    }


    function _simpleExample() {
        var template = SP.ListTemplateType.genericList;
        var desc = "Created programmatically to demonstrate JSOM error handling";

        var context = new SP.ClientContext();
        listName = getRandomListName();

        errScope = new SP.ExceptionHandlingScope(context);
        var scopeStart = errScope.startScope();

        var tryBlock = errScope.startTry();
            var theList = context.get_web().get_lists().getByTitle(listName);
        tryBlock.dispose();
        
        var catchBlock = errScope.startCatch();
            var listCI = new SP.ListCreationInformation();
            listCI.set_title(listName);
            listCI.set_templateType(template);
            listCI.set_description(desc);
            theList = context.get_web().get_lists().add(listCI);
        catchBlock.dispose();

        var finallyBlock = errScope.startFinally();
            context.load(theList);
        finallyBlock.dispose();

        scopeStart.dispose();

        context.executeQueryAsync(_onSucceed, BasicJSOM.Utilities.Fail);
       
    }

    //#region Callbacks
    function _onSucceed() {
        BasicJSOM.Utilities.LogResult("Returned successfully from server - in Success callback");
        if (errScope.get_hasException())
        {
            BasicJSOM.Utilities.LogResult("List '" + listName + "' did not exist on the server and was created");
        }
        else
        {
            BasicJSOM.Utilities.LogResult("List '" + listName + "' retrieved");
        }
    }

    
    //#endregion Callbacks

    //#endregion private functions

    //#region public members
    var publicMembers = {
        simpleExample: _simpleExample
    }

    return publicMembers;

    //#endregion public members


}
