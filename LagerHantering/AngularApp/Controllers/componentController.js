(function () {
    angular.module('App')
        .controller('componentController', ['$scope', '$http', 'componentService', function ($scope, $http, componentService) {

            $scope.components = [];

            $scope.component = {
                Name: "",
                ArticleNumber: "",
                OrderTime: "",
                Amount: "",
                Price: "",
            };

            $scope.saveComponent = function () {
                componentService.addComponent($scope.component).then(function (response) {
                    $scope.component = undefined;
                    $scope.getAllComponents();
                },
                   function (response) {
                       (response)
                   });
            };

            $scope.getAllComponents = function () {
                componentService.getComponent().then(function (response) {
                    $scope.components = response.data
                },
                 function (response) {
                     (response)
                 });
            }
               
        }]);
})();