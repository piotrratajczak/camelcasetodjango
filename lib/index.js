'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function camelToUnderScore(str, sign) {
  var result = str.replace(/\W+/g, '_').replace(/([a-z|A-Z])([A-Z])/g, '$1_$2').replace(/([A-Z])([A-Z])/g, '$1_$2').toLowerCase();
  return sign !== '_' ? result.replace(/_/g, sign) : result;
}

function isNotNullObject(obj) {
  return obj !== null && (typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) === 'object';
}

function camelCaseToDjango(obj) {
  var sign = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '_';

  if (!isNotNullObject(obj)) {
    return obj;
  }

  var result = Array.isArray(obj) ? [] : {};

  Object.keys(obj).forEach(function (key) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      var value = obj[key];

      if (isNotNullObject(obj[key])) {
        if (Array.isArray(obj[key])) {
          value = obj[key].map(function (el) {
            return isNotNullObject(el) ? camelCaseToDjango(el, sign) : el;
          });
        } else {
          value = camelCaseToDjango(obj[key], sign);
        }
      }
      result[camelToUnderScore(key, sign)] = value;
    }
  });

  return result;
}

module.exports = camelCaseToDjango;