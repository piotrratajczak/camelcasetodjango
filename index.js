function camelToUnderScore(str, sign) {
  const result = str.replace(/\W+/g, '_')
    .replace(/([a-z|A-Z])([A-Z])/g, '$1_$2')
    .replace(/([A-Z])([A-Z])/g, '$1_$2')
    .toLowerCase();
  return sign !== '_' ? result.replace(/_/g, sign) : result;
}

function isNotNullObject(obj) {
  return obj !== null && typeof obj === 'object';
}

function camelCaseToDjango(obj, sign = '_') {
  if (!isNotNullObject(obj)) {
    return obj;
  }

  const result = Array.isArray(obj) ? [] : {};

  Object.keys(obj).forEach((key) => {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      let value = obj[key];

      if (isNotNullObject(obj[key])) {
        if (Array.isArray(obj[key])) {
          value = obj[key].map(el => (isNotNullObject(el) ? camelCaseToDjango(el) : el));
        } else {
          value = camelCaseToDjango(obj[key]);
        }
      }
      result[camelToUnderScore(key, sign)] = value;
    }
  });

  return result;
}

module.exports = camelCaseToDjango;
