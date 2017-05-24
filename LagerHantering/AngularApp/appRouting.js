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

            $routeProvider.when("/component", {
                controller: "componentController",
                templateUrl: "/AngularApp/Views/component.html"
            });

            $routeProvider.when("/article", {
                controller: "articleController",
                templateUrl: "/AngularApp/Views/article.html"
            });

            $routeProvider.when("/componentEdit/:componentId", {
                controller: "editComponentController",
                templateUrl: "/AngularApp/Views/editComponent.html"
            });

            $routeProvider.when("/articleoutbound", {
                controller: "articleOutBoundController",
                templateUrl: "/AngularApp/Views/articleOutBound.html"
            });

            $routeProvider.when("/statistik", {
                controller: "statisticController",
                templateUrl: "/AngularApp/Views/statistik.html"
            });

            $routeProvider.when("/articleEdit/:id", {
                controller: "editArticleController",
                templateUrl: "/AngularApp/Views/editArticle.html"
            });

            $routeProvider.otherwise({ redirectTo: "/home" });

        });
})();