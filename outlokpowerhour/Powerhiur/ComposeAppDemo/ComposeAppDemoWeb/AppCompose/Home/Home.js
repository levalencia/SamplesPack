/// <reference path="../App.js" />

(function () {
    'use strict';

    // The initialize function must be run each time a new page is loaded
    Office.initialize = function (reason) {
        $(document).ready(function () {
            app.initialize();

            $('#set-subject').click(setSubject);
            $('#get-subject').click(getSubject);
            $('#add-to-recipients').click(addToRecipients);
            $("#setBody").click(setBody);
            $("#addAttachment").click(addAttachment);
            $("#setStart").click(setStart);
        });
    };

    function setBody() {
        Office.context.mailbox.item.body.setSelectedDataAsync("<b>this is bold</b>this is not bold", { coercionType: "html" });
    }

    function addAttachment() {
        Office.context.mailbox.item.addFileAttachmentAsync("http://weknowgifs.com/wp-content/uploads/2013/05/mexican-soccer-coach-super-saiyan-gif.gif", "supersaiyan.gif");
    }

    function setStart()
    {
        var date = new Date();
        date.setHours(10);
        Office.context.mailbox.item.start.setAsync(date);
    }

    function setSubject() {
        Office.cast.item.toItemCompose(Office.context.mailbox.item).subject.setAsync("Hello world!");
    }

    function getSubject() {
        Office.cast.item.toItemCompose(Office.context.mailbox.item).subject.getAsync(function (result) {
            app.showNotification('The current subject is', result.value)
        });
    }

    function addToRecipients() {
        Office.cast.item.toItemCompose(Office.context.mailbox.item).to.addAsync([Office.context.mailbox.userProfile.emailAddress]);
    }

})();