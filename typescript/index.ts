export{}
// class student{
//     name:string;
//     age:number;

//     constructor(name:string,age:number){
//         this.name=name;
//         this.age=age
//     }
//     print():void{
//         console.log(`Hi my name is ${this.name} and my age is ${this.age}`)
//     }
// }

// const student1= new student("vikas",26)
// student1.print()

// class student{
//     constructor(
//         public name:string,
//         public age:number
//     ){}

//     print(){
//         console.log(`${this.name} ${this.age}`)
//     }
// }
// const s1=new student("vikas",26)
// console.log(s1.name)



//public -> inside class access -yes
//child->yes
//outside class access-yes


//private inside class access ->yes
//child->no
//outside->no

//protected
//inside class->yes
//child->yes
//outside->no

// class user{
//     constructor(){
//         console.log("hi user")
//     }
// }

// @Logger
// class user{}

function Logger(constructor:Function){
    console.log("hi class has benn creared",constructor.name)
}
@Logger
class Student{

}
const s1=new Student()