var isPrime = (function(){
    var cache = {};
    function isPrime(n){
        if (typeof cache[n] === 'undefined'){
			console.log('processing ', n);
            cache[n] = true;
            for(var i = 2; i <= (n/2); i++)
                if (n % i === 0){
                    cache[n] = false;
                    break;
                }
        }
        return cache[n];
    }
	return isPrime;
})()

var isPrime = (function(){
    var cache = {};
    function checkPrime(n){
        console.log('processing ', n);
        for(var i = 2; i <= (n/2); i++)
            if (n % i === 0)
                return false;
        return true;
    }
    return function(n){
        if (typeof cache[n] !== 'undefined')
            cache[n] = checkPrime(n);
        return cache[n];
    }
})()


var isOddOrEven = (function(){
    var cache = {};
    function checkOddOrEven(n){
        console.log('processing ', n);
        return n % 2 === 0 ? 'even' : 'odd';
    }
    return function(n){
        if (typeof cache[n] !== 'undefined')
            cache[n] = checkOddOrEven(n);
        return cache[n];
    }
})()

function memoize(algoFn){
    var cache = {};
    return function(n){
        if (typeof cache[n] === 'undefined')
            cache[n] = algoFn(n);
        return cache[n];
    }
}

function memoize(algoFn, context){
    var cache = {};
    return function(argList){
        context = context || this;
        var key = JSON.stringify(arguments);
        if (typeof cache[key] === 'undefined')
            cache[key] = algoFn.apply(context, arguments);
        return cache[key];
    }
}
