// This function is run when the app is ready to start interacting with the host application
// It ensures the DOM is ready before updating the span elements with values from the current message
Office.initialize = function () {
    $(document).ready(function () {
        var item = Office.context.mailbox.item;
        $('#subject').text(item.normalizedSubject);
        $('#from').text(item.from.displayName);
        $('#to').text(item.to[0].displayName);
    });
};

function getSoapEnvelope(request) {
    // Wrap an Exchange Web Services request in a SOAP envelope.
    var result =

    '<?xml version="1.0" encoding="utf-8"?>' +
    '<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"' +
    '               xmlns:xsd="http://www.w3.org/2001/XMLSchema"' +
    '               xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"' +
    '               xmlns:t="http://schemas.microsoft.com/exchange/services/2006/types">' +
    '  <soap:Header>' +
    '  </soap:Header>' +
    '  <soap:Body>' +

    request +

    '  </soap:Body>' +
    '</soap:Envelope>';

    return result;
};

function getSubjectRequest(id) {
    // Return a GetItem EWS operation request for the subject of the specified item. 
    var result =

 '    <GetItem xmlns="http://schemas.microsoft.com/exchange/services/2006/messages">' +
 '      <ItemShape>' +
 '        <t:BaseShape>IdOnly</t:BaseShape>' +
 '        <t:AdditionalProperties>' +
 '            <t:FieldURI FieldURI="item:Subject"/>' +
 '        </t:AdditionalProperties>' +
 '      </ItemShape>' +
 '      <ItemIds><t:ItemId Id="' + id + '"/></ItemIds>' +
 '    </GetItem>';

    return result;
};

// Send an EWS request for the message's subject.
function sendRequest() {
    // Create a local variable that contains the mailbox.
    var mailbox = Office.context.mailbox;
    var request = getSubjectRequest(mailbox.item.itemId);
    var envelope = getSoapEnvelope(request);

    mailbox.makeEwsRequestAsync(envelope, callback);
};

// Function called when the EWS request is complete.
function callback(asyncResult) {
    var response = asyncResult.value;
    var context = asyncResult.context;

    // Process the returned response here.
    var responseSpan = document.getElementById("response");
    responseSpan.innerText = response;
};
