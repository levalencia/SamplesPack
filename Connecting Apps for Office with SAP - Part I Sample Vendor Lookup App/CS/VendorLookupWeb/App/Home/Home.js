/// <reference path="../App.js" />
var vendorList = new Array;

(function () {
    "use strict";

    // The initialize function must be run each time a new page is loaded
    Office.initialize = function (reason) {
        $(document).ready(function () {
            app.initialize();
            $('input:radio[name="searchoption"]').change(formatVendorList);
            $('#btnGet').click(getVendorItem);
            $('#insert-id').click(insertId);
            $('#insert-address').click(insertAddress);
            $('#insert-phone').click(insertPhone);
            getVendorList();
        });
    };
})();

    // Reads data from current document selection and displays a notification
    function getDataFromSelection() {
        Office.context.document.getSelectedDataAsync(Office.CoercionType.Text,
            function (result) {
                if (result.status === Office.AsyncResultStatus.Succeeded) {
                    app.showNotification('The selected text is:', '"' + result.value + '"');
                } else {
                    app.showNotification('Error:', result.error.message);
                }
            }
        );
    }

    function getVendorList() {
         $.ajax(
                {
                    type: "GET",
                    url: '/RequestHandler.ashx',
                    dataType: "json",
                    success: function (data) {
                        $.each(data.d.results, function (i, item) {
                            var oVendor = {
                                label: data.d.results[i].Name,
                                value: data.d.results[i].VendorNo
                            };
                            vendorList.push(oVendor);
                        })
                        formatVendorList();
                        $("#vendor").css({"background-image":"none"});
                    },
                    error: function (msg, url, line) {
                        app.showNotification(msg.statusText);
                    }
                });
    }

    function getVendorItem() {
        var radio = $('input[name=searchoption]');
        var selRadio = radio.filter(':checked').val();
        if (selRadio == 'byname') {
            var vendorNumber = $("#vendor-attr").val()
        }
        else {
            var vendorNumber = $("#vendor").val()
        }
        $.ajax(
                {
                    type: "GET",
                    url: "/RequestHandler.ashx?id=" + vendorNumber,
                    dataType: "json",
                    success: function (data) {
                        $("#vendorId").text(data.d.VendorNo);
                        $("#vendorName").text(data.d.Name);
                        $("#vendorStreet").text(data.d.Street);
                        $("#vendorCity").text(data.d.City);
                        $("#vendorRegionPostalCode").text(data.d.Region + ' ' + data.d.PostalCode);
                        $("#vendorCountry").text(data.d.Country);
                        $("#vendorPhone").text(data.d.Telephone);
                        $(".vendor-details").css({ "animation-name": "mymove", "animation-duration": "1s", "animation-timing-function": "ease", "animation-fill-mode": "forwards" });
                    },
                    error: function (msg, url, line) {
                        app.showNotification(msg);
                    }
                });
        }

    function formatVendorList() {
        var radio = $('input[name=searchoption]');
        var selRadio = radio.filter(':checked').val();
        if (selRadio == 'byname')
        {
            var listItems = new Array;
            $.each(vendorList, function (i, item) {
                var oItem = {
                    label: item.label,
                    value: item.value
                }
                listItems.push(oItem)
            });
        }
        else
        {
            var listItems = new Array;
            $.each(vendorList, function (i, item) {
                var oItem = {
                    label: item.value,
                    value: item.label
                }
                listItems.push(oItem)
            });
        }
       $("#vendor").val('');
       $("#vendor").autocomplete({
            minLength:0,
            source: listItems,
            focus: function (event, ui) {
                $("#vendor").val(ui.item.label);
                return false;
            },
            select: function (event, ui) {
                $( "#vendor" ).val( ui.item.label);
                $( "#vendor-attr" ).val( ui.item.value );
                return false;
            }
        })
        .data( "ui-autocomplete" )._renderItem = function( ul, item ) {
            return $( "<li>" )
              .append( "<a>" + item.label + " (" + item.value + ") " + "</a>" )
              .appendTo( ul );
        };
    }

    function insertData(vendorData) {
        Office.context.document.setSelectedDataAsync(vendorData, function (result) {
            if (result.status == 'succeeded') {
              }
            else
                app.showNotification('Error: ' + result.error.message);
        });
    }

    function insertVendorName() {
        Office.select("bindings#vendorName").setDataAsync('SAP Vendor Name', function (asyncResult) { });
    }

    function insertId() {
        var id = $('#vendorId').text();
        insertData(id);
    }

    function insertAddress() {
        var address = $('#vendorName').text() + '\n' + $('#vendorStreet').text() + '\n' + $('#vendorCity').text() + '\n' + $('#vendorRegionPostalCode').text() + '\n' + $('#vendorCountry').text();
        insertData(address);
    }

    function insertPhone() {
        var phone = $('#vendorPhone').text();
        insertData(phone);
    }


