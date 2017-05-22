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

            //ändrar hela antalet på en komponent
            $scope.updateInvFunction = function () {
                if (confirm("Vill du ändra antalet komponenter på " + $scope.component.name + " till " + $scope.Update.amount)) {
                    $http.put('http://localhost:45559/api/components/editcomponent?id=' + $scope.id + '&amount=' + $scope.Update.amount)
                    .then(function (response) {
                        $scope.editComponent();
                        $scope.Update.amount = "";
                        return response;
                    });
                }};

            //plussar på ett värde på en komponents mängd
            $scope.addComponentAmount = function () {
                if (confirm("Vill du lägga till antalet " + $scope.Update.amount + " till komponenten " + $scope.component.name)) {
                    $http.put('http://localhost:45559/api/components/AddAmountComponent?id=' + $scope.id + '&amount=' + $scope.Update.amount)
                     .then(function (response) {
                         $scope.editComponent();
                         $scope.Update.amount = "";
                         return response;
                     });
                }
            };


        }]);
})();