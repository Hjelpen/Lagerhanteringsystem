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

            $scope.article.amount = 1;

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
           
                      toastr.success('Leverans skickad!');
                      $scope.article.id = ""
                      $scope.article.amount = ""
                      $scope.article.comment = ""
                      $scope.article.invoiceSent = false;
                      $scope.article.amount = 1;

                      startTimer();

                  }, function errorCallback(response) {
                     
                      if ($scope.article.id == 0)
                      {
                          toastr.error('Välj en artikel');
                      }
                      else
                      {
                          toastr.error('Det finns inte tillräckligt med komponenter på lagret för denna utleverans');
                      }
                       
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