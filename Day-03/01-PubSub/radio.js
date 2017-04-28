var radio = (function(){
	
	function Radio(){
		this._subscriptions = [];
	}
	
	Radio.prototype.subscribe = function (subscription){
		if (!(typeof subscription === 'function' || Array.isArray(subscription))) return;
		this._subscriptions = this._subscriptions || [];
		this._subscriptions.push(subscription);
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

	Radio.prototype.unsubscribe = function (subscription){
		this._subscriptions = this._subscriptions.filter(function(subscriptionFn){
			return subscriptionFn !== subscription;
		});
		return this;
	}

	var radios = {};
	return function(evtName){
		radios[evtName] = radios[evtName] || new Radio();
		return radios[evtName];
	}
})();
