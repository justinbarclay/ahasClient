import Ember from 'ember';

/**
* Route for radiography upload
* @class RadiographyUploadRoute
*/
export default Ember.Route.extend({
	init(){
		checkFileApiSupport();
	},
	model(param){
		return {
			patientId: param.patientID
		};
	}
});

/**
* checks that File API is supported on the browser. Called on page initialization.  
* @method checkFileApiSupport
*/
function checkFileApiSupport(){
	if (window.File && window.FileReader && window.FileList && window.Blob){
		return true;
	} else{
		alert("The File APIs are not fully supported in this browser. ");
		return false;
	}
}
