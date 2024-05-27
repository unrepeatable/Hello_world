function isObject(item) {
  return (item && typeof item === 'object' && !Array.isArray(item) && !(item instanceof Map));
}

function mergeDeep(target, source) {
  if (isObject(target) && isObject(source)) {
    Object.keys(source).forEach(key => {
      if (isObject(source[key])) {
        if (!target[key]) {
          target[key] = {};
        }
        mergeDeep(target[key], source[key]);
      } else if (Array.isArray(source[key])) {
        if (!target[key]) {
          target[key] = [];
        }
        target[key] = target[key].concat(source[key]);
      } else if (source[key] instanceof Map) {
        if (!target[key]) {
          target[key] = new Map();
        }
        source[key].forEach((value, mapKey) => {
          target[key].set(mapKey, value);
        });
      } else {
        target[key] = source[key];
      }
    });
  }
  return target;
}

// 使用示例
//const obj1 = { a: 1, b: { c: 1 } };
//const obj2 = { b: { d: 2 }, e: [1, 2, 3], f: new Map([['key1', 'value1']]) };
//const result = mergeDeep(obj1, obj2);
//console.log(result);
