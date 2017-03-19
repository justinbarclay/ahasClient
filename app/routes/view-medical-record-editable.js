import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend( AuthenticatedRouteMixin , {
    ajax: Ember.inject.service(),
	model(params) { 

        //console.log(document.getElementById("followUpNotes"));

        var self = this;

      /*  var ajaxGet = new Ember.RSVP.Promise((resolve) =>
        this.get('ajax').request('/api/patients/'+params.patientID+'/medical_records' 
			).then(function(data){
            console.log(JSON.stringify(data));
                Ember.run(function() {
       			 resolve({ 
                });
    		  });
			
			},
			function(data){
				if (data === false){
				self.transitionTo('/unauthorized');
				console.log("status is " + JSON.stringify(data));
				}
        }));
		return(ajaxGet);
	},*/
     
		


		var ajaxGet = new Ember.RSVP.Promise((resolve) =>

		this.get('ajax').request('/api/patients/'+params.patientID+'/medical_records/8' 
			).then(function(data){
				
                //undefined!!!!!!!!!!!
                console.log(data.medical_record.oralA);
              
            
				Ember.run(function() {
       			 resolve({ 
						   

                            date: parseDate(new Date(data.medical_record.date * 1000)),
                            date_created: data.medical_record.created_at, 
                            patient_id: data.medical_record.id, 
                            
                            signature: data.medical_record.signature, 

                            temperature: data.medical_record.temperature,
                            eyes: data.medical_record.eyes,
                            oral: data.medical_record.oral,
                            ears: data.medical_record.ears,
                            glands: data.medical_record.glands,
                            skin: data.medical_record.skin,
                            abdomen: data.medical_record.abdomen,
                            urogential: data.medical_record.urogential,
                            nervousSystem: data.medical_record.nervousSystem,
                            musculoskeletal: data.medical_record.musculoskeletal,
                            cardiovascular: data.medical_record.cardiovascular,
                            heart_rate: data.medical_record. heart_rate,
                            respiratory: data.medical_record.respiratory,
                            respiratory_rate: data.medical_record.respiratory_rate,

                            
                            attitudeBAR: data.medical_record.attitudeBAR ,
                            attitudeQAR: data.medical_record.attitudeQAR, 
                            attitudeDepressed: data.medical_record.attitudeDepressed,
                            eyesN: data.medical_record.eyesN,
                            eyesA: data.medical_record.eyesA,
                            oralN: data.medical_record.oralN,
                            oralA: data.medical_record.oralA,
                            mmN: data.medical_record.mmN, 
                            mmPale: data.medical_record.mmPale, 
                            mmJaundiced: data.medical_record.mmJaundiced, 
                            mmTacky: data.medical_record.mmTacky, 
                            earsN: data.medical_record.earsN, 
                            earsA: data.medical_record.earsA, 
                            earsEarMites: data.medical_record.earsEarMites, 
                            earsAU: data.medical_record.earsAU, 
                            earsAD: data.medical_record.earsAD, 
                            earsAS: data.medical_record.earsAS, 
                            glandsN: data.medical_record.glandsN, 
                            glandsA: data.medical_record.glandsA,  
                            skinN: data.medical_record.skinN,
                            skinA: data.medical_record.skinA,   
                            abdomenN: data.medical_record.abdomenN,
                            abdomenA: data.medical_record.abdomenA, 
                            urogenitalN: data.medical_record.urogentialN,
                            urogenitalA: data.medical_record.urogentialA,
                            nervousSystemN: data.medical_record.nervousSystemN,
                            nervousSystemA: data.medical_record.nervousSystemA,
                            musculoskeletalN: data.medical_record.musculoskeletalN,
                            musculoskeletalA: data.medical_record.musculoskeletalA,
                            cardiovascularN: data.medical_record.cardiovascularN,
                            cardiovascularA: data.medical_record.cardiovascularA,
                            respiratoryN: data.medical_record.respiratoryN,
                            respiratoryA: data.medical_record.respiratoryA,

                            mcsN: data.medical_record.mcsN,
                            mcsMild: data.medical_record.mcsMild,
                            mcsMod: data.medical_record.mcsMod,
                            mcsSevere: data.medical_record.mcsSevere,
                            weight: data.medical_record.weight,

                            //dropdowns
                            weightUnit: data.medical_record.weightUnit, //setDropdowns(data.medical_record.weightUnit), 
                            bcsVal: data.medical_record.bcsVal,


                            exam_notes: data.medical_record.exam_notes, 
                            followUpNotes: data.medical_record.follow_up_instructions,
                            summary: data.medical_record.summary 

                          
				
				});
    		  });
			
			},
			function(data){
				if (data === false){
				self.transitionTo('/unauthorized');
				console.log("status is " + JSON.stringify(data));
				}
		}));
		return(ajaxGet);
	},

});

function parseDate(date){
        var days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
        var months = ["January","February","March","April","May","June","July", "August", "September", "October", "November", "December"];
        var day = date.getDay() ;
        var month = date.getMonth()  ;
        var year = date.getFullYear();
        var hours = date.getHours();
        var mins = (date.getMinutes()<10?'0':'') + date.getMinutes();
        var whole = days[day] +" "+ months[month] +" "+ year.toString() + " "+ hours.toString() + ":" + mins.toString();
        return(whole);
}

/*
{{#if model.attitudeBAR }}
        <input type="checkbox" id="attitudeBAR" disabled checked="true"> BAR 
        {{else}}
         <input type="checkbox" id="attitudeBAR" disabled > BAR 
         {{/if}}*/

function setDropdowns(value){
    //ugh idk why cannot set. 
    var element = document.getElementById("unit");
    console.log( document, document.getElementById("unit"));
    //element.value = value;
    //return(true);
}