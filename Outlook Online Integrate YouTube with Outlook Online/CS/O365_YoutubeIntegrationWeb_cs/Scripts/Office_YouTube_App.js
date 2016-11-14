// This function is run when the app is ready to start interacting with the host application
// It ensures the DOM is ready before updating the span elements with values from the current message
Office.initialize = function () {
    $(document).ready(function () {
        var item = Office.context.mailbox.item;
        var entities = item.getRegExMatches();
        var video = entities.VideoURL;
        //It will execute first video url, according to regular expression defined in Manifest. 
        $('#iframeYouTube').attr('src', video[0]);
    });
};
