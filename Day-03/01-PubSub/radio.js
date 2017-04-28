var radio = (function(){
	
	function Radio(){
		this._subscriptions = [];
	}
	
	function subscribeOne(subscription){
		if (!(typeof subscription === 'function' || Array.isArray(subscription))) return;
		this._subscriptions = this._subscriptions || [];
		this._subscriptions.push(subscription);
	}
	Radio.prototype.subscribe = function (){
		Array.prototype.forEach.call(arguments, subscribeOne.bind(this));
		return this;
	}

	function broadcastOne(subscription){
		var fn = subscription,
			context = this;
		if (Array.isArray(subscription)){
			fn = subscription[0];
			context = subscription[1];
		} 
		fn.call(context, data);
	}
	Radio.prototype.broadcast = function (data){
		var subscriptionFns = this._subscriptions || [];
		subscriptionFns.forEach(broadcastOne);
		return this;
	}
	function unsubscribeOne(subscription){
		this._subscriptions = this._subscriptions.filter(function(sc){
			subscriptionFn = Array.isArray(sc) ? sc[0] : sc;
			return subscriptionFn !== subscription;
		});
	}
	Radio.prototype.unsubscribe = function (){
		Array.prototype.forEach.call(arguments, unsubscribeOne.bind(this));
		return this;
	}

	var radios = {};
	return function(evtName){
		radios[evtName] = radios[evtName] || new Radio();
		return radios[evtName];
	}
})();
