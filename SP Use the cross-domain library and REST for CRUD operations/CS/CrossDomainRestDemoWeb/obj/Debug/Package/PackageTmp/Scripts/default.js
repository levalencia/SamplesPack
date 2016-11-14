
function getQueryStringParameter(paramToRetrieve) {
  var params = document.URL.split("?")[1].split("&");
  var strParams = "";
  for (var i = 0; i < params.length; i = i + 1) {
    var singleParam = params[i].split("=");
    if (singleParam[0] == paramToRetrieve)
      return singleParam[1];
  }
}

var appweburl;
var executor;

$(function () {

  appweburl = decodeURIComponent(getQueryStringParameter("SPAppWebUrl"));
  executor = new SP.RequestExecutor(appweburl);
  // register event handlers on page
  $("#cmdAddNewCustomer").click(onAddCustomer);
  $("#cmdAddNewCustomer").button();
  $("#results").append($("<img>", { src: "/Content/gears_anv4.gif" }));

  // retrieve customer items
  getCustomers();

});



function getCustomers() {
  // clear results and add spinning gears icon
  $("#results").empty();
  $("<img>", { "src": "../Content/GEARS_AN.GIF" }).appendTo("#results");

  // begin work to call across network
  var requestUri = appweburl +
                "/_api/Web/Lists/getByTitle('Customers')/items/" +
                "?$select=Id,FirstName,Title,WorkPhone" +
                "&$orderby=Title,FirstName";

  // execute AJAX request 
  executor.executeAsync({
    url: requestUri,
    method: "GET",
    headers: { "ACCEPT": "application/json;odata=verbose"},
    contentType: "application/json",
    success: onDataReturned,
    error: onError
  });

}

function onDataReturned(response) {

  $("#results").empty();

  var data = JSON.parse(response.body);
  var odataResults = data.d.results;

  // set rendering template
  var tableHeader = "<thead>" +
                    "<td>Last Name</td>" +
                    "<td>First Name</td>" +
                    "<td>Work Phone</td>" +
                    "<td>&nbsp;</td>" +
                    "<td>&nbsp;</td>" +
                    "<td>&nbsp;</td>" +
                  "</thead>";

  var table = $("<table>", { id: "customersTable" }).append($(tableHeader));

  var renderingTemplate = "<tr>" +
                            "<td>{{>Title}}</td>" +
                            "<td>{{>FirstName}}</td>" +
                            "<td>{{>WorkPhone}}</td>" +
                            "<td><a href='javascript: onShowCustomerDetail({{>Id}});'><img src='/Content/DETAIL.gif' alt='Show Detail' /></a></td>" +
                            "<td><a href='javascript: onUpdateCustomer({{>Id}});'><img src='/Content/EDITITEM.gif' alt='Edit' /></a></td>" +
                            "<td><a href='javascript: onDeleteCustomer({{>Id}});'><img src='/Content/DELITEM.gif' alt='Delete' /></a></td>" +
                          "</tr>";


  $.templates({ "tmplTable": renderingTemplate });
  table.append($.render.tmplTable(odataResults));
  $("#results").append(table);

}

function onShowCustomerDetail(customer) {

  var customerItemEditUrl = appweburl +
                          "/Lists/Customers/DispForm.aspx?ID=" + customer;

  var dialogOptions = {
    url: customerItemEditUrl,
    title: "Customer Detail",
    dialogReturnValueCallback: getCustomers
  };

  var customer_dialog = $("#addNewCustomer");
  customer_dialog.dialog({
    autoOpen: true,
    title: "Add New Customer",
    width: 300,
    buttons: {
      "Save": onAddNewCustomerSave, 
      "Cancel": function () { $(this).dialog("close"); },    
    }
  });

 
}

function onAddCustomer(event) {
  
  var customer_dialog = $("#addCustomerDialog");
  customer_dialog.dialog({
    autoOpen: true,
    title: "Add New Customer",
    width: 420,
    buttons: {
      "Save": saveNewCustomer,
      "Cancel": function () { $(this).dialog("close"); },    
    }
  });

}

function saveNewCustomer(event) {

  $(this).dialog("close");
  // clear results and add spinning gears icon
  $("#results").empty();
  $("<img>", { "src": "../Content/GEARS_AN.GIF" }).appendTo("#results");


    // get data from dialog for new customer
    var LastName = $("#txtLastName").val();
    var FirstName = $("#txtFirstName").val();
    var WorkPhone = $("#txtWorkPhone").val();

    var requestUri = appweburl +
              "/_api/Web/Lists/getByTitle('Customers')/items/";

    var requestHeaders = {
      "ACCEPT": "application/json;odata=verbose",
      "Content-Type": "application/json;odata=verbose",
      "X-RequestDigest": $("#__REQUESTDIGEST").val(),
    }

    var customerData = {
      __metadata: { "type": "SP.Data.CustomersListItem" },
      Title: LastName,
      FirstName: FirstName,
      WorkPhone: WorkPhone
    };

    requestBody = JSON.stringify(customerData);

    executor.executeAsync({
      url: requestUri,
      method: "POST",
      headers: requestHeaders,
      body: requestBody,
      success: onSuccess,
      error: onError
    });
}

function onDeleteCustomer(customer) {

  var requestUri = appweburl +
                "/_api/Web/Lists/getByTitle('Customers')/items(" + customer + ")";

  var requestHeaders = {
    "ACCEPT": "application/json;odata=verbose",
    "X-RequestDigest": $("#__REQUESTDIGEST").val(),
    "If-Match": "*"
  }

  executor.executeAsync({
    url: requestUri,
    method: "DELETE",
    contentType: "application/json;odata=verbose",
    headers: requestHeaders,
    success: onSuccess,
    error: onError
  });

}

function onUpdateCustomer(customer) {

  // begin work to call across network
  var requestUri = appweburl +
                "/_api/Web/Lists/getByTitle('Customers')/items(" + customer + ")";

  // execute AJAX request
  executor.executeAsync({
    url: requestUri,
    method: "GET",
    headers: { "ACCEPT": "application/json;odata=verbose" },
    success: onCustomerReturned,
    error: onError
  });
}

function onCustomerReturned(data) {

  var dialogArgs = {
    command: "Update",
    Id: data.d.Id,
    LastName: data.d.Title,
    FirstName: data.d.FirstName,
    WorkPhone: data.d.WorkPhone,
    etag: data.d.__metadata.etag
  };

  var dialogOptions = {
    url: "EditCustomer.aspx",
    title: "Update Customer",
    width: "480px",
    args: dialogArgs,
    dialogReturnValueCallback: updateCustomer
  };

  SP.UI.ModalDialog.showModalDialog(dialogOptions);


}

function updateCustomer(dialogResult, returnValue) {

  if (dialogResult == SP.UI.DialogResult.OK) {
    var Id = returnValue.Id;
    var FirstName = returnValue.FirstName;
    var LastName = returnValue.LastName;
    var WorkPhone = returnValue.WorkPhone;
    var etag = returnValue.etag;

    var requestUri = appweburl +
              "/_api/Web/Lists/getByTitle('Customers')/items(" + Id + ")";

    var requestHeaders = {
      "ACCEPT": "application/json;odata=verbose",
      "X-RequestDigest": $("#__REQUESTDIGEST").val(),
      "X-HTTP-Method": "MERGE",
      "If-Match": etag
    }

    var customerData = {
      __metadata: { "type": "SP.Data.CustomersListItem" },
      Title: LastName,
      FirstName: FirstName,
      WorkPhone: WorkPhone
    };

    requestBody = JSON.stringify(customerData);


    executor.executeAsync({
      url: requestUri,
      method: "POST",
      contentType: "application/json;odata=verbose",
      headers: requestHeaders,
      data: requestBody,
      success: onSuccess,
      error: onError
    });

  }

}

function onSuccess(data, request) {
  getCustomers();
}

function onError(error) {
  $("#results").empty();
  $("#results").text("ADD ERROR: " + JSON.stringify(error));
}