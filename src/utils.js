function encodedSpaceToPlus(str) {
  return str.replace(/%20/g, '+');
}

function fixedEncodeURIComponent(str, xwform) {
  var encoded = encodeURIComponent(str).replace(/[!'()*]/g, function(c) {
    return '%' + c.charCodeAt(0).toString(16);
  });
  return xwform ? encodedSpaceToPlus(encoded) : encoded;
}

function processStr(str, autoEncodeURI, xwform) {
  return autoEncodeURI === false ? str : fixedEncodeURIComponent(str, xwform);
}

function makePathParams(params, autoEncodeURI, xwform) {
  if (Array.isArray(params)) {
    return params.map(function (param) {
      return processStr(param.toString(), autoEncodeURI, xwform);
    }).join('/');
  } else {
    return processStr(params.toString(), autoEncodeURI, xwform);
  }
}

function makeQueryString(qsObj, autoEncodeURI, xwform) {
  var qs = '';
  if (typeof qsObj !== 'object') {
    return typeof qsObj === 'string' ? qsObj : qs;
  }
  var keys = Object.keys(qsObj);
  keys.forEach(function (key, i) {
    var val = qsObj[key];
    if (Array.isArray(val)) {
      val = val.map(function (el) {
        return processStr(el, autoEncodeURI, xwform);
      }).join(',');
    } else {
      val = processStr(val.toString(), autoEncodeURI, xwform);
    }
    // not adding '?' because makeQueryString is also used
    // for application/x-www-form-urlencoded data
    qs += (i === 0 ? '' : '&') + key + '=' + val;
  });
  return qs;
}

// function parseQueryString(str) {
//   var queryParams = {};
//   var qs = str.split('?')[1] || str;
//   qs.split('&').forEach(function (qp) {
//     var keyVal = qp.split('=');
//     queryParams[keyVal[0]] = keyVal[1];
//   });
//   return queryParams;
// }

module.exports = {
  makePathParams: makePathParams,
  makeQueryString: makeQueryString
};
