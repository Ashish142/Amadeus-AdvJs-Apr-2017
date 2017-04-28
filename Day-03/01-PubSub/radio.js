var radio = (function(){
	
	function Radio(){
		this._subscriptions = [];
	}
	
	Radio.prototype.subscribe = function (){
		var self = this;
		Array.prototype.forEach.call(arguments, function(subscription){
			if (!(typeof subscription === 'function' || Array.isArray(subscription))) return;
			self._subscriptions = self._subscriptions || [];
			self._subscriptions.push(subscription);
		});
		return this;
	}

	Radio.prototype.broadcast = function (data){
		var subscriptionFns = this._subscriptions || [];
		subscriptionFns.forEach(function(subscription){
			var fn = subscription,
				context = this;
			if (Array.isArray(subscription)){
				fn = subscription[0];
				context = subscription[1];
			} 
			fn.call(context, data);
		});
		return this;
	}

	Radio.prototype.unsubscribe = function (){
		var self = this;
		Array.prototype.forEach.call(arguments, function(subscription){
			self._subscriptions = self._subscriptions.filter(function(sc){
				subscriptionFn = Array.isArray(sc) ? sc[0] : sc;
				return subscriptionFn !== subscription;
			});
		});
		return this;
	}

	var radios = {};
	return function(evtName){
		radios[evtName] = radios[evtName] || new Radio();
		return radios[evtName];
	}
})();
