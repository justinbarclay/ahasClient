import Ember from 'ember';
import UnauthenticatedRouteMixin from 'ember-simple-auth/mixins/unauthenticated-route-mixin';

/**
* Route for new user
* @class newUserRoute
*/

export default Ember.Route.extend(UnauthenticatedRouteMixin,{
    session: Ember.inject.service(),
	ajax: Ember.inject.service(),
    model(params){
		var self = this;

		let ajaxGet = new Ember.RSVP.Promise((resolve) =>
		this.get('ajax').request(`/api/users/${params.inviteToken}`
			).then(function(data){
				Ember.run(function() {
					resolve({ 
						user: data.user,
						inviteToken: params.inviteToken
					});

				});
				
			},
			function(response){
				if (response === false){
					if (self.get('session.isAuthenticated')){
						self.get('session').invalidate();
					}
					self.transitionTo('/login');
            	} else {
				self.transitionTo('/login');
				}
            }));
		return ajaxGet;
	}
});
