// function print(value:any){
//     console.log(value)
// }

function print(value:string):void;
function print(value:number):void

function print(value:string | number):void{
    console.log(value)
}
print(100);
print("vikas")