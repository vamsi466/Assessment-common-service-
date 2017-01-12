(function(){

   'use strict'
    angular.module('paymentMode')
    .directive('paymentInfoTable',function(){
        return{
            restrict: 'E',
            templateUrl:'Templates/table.html'
        }
    })
})();
