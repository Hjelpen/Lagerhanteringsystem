(function () {
    angular.module('App')
        .controller('editArticleController', ['$scope', '$http', 'articleService', '$routeParams', '$location', function ($scope, $http, articleService, $routeParams, $location) {
            $scope.id = '',
            $scope.id = $routeParams.id;

            $scope.components = [];
            $scope.article = [];

            $scope.getComponentsByArticle = function () {
                articleService.getComponentsByArticle($scope.id).then(function (response) {
                    $scope.components = response.data
                    $scope.Article();
                });

              
            };

            $scope.Article = function () {
                articleService.getArticle($scope.id).then(function (response) {
                    $scope.article = response.data
                });
            };

            $scope.deleteArticle = function () {
                if (confirm("Vill du ta bort artikeln?")) {
                    $http({
                        method: 'DELETE',
                        url: 'http://localhost:45559/api/Articles/DeleteArticle/' + $scope.id,
                    }).then(function successCallback(response) {
                        $location.path('/article');
                    }, function errorCallback(response) {
                        alert("Error : " + response.data.ExceptionMessage);
                    });
                }
            };

        }]);
})();