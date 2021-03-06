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
	function sort(list, comparer){
		var comparerFn = function(){ return 0; };
		if (typeof comparer === 'function')
			comparerFn = comparer;
		if (typeof comparer === 'string')
			comparerFn = function(item1, item2){
				if (item1[comparer] === item2[comparer]) return 0;
				if (item1[comparer] < item2[comparer]) return -1;
				return 1;
			}
		for(var i=0; i < list.length-1; i++)
			for(var j=i+1; j < list.length; j++){
				var shouldSwap = comparerFn(list[i], list[j]);
				if (shouldSwap > 0){
					var temp = list[i];
					list[i] = list[j];
					list[j] = temp;
				}
			}
	}
	function getDescending(comparerFn){
		return function(){
			return comparerFn.apply(this, arguments) * -1;
		}
	}
	describe('Any list by any attribute', function(){
		/*function sort(list, attrName){
			for(var i=0; i < list.length-1; i++)
				for(var j=i+1; j < list.length; j++)
					if (list[i][attrName] > list[j][attrName]){
						var temp = list[i];
						list[i] = list[j];
						list[j] = temp;
					}
		}*/
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
		/*function sort(list, comparerFn){
			for(var i=0; i < list.length-1; i++)
				for(var j=i+1; j < list.length; j++){
					var shouldSwap = comparerFn(list[i], list[j]);
					if (shouldSwap > 0){
						var temp = list[i];
						list[i] = list[j];
						list[j] = temp;
					}
				}
		}*/
		var productComparerByValue = function(p1, p2){
			var p1Value = p1.cost * p1.units,
				p2Value = p2.cost * p2.units;
			if (p1Value < p2Value) return -1;
			if (p1Value > p2Value) return 1;
			return 0
		}
		describe('Products by value [ cost * units ]', function(){
			
			sort(products, productComparerByValue);
			console.table(products);
		});
		describe('Products by value [ cost * units ] in descending', function(){
			
			sort(products, getDescending(productComparerByValue));
			console.table(products);
		});
	});
});

describe("Filter", function(){
	function filter(list, criteriaFn){
		var result = [];
		for(var i=0; i < list.length; i++)
			if (criteriaFn(list[i]))
				result.push(list[i]);
		return result;
	}
	function negate(criteriaFn){
		return function(){
			return !criteriaFn.apply(this, arguments);
		};
	}
	describe('Filter products by category', function(){
		var isStationaryProduct = function(product){
			return product.category === 'stationary';
		};
		describe('All stationary products [ category = "stationary" ]', function(){
			
			var stationaryProducts = filter(products, isStationaryProduct)
			console.table(stationaryProducts);
		});
		describe('All non stationary products [ category != "stationary"', function(){
			/*var isNotStationaryProduct = function(product){
				return product.category !== 'stationary';
			};*/
			/*var isNotStationaryProduct = function(product){
				return !isStationaryProduct(product);
			};*/
			var isNotStationaryProduct = negate(isStationaryProduct);
			var nonStationaryProducts = filter(products, isNotStationaryProduct)
			console.table(nonStationaryProducts);
		})
	});

	describe("Filter products by cost", function(){
		var isCostlyProduct = function(product){
			return product.cost > 50;
		}
		describe('All costly products [ cost > 50 ]', function(){
			
			var costlyProducts = filter(products, isCostlyProduct);
			console.table(costlyProducts);
		});
		describe('All affordable products [ cost <= 50 ]', function(){
			/*var isAffordableProduct = function(product){
				return product.cost <= 50;
			}*/
			/*var isAffordableProduct = function(product){
				return !isCostlyProduct(product);
			}*/
			var isAffordableProduct = negate(isCostlyProduct);
			var affordableProducts = filter(products, isAffordableProduct);
			console.table(affordableProducts);
		});
	});
});

describe('GroupBy', function(){
	function printGroup(groupedObj){
		for(var key in groupedObj){
			describe('Key - [' + key + ']', function(){
				console.table(groupedObj[key]);
			});
		}
	}
	describe("Products By Category", function(){
		function groupProductsByCategory(){
			var result = {};
			for(var i=0; i < products.length; i++){
				var category = products[i].category;
				if (typeof result[category] === 'undefined')
					result[category] = [];
				result[category].push(products[i])
			}
			return result;
		}
		var productsByCategory = groupProductsByCategory();
		printGroup(productsByCategory);
	});
	describe('Any list by any key', function(){
		function groupBy(list, keySelector){
			var result = {};
			for(var i=0; i < list.length; i++){
				var key = keySelector(list[i]);
				if (typeof result[key] === 'undefined')
					result[key] = [];
				result[key].push(list[i])
			}
			return result;
		}
		describe("Products by category", function(){
			var categoryKeySelector = function(product){
				return product.category;
			};
			var productsByCategory = groupBy(products, categoryKeySelector);
			printGroup(productsByCategory);
		});

		describe("Products by cost", function(){
			var costKeySelector = function(product){
				return product.cost < 50 ? 'affordable' : 'costly';
			};
			var productsByCost = groupBy(products, costKeySelector);
			printGroup(productsByCost);
		});
	});
});



