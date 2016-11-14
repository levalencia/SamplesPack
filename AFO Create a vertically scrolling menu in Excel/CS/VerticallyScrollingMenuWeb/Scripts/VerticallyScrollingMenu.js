// Thanks to Kevin Liew (http://www.queness.com/post/256/vertical-scroll-menu-with-jquery-tutorial) for this code.
Office.initialize = function (reason) {
    $(document).ready(function () {

        //Background color, mouseover and mouseout
        var colorOver = '#31b8da';
        var colorOut = '#1f1f1f';

        //Padding, mouseover
        var padLeft = '20px';
        var padRight = '20px'

        //Default Padding
        var defpadLeft = $('#menu li a').css('paddingLeft');
        var defpadRight = $('#menu li a').css('paddingRight');

        //Animate the LI on mouse over, mouse out
        $('#menu li').click(function () {
            //Make LI clickable
            window.location = $(this).find('a').attr('href');

        }).mouseover(function () {

            //Mouse over LI and look for A element for transition
            $(this).find('a')
            .animate({ paddingLeft: padLeft, paddingRight: padRight }, { queue: false, duration: 100 })
            .animate({ backgroundColor: colorOver }, { queue: false, duration: 200 });

        }).mouseout(function () {

            //Mouse oout LI and look for A element and discard the mouse over transition
            $(this).find('a')
            .animate({ paddingLeft: defpadLeft, paddingRight: defpadRight }, { queue: false, duration: 100 })
            .animate({ backgroundColor: colorOut }, { queue: false, duration: 200 });
        });

        //Scroll the menu on mouse move above the #sidebar layer
        $('#sidebar').mousemove(function (e) {

            //Sidebar Offset, Top value
            var s_top = parseInt($('#sidebar').offset().top);

            //Sidebar Offset, Bottom value
            var s_bottom = parseInt($('#sidebar').height() + s_top);

            //Roughly calculate the height of the menu by multiply height of a single LI with the total of LIs
            var mheight = parseInt($('#menu li').height() * $('#menu li').length);

            //Calculate the top value
            var top_value = Math.round(((s_top - e.pageY) / 100) * mheight / 2)

            //Animate the #menu by changing the top value
            $('#menu').animate({ top: top_value }, { queue: false, duration: 500 });
        });

    });
};