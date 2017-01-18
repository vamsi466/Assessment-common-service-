(function(){
  'use strict';

  angular 
    .module('paymentMode')
    .controller('deleteCtrl',['commonService','initialData','$uibModalInstance',function(commonService,initialData,$uibModalInstance){
      var deleteModalScope = {};

      /*
        Confirmation of delete is done in this
      */

      //To cancel the deleting of an object
      deleteModalScope.cancelDel = function(){
        $uibModalInstance.close();
      }

      /*
        Confirming the delete and delete the respective rowData from table
        
        If complete data of particular paymentTYpe is deleted then that paymentType object is deleted
      */

      deleteModalScope.confirmDel = function(){
        commonService.tableDetails[initialData.key].splice(initialData.index,1);
        if(commonService.tableDetails[initialData.key].length==0){ 
                delete commonService.tableDetails[initialData.key];
            }
        $uibModalInstance.close();
      }
      return deleteModalScope;
    }])
})();

