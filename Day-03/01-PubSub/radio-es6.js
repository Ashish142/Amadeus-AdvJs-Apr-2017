var radio = (function(){
	
	class Radio{
		constructor(){
			this._subscriptions = [];
		}

		subscribe(...args) {
			args.forEach(arg => this.__subscribeOne(arg));
			return this;
		}
		broadcast (data) {
			this._subscriptions.forEach(subscription => this.__broadcastOne(subscription, data));
			return this;
		}
		unsubscribe(...args) {
			args.forEach(arg => this.__unsubscribeOne(arg));
			return this;
		}

		__subscribeOne(subscription)  {
			if (!(typeof subscription === 'function' || Array.isArray(subscription))) return;
			this._subscriptions.push(subscription);
		}
		

		__broadcastOne(subscription, data)  {
			var fn = subscription,
				context = this;
			if (Array.isArray(subscription)){
				[fn,context] = subscription;
			} 
			fn.call(context, data);
		};

		
		__unsubscribeOne(subscription)  {
			this._subscriptions = this._subscriptions.filter((sc) => {
				subscriptionFn = Array.isArray(sc) ? sc[0] : sc;
				return subscriptionFn !== subscription;
			});
		}
	}
	
	var radios = {};
	return function(evtName){
		radios[evtName] = radios[evtName] || new Radio();
		return radios[evtName];
	}
})();
