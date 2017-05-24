(function () {
    angular.module('App')
        .controller('componentController', ['$scope', '$http', 'componentService', function ($scope, $http, componentService) {

            //En Array som håller alla komponenter
            $scope.components = [];

            //håller användarens input från html fomuläret
            $scope.component = {
                Name: "",
                ArticleNumber: "",
                OrderTime: "",
                Amount: "",
                Price: "",
            };

            //Tar in användarens input från scope.component och skickar den vidare till componentService och funktionen addComponent
            //sen kallar på getAllComponents för att ladda om listan med alla komponenter.
            $scope.saveComponent = function () {
                componentService.addComponent($scope.component).then(function (response) {
                    $scope.component = undefined;
                    $scope.getAllComponents();
                },
                   function (response) {
                       (response)
                   });
            };

            //Kallar på funktionen getComponent från componentService för att hämta alla komponenter,
            //sen fyller scope.components arrayn med datan den får tillbaka i svaret.
            $scope.getAllComponents = function () {
                componentService.getComponents().then(function (response) {
                    $scope.components = response.data
                },
                 function (response) {
                     (response)
                 });
            };

            //Tar bort komponent, skickar objektets id till controllern api som tar bort den fårn databasen.
            $scope.deleteComponent = function (index) {
                if (confirm("Vill du ta bort komponenten" + " " + $scope.components[index].name)) {
                    $http({
                        method: 'DELETE',
                        url: 'http://localhost:45559/api/Components/' + $scope.components[index].id,
                    }).then(function successCallback(response) {
                        $scope.components.splice(index, 1);
                    }, function errorCallback(response) {
                        alert("Error : " + response.data.ExceptionMessage);
                    });
                }
            };
                   
               
        }]);
})();