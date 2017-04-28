import Employee from './Employee';

class FullTimeEmployee extends Employee{
	constructor(id, name, salary, benefits){
		super(id, name, salary);
		this.benefits = benefits;
	}

	display(){
			console.log(`id = ${this.id}, name = ${this.name}, salary = ${this.salary}, benefits = ${this.benefits}`);
		}
}
export default FullTimeEmployee;