(function () {
    "use strict";
    angular.module('App')
       .factory('componentService', ['$http', function ($http) {

           var componentServiceFactory = {};

           //Skickar component objekten som kommer in från componentController vidare till ComponentsController API,
           //sparar en ny komponent i databasen.
           var _addComponent = function (component) {
               return $http.post('http://localhost:45559/api/Components', component)
                   .then(function (response) {
                       return response;
                   });
           };

           //Kör en get till ComponentsController API för att hämta alla komponenter som finns i databasen och retunera datan till controllern.
           var _getComponent = function () {
               return $http.get('http://localhost:45559/api/Components')
                   .then(function (response) {
                       return response;
                   });
           }

           componentServiceFactory.getComponent = _getComponent;
           componentServiceFactory.addComponent = _addComponent;
           return componentServiceFactory;

       }]);
})();