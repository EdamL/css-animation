/*
* jQuery CSS animation plugins
* cssAnimate(); cssFadeToggle(); cssSlideToggle();
* Copyright (c) 2017 Adam Lafene
* https://github.com/EdamL/jquery-css-animation
*
* Licensed under the terms of the MIT and GPL licenses:
*   http://www.opensource.org/licenses/mit-license.php
*   http://www.gnu.org/licenses/gpl.html
*/

(function($){
    $.fn.cssAnimate = function(param1, param2, param3, param4) {

        if (!param1 || typeof(param1) !== 'object') {
            return;
        }
        var callback = ((param2 && $.isFunction(param2)) ? param2 :
                        (param3 && $.isFunction(param3)) ? param3 :
                        (param4 && $.isFunction(param4)) ? param4 : ''),
            duration = (param2 && !$.isFunction(param2)) ? parseInt(param2) : 500,
            easing = (param3 && !$.isFunction(param3)) ? param3 : 'ease';

        return this.each(function(i) {
            var $this = $(this);
            $this.css({
                '-webkit-transition' : 'all '+duration+'ms '+easing,
                '-moz-transition' : 'all '+duration+'ms '+easing,
                '-ms-transition' : 'all '+duration+'ms '+easing,
                '-o-transition' : 'all '+duration+'ms '+easing
            }).css(param1);
            setTimeout(function() {
                $this.css({
                    '-webkit-transition' : '',
                    '-moz-transition' : '',
                    '-ms-transition' : '',
                    '-o-transition' : ''
                });
                if (callback && i==0){
                    callback.call($this[0]);
                }
            }, duration);

        });
    };
})(jQuery);

(function($){
	$.fn.cssFadeToggle = function(param1, param2, param3) {

	    var callback = ((param2 && $.isFunction(param2)) ? param2 :
	            	   (param3 && $.isFunction(param3)) ? param3 : ''),
	        duration = (param1) ? parseInt(param1) : 500,
	        easing = (param2 && !$.isFunction(param2)) ? param2 : 'ease';

	    return this.each(function(i) {
	        var $this = $(this);
	        var isVisible = $this.is(':visible');
	        if (!isVisible) {
	            $this.css({
	                'opacity' : 0
	            }).show();
	        }
	        $this.css({
	            '-webkit-transition' : 'all '+duration+'ms '+easing,
	            '-moz-transition' : 'all '+duration+'ms '+easing,
	            '-ms-transition' : 'all '+duration+'ms '+easing,
	            '-o-transition' : 'all '+duration+'ms '+easing
	        });
	        setTimeout(function() {
	            $this.css('opacity', (isVisible ? 0 : 1));
	            setTimeout(function() {
	                if (isVisible) $this.hide();
	                $this.css({
	                    '-webkit-transition' : '',
	                    '-moz-transition' : '',
	                    '-ms-transition' : '',
	                    '-o-transition' : '',
	                    'opacity' : ''
	                });
	                if (callback && i==0){
	                    callback.call($this[0]);
	                }
	            }, duration+50);
	        }, 50);
	    });
	};
})(jQuery);

(function($){
    $.fn.cssSlideToggle = function(param1, param2, param3) {
        var callback = ((param2 && $.isFunction(param2)) ? param2 :
                (param3 && $.isFunction(param3)) ? param3 : ''),
            duration = (param1) ? parseInt(param1) : 500,
            easing = (param2 && !$.isFunction(param2)) ? param2 : 'ease';

        return this.each(function(i) {
            var $this = $(this);

            var isVisible = $this.is(':visible'), objHeight = $this.css('height'),
                endHeight, endPaddingTop, endPaddingBottom, endMarginTop, endMarginBottom;
            if (!isVisible) {
                $this.css({
                    'max-height': 0,
                    'padding-top' : 0,
                    'padding-bottom' : 0,
                    'margin-top' : 0,
                    'margin-bottom' : 0,
                    'overflow' : 'hidden'
                }).show();
                endHeight = objHeight;
                endPaddingTop = '';
                endPaddingBottom = '';
                endMarginTop = '';
                endMarginBottom = '';
            }
            else {
                $this.css({
                    'max-height': objHeight
                });
                endHeight = 0;
                endPaddingTop = 0;
                endPaddingBottom = 0;
                endMarginTop = 0;
                endMarginBottom = 0;
            }
            setTimeout(function() {
                $this.css({
                    '-webkit-transition' : 'all '+duration+'ms '+easing,
                    '-moz-transition' : 'all '+duration+'ms '+easing,
                    '-ms-transition' : 'all '+duration+'ms '+easing,
                    '-o-transition' : 'all '+duration+'ms '+easing
                });
                setTimeout(function() {
                    $this.css({
                        'max-height' : endHeight,
                        'padding-top' : endPaddingTop,
                        'padding-bottom' : endPaddingBottom,
                        'margin-top' : endMarginTop,
                        'margin-bottom' : endMarginBottom,
                        'overflow' : 'hidden'
                    });
                    setTimeout(function() {
                        $this.css({
                            '-webkit-transition' : '',
                            '-moz-transition' : '',
                            '-ms-transition' : '',
                            '-o-transition' : ''
                        });
                        if (isVisible) $this.hide();
                        $this.css({
                            'max-height' : '',
                            'padding-top' : '',
                            'padding-bottom' : '',
                            'margin-top' : '',
                            'margin-bottom' : '',
                            'overflow' : ''
                        });
                        if (callback && i==0){
                            callback.call($this[0]);
                        }
                    }, duration+50);
                }, 50);
            }, 50);
        });
    };
})(jQuery);