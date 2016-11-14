"use strict"

var BasicJSRest = window.BasicJSRest || {};
BasicJSRest.Crud = BasicJSRest.Crud || {};

$(document).ready(function () {
    BasicJSRest.Crud.SimpleDemo = new BasicJSRest.Crud.Simple();
    BasicJSRest.Crud.Init();

});


BasicJSRest.Crud.Init = function () {

    $("#crudButton1").click(BasicJSRest.Crud.SimpleDemo.readLists);
    $("#crudButton2").click(BasicJSRest.Crud.SimpleDemo.readListItems);
    $("#crudButton2a").click(BasicJSRest.Crud.SimpleDemo.readListItemsPaged);
    $("#crudButton2b").click(BasicJSRest.Crud.SimpleDemo.readListItemsBadPaged);
    $("#crudButton3").click(BasicJSRest.Crud.SimpleDemo.createList);
    $("#crudButton4").click(BasicJSRest.Crud.SimpleDemo.createListItem);
    $("#crudButton5").click(BasicJSRest.Crud.SimpleDemo.updateListItem);
    $("#crudButton6").click(BasicJSRest.Crud.SimpleDemo.deleteListItem);
    $("#crudButton7").click(BasicJSRest.Crud.SimpleDemo.deleteList);
    $("#crudButton8").click(BasicJSRest.Crud.SimpleDemo.createItemInNewList);
    $("#crudButton9").click(BasicJSRest.Crud.SimpleDemo.addField);
    $("#crudButton10").click(BasicJSRest.Crud.SimpleDemo.getListFields);
    $("#crudButton11").click(BasicJSRest.Crud.SimpleDemo.filterChildren);
  
}

BasicJSRest.Crud.Simple = function () {

    //#region private variables
    
    var _lim = new BasicJSRest.Utilities.ListItemManager();
    var _lm = new BasicJSRest.Utilities.ListManager();
    var listName;

    //#endregion

    //#region private functions
    
    //#region Create List
        

    function _createList(passedListName) {
        var dfd = $.Deferred();
        if (passedListName && passedListName.length & passedListName.length > 0)
        {
            listName = passedListName;
        }
        else
        {
            listName = _getRandomListName();
        }
        var msg = " Creating List " + listName;
        BasicJSRest.Utilities.LogResult(msg);
        var readPromise = _readLists();
        readPromise.done(
            function () {
                var createPromise = _lm.create(listName, "this is a list created via REST", null);
                createPromise.then(
                    function (data, status, jqXHR) {
                        _createListSuccess().done(
                            dfd.resolve()
                        );
                        
                    },
                    function (jqXHR, status, error) {
                        BasicJSRest.Utilities.Fail(error);
                        dfd.reject();
                    }
                );
            });
        return dfd.promise();
    }

    function _createListSuccess() {
        var dfd = $.Deferred();
        var url = SP.Utilities.UrlBuilder.urlCombine(
            _spPageContextInfo.webServerRelativeUrl,
            "lists/");
        url = SP.Utilities.UrlBuilder.urlCombine(url, listName);
        var msg = " List created successfully! <a href='";
        msg += url + "' target='_new' >";
        msg += listName + "</a>";
        BasicJSRest.Utilities.LogResult(msg);
        var readPromise = _readLists();
        readPromise.done(
            function (data, status, jqXHR) {
                dfd.resolve();
            });
        return dfd.promise();
    }

    //#endregion Create List
    
    //#region Read Lists
    function _readLists() {
        var dfd = $.Deferred();
        var msg = " Getting all existing Lists";
        BasicJSRest.Utilities.LogResult(msg);
        var readPromise = _lm.getAllLists();
        readPromise.then(
            function (data, status, jqXHR) {
                _getListSuccess(data);
                dfd.resolve();
            },
            function (jqXHR, status, error) {
                BasicJSRest.Utilities.Fail(error);
                dfd.reject();
            }
            
        );
        return dfd.promise();
    }
    
    function _getListSuccess(data) {
        var msg = " Lists on this site are:<ul>";
        if (data.d.results.length > 0)
        {
            $.each(data.d.results, function (index, value) {
                msg += "<li>" + value.Title + "</li>";
            });
        }
        else
        {
            msg += "<li>" + data.d.Title + "</li>";
        }
        msg += "</ul>";
        BasicJSRest.Utilities.LogResult(msg);
    }

    //#endregion Read Lists

    //#region Read List Items
    function _readListItems(passedListName) {
        var dfd = $.Deferred();
        
        if (passedListName && passedListName.length & passedListName.length > 0)
        {
            listName = passedListName;
        }
        else
        {
            listName = "SampleData";
        }
        var msg = " Getting all existing List Items in " + listName;
        BasicJSRest.Utilities.LogResult(msg);
        var promise = _lim.getListItems(listName);
        promise.then(
            function (data, status, jqXHR) {
                _getListItemsSuccess(data);
                dfd.resolve();
            },
            function (jqXHR, status, error) {
                BasicJSRest.Utilities.Fail(error);
                dfd.reject();
            }
        );
        return dfd.promise();
    }


    //#region Read List Items Paged
    function _readListItemsPaged(passedListName) {
        var dfd = $.Deferred();

        if (passedListName && passedListName.length & passedListName.length > 0)
        {
            listName = passedListName;
        }
        else
        {
            listName = "SampleData";
        }
        var msg = " Getting existing List Items in " + listName;
        BasicJSRest.Utilities.LogResult(msg);
        var promise = _lim.getListItemsPaged(listName);
        promise.then(
            function (data, status, jqXHR) {
                _getListItemsSuccess(data);
                dfd.resolve();
            },
            function (jqXHR, status, error) {
                BasicJSRest.Utilities.Fail(error);
                dfd.reject();
            }
        );
        return dfd.promise();
    }
    //#endregion Read List Items Paged

    //#region Read List Items Bad Paged
    function _readListItemsBadPaged(passedListName) {
        var dfd = $.Deferred();

        if (passedListName && passedListName.length & passedListName.length > 0)
        {
            listName = passedListName;
        }
        else
        {
            listName = "SampleData";
        }
        var msg = " Getting existing List Items in " + listName;
        BasicJSRest.Utilities.LogResult(msg);
        var promise = _lim.getListItemsBadPaged(listName);
        promise.then(
            function (data, status, jqXHR) {
                _getListItemsSuccess(data);
                dfd.resolve();
            },
            function (jqXHR, status, error) {
                BasicJSRest.Utilities.Fail(error);
                dfd.reject();
            }
        );
        return dfd.promise();
    }
    //#endregion Read List Items Bad Paged

    function _getListItemsSuccess(data) {
        var msg = " Current batch of results from List " + listName + " on this site contains ";

        if (data.d.results.length)
        {
            if (data.d.results.length > 1)
            {
                msg += data.d.results.length + " items:<ul>";
                $.each(data.d.results, function (index, value) {
                    msg += "<li>" + value.Title + "</li>";
                });

            }
            else
            {
                msg += "1 item:<ul>";
                msg += "<li>" + data.d.results[0].Title + "</li>";
            }
            msg += "</ul>";
        }
        else
        {
            msg += "no items";
        }
        
        if (data.d.__next)
        {
            msg += "<br />";
            msg += "Results are paged - next set of results available here: <br />" + data.d.__next;
        }
        BasicJSRest.Utilities.LogResult(msg); 
    }

    //#endregion Read List Items

    //#region Create List Items
    function _createListItem() {
        listName = "SampleData";
        var values = _getDummyValues();

        var createItemPromise = _lim.createListItem(listName, values);
        createItemPromise.then(
            function (data, status, jqXHR) {
                _createListItemSuccess();
            },
            function (jqXHR, status, error) {
                BasicJSRest.Utilities.Fail(error);
            }
        );
    }

    function _createListItemSuccess() {
        var msg = " List Item Created";
        BasicJSRest.Utilities.LogResult(msg);
        _readListItems();
    }

    function _createItemInNewList() {
        var dfd = $.Deferred();
        var msg = " Starting Process";
        BasicJSRest.Utilities.LogResult(msg);
        listName = "NewList";
        var createListPromise = _createList(listName);
        createListPromise.done(
            function (data, status, jqXHR) {
                var readPromise = _readListItems(listName);
                readPromise.done(
                    function (data, status, jqXHR) {
                        var values = {
                            "Title": "My New Item"
                        }

                        var createItemPromise = _lim.createListItem(listName, values);
                        createItemPromise.then(
                            function (data, status, jqXHR) {
                                _createItemInNewListSuccess(listName).done(
                                        function (data, status, jqXHR) {
                                            var msg = " Process Complete";
                                            BasicJSRest.Utilities.LogResult(msg);
                                            dfd.resolve();
                                        }
                                    );
                            },
                            function (jqXHR, status, error) {
                                BasicJSRest.Utilities.Fail(error);
                                dfd.reject();
                            }

                        );
                        dfd.resolve();
                    });

                
            }
        )
    }

    function _createItemInNewListSuccess(listName) {
        var dfd = $.Deferred();
        var msg = " List Item Created";
        BasicJSRest.Utilities.LogResult(msg);
        var readPromise = _readListItems(listName);
        readPromise.done(
            function (data, status, jqXHR) {
                dfd.resolve();
            });

        return dfd.promise();
    }


    //#endregion Create List Items

    //#region Update List Items
    function _fetchItemForUpdate() {
        listName = "SampleData";
        _readListItems(listName);
        var itemId = prompt("ID of item to update?", "1");
        
        var fetchItemPromise = _lim.getListItem(listName, itemId);
        fetchItemPromise.then(
            function (data, status, jqXHR) {
                _fetchItemForUpdateSuccess(data, itemId)
            },
            function (jqXHR, status, error) {
                BasicJSRest.Utilities.Fail(error);
            }
        );
    }

    function _fetchItemForUpdateSuccess(data, itemId) {
        listName = "SampleData";
        var values = _getUpdatedDummyValues();
        var eTag = data.d.__metadata.etag;
        alert("Pause - (Demo 2, edit item)");
        var updateItemPromise = _lim.updateListItem(listName, values, itemId, eTag);
        updateItemPromise.then(
            function (data, status, jqXHR) {
                _updateItemSuccess();
            },
            function (jqXHR, status, error) {
                BasicJSRest.Utilities.Fail(error);
            }
        );
    }

    function _updateItemSuccess() {

        var msg = " List Item Updated";
        BasicJSRest.Utilities.LogResult(msg);
        _readListItems();
    }


    //#endregion Update List Items

    //#region Delete List Items
    function _deleteListItem() {
        listName = "SampleData";
        _readListItems();

        var promise = _lim.deleteListItem(listName, 1);
        promise.then(
            function (data, status, jqXHR) {
                _deleteListItemsSuccess();
            },
            function (jqXHR, status, error) {
                BasicJSRest.Utilities.Fail(error);
            }
        );
    }

    function _deleteListItemsSuccess() {
        
        var msg = " List Item Deleted";
        BasicJSRest.Utilities.LogResult(msg);
        _readListItems();
    }

    //#endregion Delete List Items

    //#region Delete List
    function _deleteList() {
        listName = "SampleData";
        var readPromise = _readLists();
        readPromise.done(
            function (data, status, jqXHR) {
                var deletePromise = _lm.deleteList(listName);
                deletePromise.then(
                    function (data, status, jqXHR) {
                        _deleteListSuccess();
                    },
                    function (jqXHR, status, error) {
                        BasicJSRest.Utilities.Fail(error);
                    }
                );
            });
    }

    function _deleteListSuccess() {
        var msg = " List Deleted";
        BasicJSRest.Utilities.LogResult(msg);
        _readLists();
    }

    
    

    //#endregion Delete List

    //#region Add Field
    function _addTextField() {
        listName = "SampleData";
        
        var promise = _lm.addTextField(listName, 'NewField');
        promise.then(
            function (data, status, jqXHR) {
                _addFieldSuccess();
            },
            function (jqXHR, status, error) {
                BasicJSRest.Utilities.Fail(error);
            }
        );
    }

    function _addFieldSuccess() {

        var msg = " Field Added";
        BasicJSRest.Utilities.LogResult(msg);

    }


    //#endregion Add Field

    //#region Get List Fields (Expand)

    function _getListFields() {
        var promise = _lm.getListFields();
        promise.then(
            function (data, status, jqXHR) {
                _getListFieldSuccess(data);
            },
            function (jqXHR, status, error) {
                BasicJSRest.Utilities.Fail(error);
            }
        );
    }
    function _getListFieldSuccess(data) {
        var msg = "There are " + data.d.results.length + " lists on this site.<br />";
        msg += "Field information:<br />";

        //iterate collection of lists
        $.each(data.d.results, function (index, value) {
            msg += "<li><u>" + value.Title + " has these fields:</u></li><ul>";

            //iterate fields on each list
            $.each(data.d.results[index].Fields.results, function (index, value) {
                msg += "<li>" + value.Title + "</li>";
            });

            msg += "</ul>";
        });
        msg += "</ul>";
        BasicJSRest.Utilities.LogResult(msg);
    }

    //#endregion Get List Fields

    //#region Filter Lookup (Expand)
    function _filterChildren() {
        var parentName = prompt("Get Children for which Parent?", "Item 1");
        var promise = _lim.getChildren(parentName);
        promise.then(
            function (data, status, jqXHR) {
                _filterChildrenSuccess(data, parentName);
            },
            function (jqXHR, status, error) {
                BasicJSRest.Utilities.Fail(error);
            }
        );
    }

    function _filterChildrenSuccess(data, parentName) {
        var msg = "The following items have a SampleData value of '" + parentName + "':<ul>";
        $.each(data.d.results, function (index, value) {
                msg += "<li>" + value.Title + "</li>";
        });
        msg += "</ul>";
        BasicJSRest.Utilities.LogResult(msg);
    }

    //#endregion Filter Lookup (Expand)

    //#region Utilities

    function _getDummyValues() {
        return {
            "Title": "My New Item",
            "NumColumn": "12345",
            "DateColumn": "5/30/2013",
            "LinkColumn": {'__metadata': { 'type': 'SP.FieldUrlValue' },'Url': 'http://www.aptillon.com','Description': 'Aptillon'}

        };
        
    }

    function _getUpdatedDummyValues() {
        return {
            "Title": "My Updated Item",
            "NumColumn": "789"

        };
        
    }

    function _getRandomListName() {
        var now = new Date();
        return "sampleList_" + now.getMilliseconds().toString() + (Math.floor(Math.random() * 100) + 1).toString();
    }

    function _clearResults() {
        $("#results").text("");
    }

    //#endregion Utilities
   

    //#endregion private functions

    //#region public members

    var publics = {
        createList: function () { _clearResults(); _createList() },
        readLists: function () { _clearResults(); _readLists()},
        readListItems: function () { _clearResults(); _readListItems() },
        readListItemsPaged: function () { _clearResults(); _readListItemsPaged() },
        readListItemsBadPaged: function () { _clearResults(); _readListItemsBadPaged() },
        createListItem: function () { _clearResults(); _createListItem()},
        deleteListItem: function () { _clearResults(); _deleteListItem()},
        deleteList: function () { _clearResults(); _deleteList()},
        createItemInNewList: function () { _clearResults(); _createItemInNewList()},
        updateListItem: function () { _clearResults(); _fetchItemForUpdate()},
        addField: function () { _clearResults(); _addTextField()},
        getListFields: function () { _clearResults(); _getListFields() },
        filterChildren: function () { _clearResults(); _filterChildren() }
    };

    return publics;

    //#endregion


}
