export const stringFormat = function () {
  //字符串中赋值变量
  if (arguments.length === 0) return null;
  var str = arguments[0];
  for (var i = 1; i < arguments.length; i++) {
    var re = new RegExp('\\{' + (i - 1) + '\\}', 'gm');
    str = str.replace(re, arguments[i]);
  }
  return str;
};
