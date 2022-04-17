async function async1() {
  console.log("async1 start"); //1
  await async2();
  console.log("async1 end"); //5
  //为什么这是5？因为await 后面的函数进入then里面了
}

async function async2() {
  console.log("async2"); //2
}
async1();
setTimeout(() => {
  console.log("timeout"); //7
}, 0);
new Promise(function (resolve) {
  console.log("promise1"); //3
  resolve();
}).then(function () {
  console.log("promise2"); //6
});
console.log("script end"); //4
//涉及到浏览器的事件循环，执行栈，堆。浏览器会把微任务执行完在执行宏任务。
// 浏览器先把同步走完 在走微任务，在走宏任务，都是从上至下的走

// async1 start
// async2
// promise1
//  script end
//async1 end
// promise2
// undefined
// timeout

// 闭包  //隐藏变量 闭包常常用来「间接访问一个变量」。换句话说，「隐藏一个变量」。
function foo() {
  var local = 1;
  function bar() {
    local++;
    return local;
  }
  return bar;
}

var func = foo();
func();

// 简写
function foo() {
  var local = 1;
  return function () {
    local++;
    return local;
  };
}
