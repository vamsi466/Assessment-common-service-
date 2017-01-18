

(function(){ 
   'use strict'
    angular
    .module('paymentMode')
    .controller('mainPageController',['$uibModal','commonService', function ($uibModal,commonService) {
    var mp = this;
    mp.tableDetails={};

    /*
        This array for haiving different types of sessions in same modal which is achieved by iterating this 
    */
    mp.items = [{'header':'Payment Information','view':'Templates/paymentInformation.html','footer':'Templates/footer1.html'},{'header':'Payment Parameters','view':'Templates/paymentparams.html','footer':'Templates/footer2.html'}];
    mp.animationsEnabled = true;
    mp.editObj = {};
    mp.showData ={};
    mp.showData.flag = false;
    mp.editObj.showFlag = false;

    /*
        To open a data fields modal while click on ADD button  
    */
    mp.openModal = function (key,index) {
        mp.showData.flag= true;
        commonService.showDataInmodal(mp.showData)
           $uibModal.open({
                templateUrl: './Templates/start.html',
                controller: 'modalFormCtrl',
                controllerAs: 'vm',
                keyboard:false,
                backdrop : 'static',
                size: 'lg',
                resolve: {
                    items: function () {
                    return mp.items;
                    },
                    initialData : function(){
                    return {
                            key : key,
                            index : index
                        }
                    }
                }
            });
        }

    /*
        To open a delete modal to conifrming delete
    */
    mp.delete = function(key, index){
        $uibModal.open({
          templateUrl: './Templates/delete-modal.html',
          size : 'lg',
          keyboard:false,
          backdrop : 'static',
          controller: 'deleteCtrl',
          controllerAs: 'dc',
          resolve : {
            initialData : function(){
              return {
                key : key,
                index : index
              }
            }
            }
        });

      }
    
    //Get the table details from the service which is generated there
    mp.tableDetails = commonService.tableDetails;


    //Getting object/rowData from table to edit and to open a modal simultaneously
    mp.edit = function(key,index){
        mp.openModal(key,index)
        mp.editObj.showFlag = true;
        mp.editObj.key = key;
        mp.editObj.index = index;
        mp.editObj.data = mp.tableDetails[key][index]
        commonService.editDetailsData(mp.editObj)
    }

    }])
})();