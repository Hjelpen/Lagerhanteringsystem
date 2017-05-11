(function () {
    "use strict";
    angular.module('App')
       .factory('componentService', ['$http', function ($http) {

           var componentServiceFactory = {};

           var _addComponent = function (component) {

               return $http.post('http://localhost:45559/api/Components', component)
                   .then(function (response) {
                       return response;
                   });
           };

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