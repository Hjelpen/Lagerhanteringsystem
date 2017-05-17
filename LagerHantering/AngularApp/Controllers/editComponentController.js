(function () {
    angular.module('App')
        .controller('editComponentController', ['$scope', '$http', 'componentService', '$routeParams', function ($scope, $http, componentService, $routeParams) {
            $scope.id = '';
            $scope.id = $routeParams.id;

            //håller användarens input från html fomuläret
            $scope.component = {
                Name: "",
                ArticleNumber: "",
                OrderTime: "",
                Amount: "",
                Price: "",
            };

            //Tar bort komponent vid knappklick från aktuella Idn för den komponent man trycker vid.
            $scope.deleteComponent = function (index) {
                if (confirm("Vill du ta bort denna komponenten?")) {
                    $http({
                        method: 'DELETE',
                        url: 'http://localhost:45559/api/Components/' + $scope.components[index].Id,
                    }).then(function successCallback(response) {
                        $scope.components.splice(index, 1);
                    }, function errorCallback(response) {
                        alert("Error : " + response.data.ExceptionMessage);
                    });
                }
            };

            $scope.editComponent = function () {
                {
                    componentService.getComponent($scope.id).then(function (response) {
                        $scope.component = response.data
                    });
                }
            };

        }]);
})();