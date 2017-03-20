import Ember from 'ember';

export default Ember.Controller.extend({
    session: Ember.inject.service(),
    ajax: Ember.inject.service(),
    actions: {

    showLastName: function(){
        var type= document.getElementById('type');
        var typeval = type.options[type.selectedIndex].text;

        if (typeval == "Laboratory" ){
        this.set('model.laboratory', false);
        }
        else{
        this.set('model.laboratory', true);
        }
    },

    createContact: function(){

    //this is to get the value in the dropdown specifically
    var type= document.getElementById('type');
    var typeval = type.options[type.selectedIndex].text;
    var self = this;
 

    if (this.get('first_name') === undefined ) {
        showAlert("First name cannot be blank", false);
    }

    else if ( this.get('phoneNumber') === undefined){
        showAlert("Phone number cannot be blank", false);
    }

    else if ( this.get('email') === undefined){
        showAlert("Email cannot be blank", false);
    }

    else if ( this.get('address') === undefined){
        showAlert("Address cannot be blank", false);
    }

    else{

    document.getElementById("create-contact-button").disabled = true; 
  
    var user = this.get('ajax').post('/api/contacts', {
        type: 'application/json',
        data: { contact: {
          first_name: this.get('first_name'),
          last_name: this.get('last_name'),
          address: this.get('address'),
          email: this.get('email'),
          phone_number: this.get('phoneNumber'),
          fax_number: this.get('faxNumber'),
          contact_type: typeval
        }
    }
    });

        user.then(function(response){
            if(response.success){
                showAlert("Contact created!", true);
                clearFields(self);
                self.transitionToRoute('search-contacts');    
            }
        //this is error from server condition
        }, function(response) {
            if (response === false){
					if (self.get('session.isAuthenticated')){
						self.get('session').invalidate();
					}
				self.transitionToRoute('/login');
			}
            else {
            showAlert(response.errors[0].title, false);
            document.getElementById("create-contact-button").disabled = false; 
            }
        });
}
    }
    }
});
   

function showAlert(message, bool) {
        if(bool){
            Ember.$('#alert_placeholder').html('<div class="alert alert-success"><a class="close" data-dismiss="alert">×</a><span  id="statusGood">'+message+'</span></div>');
        }
        else{
             Ember.$('#alert_placeholder').html('<div class="alert alert-danger" ><a class="close" data-dismiss="alert">×</a><span id="statusBad">'+message+'</span></div>');
        }
 }

function clearFields(page){
	page.set('first_name', '');
	page.set('last_name', '');
	page.set('phoneNumber', '');
    page.set('faxNumber', '');
    page.set('email', '');
    page.set('address', '');
	
}