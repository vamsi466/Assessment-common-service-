(function(){ 

   'use strict'
    angular.module('paymentMode')
    .service('commonService',function(){
        var ser = this;

        //Creating all the required objects
        ser.setDetails = {};
        ser.getDetails ={};
        ser.getParamDetails ={};
        ser.tableDetails={};
        ser.finalGeneratedData = {};
        ser.editTableDetails = {};
        ser.showData = {};
        ser.validatingFields = {};

        //Getting details from paymentInformation controller
        ser.getInformationDetails = function(detailsPresent){
            ser.getDetails = detailsPresent;
        }

        //Setting those details which i got from paymentInformation controller
        ser.setInformationDetails = function(){
            ser.setDetails = ser.getDetails;
            
        }

        //Getting details from paymentParameter controller
        ser.getParamsDetails = function(paramsDetails){
            ser.getParamDetails = paramsDetails; 
        }

        /* 
            Validation function which used to do validations to my form

            These validations based on only for empty field and undefined value

            If there is any issue like that generating an error message
        
         */
        ser.validationFunction = function(fields){
            ser.validatingFields.flag = true;
            ser.validatingFields.errorMessage = {};
            var length = fields.length
            for(var iCtrl=0;iCtrl<length;iCtrl++){
                if(ser.setDetails[fields[iCtrl]] == "" || ser.setDetails[fields[iCtrl]] == undefined){
                    console.log(ser.setDetails[fields[iCtrl]])
                  ser.validatingFields.errorMessage[fields[iCtrl]] = "Please fill out this field";  
                  ser.validatingFields.flag = false;
                }else{
                   ser.validatingFields.errorMessage[fields[iCtrl]]=""; 
                }
            }
            return ser.validatingFields;
        }


        /*
            Generating Data which is achieved through by extending first controller object to second one

            But before genrating it we are having some validations

            For generating if we have already ibject generated with a key name then the second is pushed into that
            Otherwise new object is created
        
        */
        ser.generateData = function(){
            ser.finalGeneratedData = angular.extend(ser.getParamDetails,ser.getDetails)
            if(ser.finalGeneratedData.selectedfrequencyData == 'Other'){
              ser.validatingFields.flag = true;
            }
            else{
              ser.validationFunction(['chargeAmountselectedData']);
              
            }
            if(ser.validatingFields.flag=='true'){
                var clonefinalGeneratedData = angular.copy(ser.finalGeneratedData);
                if(clonefinalGeneratedData.paymentvalue != undefined){
                    if(clonefinalGeneratedData.paymentvalue in ser.tableDetails){
                        ser.tableDetails[clonefinalGeneratedData.paymentvalue].push(clonefinalGeneratedData);
                    
                        ser.finalGeneratedData={};
                        return ser.tableDetails; 
                    }else{
                        ser.tableDetails[clonefinalGeneratedData.paymentvalue] = [];
                        ser.tableDetails[clonefinalGeneratedData.paymentvalue].push(clonefinalGeneratedData);
                    
                        ser.finalGeneratedData={};
                        return ser.tableDetails;
                    }   
                }
            }
        }

        /*
           This is for having data in form-text fields during navigation but not while click on add button
        */
        ser.showDataInmodal = function(data){
            ser.showData = data;
            return ser.showData
        }

        ser.showDataModal = function(){
            return ser.showData
        }
        //Getting the details to be edited from the table
        ser.editDetailsData = function(data){
            ser.editTableDetails = data;
            return ser.editTableDetails  
        }

        //Setting the detailsto be edited
        ser.detailsEdited = function(){
            return ser.editTableDetails;
        }  


        /*Saving the data which had been edited

        *Extending the information from first controller to second controller to get as one         
        
        *Replacing the editted details to the place with respective to their Key and Index

        */
        ser.editSaved = function(){
            ser.finalGeneratedData = angular.extend(ser.getParamDetails,ser.getDetails)
            ser.tableDetails[ser.editTableDetails.key][ser.editTableDetails.index] = ser.finalGeneratedData;
            ser.editTableDetails.showFlag = false;
        }

        //Clearing all the fields in the modal
        ser.clearData = function(){
            ser.editTableDetails.showFlag = false;
        }

    })
})();