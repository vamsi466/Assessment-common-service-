(function(){ 

   'use strict'
    angular.module('paymentMode') 
    .controller('informationCtrl',function(commonService,$timeout){
            var info= this;
            info.showData = {};

            //Taking all of these as keys with values as empty string for validations
            info.paymentDetails={'paymentvalue':'','selectedaccountingData':'',"selectedfrequencyData":'',"paymentStart":'',"selectedpaymenttimingData":'',"selectedpaymentdueonData":'',"selectedpaymentduedayData":''};;
           
            //showData is for having values which are selected during navigation also
            info.showData = commonService.showDataModal();

            /*
              This is to have payment details which are selected while navigation in their respective fields

              Generating empty fields while initializing modal by click on ADD
            */

            info.paymentDetails = (info.showData.flag ==='true')?{}:commonService.finalGeneratedData;
            info.editObj ={};
            info.editObj.showFlag == false;

            //Getting all the details while click on list of options and displaying in input field
            info.payment= function(data){
                info.paymentDetails.paymentvalue = data;
            }
            info.accountingSelected= function(data){
                info.paymentDetails.selectedaccountingData = data;
            }
            info.frequecySelected= function(data){
                info.paymentDetails.selectedfrequencyData = data;
            }
            info.paymenttimingSelected = function(data){
                info.paymentDetails.selectedpaymenttimingData = data;
            }
            info.paymentdueonSelected = function(data){
                info.paymentDetails.selectedpaymentdueonData = data;
            }
            info.paymentduedaySelected = function(data){
                info.paymentDetails.selectedpaymentduedayData = data;
            }

            //Reason for this not having an error if the data is delayed and for not generating empty data
            $timeout(function() {
                commonService.getInformationDetails(info.paymentDetails)
            },1500)

            //Getting the object of details which are to be editted
            info.editObj = commonService.detailsEdited();

            //Placing details into their respective fields while doing an edit
            if(info.editObj.showFlag == true){
                info.paymentDetails = info.editObj.data;
            } 
       })
})();