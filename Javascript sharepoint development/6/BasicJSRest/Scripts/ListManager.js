"use strict"

var BasicJSRest = window.BasicJSRest || {};
BasicJSRest.Batching = BasicJSRest.Batching || {};
BasicJSRest.Utilities = BasicJSRest.Utilities || {};

BasicJSRest.Utilities.ListManager = function () {
    //#region private variables
      
    //#endregion private variables

    //#region private functions

    //#region Create
    function _create(listName, desc, template) { 
        if (!template)
        {
            template = SP.ListTemplateType.genericList;
        }
        var baseUrl = SP.Utilities.UrlBuilder.urlCombine(
            _spPageContextInfo.webServerRelativeUrl,
            "_api/web/lists");
        var props = {
            'Title': listName,
            'Description': desc,
            'BaseTemplate': template,
            '__metadata':{'type':'SP.List'}
        };
        var itemData = JSON.stringify(props);
        var headers = {
            "accept": "application/json;odata=verbose",
            'content-length': itemData.length,
            "X-RequestDigest": $("#__REQUESTDIGEST").val()
        }
        var dfd = $.ajax({
            url: baseUrl,
            type: "POST",
            contentType: "application/json;odata=verbose",
            data: itemData,
            headers: headers
        });

        /* Another popular approach:
        data: JSON.stringify(
            {
                '__metadata': {
                    'type': 'SP.List'
                },
                'Title': title,
                'Description': description,
                'BaseTemplate': template
            })
        */

        
        return dfd.promise();
    }
    //#endregion Create

    //#region Read
    function _getAll() {
        var baseUrl = SP.Utilities.UrlBuilder.urlCombine(_spPageContextInfo.webServerRelativeUrl,
            "_api/web/lists");

        var dfd = $.ajax({
            url: baseUrl,
            type: "GET",
            contentType: "application/json;odata=verbose",
            headers: {
                "accept": "application/json;odata=verbose"
            }
        });
        return dfd.promise();
    }

    //#endregion Read

    //#region Delete
    function _delete(listName) {
        

        var baseUrl = SP.Utilities.UrlBuilder.urlCombine(
            _spPageContextInfo.webServerRelativeUrl,
            "_api/web/lists/");
        baseUrl += "GetByTitle('" + listName + "')";
        var dfd = $.ajax({
            url: baseUrl,
            type: "POST",
            headers: {
                'X-HTTP-Method': 'DELETE',
                'IF-MATCH': '*',
                "X-RequestDigest": $("#__REQUESTDIGEST").val(),
                "accept": "application/json;odata=verbose"
            }
        });

        return dfd.promise();
    }
    //#endregion Delete

    //#region Add Field
    function _addTextField(listName, fieldName) {
        var baseUrl = SP.Utilities.UrlBuilder.urlCombine(_spPageContextInfo.webServerRelativeUrl, "_api/web/lists/");
        baseUrl += "GetByTitle('" + listName + "')/Fields";

        var itemData = JSON.stringify({ '__metadata': { 'type': 'SP.Field' }, 'Title': fieldName, 'FieldTypeKind': SP.FieldType.text, 'Required': 'false', 'EnforceUniqueValues': 'false', 'StaticName': fieldName });
        var dfd = $.ajax({
            url: baseUrl,
            type: "POST",
            contentType: "application/json;odata=verbose",
            headers: {
                "X-RequestDigest": $("#__REQUESTDIGEST").val(),
                "accept": "application/json;odata=verbose",
                "content-length": itemData.length
            },
            data: itemData
        });
        return dfd.promise();
    }



    //#endregion Add Field

    //#region GetListFields

    function _getListFields() {
        var baseUrl = SP.Utilities.UrlBuilder.urlCombine(_spPageContextInfo.webServerRelativeUrl,
            "_api/web/lists/?$expand=fields/title");
        

        var dfd = $.ajax({
            url: baseUrl,
            type: "GET",
            contentType: "application/json;odata=verbose",
            headers: {
                "accept": "application/json;odata=verbose"
            }
        });
        return dfd.promise();
    }

    //#endregion

    //#endregion private functions

    //#region Public Members

    var publics = {
        create: _create,
        getAllLists: _getAll,
        deleteList: _delete,
        addTextField: _addTextField,
        getListFields: _getListFields
    };
    return publics;

    //#endregion Public Members
}


