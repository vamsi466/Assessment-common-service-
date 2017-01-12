(function(){

   'use strict'
    angular.module('paymentMode')
    .controller('parameterCtrl',function(commonService,$timeout){
        var pm = this;
        pm.paymentDetails ={};
        pm.growthSelected = function(data){
            pm.paymentDetails.growthselectedData = data;
        }
        pm.chargeAmountSelected = function(data){
            pm.paymentDetails.chargeAmountselectedData = data;
        }
        $timeout(function() {
            commonService.getParamsDetails(pm.paymentDetails)},1500)
        })
})();