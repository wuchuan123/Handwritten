//继承
class Animal{
   constructor(color){
       this.color=color
   } 
   move(){}
}
class Dog extends Animal{
    constructor(color,name){
        super(color)
        this.name=name
    }
    say(){}
}

//数组去重
function unique(arr){
    return arr.filter((item,index)=>arr.indexOf(item)===index)
}