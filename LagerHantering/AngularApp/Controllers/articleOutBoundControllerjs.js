(function () {
    angular.module('App')
        .controller('articleOutBoundController', ['$scope', '$http', 'componentService', 'articleService', '$location', function ($scope, $http, componentService, articleService, $location) {

            $scope.articles = [];

            $scope.article = {
                id: "",
                amount: ""
            };


            var select = $scope.selectedArticle;

            $scope.getallArticles = function () {
                articleService.getArticles().then(function (response) {
                    $scope.articles = response.data
                    console.log($scope.articles)
                });
            };

            $scope.articleOutBounds = function () {
                $http.put('http://localhost:45559/api/articles/putarticle?id=' + $scope.article.id + '&amount=' + $scope.article.amount)
                  .then(function (response) {
                      return response;
                  });
            };

        }]);
})();