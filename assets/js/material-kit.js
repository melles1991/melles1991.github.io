$(window).on("scroll load resize", function(){

  if($(window).scrollTop() > 0) {
    $('.navbar').addClass("navbar-shadow");
  }
  else {
    $('.navbar').removeClass("navbar-shadow");
  }

});

$(document).ready(function () {

  var links = $('.nav-link');
  $.each(links, function (key, va) {
    if (va.href == document.URL) {
      $(this).parent().addClass('active');
    }
  });

  var c, currentScrollTop = 0,
  navbar = $('.navbar');

  $(window).scroll(function () {
    var a = $(window).scrollTop();
    var b = navbar.height();

    currentScrollTop = a;

    if (c < currentScrollTop && a > b + b && !$("html").hasClass("nav-open")) {
      navbar.addClass("scrollUp");
    } else if (c > currentScrollTop && !(a <= b)) {
      navbar.removeClass("scrollUp");
    }
    c = currentScrollTop;
  });

});

$(document.links).filter(function() {
  return this.hostname != window.location.hostname;
}).attr('target', '_blank');


/*!
 * Material Kit - Copyright (c) 2018 Creative Tim
 * Licensed under MIT (https://github.com/creativetimofficial/material-kit/blob/master/LICENSE.md)
 */

var navbar_menu_visible= 0;

$(document).on('click', '.navbar-toggler', function() {
  $toggle = $(this);
  if (navbar_menu_visible == 1) {
    $('html').removeClass('nav-open');
    navbar_menu_visible = 0;
    $('#bodyClick').remove();
    setTimeout(function() {
      $toggle.removeClass('toggled');
    }, 550);
  } else {
    setTimeout(function() {
      $toggle.addClass('toggled');
    }, 580);
    div = '<div id="bodyClick"></div>';
    $(div).appendTo("body").click(function() {
      $('html').removeClass('nav-open');
      navbar_menu_visible = 0;
      $('#bodyClick').remove();
      setTimeout(function() {
        $toggle.removeClass('toggled');
      }, 550);
    });
    $('html').addClass('nav-open');
    navbar_menu_visible = 1;
  }
});

/*!
 * Ripple.js Copyright (c) 2014 Jacob Kelley
 * Licensed under MIT (https://github.com/jakiestfu/Ripple.js/blob/develop/LICENSE)
 */
// Toc
// https://github.com/ghiculescu/jekyll-table-of-contents
(function($){
 $.fn.toc = function(options) {
   var defaults = {
     noBackToTopLinks: false,
     title: '',
     minimumHeaders: 3,
     headers: 'h1, h2, h3, h4',
     listType: 'ol', // values: [ol|ul]
     showEffect: 'show', // values: [show|slideDown|fadeIn|none]
     showSpeed: 'slow' // set to 0 to deactivate effect
   },
   settings = $.extend(defaults, options);

   var headers = $(settings.headers).filter(function() {
     // get all headers with an ID
     var previousSiblingName = $(this).prev().attr( "name" );
     if (!this.id && previousSiblingName) {
       this.id = $(this).attr( "id", previousSiblingName.replace(/\./g, "-") );
     }
     return this.id;
   }), output = $(this);
   if (!headers.length || headers.length < settings.minimumHeaders || !output.length) {
     return;
   }

   if (0 === settings.showSpeed) {
     settings.showEffect = 'none';
   }

   var render = {
     show: function() { output.hide().html(html).show(settings.showSpeed); },
     slideDown: function() { output.hide().html(html).slideDown(settings.showSpeed); },
     fadeIn: function() { output.hide().html(html).fadeIn(settings.showSpeed); },
     none: function() { output.html(html); }
   };

   var get_level = function(ele) { return parseInt(ele.nodeName.replace("H", ""), 10); }
   var highest_level = headers.map(function(_, ele) { return get_level(ele); }).get().sort()[0];
   var return_to_top = '<i class="icon-arrow-up back-to-top"> </i>';

   var level = get_level(headers[0]),
     this_level,
     html = settings.title + " <"+settings.listType+">";
   headers.each(function(_, header) {
     var child = header.firstChild;
     $(child).on('click', function() {
       if (!settings.noBackToTopLinks) {
         window.location.hash = header.id;
       }
     });
     this_level = get_level(header);
     if (!settings.noBackToTopLinks && this_level === highest_level) {
       $(header).addClass('top-level-header').after(return_to_top);
     }
     if (this_level === level) // same level as before; same indenting
       html += "<li><a href='#" + header.id + "'>" + header.innerHTML + "</a>";
     else if (this_level <= level){ // higher level than before; end parent ol
       for(i = this_level; i < level; i++) {
         html += "</li></"+settings.listType+">"
       }
       html += "<li><a href='#" + header.id + "'>" + header.innerHTML + "</a>";
     }
     else if (this_level > level) { // lower level than before; expand the previous to contain a ol
       for(i = this_level; i > level; i--) {
         html += "<"+settings.listType+"><li>"
       }
       html += "<a href='#" + header.id + "'>" + header.innerHTML + "</a>";
     }
     level = this_level; // update for the next one
   });
   html += "</"+settings.listType+">";
   if (!settings.noBackToTopLinks) {
     $(document).on('click', '.back-to-top', function() {
       $(window).scrollTop(0);
       window.location.hash = '';
     });
   }

   render[settings.showEffect]();
 };
})(jQuery);

$(function() {
    // Add 'external' CSS class to all external links
    $('a:external').addClass('external');

    // turn target into target=_blank for elements w external class
    $(".external").attr('target', '_blank');
});

$.expr[':'].external = function(obj){
    return !obj.href.match(/^mailto\:/) && (obj.hostname != location.hostname);
};

;(function($, document, Math){
    $.ripple = function(selector, options) {
        var self = this;
        self.selector = selector;
        self.defaults = {
            on: 'mousedown',
            opacity: 0.4,
            color: "auto",
            multi: false,
            duration: 0.7,
            rate: function(pxPerSecond) {
                return pxPerSecond;
            },
            easing: 'linear'
        };
        self.defaults = $.extend({}, self.defaults, options);
        var Trigger = function(e) {
            var $this = $(this);
            var $ripple;
            var settings;
            $this.addClass('has-ripple');
            settings = $.extend({}, self.defaults, $this.data());
            if ( settings.multi || (!settings.multi && $this.find(".ripple").length === 0) ) {
                $ripple = $("<span></span>").addClass("ripple");
                $ripple.appendTo($this);
                if (!$ripple.height() && !$ripple.width()) {
                    var size = Math.max($this.outerWidth(), $this.outerHeight());
                    $ripple.css({
                        height: size,
                        width: size
                    });
                }
                if(settings.rate && typeof settings.rate == "function") {
                    var rate = Math.round( $ripple.width() / settings.duration );
                    var filteredRate = settings.rate(rate);
                    var newDuration = ( $ripple.width() / filteredRate);
                    if(settings.duration.toFixed(2) !== newDuration.toFixed(2)) {
                        settings.duration = newDuration;
                    }
                }
                var color = (settings.color == "auto") ? $this.css('color') : settings.color;
                var css = {
                    animationDuration: (settings.duration).toString() + 's',
                    animationTimingFunction: settings.easing,
                    background: color,
                    opacity: settings.opacity
                };
                $ripple.css(css);
            }
            if(!settings.multi) {
                $ripple = $this.find(".ripple");
            }
            $ripple.removeClass("ripple-animate");
            var x = e.pageX - $this.offset().left - $ripple.width() / 2;
            var y = e.pageY - $this.offset().top - $ripple.height() / 2;
            if(settings.multi) {
                $ripple.one('animationend webkitAnimationEnd oanimationend MSAnimationEnd', function() {
                    $(this).remove();
                });
            }
            $ripple.css({
                top: y + 'px',
                left: x + 'px'
            }).addClass("ripple-animate");
        };
        $(document).on(self.defaults.on, self.selector, Trigger);
    };
})(jQuery, document, Math);

$.ripple(".btn, .nav-item");
