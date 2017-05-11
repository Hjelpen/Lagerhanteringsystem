(function () {
    "use strict";
    angular.module('App')
        .controller('registerController', ['$scope', '$location', '$timeout', 'registerService', function ($scope, $location, $timeout, registerService) {

            $scope.savedSuccessfully = false;
            $scope.message = "";

            $scope.registration = {
                userName: "",
                password: "",
                confirmPassword: ""
            };

            $scope.register = function () {

                registerService.saveRegistration($scope.registration).then(function (response) {

                    $scope.savedSuccessfully = true;
                    $scope.message = "användare " + $scope.registration.userName + " har blivit registrerad.";
                    startTimer();

                },
                 function (response) {
                     var errors = [];
                     for (var key in response.data.modelState) {
                         for (var i = 0; i < response.data.modelState[key].length; i++) {
                             errors.push(response.data.modelState[key][i]);
                         }
                     }
                     $scope.message = "Misslyckades att registrera ny användare på grund av:" + errors.join(' ');
                 });
            };

            var startTimer = function () {
                var timer = $timeout(function () {
                    $timeout.cancel(timer);
                    $scope.message = "";
                }, 3000);
            }
        }]);
})();