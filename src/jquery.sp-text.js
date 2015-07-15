/**
 * jQuery.spText - A text helper plugin for jQuery.
 *
 * This plugin requires: 
 *      1. jQuery ~2.0
 *
 * @author    Gonzalo Chumillas <gchumillas@email.com>
 * @license   https://github.com/wirexmedia/jquery.sp-text/blob/master/LICENSE MIT License
 * @link      https://github.com/wirexmedia/jquery.sp-text
 */
(function ($) {
    
    /**
     * Available methods
     * @var {Object}
     */
    var methods = {
        /**
         * Is empty the given value?
         * 
         * A value is 'empty' if it is `null`, `void` or an empty string. For example:
         * 
         * ```JavaScript
         * console.log($.spText('isEmpty', null)); // prints `true`
         * console.log($.spText('isEmpty', void)); // prints `true`
         * console.log($.spText('isEmpty', '')); // prints `true`
         * console.log($.sptext('isEmpty', 'blah blah')); // prints `false`
         * console.log($.spText('isEnpty', 0)); // prints `false`
         * console.log($.spText('isEmpty', {}); // prints `false`
         * console.log($.spText('isEmpty', []); // prints `false`
         * console.log($.spText('isEmpty', 101); // prints `false`
         * ```
         * 
         * @param {mixed} value Arbitrary value
         * 
         * @return {boolean}
         */
        'isEmpty': function (value) {
            return value === undefined
                || value === null
                || $.type(value) == 'string' && value.length == 0;
        },
        
        /**
         * Returns `value2` if `value1` is empty.
         * 
         * @param {mixed} value1 Arbitrary value
         * @param {mixed} value2 Alternative value
         * 
         * @return {mixed}
         */
        'ifEmpty': function (value1, value2) {
            return $.spText('isEmpty', value1)? value2 : value1;
        },
        
        /**
         * Trims a text.
         *
         * This function is similar to jQuery.trim, except that it admits a `delimiter` parameter.
         *
         * Examples:
         * ```JavaScript
         * // prints 'hello there!'
         * console.log($.spText('trim', '   hello there!   '));
         *
         * // prints 'dir1/dir2'
         * console.log($.spText('trim', '/dir1/dir2/', '/'));
         * ```
         *
         * @param {string} text      Text
         * @param {string} delimiter Delimiter character (default is a space)
         *
         * @return   {string}
         */
        'trim': function (text, delimiter) {
            return $.spText('ltrim', $.spText('rtrim', text, delimiter), delimiter);
        },
        
        /**
         * Removes left spaces from a text.
         *
         * @param {string} text      Text
         * @param {string} delimiter Delimiter character (default is a space)
         *
         * @return   {string}
         */
        'ltrim': function(text, delimiter) {
            var re = /^\s+/;

            if (typeof delimiter != 'undefined') {
                re = new RegExp("^(" + $.spRegex('encode', delimiter) + ")+");
            }

            return text.replace(re, '');
        },

        /**
         * Removes right spaces from a text.
         *
         * @param {string} text      Text
         * @param {string} delimiter Delimiter character (default is a space)
         *
         * @return  {string}
         */
        'rtrim': function(text, delimiter) {
            var re = /\s+$/;

            if (typeof delimiter != 'undefined') {
                re = new RegExp("(" + $.spRegex('encode', delimiter) + ")+$");
            }

            return text.replace(re, '');
        },
        
        /**
         * Concatenates strings.
         *
         * This function ignores the empty values (null, undefine and empty strings)
         *
         * For example:
         * ```JavaScript
         * // the next command returns the string 'John, Maria, Peter'
         * $.spText('concat', ', ', 'John', '', 'Maria', null, 'Peter');
         *
         * // and the next command returns 'John'
         * $.spText('concat', ', ', 'John');
         * ```
         *
         * @param {string} glue 'Glue' character
         *
         * @return   {string}
         */
        'concat': function (glue/*, text1, text2, ...*/) {
            var ret = '';
            var len = arguments.length;

            for (var i = 1; i < len; i++) {
                var text = arguments[i];

                if (!$.spText('isEmpty', text)) {
                    if (ret.length > 0) {
                        ret += glue;
                    }
                    ret += text;
                }
            }

            return ret;
        }
    };
    
    /**
     * Registers plugin.
     * 
     * @param {string} methodName Method name
     * @param {mixed}  args,...   Additional arguments (not required)
     * 
     * @return {mixed}
     */
    $.spText = function (methodName, args) {
        var method = methods[methodName];
        var args = Array.prototype.slice.call(arguments, 1);
        
        if (method === undefined) {
            $.error('Method not found: ' + methodName);
        }
        
        return method.apply(this, args);
    };
})(jQuery);
