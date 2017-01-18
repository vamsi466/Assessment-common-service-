(function(){

   'use strict'
    angular.module('paymentMode')
    .directive('dropDown',function(){
        return{
            restrict: 'E',
            scope:{

                //Isolating the scope and getting only options and selected option
                options:'=',
                selectedOption:'='
            },
            templateUrl:'Templates/dropDown.html',
            link : function(scope){

             //Displaying the option selected from list in the input box 
              scope.selecting = function(option){
                scope.selectedOption = option;
              }
            }
        }
    })
})();