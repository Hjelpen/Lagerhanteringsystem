(function () {
    angular.module('App')
        .controller('articleOutBoundController', ['$scope', '$http', 'componentService', 'articleService', '$location', '$timeout', function ($scope, $http, componentService, articleService, $location, $timeout) {

            $scope.articles = [];

            $scope.article = {
                id: "",
                amount: "",
                comment: "",
                invoiceSent: false
            };


            var select = $scope.selectedArticle;

            $scope.getallArticles = function () {
                articleService.getArticles().then(function (response) {
                    $scope.articles = response.data
                    console.log($scope.articles)
                });
            };

            $scope.articleOutBounds = function () {
                $http.put('http://localhost:45559/api/articles/putarticle?id=' + $scope.article.id + '&amount=' + $scope.article.amount + '&comment=' + $scope.article.comment + '&invoiceSent=' + $scope.article.invoiceSent)
                  .then(function (response) {
                      $scope.message = "artikeln har skickats med antalet " + $scope.article.amount;
                      startTimer();

                      $scope.article.id = ""
                      $scope.article.amount = ""
                      $scope.article.comment = ""
                      $scope.article.invoiceSent = false;
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