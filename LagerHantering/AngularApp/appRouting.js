(function () {
    angular.module('App').
        config(function ($routeProvider, $locationProvider) {
            $locationProvider.hashPrefix('');

            $routeProvider.when("/login", {
                controller: "loginController",
                templateUrl: "/AngularApp/Views/login.html"
            });

            $routeProvider.when("/home", {
                controller: "homeController",
                templateUrl: "/AngularApp/Views/home.html"
            });

            $routeProvider.when("/register", {
                controller: "registerController",
                templateUrl: "/AngularApp/Views/register.html"
            });

            $routeProvider.when("/mainpage", {
                controller: "mainpageController",
                templateUrl: "/AngularApp/Views/mainpage.html"
            });

            $routeProvider.otherwise({ redirectTo: "/home" });

        });
})();