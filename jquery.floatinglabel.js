/**
 *
 * Floating label 0.1.0 - Floating label based on placeholder attribute.
 * Version 0.1.0
 * @requires jQuery v1.7.0
 * 
 * http://www.opensource.org/licenses/mit-license.php
 * The MIT License (MIT)
 * 
 * Copyright (c) 2014 Fabiano Araujo
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

(function ($){
  "use strict";
  
  $.fn.floatinglabel = function(custom){
    var options =   $.extend({
                        ignoreId        : [],
                        animationIn     : {top: '-5px', opacity: '1'},
                        animationOut    : {top: '0', opacity: '0'},
                        delayIn         : 300,
                        delayOut        : 300,
                        easingIn        : false,
                        easingOut       : false,
                        labelClass      : 'floating-label',
                        pinClass        : 'pin'
                    }, custom),
        input   =   $(this).find(':input');

    // Core method. 
    function createLabel(input, value, customclass){
        var labelElement = $('<label></label>'),
            forid        = $(input).attr('id'),
            html         = $(input).attr('placeholder');

        // If input type is submit, do not continue.
        if ($(input).attr('type') == 'submit')
            return false;

        // label attributes, html and class
        labelElement.attr('for', forid);
        labelElement.html(html);
        labelElement.addClass(options.labelClass);

        // Adding label before the input field
        input.before(labelElement);

        // Attaching events for animation
        input.focusin(function(){
            labelElement.stop().animate(options.animationIn, options.delayIn, options.easingIn);
        });

        input.focusout(function(){
            // if input field is no empty, then 
            // pin the label to make sure that
            // the user knows which field is that
            if ($(this).val().length > 0)
                labelElement.addClass(options.pinClass);
            else
                labelElement.animate(options.animationOut, options.delayOut, options.easingOut);
        });

    }

    // Attaching a label for every input.
    $(input).each(function(){
        // console.log(options.ignoreId.hasOwnProperty());
        // console.log($(this).attr('id'));
        if ($.inArray($(this).attr('id'), options.ignoreId) == -1)
            createLabel($(this));
    });


    return this;
  };
}(jQuery));
