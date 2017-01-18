(function(){
   'use strict'
    angular.module('paymentMode')
    .controller('modalFormCtrl',['ajaxcallservice','commonService','$uibModalInstance','items','initialData','$uibModal',function(ajaxcallservice,commonService,$uibModalInstance,items,initialData,$uibModal){
            var vm = this;
        
            vm.tableDetails = {};

            //This was taken to show fields with repsect to condition of OTHER as frequencyData
            vm.showComponents = true
            vm.items = items;
            vm.errorMessage ={};

            /*Initially getting the paymentInformation panel on a click on add button*/
            vm.selected = { 
                item: vm.items[0]
            };

            /* These are the file names of the JSON what we had taken*/
            var jsonFileNames = ['c_paymentType','l_AccountingType','c_frequecyType','l_PaymentTiming','l_PaymentDueDay','l_PaymentDueOn','l_GrowthType','l_ChargeAmountBasis'];
            var lengthOfFiles = jsonFileNames.length; 
            
           /* 
              Getting response data from JSON based on the file type
           
              Here we are making an AJAX Call from the 'ajaxcallservice' 
           */
            vm.responseData = {};
            for(var keyValue = 0;keyValue<lengthOfFiles;keyValue++){
                (function(fileName){
                 
                    ajaxcallservice.getExpenditureDetails("JSON/"+jsonFileNames[fileName]+".JSON").then(function(response){
                      
                        var details=[];
                        vm.responseData[jsonFileNames[fileName]] = [];
                        var responseLength = response.length;
                        if(jsonFileNames[fileName].charAt(0) === "c" ){
                           
                            for(var jsonVal=0;jsonVal<response.length;jsonVal++){
                                var array = [];
                                array = (response[jsonVal].path).split("\\");
                                vm.responseData[jsonFileNames[fileName]].push(array[array.length - 1]);
                            }
                        }else if(jsonFileNames[fileName].charAt(0)=== "l"){
                             for(var jsonVal=0;jsonVal<response.result.length;jsonVal++){
                                vm.responseData[jsonFileNames[fileName]].push(response.result[jsonVal].value);
                            }
                        
                        }
                       

                    });
                })(keyValue);
            }
            /* 
               vm.next is the function for navigating from one panel to next panel
            
               Before navigating we should have a check through respective field
               validations with respect to conditions given to the fields
            */
            vm.next = function (informationData) {
                var fieldsToValidate = ["paymentvalue","selectedaccountingData","selectedfrequencyData","paymentStart","selectedpaymenttimingData","selectedpaymentdueonData","selectedpaymentduedayData"];
                if(commonService.finalGeneratedData.selectedfrequencyData === 'Other'){
                    var removedFields = fieldsToValidate.splice('5',2);
                    delete fieldsToValidate[removedFields[0]];
                    delete fieldsToValidate[removedFields[1]];
                }else if(commonService.finalGeneratedData.selectedfrequencyData === 'Monthly'){
                    var removedFields = fieldsToValidate.splice('5',1);
                    delete fieldsToValidate[removedFields[0]];
                }else if(commonService.finalGeneratedData.selectedpaymentdueonData !== 'Specific Day of Period' && commonService.setDetails.selectedpaymentdueonData != undefined){
                    var removedFields = fieldsToValidate.splice('6',1);
                    delete fieldsToValidate[removedFields[0]];
                }
                var initialValidationFlag = true;
                commonService.setInformationDetails()
                var validateTheFields = commonService.validationFunction(fieldsToValidate)
                initialValidationFlag = validateTheFields.flag
                vm.errorMessage = validateTheFields.errorMessage
                if(initialValidationFlag == true){
                    vm.selected = {
                        item: vm.items[1]
                    }
                } 
                if(commonService.setDetails.selectedfrequencyData === 'Other'){
                    vm.showComponents = false
                }else{
                    vm.showComponents = true;
                }
            };


            /*
              previous button function is to navigate to backward with respect to panels
            */
            vm.previous = function (informationData) {
                vm.selected = {
                    item: vm.items[0]
                };
            };


            /*
              To generate data what we want, which have been selected in their respective fields

              Closing modal after the completion of validation 
            */
            vm.generateDatatoTable = function(){
                vm.tableDetails = commonService.generateData();
                vm.errorMessage =commonService.validatingFields.errorMessage;
                if(commonService.validatingFields.flag){
                     $uibModalInstance.close();
                }   
            }

            //Getting the object of the details which are edited
            vm.editDetails = commonService.detailsEdited();
            vm.showSaveButton = (vm.editDetails.showFlag == true)?true:false;


            //To save the ditted details and closing the modal
            vm.saveEdited=function(){
                commonService.editSaved();
                $uibModalInstance.close();
            }

            //Closing the modal which opened while add data by clicking on 'X' button
            vm.closeModal = function(){
                $uibModalInstance.close();
            }

            /*
            This is the modal which is opened when the data is not saved and 
            edit modal is closed

            Edit confirmation details are opened in this            
            
            */
            vm.editconfirm = function(){
                $uibModal.open({
                    templateUrl: './Templates/warning-modal.html',
                    size : 'lg',
                    keyboard:false,
                    backdrop : 'static',
                    controller: 'editWarningCtrl',
                    controllerAs: 'edc'
                });
            }
        }])
    })();
   