(function () {
    angular.module('App')
        .controller('deliveryInController', ['$scope', '$http', 'componentService', function ($scope, $http, componentService) {

            //En Array som håller alla komponenter
            $scope.components = [];

            $scope.updateComponent = {
                quantity: "",
                id: ""
            };


            //Kallar på funktionen getComponent från componentService för att hämta alla komponenter,
            //sen fyller scope.components arrayn med datan den får tillbaka i svaret.
            $scope.getAllComponents = function () {
                componentService.getComponent().then(function (response) {
                    $scope.components = response.data
                },
                 function (response) {
                     (response)
                 });
            };

            $scope.UpdateQuantity = function () {
                componentService.UpdateQuantity($scope.Quantity).then(function (response) {
                 
                },
                   function (response) {
                       (response)
                   });
            };




            


        }]);
})();