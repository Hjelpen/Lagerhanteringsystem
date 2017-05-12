(function () {
    "use strict";
    angular.module('App')
       .factory('articleService', ['$http', function ($http) {

           var articleServiceFactory = {};

           //skickar artikel objektet till webAPI som sparar ner i databasen.
           var _addArticle = function (component) {
               return $http.post('')
                   .then(function (response) {
                       return response;
                   });
           };

           //hämtar alla artiklar från databasen med webapi.
           var _getArticle = function () {
               return $http.get('')
                   .then(function (response) {
                       return response;
                   });
           }

           articleServiceFactory.getArticle = _getArticle;
           articleServiceFactory.addArticle = _addArticle;
           return articleServiceFactory;

       }]);
})();