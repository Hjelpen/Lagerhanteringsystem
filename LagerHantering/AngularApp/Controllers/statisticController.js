(function () {
    angular.module('App')
        .controller('statisticController', ['$scope', '$http', 'statisticService', function ($scope, $http, statisticService) {

            $scope.orders = [];
            $scope.receipts = [];



            $scope.getAllOrders = function () {
                statisticService.getOrders().then(function (response) {
                    $scope.orders = response.data
                });
            };



            $scope.changeinvoiceSent = function (id) {
                $http.post('http://localhost:45559/api/Statistic/UpdateInvoice?id=' + id)
                    .then(function (response) {
                        toastr.success('Fakturering uppdaterad!');
                        $scope.getAllOrders();
                    })
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

