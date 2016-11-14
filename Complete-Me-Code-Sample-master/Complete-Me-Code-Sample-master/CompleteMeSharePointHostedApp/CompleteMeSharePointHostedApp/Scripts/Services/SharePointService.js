myApp.service('SharePointJSOMService', function ($q, $http) {
    this.getCurrentUser = function () {
        var deferred = $.Deferred();
        //First we must call the EnsureSetup method
        JSRequest.EnsureSetup();
        hostweburl = decodeURIComponent(JSRequest.QueryString["SPHostUrl"]);
        appweburl = decodeURIComponent(JSRequest.QueryString["SPAppWebUrl"]);

        var userid = _spPageContextInfo.userId;
        var restQueryUrl = appweburl + "/_api/web/getuserbyid(" + userid + ")";

        var executor = new SP.RequestExecutor(appweburl);
        executor.executeAsync({
            url: restQueryUrl,
            method: "GET",
            headers: { "Accept": "application/json; odata=verbose" },
            success: function (data, textStatus, xhr) {
                deferred.resolve(JSON.parse(data.body));
            },
            error: function (xhr, textStatus, errorThrown) {
                deferred.reject(JSON.stringify(xhr));
            }
        });
        return deferred;
    };

    this.getTasksREST = function ($scope, listTitle) {
        var deferred = $.Deferred();
        //First we must call the EnsureSetup method
        JSRequest.EnsureSetup();
        hostweburl = decodeURIComponent(JSRequest.QueryString["SPHostUrl"]);
        appweburl = decodeURIComponent(JSRequest.QueryString["SPAppWebUrl"]);

        var restQueryUrl = appweburl + "/_api/SP.AppContextSite(@target)/web/lists/getByTitle('" + listTitle + "')/items?$select=Title,ID,DueDate,Status,Priority,AssignedTo/ID,AssignedTo/Title,AssignedTo/Name&$expand=AssignedTo/ID,AssignedTo/Title,AssignedTo/Name&@target='" + hostweburl + "'";

        var executor = new SP.RequestExecutor(appweburl);
        executor.executeAsync({
            url: restQueryUrl,
            method: "GET",
            headers: { "Accept": "application/json; odata=verbose" },
            success: function (data, textStatus, xhr) {
                deferred.resolve(JSON.parse(data.body));
            },
            error: function (xhr, textStatus, errorThrown) {
                deferred.reject(JSON.stringify(xhr));
            }
        });
        return deferred;
    };

    this.checkTaskList = function ($scope, listTitle) {
        var deferred = $.Deferred();
        //First we must call the EnsureSetup method
        JSRequest.EnsureSetup();
        hostweburl = decodeURIComponent(JSRequest.QueryString["SPHostUrl"]);
        appweburl = decodeURIComponent(JSRequest.QueryString["SPAppWebUrl"]);

        var context = new SP.ClientContext(appweburl);
        var appContextSite = new SP.AppContextSite(context, hostweburl);
        var web = appContextSite.get_web();
        context.load(web);

        //check list exists
        var lists = web.get_lists();
        context.load(lists);
        context.executeQueryAsync(
            function () {
                var isListAvail = false;
                var listEnumerator = lists.getEnumerator();
                while (listEnumerator.moveNext()) {
                    list = listEnumerator.get_current();
                    if (list.get_title() == listTitle) {
                        isListAvail = true;
                    }
                }
                if (isListAvail != true) {
                    //create the list
                    var listCreationInfo = new SP.ListCreationInformation();
                    listCreationInfo.set_title(listTitle);
                    listCreationInfo.set_templateType(SP.ListTemplateType.tasks);
                    var list = web.get_lists().add(listCreationInfo);
                    context.load(list);
                    context.executeQueryAsync(
                        function () {

                        },
                        function (sender, args) {
                            deferred.reject('Request failed. ' + args.get_message() + '\n' + args.get_stackTrace());
                        }
                    );
                }
            },
            function (sender, args) {
                deferred.reject('Request failed. ' + args.get_message() + '\n' + args.get_stackTrace());
            }
        );

        return deferred.promise;
    };
    
    this.saveTask = function (scope, listTitle) {
        var deferred = $.Deferred();

        var context = new SP.ClientContext(appweburl);
        var appContextSite = new SP.AppContextSite(context, hostweburl);
        var web = appContextSite.get_web();
        context.load(web);
        var list = web.get_lists().getByTitle('Tasks');


        var listItem = list.getItemById(scope.todo.id);
        listItem.set_item('Title', scope.todo.text);
        var status = 'Not started';
        if (scope.todo.done === true)
            status = 'Completed';
        listItem.set_item('Status', status);
        listItem.set_item('DueDate', scope.todo.dueDate);

        var user = getUserInfo(scope.todo.id);
        if (user['Description'] != null)//if the people picker isn't changed, then no need to update (Description only populated if user selected in picker)
        {
            var users = new Array();
            users.push(SP.FieldUserValue.fromUser(user['Description']));
            scope.todo.assignedTo = user['DisplayText'];
            scope.todo.assignedToName = user['Description'];
            listItem.set_item('AssignedTo', users);
        }
        listItem.update();

        context.executeQueryAsync(
            Function.createDelegate(this, function (sender, args) {
            }),
            Function.createDelegate(this, function (sender, args) {
                deferred.reject('Request failed. ' + args.get_message() + '\n' + args.get_stackTrace());
            })
        );
        return deferred.promise;
    }

    this.bumpTask = function (scope, listTitle)
    {
        var deferred = $.Deferred();

        var context = new SP.ClientContext(appweburl);
        var appContextSite = new SP.AppContextSite(context, hostweburl);
        var web = appContextSite.get_web();
        context.load(web);
        var list = web.get_lists().getByTitle('Tasks');

        var listItem = list.getItemById(scope.todo.id);
        listItem.set_item('DueDate', scope.todo.dueDate);
        listItem.update();

        context.executeQueryAsync(
            Function.createDelegate(this, function (sender, args) {
            }),
            Function.createDelegate(this, function (sender, args) {
                deferred.reject('Request failed. ' + args.get_message() + '\n' + args.get_stackTrace());
            })
        );
        return deferred.promise;
    }

    this.deleteTask = function (scope, listTitle) {
        var deferred = $.Deferred();

        var context = new SP.ClientContext(appweburl);
        var appContextSite = new SP.AppContextSite(context, hostweburl);
        var web = appContextSite.get_web();
        context.load(web);
        var list = web.get_lists().getByTitle('Tasks');

        var listItem = list.getItemById(scope.todo.id);
        listItem.deleteObject();
        context.executeQueryAsync(
                Function.createDelegate(this, function () {
                }),
                Function.createDelegate(this, function () {
                    deferred.reject('Request failed. ' + args.get_message() + '\n' + args.get_stackTrace());
                })
            );
        return deferred.promise;
    }

    this.addTask = function (listTitle, title, dueDate) {
        var deferred = $.Deferred();

        var context = new SP.ClientContext(appweburl);
        var appContextSite = new SP.AppContextSite(context, hostweburl);
        var web = appContextSite.get_web();
        context.load(web);
        var list = web.get_lists().getByTitle(listTitle);

        // create the ListItemInformational object
        var listItemInfo = new SP.ListItemCreationInformation();
        var listItem = list.addItem(listItemInfo);
        listItem.set_item('Title', title);
        listItem.set_item('DueDate', dueDate)
        var users = new Array();
        users.push(SP.FieldUserValue.fromUser(currentUser.LoginName.split("|")[1]));
        listItem.set_item('AssignedTo', users)
        listItem.update();

        context.executeQueryAsync(
            function () {
                var id = listItem.get_id();
                deferred.resolve(id);
            },
            function (sender, args) {
                deferred.reject('Request failed. ' + args.get_message() + '\n' + args.get_stackTrace());
            }
        );

        return deferred;
    };
});


// Render and initialize the client-side People Picker.
function initializePeoplePicker(peoplePickerElementId, displayName, userName) {

    // Create a schema to store picker properties, and set the properties.
    var schema = {};
    schema['PrincipalAccountType'] = 'User,DL,SecGroup,SPGroup';
    schema['SearchPrincipalSource'] = 15;
    schema['ResolvePrincipalSource'] = 15;
    schema['AllowMultipleValues'] = false;
    schema['MaximumEntitySuggestions'] = 50;
    schema['Width'] = '280px';
    var users = null;

    if (displayName != null) {
        users = new Array(1);
        var user = new Object();
        user.AutoFillDisplayText = displayName;
        user.AutoFillKey = userName;
        user.AutoFillSubDisplayText = "";
        user.DisplayText = displayName;
        user.EntityType = "User";
        user.IsResolved = true;
        user.Key = userName;
        user.ProviderDisplayName = "Tenant";
        user.ProviderName = "Tenant";
        user.Resolved = true;
        users[0] = user;
    }
    // Render and initialize the picker. 
    // Pass the ID of the DOM element that contains the picker, an array of initial
    // PickerEntity objects to set the picker value, and a schema that defines
    // picker properties.
    SPClientPeoplePicker_InitStandaloneControlWrapper(peoplePickerElementId, users, schema);
}

// Query the picker for user information.
function getUserInfo(id) {
    var fieldName = 'peoplePickerDiv' + id + '_TopSpan';

    var peoplePickerDiv = $("[id$='" + fieldName + "']");

    // Get the people picker object from the page.
    var peoplePicker = SPClientPeoplePicker.SPClientPeoplePickerDict[peoplePickerDiv[0].id];


    // Get information about all users.
    var users = peoplePicker.GetAllUserInfo();
    return users[0];
}