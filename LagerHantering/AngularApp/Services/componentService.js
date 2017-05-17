(function () {
    "use strict";
    angular.module('App')
       .factory('componentService', ['$http', function ($http) {

           var componentServiceFactory = {};

           //Skickar component objekten som kommer in från componentController vidare till ComponentsController API.
           var _addComponent = function (component) {
               return $http.post('http://localhost:45559/api/Components', component)
                   .then(function (response) {
                       return response;
                   });
           };

           //Kör en get till ComponentsController API för att hämta alla komponenter som finns i databasen.
           var _getComponents = function () {
               return $http.get('http://localhost:45559/api/Components')
                   .then(function (response) {
                       return response;
                   });
           };
           var _UpdateQuantity = function (Quantity) {
               return $http.put('http://localhost:45559/api/Components', Quantity)
                   .then(function (response) {
                       return response;
                   });
           };

           var _getComponent = function (id) {
               return $http.get('http://localhost:45559/api/Components/getComponent/?id=' + id)
                   .then(function (response) {
                       return response;
                   });
           }
           componentServiceFactory.UpdateQuantity = _UpdateQuantity;
           componentServiceFactory.getComponents = _getComponents;
           componentServiceFactory.addComponent = _addComponent;
           componentServiceFactory.getComponent = _getComponent;
           return componentServiceFactory;




       }]);
})();