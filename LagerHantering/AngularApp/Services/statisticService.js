(function () {
    "use strict";
    angular.module('App')
       .factory('statisticService', ['$http', function ($http) {

           var statisticServiceFactory = {};

           var _getOrders = function () {
               return $http.get('http://localhost:45559/api/Statistic/GetOrders')
                   .then(function (response) {
                       return response;
                   });
           };

           var _getReceipt = function () {
               return $http.get('http://localhost:45559/api/Statistic/GetReceipts')
                   .then(function (response) {
                       return response;
                   });
           };

           statisticServiceFactory.getOrders = _getOrders;
           statisticServiceFactory.getReceipt = _getReceipt;
           return statisticServiceFactory;

       }]);
})();