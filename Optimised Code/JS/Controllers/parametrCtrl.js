(function(){
 
   'use strict'
    angular.module('paymentMode')
    .controller('parameterCtrl',function(commonService,$timeout){
            var pm = this;
            pm.paymentDetails ={};

            //Taking the keys with values as empty string for validations
            pm.paymentDetails = {'chargeAmountselectedData':''}
            pm.showData = {};

             //showData is for having values which are selected during navigation also 
            pm.showData = commonService.showDataModal();

            /*
              This is to have payment details which are selected while navigation in their respective fields

              Generating empty fields while initializing modal by click on ADD
            */
            pm.paymentDetails = (pm.showData.flag ==='true')?{}:commonService.finalGeneratedData;
            pm.editObj ={};


            //Getting all the details while click on list of options and displaying in input field
            pm.growthSelected = function(data){
                pm.paymentDetails.growthselectedData = data;
            }
            pm.chargeAmountSelected = function(data){
                pm.paymentDetails.chargeAmountselectedData = data;
            }

             //Reason for this not having an error if the data is delayed and for not generating empty data
            $timeout(function() {
                commonService.getParamsDetails(pm.paymentDetails)
            },1500)

            //Getting the object of details which are to be editted
            pm.editObj = commonService.detailsEdited();

            //Placing details into their respective fields while doing an edit
            if(pm.editObj.showFlag == true){
                pm.paymentDetails = pm.editObj.data;
            }
        })
})();