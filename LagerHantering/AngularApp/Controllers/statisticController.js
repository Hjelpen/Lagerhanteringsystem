﻿(function () {
    angular.module('App')
        .controller('statisticController', ['$scope', '$http', 'statisticService', function ($scope, $http, statisticService) {

            $scope.orders = [];
            $scope.receipts = [];



            $scope.getAllOrders = function () {
                statisticService.getOrders().then(function (response) {
                    $scope.orders = response.data
                },
                 function (response) {
                     (response)
                 });
            };

            $scope.getAllReceipts = function () {
                statisticService.getReceipt().then(function (response) {
                    $scope.receipts = response.data
                },
                 function (response) {
                     (response)
                 });
            };



        }]);
})();