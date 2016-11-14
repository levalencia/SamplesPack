"use strict"

var BasicJSRest = window.BasicJSRest || {};
BasicJSRest.Batching = BasicJSRest.Batching || {};
BasicJSRest.Utilities = BasicJSRest.Utilities || {};

BasicJSRest.Utilities.ListItemManager = function () {
    //#region private variables
    var pageNum = 0;
    var pageSize = 3;
    //#endregion private variables

    //#region private functions


    //#region Get All List Items
    function _getListItems(listName) {

        var dfd = $.Deferred();

        var baseUrl = SP.Utilities.UrlBuilder.urlCombine(_spPageContextInfo.webServerRelativeUrl, "_api/web/lists/");
        baseUrl += "GetByTitle('" + listName + "')/items";

        var dfd = $.ajax({
            url: encodeURI(baseUrl),
            type: "GET",
            contentType: "application/json;odata=verbose",
            headers: {
                "accept": "application/json;odata=verbose"
            }
        });
        return dfd.promise();
    }


    //#endregion Get All List Items

    //#region List Item paging
    function _getListItemsPaged(listName) {

        var dfd = $.Deferred();

        var baseUrl = SP.Utilities.UrlBuilder.urlCombine(_spPageContextInfo.webServerRelativeUrl, "_api/web/lists/");
        baseUrl += "GetByTitle('" + listName + "')/items/?$top=" + pageSize;
        //need to add skiptoken unencoded or else the % in %26 and %3d gets encoded to %25 which breaks things
        baseUrl = encodeURI(baseUrl) + "&$skiptoken=Paged%3dTRUE%26p_ID%3d" + pageNum * pageSize;
        ++pageNum;
        var dfd = $.ajax({
            url: baseUrl, /*encodeURI(baseUrl),*/
            type: "GET",
            contentType: "application/json;odata=verbose",
            headers: {
                "accept": "application/json;odata=verbose"
            }
        });
        return dfd.promise();
    }

    function _getListItemsBadPaged(listName) {

        var dfd = $.Deferred();

        var baseUrl = SP.Utilities.UrlBuilder.urlCombine(_spPageContextInfo.webServerRelativeUrl, "_api/web/lists/");
        baseUrl += "GetByTitle('" + listName + "')/items/?$skip=" + pageNum * pageSize + "&$top=" + pageSize;
        ++pageNum;
        var dfd = $.ajax({
            url: encodeURI(baseUrl),
            type: "GET",
            contentType: "application/json;odata=verbose",
            headers: {
                "accept": "application/json;odata=verbose"
            }
        });
        return dfd.promise();
    }



    //#endregion Get All List Items

    //#region Get List Item
    function _getListItem(listName, itemId, fields) {
        var dfd = $.Deferred();
        var baseUrl = SP.Utilities.UrlBuilder.urlCombine(_spPageContextInfo.webServerRelativeUrl, "_api/web/lists/");
        baseUrl += "GetByTitle('" + listName + "')/items(" + itemId + ")";
        baseUrl += (fields) ? "?$select=" + fields : "";

        var dfd = $.ajax({
            url: encodeURI(baseUrl),
            type: "GET",
            contentType: "application/json;odata=verbose",
            headers: {
                "accept": "application/json;odata=verbose"
            }
        });
        return dfd.promise();
    }
    //#endregion GetListItem

    //#region Create List Item
    function _createListItem(listName, values) {
        
        var dfd = $.Deferred();
        var baseUrl = SP.Utilities.UrlBuilder.urlCombine(
            _spPageContextInfo.webServerRelativeUrl,
            "_api/web/lists/");
        baseUrl += "GetByTitle('" + listName + "')/items";
        values["__metadata"] = { "type": "SP.Data." + listName + "ListItem" };
        var itemData = JSON.stringify(values);
        var headers = {
            "accept": "application/json;odata=verbose",
            "content-length": itemData.length,
            "X-RequestDigest": $("#__REQUESTDIGEST").val()
        }
        var dfd = $.ajax({
            url: encodeURI(baseUrl),
            type: "POST",
            contentType: "application/json;odata=verbose", 
            data: itemData,
            headers: headers
        });
        return dfd.promise();
    }

    //#endregion Create

    //#region Update List Item
    function _updateListItem(listName, values, itemId, eTag) {

        var dfd = $.Deferred();
        var baseUrl = SP.Utilities.UrlBuilder.urlCombine(_spPageContextInfo.webServerRelativeUrl,
            "_api/web/lists/");
        baseUrl += "GetByTitle('" + listName + "')/items(" + itemId + ")";
        values["__metadata"] = { "type": "SP.Data." + listName + "ListItem" };
        var itemData = JSON.stringify(values);
        var headers = {
            'content-length': itemData.length,
            'X-HTTP-Method':'PATCH',
            'If-Match': '*',
            "X-RequestDigest": $("#__REQUESTDIGEST").val()
        };
        var dfd = $.ajax({
            url: encodeURI(baseUrl),
            type: "POST",
            contentType: "application/json;odata=verbose",
            data: itemData,
            headers: headers
        });
        return dfd.promise();
    }

    //#endregion Update List Item

    //#region Delete List Item
    function _deleteListItem(listName, itemId) {

        var dfd = $.Deferred();
        var baseUrl = SP.Utilities.UrlBuilder.urlCombine(
            _spPageContextInfo.webServerRelativeUrl,
            "_api/web/lists/");
        baseUrl += "GetByTitle('" + listName + "')/items(" + itemId + ")";
        var headers = {
            "accept": "application/json;odata=verbose",
            'X-HTTP-Method': 'DELETE',
            'If-Match': '*',
            "X-RequestDigest": $("#__REQUESTDIGEST").val()
        };
        var dfd = $.ajax({
            url: encodeURI(baseUrl),
            type: "POST",
            contentType: "application/json;odata=verbose",
            headers: headers
        });
        return dfd.promise();
    }

    //#endregion Delete

    //#region Filter Lookup (Expand) 
    function _getChildren(parentName) {
        var dfd = $.Deferred();
        var baseUrl = SP.Utilities.UrlBuilder.urlCombine(_spPageContextInfo.webServerRelativeUrl, "_api/web/lists/");
        baseUrl += "GetByTitle('ChildList')";
        baseUrl += "/items?$select=Title,SampleData/Title&$expand=SampleData/Title&$filter=(SampleData/Title eq '";
        baseUrl += parentName + "')";
        var headers = {
            "accept": "application/json;odata=verbose"
        };
        var dfd = $.ajax({
            url: encodeURI(baseUrl),
            type: "GET",
            contentType: "application/json;odata=verbose",
            headers: headers
        });
        return dfd.promise();
    }

    //#endregion Filter Lookup

    //#endregion private functions

    //#region Public Members

    var publics = {
        createListItem: _createListItem,
        getListItems: _getListItems,
        getListItemsPaged: _getListItemsPaged,
        getListItemsBadPaged: _getListItemsBadPaged,
        deleteListItem: _deleteListItem,
        getListItem: _getListItem,
        updateListItem: _updateListItem,
        getChildren: _getChildren,

        PageNum: pageNum
    };
    return publics;

    //#endregion Public Members
}