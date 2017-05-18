(function () {
    "use strict";
    angular.module('App')
       .factory('articleService', ['$http', function ($http) {

           var articleServiceFactory = {};

           //skickar artikel objektet till webAPI som sparar ner i databasen.
           var _addArticle = function (article) {
               return $http.post('http://localhost:45559/api/Articles', article)
                   .then(function (response) {
                       return response;
                   });
           };

           //hämtar alla artiklar från databasen med webapi.
           var _getArticles = function () {
               return $http.get('http://localhost:45559/api/Articles')
                   .then(function (response) {
                       return response;
                   });
           }

           articleServiceFactory.getArticles = _getArticles;
           articleServiceFactory.addArticle = _addArticle;
           return articleServiceFactory;

       }]);
})();