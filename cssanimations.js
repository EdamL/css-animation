/*
* CSS animations plugin 1.01
* Copyright (c) 2019 Adam Lafene
* https://github.com/EdamL/css-animation
*
* Licensed under the terms of the MIT and GPL licenses:
*   http://www.opensource.org/licenses/mit-license.php
*   http://www.gnu.org/licenses/gpl.html
*/

(function (window) {

    'use strict';
    //
    // Variables
    //

    var supports = !!document.querySelector; // Feature test
    var $ = window.jQuery;

    //////////////////////////////////////
    // HELPER FUNCTIONS
    //////////////////////////////////////
    

    /**
     * A simple forEach() implementation for Arrays, Objects and NodeLists
     * @private
     * @param {Array|Object|NodeList} collection Collection of items to iterate
     * @param {Function} callback Callback function for each iteration
     * @param {Array|Object|NodeList} scope Object/NodeList/Array that forEach is iterating over (aka `this`)
     */
    var forEach = function (collection, callback, scope) {
        if (Object.prototype.toString.call(collection) === '[object Object]') {
            for (var prop in collection) {
                if (Object.prototype.hasOwnProperty.call(collection, prop)) {
                    callback.call(scope, collection[prop], prop, collection);
                }
            }
        } else {
            for (var i = 0, len = collection.length; i < len; i++) {
                callback.call(scope, collection[i], i, collection);
            }
        }
    };

    /**
     * To set multiple style properties on either a single DOM object or multiple DOM objects:
     * (pass properties in as an object of property/value pairs)
     */
    var setProperties = function(objArray, properties) {

        var setProp = function(obj, prop, val) {
            obj.style[prop] = val;
        }

        if(objArray.length) {
            forEach(objArray, function (obj) {
                for (var property in properties)
                    setProp(obj, property, properties[property]);
            });
        }
        else {
            for (var property in properties)
                setProp(objArray, property, properties[property]);
        }
        return objArray;
    };

    /**
     * Get default (pre-styled) CSS property for a DOM object
     */
    function getDefaultProperty(obj, property) {
        var nodeName = obj.nodeName;
        var temp = document.body.appendChild( document.createElement( nodeName ) );
        var prop = window.getComputedStyle(temp).getPropertyValue(property);

        temp.parentNode.removeChild( temp );

        return prop;
    }

    //////////////////////////////////////
    // prototype
    //////////////////////////////////////
    
    /**
     * For non-jQuery implementation use 'CssAni' namespace
     */
    if (!$) {
        var CssAni = function(selector) {
            
            if (!(this instanceof CssAni))
                return new CssAni(selector);

            this.domObj = document.querySelectorAll(selector);
        };

        CssAni.fn = CssAni.prototype = {};
    
        window.CssAni = CssAni;

        $ = window.CssAni;
    }

    /**
     * cssSlideToggle public method
     */
    $.fn.cssSlideToggle = function(param1, param2, param3) {
        
        var domObj = this.domObj || this;

        if (domObj.length < 1 || !supports)
            return false;

        var callback = ((param1 && typeof param1 === "function") ? param1 :
                        (param2 && typeof param2 === "function") ? param2 :
                        (param3 && typeof param3 === "function") ? param3 : '');
        var duration = (param1 && typeof param1 !== "function") ? parseInt(param1) : 500;
        var easing = (param2 && typeof param2 !== "function") ? param2 : 'ease';

        forEach(domObj, function(obj, i) {
            
            // for iterating through jQuery objects
            if (obj.nodeType !== 1 || isNaN(i))
                return;

            var objStyle = window.getComputedStyle(obj);

            var display = objStyle.getPropertyValue('display');
            var isBorderBox = objStyle.getPropertyValue('box-sizing') == 'border-box' ? true : false;
            var objHeight, endHeight, endPaddingTop, endPaddingBottom, endMarginTop, endMarginBottom;
            var objIsVisible;

            // setup initial properties
            if (display === 'none') {

                // remove padding and margin - position absolute and set opacity to 0 so we can get height
                setProperties(obj, {
                    'margin-top' : 0,
                    'margin-bottom' : 0,
                    'overflow' : 'hidden',
                    'display' : '',
                    'opacity' : 0,
                    'position' : 'absolute'
                });

                // if element is set to {display : none} in the stylesheet, set to default display value for that node type
                if (objStyle.getPropertyValue('display') === 'none')
                    obj.style.display = getDefaultProperty(obj, 'display');

                //get default obj height
                objHeight = obj.offsetHeight;

                // reset opacity and set obj height to 0
                setProperties(obj, {
                    'padding-top' : 0,
                    'padding-bottom' : 0,
                    'max-height': 0,
                    'opacity' : '',
                    'position' : ''
                });

                endHeight = objHeight;
                endPaddingTop = '';
                endPaddingBottom = '';
                endMarginTop = '';
                endMarginBottom = '';

            }
            else {
                objIsVisible = true;
                
                //get default obj height minus top and bottom padding
                objHeight = obj.offsetHeight;

                if (!isBorderBox)
                     objHeight = objHeight - (parseInt(objStyle.getPropertyValue('padding-top')) - parseInt(objStyle.getPropertyValue('padding-bottom')));

                setProperties(obj, {
                    'max-height': objHeight + 'px'
                });
                endHeight = 0;
                endPaddingTop = 0;
                endPaddingBottom = 0;
                endMarginTop = 0;
                endMarginBottom = 0;
            }

            // do the animation
            setTimeout(function() {
                setProperties(obj, {
                    'transition' : 'all '+duration+'ms '+easing,
                    '-webkit-transition' : 'all '+duration+'ms '+easing,
                    '-moz-transition' : 'all '+duration+'ms '+easing,
                    '-ms-transition' : 'all '+duration+'ms '+easing,
                    '-o-transition' : 'all '+duration+'ms '+easing
                });
                setTimeout(function() {
                    setProperties(obj, {
                        'max-height' : endHeight + 'px',
                        'padding-top' : endPaddingTop,
                        'padding-bottom' : endPaddingBottom,
                        'margin-top' : endMarginTop,
                        'margin-bottom' : endMarginBottom,
                        'overflow' : 'hidden'
                    });
                    setTimeout(function() {
                        setProperties(obj, {
                            'transition' : '',
                            '-webkit-transition' : '',
                            '-moz-transition' : '',
                            '-ms-transition' : '',
                            '-o-transition' : ''
                        });
                        if (objIsVisible) 
                            obj.style.display = 'none';

                        setProperties(obj, {
                            'max-height' : '',
                            'padding-top' : '',
                            'padding-bottom' : '',
                            'margin-top' : '',
                            'margin-bottom' : '',
                            'overflow' : ''
                        });
                        if (callback && i==0){
                            callback.call(domObj);
                        }
                    }, duration+50);
                }, 50);
            }, 50);
        });
    };

    /**
     * cssFadeToggle public method
     */
    $.fn.cssFadeToggle = function(param1, param2, param3) {
        
        var domObj = this.domObj || this;

        if (domObj.length < 1 || !supports)
            return false;

        var callback = ((param1 && typeof param1 === "function") ? param1 :
                        (param2 && typeof param2 === "function") ? param2 :
                        (param3 && typeof param3 === "function") ? param3 : '');
        var duration = (param1 && typeof param1 !== "function") ? parseInt(param1) : 500;
        var easing = (param2 && typeof param2 !== "function") ? param2 : 'ease';

        forEach(domObj, function(obj, i) {
            // for iterating through jQuery objects
            if (obj.nodeType !== 1 || isNaN(i))
                return;

            var objStyle = window.getComputedStyle(obj);

            var display = objStyle.getPropertyValue('display');
            var objIsVisible;

            // setup initial properties
            if (display === 'none') {

                setProperties(obj, {
                    'opacity' : 0,
                    'display' : ''
                });

                // if element is set to {display : none} in the stylesheet, set to default display value for that node type
                if (objStyle.getPropertyValue('display') === 'none')
                    obj.style.display = getDefaultProperty(obj, 'display');
            }
            else {
                objIsVisible = true;
            }

            // do the animation
            setProperties(obj, {
                'transition' : 'all '+duration+'ms '+easing,
                '-webkit-transition' : 'all '+duration+'ms '+easing,
                '-moz-transition' : 'all '+duration+'ms '+easing,
                '-ms-transition' : 'all '+duration+'ms '+easing,
                '-o-transition' : 'all '+duration+'ms '+easing
            });
            setTimeout(function() {
                setProperties(obj, {
                    'opacity' : (objIsVisible ? 0 : 1)
                });
                setTimeout(function() {
                    if (objIsVisible) 
                            obj.style.display = 'none';
                    setProperties(obj, {
                        'transition' : '',
                        '-webkit-transition' : '',
                        '-moz-transition' : '',
                        '-ms-transition' : '',
                        '-o-transition' : '',
                        'opacity' : ''
                    });
                    if (callback && i==0){
                        callback.call(domObj);
                    }
                }, duration+50);
            }, 50);
        });
    };

    /**
     * cssAnimate public method
     */
    $.fn.cssAnimate = function(param1, param2, param3, param4) {

        var domObj = this.domObj || this;

        if (domObj.length < 1 || !supports)
            return false;

        if (!param1 || typeof(param1) !== 'object') {
            return;
        }
        var callback = ((param2 && typeof param2 === "function") ? param2 :
                        (param3 && typeof param3 === "function") ? param3 :
                        (param4 && typeof param4 === "function") ? param4 : ''),
            duration = (param2 && typeof param2 !== "function") ? parseInt(param2) : 500,
            easing = (param3 && typeof param3 !== "function") ? param3 : 'ease';

        forEach(domObj, function(obj, i) {
            // for iterating through jQuery objects
            if (obj.nodeType !== 1 || isNaN(i))
                return;

            // do the animation
            setProperties(obj, {
                'transition' : 'all '+duration+'ms '+easing,
                '-webkit-transition' : 'all '+duration+'ms '+easing,
                '-moz-transition' : 'all '+duration+'ms '+easing,
                '-ms-transition' : 'all '+duration+'ms '+easing,
                '-o-transition' : 'all '+duration+'ms '+easing
            });
            setTimeout(function() {
                setProperties(obj, param1);
                setTimeout(function() {

                    setProperties(obj, {
                        'transition' : '',
                        '-webkit-transition' : '',
                        '-moz-transition' : '',
                        '-ms-transition' : '',
                        '-o-transition' : ''
                    });
                    if (callback && i==0) {
                        callback.call(domObj);
                    }
                }, duration+50);
            }, 50);
        });
    };
    
})(window);