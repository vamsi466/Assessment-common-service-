(function(){
   'use strict'
    angular.module('paymentMode')
    .controller('modalFormCtrl',['ajaxcallservice','commonService','$uibModalInstance','items','initialData',function(ajaxcallservice,commonService,$uibModalInstance,items,initialData){
            var vm = this;
            vm.tableDetails = {};
            vm.items = items;
            vm.selected = {
                item: vm.items[0]
            };
            var jsonFileNames = ['c_paymentType','l_AccountingType','c_frequecyType','l_PaymentTiming','l_PaymentDueDay','l_PaymentDueOn','l_GrowthType','l_ChargeAmountBasis'];
            var lengthOfFiles = jsonFileNames.length; 
           
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

            vm.next = function (informationData) {
                commonService.setInformationDetails()
                vm.selected = {
                    item: vm.items[1]
                };
            };

            vm.previous = function (informationData) {
                vm.selected = {
                    item: vm.items[0]
                };
            };
            vm.generateDatatoTable = function(){
                vm.tableDetails = commonService.generateData();
                // console.log(vm.tableDetails)
                $uibModalInstance.close();
            }
            // vm.cancel = function () {
            //     $uibModalInstance.dismiss('cancel');
            // };
            
            
            

        }])
    })();
   