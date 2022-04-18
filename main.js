// 手写ajax new xml

// 俩数之和
const numbers = [2, 7, 11, 15];
const target = 9;
const twoSum = (numbers, target) => {
  const map = {};
  for (let i = 0; i < numbers.length; i++) {
    const number = numbers[i]; //i=0 number=2  //i=1  number=7
    const number2 = target - number; //number2=7  // number2=2
    if (number2 in map) {
      //
      const number2Index = map[number2];
      return [i, number2Index];
    } else {
      map[number] = i; // {2:0}
    }
  }
  return [];
};
console.log(twoSum(numbers, target));

// 防抖
// 用户一直触发就不给结果，等停止了在给结果
// 利用定时器，一直触发就一直清除定时器
const debounce = (fn, delay) => {
  let timer;
  return function () {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(undefined, arguments), delay);
  };
};

//节流 用户一直触发，隔断时间就给结果
// setTimeout 里面来控制 true 和 false
const throttle = (fn, delay) => {
  let canUse = true;
  return function () {
    if (canUse) {
      fn.apply(this, arguments);
      canUse = false;
      setTimeout(() => {
        canUse = true;
      }, delay);
    }
  };
};

// 继承
class Animal{
  constructor(color){
      this.color = color
  }
  move(){}
}
class Dog extends Animal{
  constructor(color, name){
      super(color)
      this.name = name
  }
  say(){}
}
// promise.all
Promise.myAll = function (list) {
  const results = [];
  let count = 0;
  return new Promise((resolve, reject) => {
    list.map((item, index) => {
      item.then(
        (result) => {
          results[index] = result;
          count += 1;
          if (count >= list.length) {
            resolve(results);
          }
        },
        (reason) => reject(reason)
      );
    });
  });
};
// eventHub
const eventHub = {
  map: {
    // click: [f1 , f2]
  },
  on: (name, fn)=>{
    eventHub.map[name] = eventHub.map[name] || []
    eventHub.map[name].push(fn)
  },
  emit: (name, data)=>{
    const q = eventHub.map[name]
    if(!q) return
    q.map(f => f.call(null, data))
    return undefined
  },  
  off: (name, fn)=>{
    const q = eventHub.map[name]
    if(!q){ return }
    const index = q.indexOf(fn)
    if(index < 0) { return }
    q.splice(index, 1)
  }
}

eventHub.on('click', console.log)
eventHub.on('click', console.error)

setTimeout(()=>{
  eventHub.emit('click', 'frank')
},3000)
