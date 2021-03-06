﻿(function () {
    "use strict";
    angular.module('App')
       .factory('componentService', ['$http', function ($http) {

           var componentServiceFactory = {};

           //Skickar component objekten som kommer in från componentController vidare till ComponentsController API,
           //sparar en ny komponent i databasen.
           var _addComponent = function (component) {
               return $http.post('http://localhost:45559/api/Components/PostComponent', component)
                   .then(function (response) {
                       return response;
                   });
           };

           //Kör en get till ComponentsController API för att hämta alla komponenter som finns i databasen.
           var _getComponents = function () {
               return $http.get('http://localhost:45559/api/Components/GetComponents')
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




           componentServiceFactory.getComponents = _getComponents;
           componentServiceFactory.addComponent = _addComponent;
           componentServiceFactory.getComponent = _getComponent;


           return componentServiceFactory;






       }]);
})();