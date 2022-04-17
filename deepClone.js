const a = {
    number:1, bool:false, str: 'hi', empty1: undefined, empty2: null,
    array: [
      {name: 'frank', age: 18},
      {name: 'jacky', age: 19}
    ],
    date: new Date(2000,0,1,20,30,0),
    regex: /\.(j|t)sx/i,
    obj: { name:'frank', age: 18},
    f1: (a, b) => a + b,
    f2: function(a, b) { return a + b }
  }
  a.self = a
// 这里就是环引用,如果不处理，会一直递归调用自己，爆栈
// 复制 a 在浏览器上运行更清楚
//   windows.self===window

//   const b = deepClone(a)

// 为什么要用new Map()?因为要检查环，也叫循环引用。
// map 用来记录一下这个键值，避免爆栈，Map的键值可以是任意类型。
function clone(target, map = new Map()) {
  if (typeof target === "object") {
    let cloneTarget = Array.isArray(target) ? [] : {};
    // 如果 map 的键值target 有数据，说明存在环引用
    // 直接返回值即可
    if (map.get(target)) return map.get(target);
    map.set(target, cloneTarget);
    for (const key in target) {
      cloneTarget[key] = clone(target[key], map);
    }
    return cloneTarget;
  } else {
    return target;
  }
}
console.log(clone(a))