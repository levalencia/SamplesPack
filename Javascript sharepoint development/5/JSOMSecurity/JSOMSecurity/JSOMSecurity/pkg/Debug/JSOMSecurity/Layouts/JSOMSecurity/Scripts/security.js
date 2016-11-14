"use strict"

var BasicJSOM = window.BasicJSOM || {};
BasicJSOM.Security = BasicJSOM.Security || {};

$(document).ready(function () {
    BasicJSOM.Security.SimpleDemo = new BasicJSOM.Security.Simple();
    BasicJSOM.Security.Init();

});


BasicJSOM.Security.Init = function () {

    $("#securityButton1").click(BasicJSOM.Security.SimpleDemo.check);
    $("#securityButton2").click(BasicJSOM.Security.SimpleDemo.getGroups);
    $("#securityButton3").click(BasicJSOM.Security.SimpleDemo.addUser);
    $("#securityButton4").click(BasicJSOM.Security.SimpleDemo.removeUser);
    $("#securityButton5").click(BasicJSOM.Security.SimpleDemo.addRole);
   
}

BasicJSOM.Security.Simple = function () {

    //#region private variables
    
    var targetList;
    var user;
    var memberGroup;
    var userCollection;
    var siteGroups;
    var context = new SP.ClientContext();
    var web = context.get_web();

    //#endregion

    //#region private functions

    //#region Check Security
    function _checkSecurity() {
        clearResults();
        targetList = getTargetList();
        context.load(targetList, 'EffectiveBasePermissions');
        context.executeQueryAsync(onPermissionCheckSucceed, BasicJSOM.Utilities.Fail);
    }

    function onPermissionCheckSucceed() {
        var perms = SP.PermissionKind.editListItems
            && SP.PermissionKind.addListItems
            && SP.PermissionKind.deleteListItems
            && SP.PermissionKind.viewListItems;
        if (targetList.get_effectiveBasePermissions().has(perms))
        {
            BasicJSOM.Utilities.LogResult("You have full editorial access to the SampleData list");
        }
        else
        {
            BasicJSOM.Utilities.LogResult("You do not have editorial access to the SampleData list");
        }
    }
    //#endregion Check Security

    //#region GetGroups
    function _getGroups() {
        clearResults();
        siteGroups = web.get_siteGroups();
        context.load(siteGroups);
        context.executeQueryAsync(onGetGroupsSucceeded, BasicJSOM.Utilities.Fail);


    }

    function onGetGroupsSucceeded() {
        var msg = "Web contains the following groups:<ul>";
        for (var i = 0; i < siteGroups.get_count() ; i++)
        {
            msg += "<li>" + siteGroups.itemAt(i).get_title() + "</li>";
        }
        msg += "</ul>";
        BasicJSOM.Utilities.LogResult(msg);
    }

    //#endregion

    //#region Add User
    function _addUserToGroup() {
        clearResults();
        user = web.ensureUser("Wingtip\\MDebakey");
        memberGroup = web.get_siteGroups().getByName("Members");
        userCollection = memberGroup.get_users();
        userCollection.addUser(user);
        
        context.load(user);
        context.load(memberGroup);
        context.load(userCollection);
        context.executeQueryAsync(onAddUserSucceeded, BasicJSOM.Utilities.Fail);

    
    }
    

    function onAddUserSucceeded() {
        var msg = user.get_title() + " added to group " + memberGroup.get_title()+ ".  Group membership is now:<ul>";
        for (var i = 0; i < userCollection.get_count() ; i++)
        {
            msg += "<li>" + userCollection.itemAt(i).get_title() + "</li>";
        }
        msg += "</ul>";
        BasicJSOM.Utilities.LogResult(msg);
    }

    //#endregion

    //#region RemoveUser

    function _removeUserFromGroup() {
        clearResults();
        user = web.ensureUser("Wingtip\\MDebakey");
        memberGroup = web.get_siteGroups().getByName("Members");
        userCollection = memberGroup.get_users();
        context.load(userCollection);
        userCollection.remove(user);

        context.load(memberGroup);
        context.load(userCollection);
        context.executeQueryAsync(onRemoveUserSucceeded, BasicJSOM.Utilities.Fail);
    }

    function onRemoveUserSucceeded() {
        var msg = "User removed from group " + memberGroup.get_title() + ".  Group membership is now:<ul>";
        for (var i = 0; i < userCollection.get_count(); i++)
        {
            msg += "<li>" + userCollection.itemAt(i).get_title() + "</li>";
        }
        msg += "</ul>";
        BasicJSOM.Utilities.LogResult(msg);
    }
    //#endregion

    //#region Add Role

    function _addRole() {
        clearResults();

        var siteColl = context.get_site();

        //#region Set up permissions to be assigned
        var permissions = new SP.BasePermissions();
        permissions.set(SP.PermissionKind.viewListItems);
        permissions.set(SP.PermissionKind.addListItems);
        permissions.set(SP.PermissionKind.editListItems);
        permissions.set(SP.PermissionKind.deleteListItems);
        //#endregion

        //#region Create new Role Definition
        var roleDefinitionCreationInfo = new SP.RoleDefinitionCreationInformation();
        roleDefinitionCreationInfo.set_name(getRandomName('Manage List Items'));
        roleDefinitionCreationInfo.set_description('Allows a user to manage list items');
        roleDefinitionCreationInfo.set_basePermissions(permissions);
        var roleDefinition = siteColl.get_rootWeb().get_roleDefinitions().add(roleDefinitionCreationInfo);
        //#endregion

        //#region Create new RoleDefinitionBindingCollection and add new Role Definition to it
        var newBindings = SP.RoleDefinitionBindingCollection.newObject(context);
        newBindings.add(roleDefinition);
        //#endregion

        //#region Get List to work with and break permissions so we can manage its permissions directly
        targetList = getTargetList();
        targetList.breakRoleInheritance(true, false);  //copyRoleAssignments, clearSubScopes
        //#endregion

        //#region Assign Role to current user on targetList
        var assignments = targetList.get_roleAssignments();
        var roleAssignment = assignments.add(web.get_currentUser(), newBindings);
        //#endregion


        context.load(targetList, 'Id');
        context.executeQueryAsync(onRoleCreationSucceeded, BasicJSOM.Utilities.Fail);
    }

    function onRoleCreationSucceeded() {
        var listPermsUrl = SP.Utilities.Utility.getLayoutsPageUrl("user.aspx");
        var urlBuilder = new SP.Utilities.UrlBuilder(listPermsUrl);
        var listId = new SP.Guid(targetList.get_id().toString('B'));
        urlBuilder.addKeyValueQueryString("obj", listId + ",list");
        urlBuilder.addKeyValueQueryString("List", listId.toString());

        var rolesUrl = SP.Utilities.Utility.getLayoutsPageUrl("role.aspx");

        var msg = "Security modified: <br />";
        msg += "<a href='" + rolesUrl + "' target='_new'>Permission Levels</a><br />";
        msg += "<a href='" + urlBuilder.get_url() + "' target='_new2'>SampleData list</a>"
        BasicJSOM.Utilities.LogResult(msg);

    }

    function getRandomName(base) {
        var now = new Date();
        return base + "_" + now.getMilliseconds().toString() + (Math.floor(Math.random() * 100) + 1).toString();
    }


    //#endregion Add Role

    //#region Utilities
    function getTargetList() {
        return web.get_lists().getByTitle('SampleData');
    }

    function clearResults() {
        $("#results").text("");
    }
    //#endregion

    //#endregion private functions

    //#region public members

    var publics = {
        check: _checkSecurity,
        addUser: _addUserToGroup,
        removeUser: _removeUserFromGroup,
        addRole: _addRole,
        getGroups: _getGroups
    };

    return publics;

    //#endregion


}
