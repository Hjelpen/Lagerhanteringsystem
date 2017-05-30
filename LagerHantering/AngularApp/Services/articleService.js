(function () {
    "use strict";
    angular.module('App')
       .factory('articleService', ['$http', function ($http) {

           var articleServiceFactory = {};

           //skickar artikel objektet till webAPI som sparar ner i databasen.
           var _addArticle = function (article) {
               return $http.post('http://localhost:45559/api/Articles/PostArticle', article)
                   .then(function (response) {
                       return response;
                   });
           };

           //hämtar alla artiklar från databasen med webapi.
           var _getArticles = function () {
               return $http.get('http://localhost:45559/api/Articles/GetArticles')
                   .then(function (response) {
                       return response;
                   });
           }

           var _getComponentsByArticle = function (id) {
               return $http.get('http://localhost:45559/api/Articles/GetComponentsByArticle/?id=' + id)
                   .then(function (response) {
                       return response;
                   });
           }



           var _getArticle = function (id) {
               return $http.get('http://localhost:45559/api/Articles/GetArticle/?id=' + id)
                   .then(function (response) {
                       return response;
                   });
           }

           articleServiceFactory.getArticles = _getArticles;
           articleServiceFactory.addArticle = _addArticle;
           articleServiceFactory.getComponentsByArticle = _getComponentsByArticle
           articleServiceFactory.getArticle = _getArticle
           return articleServiceFactory;

       }]);
})();