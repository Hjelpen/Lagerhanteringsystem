(function () {
    "use strict";
    angular.module('App')
       .factory('registerService', ['$http', function ($http) {

           var registerServiceFactory = {};

           var _saveRegistration = function (registration) {

               return $http.post('http://localhost:45559/api/account/register', registration)
                   .then(function (response) {
                       return response;
                   });
           };

           registerServiceFactory.saveRegistration = _saveRegistration;
           return registerServiceFactory;

       }]);
})();