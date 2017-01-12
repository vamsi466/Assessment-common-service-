(function(){

   'use strict'
    angular.module('paymentMode')
    .controller('informationCtrl',function(commonService,$timeout){
        var info= this;
        info.paymentDetails = {};
        info.editDetails ={};
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
        $timeout(function() {
            commonService.getInformationDetails(info.paymentDetails)
        },1500)

        info.editDetails = commonService.detailsEdited();
        console.log(info.editDetails)

        // if(info.editDetails.details == true){
        //     info.paymentDetails = info.editDetails;
        //     console.log(info.paymentDetails) 
        // }




       })

     


})();