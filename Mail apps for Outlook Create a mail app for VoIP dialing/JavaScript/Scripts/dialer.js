var init = false;
var bodyload = false
var _Item;

// The initialize function is required for all extensions
Office.initialize = function () {
    _Item = Office.context.mailbox.item;
    onInitializeComplete();
}

// Initialze Dialer
function initDialer() {
    var numbers = _Item.getEntities().phoneNumbers;
    var htmlElement = document.getElementById('dialerholder');
    var supportElement = document.getElementById('support');
    var htmlToShow = "";

    if (numbers == null || numbers.length == 0) {
        htmlElement.innerHTML = "<b style='color:Red'>Error happened while getting phone numbers. Please contact to report this issue.<b>";
        supportElement.href += "Phone Numbers Entity is Null";
        return;
    }

    $.each(numbers, function (i, number) {
        htmlToShow += "<br><a href='callto:tel:" + number.phoneString + "'>" + number.originalPhoneString + "</a>";
    });

    htmlElement.innerHTML = htmlToShow;
    supportElement.href += "Phone Numbers Length is: " + numbers.length;
}

// Handler for Initialization Complete
function onInitializeComplete() {
    init = true;
    if (bodyload && init) {
        initDialer();
    }
}

// Handler for Extension Body onload
function loadcomplete() {
    bodyload = true;
    if (bodyload && init) {
        initDialer();
    }
}