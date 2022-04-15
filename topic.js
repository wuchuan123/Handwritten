async function async1() {
  console.log("async1 start");   //1
  await async2();  
  console.log("async1 end");  //5
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
console.log("script end");  //4
//涉及到浏览器的事件循环，执行栈，堆。浏览器会把微任务执行完在执行宏任务。


// async1 start
// async2
// promise1
//  script end
//async1 end
// promise2
// undefined
// timeout
