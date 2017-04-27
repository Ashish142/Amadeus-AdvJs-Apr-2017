var products = [
	{id : 5, name : 'Pen', cost : 60, units : 30, category : 'stationary'},
	{id : 8, name : 'Len', cost : 70, units : 60, category : 'grocery'},
	{id : 3, name : 'Ten', cost : 80, units : 40, category : 'stationary'},
	{id : 6, name : 'Ken', cost : 40, units : 50, category : 'grocery'},
	{id : 4, name : 'Den', cost : 90, units : 20, category : 'stationary'},
]

function describe(title, fn){
	console.group(title);
	fn();
	console.groupEnd();
}

/*
sort
filter
all
any
groupBy
*/

describe('Default Products List', function(){
	console.table(products);
});

describe('Sorting', function(){
	describe('Default Sort [ Products by id ]', function(){
		function sort(){
			for(var i=0; i < products.length-1; i++)
				for(var j=i+1; j < products.length; j++)
					if (products[i].id > products[j].id){
						var temp = products[i];
						products[i] = products[j];
						products[j] = temp;
					}
		}
		sort();
		console.table(products);
	});
	describe('Any list by any attribute', function(){
		function sort(list, attrName){
			for(var i=0; i < list.length-1; i++)
				for(var j=i+1; j < list.length; j++)
					if (list[i][attrName] > list[j][attrName]){
						var temp = list[i];
						list[i] = list[j];
						list[j] = temp;
					}
		}
		describe('Products by cost', function(){
			sort(products, 'cost');
			console.table(products);
		});
		describe('Products by units', function(){
			sort(products, 'units');
			console.table(products);
		});
	});
	describe('Any list by anthing', function(){
		function sort(/* ... */){

		}
		describe('Products by value [ cost * units ]', function(){
			sort(/*...*/);
			console.table(products);
		});
	});
});



