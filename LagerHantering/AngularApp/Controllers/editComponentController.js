(function () {
    angular.module('App')
        .controller('editComponentController', ['$scope', '$http', 'componentService', '$routeParams', function ($scope, $http, componentService, $routeParams) {
            $scope.id = '',
            $scope.id = $routeParams.componentId;

            //håller användarens input från html fomuläret
            $scope.component = {
                Name: "",
                ArticleNumber: "",
                OrderTime: "",
                Amount: "",
                Price: "",
            };



            $scope.editComponent = function () {
                componentService.getComponent($scope.id).then(function (response) {
                    $scope.component = response.data
                });
            };


            $scope.Update = {
                amount: ""
            }

            $scope.updateInvFunction = function () {
                $http.put('http://localhost:45559/api/components/editcomponent?id=' + $scope.id + '&amount=' + $scope.Update.amount)
                        .then(function (response) {
                            $scope.editComponent();
                            return response;
                        });
            }

        }]);
})();