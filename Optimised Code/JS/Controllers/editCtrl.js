(function(){
   'use strict'
    angular.module('paymentMode')
    .controller('editWarningCtrl',['commonService','$uibModalInstance','$uibModalStack', function (commonService,$uibModalInstance,$uibModalStack) {
        
        var edc = {}
        edc.flag = {};
        
        //Not saving the details which are edited
        edc.discloseChanges = function(){
            $uibModalStack.dismissAll('closing'); 
            commonService.clearData();
        }

        //Continue with changes done for save the data
        edc.continuechanges = function(){
            $uibModalInstance.dismiss('cancel');
        }
        return edc;
    }])
})(); 