(function () {
    angular.module('App', ['ngRoute', 'LocalStorageModule']);

    angular.module('App').run(['loginService', function (loginService) {
        loginService.fillAuthData();
    }]);

    angular.module('App').config(function ($httpProvider) {
        $httpProvider.interceptors.push('authInterceptorService');
    });
})();