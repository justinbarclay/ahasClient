import Ember from 'ember';

/**
* Controller for medical-record
* @class MedicalRecordController
*/


export default Ember.Controller.extend({
    medicine: [],
    vaccine: [],
    other: [],
    color: '#000',  // default
    height: 68,     // default
    weight: 1,      // default
    width: 250,     // default
    

    signature: Ember.computed(function () {
        return Ember.A();
    }),

    stringifiedSignature: Ember.computed('signature.[]', function() {
        return JSON.stringify(this.get('signature'));
    }),

    ajax: Ember.inject.service(), 


    actions: {

        /** 
		* handles action called when user clicks create-medical-record-button
		* gathers all dropdown vals and makes sure that summary and signature are not empty
        * if this condition passes it makes a post to the server
		* @method createMedicalRecord
		*/

        createMedicalRecord(){

            var summary = document.getElementById('summary').value.trim();

              if(summary === null || summary === undefined || summary === ""){
                  showAlert("Must enter a summary for the patients medical record history list", false);
              }
              else{

            var self = this;
            var date = Math.floor(Date.now() /1000); 
            
            if( this.get('signature').length !== 0 ){

             var bcsvalue= document.getElementById('bcsvalue');
             var bcsVal = bcsvalue.options[bcsvalue.selectedIndex].text;

             var unit = document.getElementById('unit');
             var weightUnit = unit.options[unit.selectedIndex].text;


             var medicalRecord = this.get('ajax').post('/api/patients/'+ this.get('model.patientID')+'/medical_records', {
             type: 'application/json',
             data: { 
                 medical_record: {
   
             date: date,  
             patient_id: this.get('model.patientID'),
             
             signature: exportSignature(this.get('stringifiedSignature')), 

             //inputs
             temperature: document.getElementById('temperatureText').value,
             eyes: document.getElementById('eyesText').value,
             oral: document.getElementById('oralText').value,
             ears: document.getElementById('earsText').value,
             glands: document.getElementById('glandsText').value,
             skin: document.getElementById('skinText').value,
             abdomen: document.getElementById('abdomenText').value,
             urogenital: document.getElementById('urogenitalText').value,
             nervousSystem: document.getElementById('nervousSystemText').value,
             musculoskeletal: document.getElementById('musculoskeletalText').value,
             cardiovascular: document.getElementById('cardiovascularText').value,
             heart_rate: document.getElementById('hrText').value,
             respiratory: document.getElementById('respiratoryText1').value,
             respiratory_rate: document.getElementById('respiratoryText2').value,

             //checkboxes
             attitudeBAR: document.getElementById('attitudeBAR').checked,
             attitudeQAR: document.getElementById('attitudeQAR').checked, 
             attitudeDepressed: document.getElementById('attitudeDepressed').checked,
             eyesN: document.getElementById('eyesN').checked,
             eyesA: document.getElementById('eyesA').checked,
             oralN: document.getElementById('oralN').checked,
             oralA: document.getElementById('oralA').checked,
             mmN: document.getElementById('mmN').checked, 
             mmPale: document.getElementById('mmPale').checked, 
             mmJaundiced: document.getElementById('mmJaundiced').checked, 
             mmTacky: document.getElementById('mmTacky').checked, 
             earsN: document.getElementById('earsN').checked, 
             earsA: document.getElementById('earsA').checked, 
             earsEarMites: document.getElementById('earsEarMites').checked, 
             earsAU: document.getElementById('earsAU').checked, 
             earsAD: document.getElementById('earsAD').checked, 
             earsAS: document.getElementById('earsAS').checked, 
             glandsN: document.getElementById('glandsN').checked, 
             glandsA: document.getElementById('glandsA').checked,  
             skinN: document.getElementById('skinN').checked,
             skinA: document.getElementById('skinA').checked,   
             abdomenN: document.getElementById('abdomenN').checked,
             abdomenA: document.getElementById('abdomenA').checked, 
             urogenitalN: document.getElementById('urogenitalN').checked,
             urogenitalA: document.getElementById('urogenitalA').checked,
             nervousSystemN: document.getElementById('nervousSystemN').checked,
             nervousSystemA: document.getElementById('nervousSystemA').checked,
             musculoskeletalN: document.getElementById('musculoskeletalN').checked,
             musculoskeletalA: document.getElementById('musculoskeletalA').checked,
             cardiovascularN: document.getElementById('cardiovascularN').checked,
             cardiovascularA: document.getElementById('cardiovascularA').checked,
             respiratoryN: document.getElementById('respiratoryN').checked,
             respiratoryA: document.getElementById('respiratoryA').checked,

             mcsN: document.getElementById('mcsN').checked,
             mcsMild: document.getElementById('mcsMild').checked,
             mcsMod: document.getElementById('mcsMod').checked,
             mcsSevere: document.getElementById('mcsSevere').checked,
             weight: document.getElementById('weight').value,

             //dropdown values
             weightUnit: weightUnit, 
             bcsVal: bcsVal,


             //textareas
             follow_up_instructions: document.getElementById('followUpNotes').value,
             exam_notes: document.getElementById('notes').value, 
             summary: document.getElementById('summary').value

           
        },
         medications: gatherMedications(this.get('model.patientID'), self),
        
    }
    
    });

        medicalRecord.then(function(response){
            if(response.success){
                showAlert("Record created, record is editable until 12pm tonight", true);
            }
        //this is error from server condition
        }, function(response) {
					if (response === false){
						if (self.get('session.isAuthenticated')){
							self.get('session').invalidate();
							}
						self.transitionToRoute('/login');
					}
				});
        }
        else{
          showAlert("Record cannot be created without a signature", false);
        }
              }
      },

/** 
	* used to clear the signature
	* @method  clearSignature
	*/  
      clearSignature(){
        this.set('signature', Ember.A());
      }, 
/** 
	* used to check all normal buttons on the page
    * which is all N's and the BAR
	* @method checkAll
	*/  
      checkAll(){
          var normals = document.getElementsByClassName("norm");
          for (var i=0; i<normals.length; i++){
              normals[i].checked = true;
          }
      }, 
/** 
	* used to uncheck all normal buttons on the page
    * which is all N's and the BAR
	* @method uncheckAll
	*/  
      uncheckAll(){
          var normals = document.getElementsByClassName("norm");
          for (var i=0; i<normals.length; i++){
              normals[i].checked = false;
          }
      }

    }
});

 /** 
		* used to provide feedback to user on success condition as well as fail condition
        * only displayed very briefly on success condition however before transition
		* @method  showAlert
		* @param {string} message The message to display in the alert
        * @param {boolean} bool Determines if this is a warning alert or confirmation alert
		*/   

function showAlert(message, bool) {
        if(bool){
            Ember.$('#alert_placeholder_med').html('<div class="alert alert-success"><a class="close" data-dismiss="alert">×</a><span  id="statusGood">'+message+'</span></div>');
        }
        else{
             Ember.$('#alert_placeholder_med').html('<div class="alert alert-danger" ><a class="close" data-dismiss="alert">×</a><span id="statusBad">'+message+'</span></div>');
        }
 }

/** 
	* used to gather the signature to send in request
    * finds the only canvas element on the page and then converts to base 64 img to send
	* @method  exportSignature
	*/  
 

function exportSignature(){
            
            var canvas = document.querySelector("canvas");
            var img    = canvas.toDataURL("image/png");
            return(img);
}

/** 
		* used to gather the objects we will send in request
        * delegates to formatReminders to handle each type of reminder
		* @method  gatherMedications
        * @param {controller} self the controller for medical-record, used to store and gather attributes of medication lists
        * @param {id} id the id of the patient to include in the objects we are sending
		*/  

function gatherMedications(id, self){
    var medications = [];
    var formattedMedicine = formatReminders(self.get('medicine'), self.get('model.patientID'));
    var formattedVaccine = formatReminders(self.get('vaccine'), self.get('model.patientID'));
    var formattedOther = formatReminders(self.get('other'), self.get('model.patientID'));
    medications.push.apply(medications, formattedMedicine);
    medications.push.apply(medications, formattedVaccine);
    medications.push.apply(medications, formattedOther);
    return(medications);
    
}

/** 
		* used to format the objects we will send in request
		* @method   formatReminders
        * @param {array} items the array of reminders to be formatted
        * @param {id} id the id of the patient to include in the objects we are sending
		*/  

function formatReminders(items, id){

    var newList = [];

    for(var i =0 ; i<items.length; i++){
        if (items[i].reminder !== ""){
            var newObjectReminder = formatDate(items[i].reminder);
            var newObject1 = {patient_id: id, name: items[i].name, med_type: items[i].med_type, reminder: newObjectReminder};
            newList.push(newObject1);
        }
        else{
            var newObject2 = {patient_id: id, name: items[i].name, med_type: items[i].med_type, reminder: ''};
            newList.push(newObject2);
        }
        
    }

    return(newList);

}

 /** 
		* used to format the date to we will send in request
        * converts from format in datepicker to unix time in seconds
		* @method   formatDate
        * @param {date} date the date to be formatted
		*/   

function formatDate(date){
  var half = new Date(date);
  var formatted = Math.floor(half.getTime() / 1000);
  return(formatted);
}