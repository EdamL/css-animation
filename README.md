# CSS animation plugin

The intention of this project is to leverage the obvious benefits of CSS3 animations in a lightweight, easy to use and dependency-free Javascript plugin. The plugin contains three public methods, which mirror three common jQuery animation methods: `slideToggle`, `fadeToggle`, and `animate`, except with the use of CSS3 transitions rather than intervals a significant improvement in performance is achieved.

The three methods are as follows:

## cssSlideToggle([duration][,easing][,complete])

CSS3 analogue for the jQuery `slideToggle()` method.<br />
NOTE: padding and margin are also included in the transition so avoid `!important` top padding/margin styles on sliding elements.
### duration
Duration of animation in milliseconds.<br />
Default: `500`
### easing
A CSS3 easing value, e.g. `ease-in-out`, `linear` or `cubic-bezier(0,0,1,1)`.<br />
Default: `'ease'`
### complete
Function to call upon completion of animation.

## cssFadeToggle([duration][,easing][,complete])

CSS3 analogue for the jQuery `fadeToggle()` method.<br />
### duration
Duration of animation in milliseconds.<br />
Default: `500`
### easing
A CSS3 easing value, e.g. `ease-in-out`, `linear` or `cubic-bezier(0,0,1,1)`.<br />
Default: `'ease'`
### complete
Function to call upon completion of animation.

## cssAnimate(properties, [duration][,easing][,complete])

CSS3 analogue for the jQuery `animate()` method.<br />
### properties
An object containing the CSS properties for the element to animate toward.<br />
NOTE: Unlike with jQuery `animate()` the full CSS property needs to be passed, e.g. `20px`, not `20`.<br />
### duration
Duration of animation in milliseconds.<br />
Default: `500`
### easing
A CSS3 easing value, e.g. `ease-in-out`, `linear` or `cubic-bezier(0,0,1,1)`.<br />
Default: `'ease'`
### complete
Function to call upon completion of animation.

## Usage

### jQuery
The methods can be called on a jQuery object in the usual way:
```js
  $('#element-to-animate').cssSlideToggle();
```

### Vanilla JS

Or, in the absence of jQuery, the methods can be called by passing a querySelector string to the `CssAni` namespace:

```js
  CssAni('#element-to-animate').cssSlideToggle();
```

For more examples of usage, see the [demos](https://github.com/EdamL/css-animation/tree/master/demo).
