"use strict"

var BasicJSOM = window.BasicJSOM || {};
BasicJSOM.Batching = BasicJSOM.Batching || {};
BasicJSOM.Utilities = BasicJSOM.Utilities || {};


BasicJSOM.Utilities.ListManager = function (listName, desc, template) {
    //#region private variables
   
    if (!template)
    {
        template = SP.ListTemplateType.genericList; 
    }
    var errScope;
    //#endregion private variables

    //#region private functions

    function _fetch(logProgress) {
        var context = new SP.ClientContext();
        var dfd = $.Deferred();
                
        errScope = new SP.ExceptionHandlingScope(context);
        var scopeStart = errScope.startScope();

       
        var tryBlock = errScope.startTry();
            var theList = context.get_web().get_lists().getByTitle(listName); 
        tryBlock.dispose();
        
        var catchBlock = errScope.startCatch();
            var listCI = new SP.ListCreationInformation();
            listCI.set_title(listName);
            listCI.set_description(desc);
            listCI.set_templateType(template);
            theList = context.get_web().get_lists().add(listCI);
        catchBlock.dispose();
        
        var finallyBlock = errScope.startFinally();
            context.load(theList);
        finallyBlock.dispose();
        
        scopeStart.dispose();

       
        context.executeQueryAsync(
                        function () {
                            if (typeof logProgress === "function")
                            {
                                if (errScope.get_hasException())
                                {
                                    logProgress("List '" + listName + "' did not exist on the server and was created");
                                }
                                else
                                {
                                    logProgress("List '" + listName + "' retrieved");
                                }
                            }
                            dfd.resolve();
                        },
                        function (sender, args) {
                            dfd.reject(sender, args, "Error creating List");
                        });
        return dfd.promise();
    }


    function _refreshList() {
        var context = new SP.ClientContext();
        var dfd = $.Deferred();
        var theList = context.get_web().get_lists().getByTitle(listName);
        context.load(theList);
        context.executeQueryAsync(
                    function () {
                         dfd.resolve(theList);
                    },
                    function (sender, args) {
                        dfd.reject(sender, args, "Error retrieving item count");
                    });

        return dfd.promise();
    }
     
    function _getCount(callback) {
        _refreshList()
            .fail(
                function (sender, args, msg) {
                    BasicJSOM.Utilities.Fail(sender, args, msg);
                }
            )
            .done(
                function (targetList) {
                    callback(listName, targetList.get_itemCount());
                });
    }

    //#endregion private functions

    //#region Public Members

    var publics = {
        name:   listName,
        count: _getCount,
        fetch: _fetch
    };
    return publics;

    //#endregion Public Members
}


