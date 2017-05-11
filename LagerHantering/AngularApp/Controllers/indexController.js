(function () {
    angular.module('App')
        .controller('indexController', ['$scope', '$location', 'loginService', function ($scope, $location, loginService) {

            $scope.logOut = function () {
                loginService.logOut();
                $location.path('/home');
            }

            $scope.authentication = loginService.authentication;

        }]);
})();