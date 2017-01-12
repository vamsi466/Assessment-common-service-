(function(){

   'use strict'
    angular.module('paymentMode')
    .service('commonService',function(){
        var ser = this;
        ser.setDetails = {};
        ser.getDetails ={};
        ser.getParamDetails ={};
        ser.tableDetails={};
        var finalGeneratedData = {};
        ser.tableInfoDetails ={};
        ser.tableParamDetails = {};
        ser.editTableDetails = {};

        ser.getInformationDetails = function(detailsPresent){
            ser.getDetails = detailsPresent;
        }
        ser.setInformationDetails = function(){
            ser.setDetails = ser.getDetails;
            
        }
        ser.getParamsDetails = function(paramsDetails){
            ser.getParamDetails = paramsDetails;
            
        }

        ser.generateData = function(){
            ser.tableInfoDetails = ser.getDetails;
            ser.tableParamDetails = ser.getParamDetails;
            ser.finalGeneratedData = angular.extend(ser.getParamDetails,ser.getDetails)
            // console.log(ser.finalGeneratedData)
            var clonefinalGeneratedData = angular.copy(ser.finalGeneratedData);
            // var clonepaymentParamDetails = angular.copy(ser.tableParamDetails)
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

        ser.editDetailsData = function(data){
            // console.log(index)
            ser.editTableDetails = data;
            return ser.editTableDetails
            console.log(ser.editTableDetails)
        }

        ser.detailsEdited = function(){
            return ser.editDetailsData();
        } 
    })
})();