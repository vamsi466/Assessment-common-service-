(function(){

   'use strict'
    angular.module('paymentMode')

    //Using a factory for getting responseData from JSON's
    .factory('ajaxcallservice',['$http',function($http){
        return {
            getExpenditureDetails : function(JSONpath){
                return  $http.get(JSONpath).then(function(response){ 
                            return response.data; 
                        });
            }
        }
    }])
})();
