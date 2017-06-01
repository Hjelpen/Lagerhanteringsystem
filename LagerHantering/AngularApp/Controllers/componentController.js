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

            $scope.totalprice = 0
               
           
            //Tar in användarens input från scope.component och skickar den vidare till componentService och funktionen addComponent
            //sen kallar på getAllComponents för att ladda om listan med alla komponenter.
            $scope.saveComponent = function () {
                componentService.addComponent($scope.component).then(function (response) {
                    $scope.component = undefined;
                    $scope.getAllComponents();
                    toastr.success('Komponent sparad')
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

                    for (var i = 0; i < $scope.components.length; i++) {
                        $scope.totalprice += ($scope.components[i].price * $scope.components[i].amount)
                    }
                },
                 function (response) {
                     (response)
                 });
            };                   
               
        }]);
})();