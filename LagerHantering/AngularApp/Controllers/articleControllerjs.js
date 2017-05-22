(function () {
    angular.module('App')
        .controller('articleController', ['$scope', '$http', 'componentService', 'articleService', '$location', function ($scope, $http, componentService, articleService, $location) {

            //scope.Components håller alla komponenter som kommer från databasen,
            //scope.selectedComponents håller tillfälligt de valda komponenter som ska sparas i en artikel.
            $scope.components = [];
            $scope.selectedComponents = [];
            $scope.articles = [];

            //sparar artikelns namn och listan med valda komponenter
            $scope.article = {
                Name: "",
                Components: $scope.selectedComponents
            };

            //Kallar på funktionen getComponent från componentService.js för att hämta alla komponenter,
            //sen fyller scope.components arrayn med datan den får tillbaka.
            $scope.getAllComponents = function () {
                componentService.getComponents().then(function (response) {
                    $scope.components = response.data
                },
                 function (response) {
                     (response)
                 });
            };

            //sparar valda komponenter i en tillfällig array 'scope.selectedComponents' 
            $scope.saveComponent = function () {
                $scope.selectedComponents.push($scope.selectedOption)
                console.log($scope.selectedComponents);
            };


            //tar bort en komponent från den tillfälliga arrayn 'scope.selectedComponents'
            $scope.deleteSelectedComponent = function (item) {
                var index = $scope.selectedComponents.indexOf(item);
                $scope.selectedComponents.splice(index, 1);
                console.log($scope.selectedComponents);
            };

            //sparar artiklen, skickar den vidare till funktionen addArticle i articleService.js. Sen rensar scope article och selectedComponents
            $scope.saveArticle = function () {
                articleService.addArticle($scope.article).then(function (response) {
                    $scope.getAllArticles();                    
                },
                function (response) {
                    response
                });
            };
          
            $scope.getAllArticles = function () {
                articleService.getArticles().then(function (response) {
                    $scope.articles = response.data
                });
            };
            
        }]);
})();