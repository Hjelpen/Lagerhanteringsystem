﻿(function () {
    angular.module('App')
        .controller('editComponentController', ['$scope', '$http', 'componentService', '$routeParams', '$location', function ($scope, $http, componentService, $routeParams, $location) {
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
                    console.log(response)
                });
            };


            $scope.Update = {
                amount: ""
            }

            $scope.updatecomponent = {
                orderTime: "",
                price: "",
                name: "",
                articleNumber: ""
            }

            $scope.Update.amount = 1;


            //ändrar hela antalet på en komponent
            $scope.updateInvFunction = function () {
                if (confirm("Vill du ändra antalet komponenter på " + $scope.component.name + " till " + $scope.Update.amount)) {
                    $http.put('http://localhost:45559/api/components/editcomponent?id=' + $scope.id + '&amount=' + $scope.Update.amount)
                    .then(function (response) {
                        toastr.success("Lagerstatus på " + $scope.component.name + " ändrad till " + $scope.Update.amount);
                        $scope.editComponent();
                        $scope.Update.amount = 1;                     
                    }, function errorCallback(response) {                
                        toastr.error('Ange ett antal att skicka in');                                             
                    });
                }};

            //plussar på ett värde på en komponents mängd
            $scope.addComponentAmount = function () {
                if (confirm("Vill du lägga till antalet " + $scope.Update.amount + " till komponenten " + $scope.component.name)) {
                    $http.put('http://localhost:45559/api/components/AddAmountComponent?id=' + $scope.id + '&amount=' + $scope.Update.amount)
                     .then(function (response) {

                         toastr.success($scope.Update.amount + " har lagts till på " + $scope.component.name);
                         $scope.editComponent();
                         $scope.Update.amount = 1;

                     }, function errorCallback(response) {                
                             toastr.error('Ange ett antal att skicka in');                           
                     });
                }
            };

            //Tar bort komponent, skickar objektets id till controllern api som tar bort den från databasen.
            $scope.deleteComponent = function () {
                if (confirm("Vill du ta bort komponenten " + $scope.component.name + " ?")) {
                    $http({
                        method: 'DELETE',
                        url: 'http://localhost:45559/api/Components/DeleteComponent/' + $scope.id,
                    }).then(function successCallback(response) {
                        $location.path('/component');
                    }, function errorCallback(response) {
                        alert("Error : " + response.data.ExceptionMessage);
                    });
                }
            };


           //Uppdaterar komponent
            $scope.updateComponent = function () {

                $http.put('http://localhost:45559/api/components/UpdateComponent?id=' + $scope.id
                    + '&ordertime=' + $scope.updatecomponent.orderTime
                    + '&price=' + $scope.updatecomponent.price
                    + '&name=' + $scope.updatecomponent.name
                    + '&articlenumber=' + $scope.updatecomponent.articleNumber )
                    .then(function (response) {
                        toastr.success("Komponent ändrad");

                        console.log($scope.updatecomponent.orderTime)

                        $scope.editComponent();
                    }, function errorCallback(response) {
                        toastr.error('Fel!');
                    });              
            };


        }]);
})();