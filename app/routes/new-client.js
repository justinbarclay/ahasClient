import Ember from 'ember';

export default Ember.Route.extend({
	model() {
		return this.store.createRecord('newClient');
	}
	// actions:{
	// 	createNewClient(){
	// 		// let clientInfo = this.modelFor(this.routeName);
	// 		// clientInfo.save().then(function () {
	// 		// 	//sendRequest();
	// 		// 	//this.transitionTo('new-client');
	// 		// }).catch(function (reason){

	// 		// });
	// 		console.log("made new client");
	// 		this.transitionTo('new-client');
	// 	}
	// }
});