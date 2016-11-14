
var _Item;

var itemEntities;

var myEntities = new Array();
var uniqueNumInRecipientsAndBody=0;


Office.initialize = function () {

    _Item = Office.context.mailbox.item;
    itemEntities = _Item.getEntities();

    $(document).ready(function () {
       initIM();
    });  

}






var checkedItems;
checkedItems = "";

// This function verifies if the user has checked any of the checkboxes for the SMTP addresses, 
// and if so, constructs a hyperlink for starting an IM session.
function checkAddress(emailForm)
{
    var anychecked;
    anychecked = 0;
    checkedItems = "im:";
  
    // See if the email sender address is checked.
    if (emailForm.checkbox0.checked == true) {
        checkedItems += "<sip:" + _Item.sender.emailAddress + ">";
        anychecked = 1;
    }

    for (var i=1; i<=uniqueNumInRecipientsAndBody; i++) {
        var tempy;

        // Determine if each checkbox is checked. 
        // Each checkbox name is a variable depending on value of i.
        tempy = "checkbox" + i;
        // Use JavaScript square bracket notation instead of dot notation to access
        // emailForm.tempy.checked, because tempy is a variable.
        tempy = emailForm[tempy]["checked"];
        
        if (tempy)  {
           // If the checkbox is checked, construct a SIP address for that email address.
           checkedItems += "<sip:" + myEntities[i-1] + ">"; 
           anychecked = 1;  
        }
    }
    
    // Clear the variable if none of the checkboxes is checked. 
    // UI phrase remains not a hyperlink.
    if (anychecked == 0) {
        checkedItems = "";
        document.getElementById("mySpan").innerHTML = "Start an instant message conversation";
    }  
    else {
        // If one or more checkboxes are checked, then turn the UI phrase into a hyperlink.
        document.getElementById("mySpan").innerHTML = 
            "<A HREF = \"" + checkedItems + "\">Start an IM conversation</A>"; 
    }
     
}


// This function counts the unique number of email addresses. 
// The first such count number of array cells in myEntities contain the unique email addresses.
function makeMyAddressesUnique (addressArray)
{
    var emailAddress;
    var j=0;

    
    for (var i in addressArray) {
        emailAddress = addressArray[i];
        
        // Check if email address is not the same as the sender's address 
        // or the current user's address, is new and 
        // has not occured in the first i number of cells in addressArray.
        if ((emailAddress.toLowerCase() !== _Item.sender.emailAddress.toLowerCase()) &&
            (emailAddress.toLowerCase() !== 
            Office.context.mailbox.userProfile.emailAddress.toLowerCase()) &&
            (emailAddrIsNew (i, emailAddress, addressArray))) {
            myEntities[j] = emailAddress.toLowerCase();
            j++;
        }
        // Otherwise email address occurred in sender or addressArray already, ignore it. 
        // The next new email address will overwrite cell j in myEntities.
      
    }


    // Tallied the number of unique addresses in the body.
    uniqueNumInRecipientsAndBody = j;    
}





function emailAddrIsNew (index, address, array) {
    var counter = 0;
    while (counter < index) {
        if (address.toLowerCase() === array[counter].toLowerCase()) {
            return (false);
        }
        counter++;
    }
    return (true);
}


function initIM() 
{

    var myHTMLString;
    var myCell;
    var tempEntities;
    var toRecipients;
    var ccRecipients;
    var recipientsAddresses = new Array ();
    var recipientsAndBodyAddresses = new Array();

    
    
    toRecipients = _Item.to;
    ccRecipients = _Item.cc;
    
    myHTMLString = "";

    // Assign first the To recipients addresses, followed by
    // the cc recipients addresses.
    for (var i=0; i<toRecipients.length; i++) {
        recipientsAddresses[i] = toRecipients[i].emailAddress;
    }

    for (var i=0; i<ccRecipients.length; i++) {
        recipientsAddresses[i+toRecipients.length] = ccRecipients[i].emailAddress;
    }
    
    recipientsAndBodyAddresses = recipientsAddresses.concat(itemEntities.emailAddresses);


    makeMyAddressesUnique (recipientsAndBodyAddresses);

    myCell = document.getElementById('extensionspace');



    
    myHTMLString += "<form><span id=\"mySpan\">Start an instant message conversation</span>" + 
         " with the following persons:<BR>";


    myHTMLString += "<input type=checkbox name='checkbox0" + "' value='" + 
        _Item.sender.emailAddress + "' onClick='checkAddress(this.form)' />" + 
        _Item.sender.emailAddress + "<br>";

    for (var i=0; i<uniqueNumInRecipientsAndBody; i++) {
        myHTMLString += "<input type=checkbox name='checkbox" + (i+1) + "' value='" + 
            myEntities[i] + "' onClick='checkAddress(this.form)' />" + 
            myEntities[i] + "<br>";
    }

    
    myCell.innerHTML = myHTMLString + "</form>";
    
}






