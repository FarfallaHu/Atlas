(function ($) {
    "use strict";
    $(window).on('load', function () {
        $('.preloader').fadeOut(1000);
    });

    // lightcase
    $('a[data-rel^=lightcase]').lightcase();

    $(document).ready(function () {

        /*==== header Section Start here =====*/
        $("ul>li>ul").parent("li").addClass("menu-item-has-children");
        // drop down menu width overflow problem fix
        $('ul').parent('li').on('hover', function () {
            var menu = $(this).find("ul");
            var menupos = $(menu).offset();
            if (menupos.left + menu.width() > $(window).width()) {
                var newpos = -$(menu).width();
                menu.css({
                    left: newpos
                });
            }
        });
        $('.mainmenu ul li a').on('click', function (e) {
            var element = $(this).parent('li');
            if (parseInt($(window).width()) < 992) {
                if (element.hasClass('open')) {
                    element.removeClass('open');
                    element.find('li').removeClass('open');
                    element.find('ul').slideUp(300, "swing");
                } else {
                    element.addClass('open');
                    element.children('ul').slideDown(300, "swing");
                    element.siblings('li').children('ul').slideUp(300, "swing");
                    element.siblings('li').removeClass('open');
                    element.siblings('li').find('li').removeClass('open');
                    element.siblings('li').find('ul').slideUp(300, "swing");
                }
            }
        })
        //Header
        var fixed_top = $("header");
        $(window).on('scroll', function () {
            if ($(this).scrollTop() > 200) {
                fixed_top.addClass("header-fixed animated fadeInDown");
            } else {
                fixed_top.removeClass("header-fixed animated fadeInDown");
            }
        });

        // scroll up start here
        $(function () {
            $(window).on('scroll', function () {
                if ($(this).scrollTop() > 300) {
                    $('.scrollToTop').css({
                        'bottom': '2%',
                        'opacity': '1',
                        'transition': 'all .5s ease'
                    });
                } else {
                    $('.scrollToTop').css({
                        'bottom': '-30%',
                        'opacity': '0',
                        'transition': 'all .5s ease'
                    })
                }
            });

            //Click event to scroll to top
            $('a.scrollToTop').on('click', function () {
                $('html, body').animate({
                    scrollTop: 0
                }, 500);
                return false;
            });
        });

        // button effict
        // document.querySelectorAll('.default-btn').forEach(button => button.innerHTML = '<div><span>' + button.textContent.trim().split('').join('</span><span>')  +  '</span></div>');



        //Member Filter Isotop
        // init Isotope
        var $grid = $('.member__grid').isotope({
            itemSelector: '.member__item',
            layoutMode: 'fitRows',
        });

        // filter functions
        var filterFns = {
            // show if name ends with -ium
            ium: function () {
                var name = $(this).find('.name').text();
                return name.match(/ium$/);
            }
        };
        // bind filter button click
        $('.member__buttongroup').on('click', '.filter-btn', function () {
            var filterValue = $(this).attr('data-filter');
            // use filterFn if matches value
            filterValue = filterFns[filterValue] || filterValue;
            $grid.isotope({
                filter: filterValue
            });
        });
        // change is-checked class on buttons
        $('.member__buttongroup').each(function (i, buttonGroup) {
            var $buttonGroup = $(buttonGroup);
            $buttonGroup.on('click', '.filter-btn', function () {
                $buttonGroup.find('.is-checked').removeClass('is-checked');
                $(this).addClass('is-checked');
            });
        });




    });

    //Banner slider
    var swiper = new Swiper('.banner__slider', {
        slidesPerView: 1,
        spaceBetween: 0,
        autoplay: {
            delay: 10000,
            disableOnInteraction: false,
        },
        loop: true,
    });

    //====ragi slider================
    var swiper = new Swiper(".ragi__slider", {
        slidesPerView: 2,
        spaceBetween: 20,
        loop: true,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },
        navigation: {
            nextEl: ".ragi-next",
            prevEl: ".ragi-prev",
        },
        breakpoints: {
            767: {
                slidesPerView: 5,
                spaceBetween: 20,
            },
            1199: {
                slidesPerView: 4,
                spaceBetween: 20,
            },
            1439: {
                slidesPerView: 5,
                spaceBetween: 20,
            },
        },
    });





    // product view mode change js
    $(function() {
        $('.product-view-mode').on('click', 'a', function (e) {
            e.preventDefault();
            var shopProductWrap = $('.shop-product-wrap');
            var viewMode = $(this).data('target');
            $('.product-view-mode a').removeClass('active');
            $(this).addClass('active');
            shopProductWrap.removeClass('grid list').addClass(viewMode);
        });
    });

    // model option start here
    $(function() {
        $('.view-modal').on('click', function () {
            $('.modal').addClass('show');
        });
        $('.close').on('click', function () {
            $('.modal').removeClass('show');
        });
    });







    //contact form js
    $(function () {
        var form = $('#contact-form');
        var formMessages = $('.form-message');
        $(form).submit(function (e) {
            e.preventDefault();
            var formData = $(form).serialize();
            $.ajax({
                type: 'POST',
                url: $(form).attr('action'),
                data: formData
            })
            .done(function (response) {
                $(formMessages).removeClass('error');
                $(formMessages).addClass('success');
                $(formMessages).text(response);
                $('#contact-form input, #contact-form textarea').val('');
            })
            .fail(function (data) {
                $(formMessages).removeClass('success');
                $(formMessages).addClass('error');
                if (data.responseText !== '') {
                    $(formMessages).text(data.responseText);
                } else {
                    $(formMessages).text('Oops! An error occured and your message could not be sent.');
                }
            });
        });
    });

}(jQuery));



//
// //Calender
//
//
// $(function(){
//   function c(){
//     p();
//     var e=h();
//     var r=0;
//     var u=false;
//     l.empty();
//     while(!u){
//       if(s[r]==e[0].weekday){u=true}
//       else{l.append('<div class="blank"></div>');
//       r++;
//     }
//   }
//   for(var c=0;c<42-r;c++){
//     if(c>=e.length){l.append('<div class="blank"></div>')}
//     else{
//       var v=e[c].day;
//       var m=g(new Date(t,n-1,v))?'<div class="today">':"<div>";
//       l.append(m+""+v+"</div>")}}var y=o[n-1];
//       a.css("background-color",y).find("h1").text(i[n-1]+" "+t);
//       f.find("div").css("color",y);
//       l.find(".today").css("background-color",y);
//       d();
//     }
//     function h(){
//       var e=[];
//       for(var r=1;r<v(t,n)+1;r++){
//         e.push({day:r,weekday:s[m(t,n,r)]})
//       }
//       return e
//     }
//     function p(){
//       f.empty();
//       for(var e=0;e<7;e++){f.append("<div>"+s[e].substring(0,3)+"</div>")}}
//       function d(){
//         var t;
//         var n=$("#calendar").css("width",e+"px");
//         n.find(t="#calendar_weekdays, #calendar_content").css("width",e+"px").find("div").css({width:e/7+"px",height:e/7+"px","line-height":e/7+"px"});
//         n.find("#calendar_header").css({height:e*(1/7)+"px"}).find('i[class^="icon-chevron"]').css("line-height",e*(1/7)+"px")
//       }
//       function v(e,t){
//         return(new Date(e,t,0)).getDate()
//       }
//       function m(e,t,n){
//         return(new Date(e,t-1,n)).getDay()
//       }
//       function g(e){
//         return y(new Date)==y(e)
//       }
//       function y(e){
//         return e.getFullYear()+"/"+(e.getMonth()+1)+"/"+e.getDate()
//       }
//       function b(){
//         var e=new Date;
//         t=e.getFullYear();
//         n=e.getMonth()+1
//       }
//       var e=480;
//       var t=2013;
//       var n=9;
//       var r=[];
//       var i=["JANUARY","FEBRUARY","MARCH","APRIL","MAY","JUNE","JULY","AUGUST","SEPTEMBER","OCTOBER","NOVEMBER","DECEMBER"];
//       var s=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
//       var o=["#16a085","#1abc9c","#c0392b","#27ae60","#FF6860","#f39c12","#f1c40f","#e67e22","#2ecc71","#e74c3c","#d35400","#2c3e50"];
//       var u=$("#calendar");
//       var a=u.find("#calendar_header");
//       var f=u.find("#calendar_weekdays");
//       var l=u.find("#calendar_content");
//       b();
//       c();
//       a.find('i[class^="icon-chevron"]').on("click",function(){var e=$(this);
//         var r=function(e){
//           n=e=="next"?n+1:n-1;
//           if(n<1){n=12;t--}
//           else if(n>12){n=1;t++}c()
//         };
//         if(e.attr("class").indexOf("left")!=-1){r("previous")}
//         else{r("next")}
//       })
//     }
//   );
