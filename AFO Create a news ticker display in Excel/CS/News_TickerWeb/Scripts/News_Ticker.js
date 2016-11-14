Office.initialize = function (reason) {
    $(document).ready(function () {

        var first = 0;
        var speed = 700;
        var pause = 3000;

        function removeFirst() {
            first = $('ul#listticker li:first').html();
            $('ul#listticker li:first')
            .animate({ opacity: 0 }, speed)
            .fadeOut('slow', function () { $(this).remove(); });
            addLast(first);
        }

        //Next line counter
        var i = 9;

        function addLast(first) {

            last = '<li><p><img src="../images/news.gif" /><a href="#">News Headline ' + (i++) + '</a></p></li>';

            first + '';
            $('ul#listticker').append(last)
            $('ul#listticker li:last')
            .animate({ opacity: 1 }, speed)
            .fadeIn('slow')
        }
        interval = setInterval(removeFirst, pause);
    });
};