/// <reference path="../App.js" />

(function () {
    "use strict";

    // The initialize function must be run each time a new page is loaded
    Office.initialize = function (reason) {
        $(document).ready(function () {
            app.initialize();

            $('#send').click(sendFeedback);
        });
    };

    function sendFeedback() {
        $('.disable-while-sending').prop('disabled', true);

        var dataToPassToService = {
            Feedback: $('#feedback').val(),
            Rating: $('#rating').val()
        };

        $.ajax({
            url: '../../api/SendFeedback',
            type: 'POST',
            data: JSON.stringify(dataToPassToService),
            contentType: 'application/json;charset=utf-8'
        }).done(function (data) {
            app.showNotification(data.Status, data.Message);
        }).fail(function (status) {
            app.showNotification('Error', 'Could not communicate with the server.');
        }).always(function () {
            $('.disable-while-sending').prop('disabled', false);
        });
    }
})();