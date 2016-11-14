"use strict"

var BasicJSOM = window.BasicJSOM || {};
BasicJSOM.Crud = BasicJSOM.Crud || {};

$(document).ready(function () {
    BasicJSOM.Crud.SimpleDemo = new BasicJSOM.Crud.Simple();
    BasicJSOM.Crud.Init();

});


BasicJSOM.Crud.Init = function () {

    $("#crudButton1").click(BasicJSOM.Crud.SimpleDemo.read);
    $("#crudButton2").click(BasicJSOM.Crud.SimpleDemo.sequential);
    $("#crudButton3").click(BasicJSOM.Crud.SimpleDemo.parallel);
    $("#crudButton4").click(BasicJSOM.Crud.SimpleDemo.deletePrompt);
  
}

BasicJSOM.Crud.Simple = function () {

    //#region private variables
    
    var _lim = new BasicJSOM.Utilities.ListItemManager();
    var results;
    var readItem;
    var targetList;

    //#endregion

    //#region private functions
    

    //#region Read
    function _readCall() {
        $("#results").text("");
        var context = new SP.ClientContext();
        var targetList = context.get_web().get_lists().getByTitle('SampleData');
        var query = new SP.CamlQuery();
        var caml = "<View><Query><Where><Neq><FieldRef Name='Title'/>";
        caml += "<Value Type='Text'>Excluded</Value></Neq></Where></Query>";
        caml += "<ViewFields><FieldRef Name='Title'/><FieldRef Name='DataColumn1'/><FieldRef Name='ID'/></ViewFields>";
        caml += "<RowLimit>2</RowLimit>";
        caml += "</View>";
        query.set_viewXml(caml);
        var listItems = targetList.getItems(query);
        results = context.loadQuery(listItems, 'Include(Title, DataColumn1, ID)');
        //results = context.loadQuery(listItems);  //this option doesn't limit the columns retrieved!
        context.executeQueryAsync(_onSucceed, BasicJSOM.Utilities.Fail);
    }

    function _showDetail(id) {
        var context = new SP.ClientContext();
        var targetList = context.get_web().get_lists().getByTitle('SampleData');
        readItem = targetList.getItemById(id);
        context.load(readItem, "Secret");
        context.executeQueryAsync(_onSecretSucceed, BasicJSOM.Utilities.Fail);
    }


    //#region Callbacks
    function _onSucceed() {
        BasicJSOM.Utilities.LogResult("Returned successfully from server - in Success callback");
        var msg = "Found " + results.length + " results:<ul>";
        for (var i = 0; i < results.length; ++i)
        {
            var itm = results[i];
            msg += "<li>"
            msg += itm.get_item("DataColumn1") + ": ";
            msg += "<a onclick='BasicJSOM.Crud.SimpleDemo.showDetail("
            msg += itm.get_item("ID");
            msg += ")'>";
            msg += itm.get_item("Title") + "</a></li>";
        };
        msg += "</ul>";
        BasicJSOM.Utilities.LogResult(msg);

        /*
        Using the Queryable Load allows me to avoid this:
        var listEnumerator = listItems.getEnumerator();
        while (listEnumerator.moveNext()) {
            msg += "<li>" + listEnumerator.get_current().get_item("Title") + "</li>";
        } 
        
        and instead do a simpler "for" loop
        */
    }

    function _onSecretSucceed() {
        var secret = readItem.get_item("Secret");
        var msg = "Secret is: " + secret;
        alert(msg);
    }
    //#endregion Callbacks

    //#endregion Read

    //#region Create
    function _recordItemCount(listName, itemCount) {
        BasicJSOM.Utilities.LogResult("List " + listName + " has " + itemCount + " items.");

    }

    function _createListItemFail(sender, args) {
        BasicJSOM.Utilities.LogResult(args.get_message());
    }

    

    function _alwaysCallback() {
        BasicJSOM.Utilities.LogResult("Sequential process complete");
    }

    function _sequentialCalls() {
        $("#results").text("");
        $("#code").text("");
        var listName = "ComplexDemo";
        var _lm = new BasicJSOM.Utilities.ListManager(listName, null, SP.ListTemplateType.announcements);

        //#region Value object
        var itemOneValues = {
            "Title"     : "My First Item",
            "Body"      : "This is the body",
            "Expires"   : new Date()
        }
        
        //#endregion Value object

        
        _lm.fetch()
            .then(
                //Success
                function () {
                    _lim.create(listName, itemOneValues)  
                        .then(
                            function () {
                                _lm.count(_recordItemCount);  
                            },  
                            function (sender, args, msg) {
                                BasicJSOM.Utilities.Fail(sender, args, msg);
                            })
                  
                },
                //Failure
                function (sender, args, msg) {
                    BasicJSOM.Utilities.Fail(sender, args, msg);
                })
            .always(_alwaysCallback);
    }

   
    function _parallelCalls() {
        $("#results").text("");
        $("#code").text("");
        BasicJSOM.Utilities.LogResult("Beginning Parallel Run...");
        var listName1 = "ComplexDemo1";
        var listName2 = "ComplexDemo2";
        var _lm1 = new BasicJSOM.Utilities.ListManager(listName1, null, SP.ListTemplateType.announcements);
        var _lm2 = new BasicJSOM.Utilities.ListManager(listName2, null, SP.ListTemplateType.announcements);

        //#region Value objects
        var itemOneValues = {
            "Title": "My First Item",
            "Body": "This is the body #1",
            "Expires": new Date()
        }
        var itemTwoValues = {
            "Title": "My Second Item",
            "Body": "This is the body #2",
            "Expires": new Date()
        }
        var itemThreeValues = {
            "Title": "My Third Item",
            "Body": "This is the body #3",
            "Expires": new Date()
        }
        var itemFourValues = {
            "Title": "My Fourth Item",
            "Body": "This is the body #4",
            "Expires": new Date()
        }

        //#endregion Value objects
        $.when(
            _lm1.fetch(BasicJSOM.Utilities.LogResult),
            _lm2.fetch(BasicJSOM.Utilities.LogResult)
            
            )
        .done(
            function () {
                BasicJSOM.Utilities.LogResult("List Creation DONE");
                $.when(
                    _lim.create(_lm1.name, itemOneValues, BasicJSOM.Utilities.LogResult),
                    _lim.create(_lm1.name, itemTwoValues, BasicJSOM.Utilities.LogResult),
                    _lim.create(_lm2.name, itemThreeValues, BasicJSOM.Utilities.LogResult),
                    _lim.create(_lm2.name, itemFourValues, BasicJSOM.Utilities.LogResult)
                ).
                done(
                    function () {
                        BasicJSOM.Utilities.LogResult("All items created");
                    }
                )
            }
        )

    }

    //#endregion Create

    //#region Delete
    function _deleteItem(id) {
        var context = new SP.ClientContext();
        targetList = context.get_web().get_lists().getByTitle('SampleData');
        var delItem = targetList.getItemById(id);
        delItem.deleteObject();
        context.load(targetList);
        context.executeQueryAsync(_onDeleteSucceed, BasicJSOM.Utilities.Fail);

    }

    function _deletePrompt() {
        var id = prompt("Enter the ID of the item to delete", "1");
        if (isNaN(id))
        {
            alert("Please enter a number");
        }
        else
        {
            _deleteItem(id);
        }
    }

    //#region Callbacks
    function _onDeleteSucceed() {
        var itemCount = targetList.get_itemCount() - 1;
        var msg = "Item has been deleted.  List now has " + itemCount + " items";
        BasicJSOM.Utilities.LogResult(msg);
    }

    //#endregion Callbacks
    //#endregion Delete


    //#endregion private functions

    //#region public members

    var publics = {
        read: _readCall,
        showDetail: _showDetail,
        deletePrompt: _deletePrompt,
        sequential: _sequentialCalls,
        parallel: _parallelCalls
    };

    return publics;

    //#endregion


}
