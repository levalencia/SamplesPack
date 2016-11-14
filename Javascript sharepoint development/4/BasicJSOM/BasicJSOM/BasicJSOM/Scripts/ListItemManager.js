"use strict"

var BasicJSOM = window.BasicJSOM || {};
BasicJSOM.Batching = BasicJSOM.Batching || {};
BasicJSOM.Utilities = BasicJSOM.Utilities || {};

BasicJSOM.Utilities.ListItemManager = function () {
    //#region private variables
    
    //#endregion private variables

    //#region private functions
    function _createListItem(listName, values, logProgress) { 
        var context = new SP.ClientContext();
        var dfd = $.Deferred();
        var list = context.get_web().get_lists().getByTitle(listName);
        context.load(list);
        var itmCI = new SP.ListItemCreationInformation();
        this.itm = list.addItem(itmCI);
        for (fieldName in values)
        {
            this.itm.set_item(fieldName, values[fieldName]);
        }
        this.itm.update();
        context.load(this.itm);
        context.executeQueryAsync(
            function () {
                if (typeof logProgress === "function")
                {
                    logProgress("Item Created: " + values.Title)
                }
                dfd.resolve();
            },
            function (sender, args) {
                if (typeof logProgress === "function")
                {
                    logProgress("Item Creation failed");
                }
                dfd.reject(sender, args, "Error creating ListItem");
            });
        return dfd.promise();
    }

   
    //#endregion private functions

    //#region Public Members

    var publics = {
        create: _createListItem
    };
    return publics;

    //#endregion Public Members
}