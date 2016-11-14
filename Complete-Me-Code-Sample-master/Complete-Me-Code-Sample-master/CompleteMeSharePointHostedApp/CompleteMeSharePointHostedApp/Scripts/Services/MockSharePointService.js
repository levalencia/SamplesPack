myApp.service('SharePointJSOMService', function ($q, $http) {
    this.getCurrentUser = function () {
        var deferred = $.Deferred();
        var dataBody = '{\"d\":{\"__metadata\":{\"id\":\"http://app-8e4634c18eac72.thakeapps.com/sites/test2/Complete Me/_api/Web/GetUserById(1)\",\"uri\":\"http://app-8e4634c18eac72.thakeapps.com/sites/test2/Complete%20Me/_api/Web/GetUserById(1)\",\"type\":\"SP.User\"},\"Groups\":{\"__deferred\":{\"uri\":\"http://app-8e4634c18eac72.thakeapps.com/sites/test2/Complete%20Me/_api/Web/GetUserById(1)/Groups\"}},\"Id\":1,\"IsHiddenInUI\":false,\"LoginName\":\"i:0#.w|thake\\jthake\",\"Title\":\"Jeremy Thake\",\"PrincipalType\":1,\"Email\":\"\",\"IsSiteAdmin\":false,\"UserId\":{\"__metadata\":{\"type\":\"SP.UserIdInfo\"},\"NameId\":\"s-1-5-21-1604706428-1941685171-1054749979-1604\",\"NameIdIssuer\":\"urn:office:idp:activedirectory\"}}}';
        deferred.resolve(JSON.parse(dataBody));
         
        return deferred;
    };

    this.getTasksREST = function ($scope, listTitle) {
        var deferred = $.Deferred();
       
        var deferred = $.Deferred();
        var dataBody = "";//'{\"d\":{\"__metadata\":{\"id\":\"http://app-8e4634c18eac72.thakeapps.com/sites/test2/Complete Me/_api/Web/GetUserById(1)\",\"uri\":\"http://app-8e4634c18eac72.thakeapps.com/sites/test2/Complete%20Me/_api/Web/GetUserById(1)\",\"type\":\"SP.User\"},\"Groups\":{\"__deferred\":{\"uri\":\"http://app-8e4634c18eac72.thakeapps.com/sites/test2/Complete%20Me/_api/Web/GetUserById(1)/Groups\"}},\"Id\":1,\"IsHiddenInUI\":false,\"LoginName\":\"i:0#.w|thake\\jthake\",\"Title\":\"Jeremy Thake\",\"PrincipalType\":1,\"Email\":\"\",\"IsSiteAdmin\":false,\"UserId\":{\"__metadata\":{\"type\":\"SP.UserIdInfo\"},\"NameId\":\"s-1-5-21-1604706428-1941685171-1054749979-1604\",\"NameIdIssuer\":\"urn:office:idp:activedirectory\"}}}{\"d\":{\"results\":[{\"__metadata\":{\"id\":\"5508c83f-0219-462c-b520-afc3a7179370\",\"uri\":\"http://app-8e4634c18eac72.thakeapps.com/sites/test2/Complete%20Me/_api/Web/Lists(guid\'8990981f-b86e-4380-a4b5-89252c93c8a4\')/Items(1)\",\"etag\":\"\\"10\\"\",\"type\":\"SP.Data.TasksListItem\"},\"AssignedTo\":{\"__metadata\":{\"id\":\"278d79d1-be0c-4399-b1a9-27862d0182d4\",\"type\":\"SP.Data.UserInfoItem\"},\"ID\":3,\"Title\":\"Jeremy Thake\",\"Name\":\"THAKE\\jthake\"},\"Id\":1,\"ID\":1,\"Title\":\"Confirm Flights for SPC14\",\"Priority\":\"(2) Normal\",\"Status\":\"Not started\",\"DueDate\":\"2014-08-26T17:49:49Z\"},{\"__metadata\":{\"id\":\"3d597248-fc4f-4b8b-ba7a-4cc36eb37cfc\",\"uri\":\"http://app-8e4634c18eac72.thakeapps.com/sites/test2/Complete%20Me/_api/Web/Lists(guid\'8990981f-b86e-4380-a4b5-89252c93c8a4\')/Items(2)\",\"etag\":\"\\"10\\"\",\"type\":\"SP.Data.TasksListItem\"},\"AssignedTo\":{\"__metadata\":{\"id\":\"229b31e0-a00f-42e4-a963-110e85899e0d\",\"type\":\"SP.Data.UserInfoItem\"},\"ID\":9,\"Title\":\"George Petrou\",\"Name\":\"i:0#.w|thake\\gpetrou\"},\"Id\":2,\"ID\":2,\"Title\":\"Confirm Hotel room for SPC14\",\"Priority\":\"(2) Normal\",\"Status\":\"Not started\",\"DueDate\":\"2014-03-03T18:49:50Z\"},{\"__metadata\":{\"id\":\"8aa9da18-4b41-4d49-8b4f-dda6edbeda6e\",\"uri\":\"http://app-8e4634c18eac72.thakeapps.com/sites/test2/Complete%20Me/_api/Web/Lists(guid\'8990981f-b86e-4380-a4b5-89252c93c8a4\')/Items(3)\",\"etag\":\"\\"4\\"\",\"type\":\"SP.Data.TasksListItem\"},\"AssignedTo\":{\"__metadata\":{\"id\":\"eae69725-cdae-4846-9a20-f7994a802fc2\",\"type\":\"SP.Data.UserInfoItem\"},\"ID\":3,\"Title\":\"Jeremy Thake\",\"Name\":\"THAKE\\jthake\"},\"Id\":3,\"ID\":3,\"Title\":\"Pack bags for SPC14\",\"Priority\":\"(2) Normal\",\"Status\":\"Not started\",\"DueDate\":\"2014-03-21T20:34:11Z\"}]}}\';
        deferred.resolve(JSON.parse(dataBody));
         
        return deferred;
    };

    this.checkTaskList = function ($scope, listTitle) {
        var deferred = $.Deferred();

        return deferred;
    };

    this.addTask = function (listTitle, title, dueDate) {
        var deferred = $.Deferred();
        deferred.resolve("1");
        return deferred;
    };
});
