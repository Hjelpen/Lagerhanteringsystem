(function () {
    angular.module('App')
        .controller('articleOutBoundController', ['$scope', '$http', 'componentService', 'articleService', '$location', function ($scope, $http, componentService, articleService, $location) {

            $scope.articles = [];

            $scope.articleOutBound = {
                id: "",
                amount: ""
            };


            var select = $scope.selectedArticle;

            $scope.getallArticles = function () {
                articleService.getArticles().then(function (response) {
                    $scope.articles = response.data
                });
            };

            $scope.articleOutBound = function () {
                $http.put('http://localhost:45559/api/articles/putarticle?id=' + $scope.articleOutBound.id + '&amount=' + $scope.articleOutBound.amount)
                  .then(function (response) {
                      return response;
                  });
            };

        }]);
})();