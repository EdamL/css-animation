# jQuery CSS3 animation plugins

These three small plugins were created as simple analogues of three commonly used jQuery animation methods: `slideToggle`, `fadeToggle`, and `animate`, using CSS3 transitions rather than an interval to improve performance.

For examples of usage, see the [demos](https://github.com/EdamL/jquery-css-animation/tree/master/demo).

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
### duration
Duration of animation in milliseconds.<br />
Default: `500`
### easing
A CSS3 easing value, e.g. `ease-in-out`, `linear` or `cubic-bezier(0,0,1,1)`.<br />
Default: `'ease'`
### complete
Function to call upon completion of animation.
