import add from './add';
import FullTimeEmployee from './FullTimeEmployee';

console.log(add(100,200));
let ft = new FullTimeEmployee(100, 'Magesh', 10000, 'Food');
ft.display();
console.log('assigning id');
ft.id = 200;
console.log(ft.id);

