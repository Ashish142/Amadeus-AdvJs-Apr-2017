
let _idSymbol = Symbol();
class Employee{
	constructor(id, name, salary){
		this[_idSymbol] = id;
		this.name = name;
		this.salary = salary;
    }
	/*set id(value){
		console.log('id setter triggered');
		if (value < 0) return;
		this[_idSymbol] = value;
    }*/
	get id(){
		console.log('id getter triggered');
		return this[_idSymbol];
	}
	display(){
		console.log(`id = ${this.id}, name = ${this.name}, salary = ${this.salary}`);
	}
}
export default Employee;


