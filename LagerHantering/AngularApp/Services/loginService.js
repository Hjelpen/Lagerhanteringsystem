﻿(function () {
    "use strict";
    angular.module('App')
      .factory('loginService', ['$http', '$q', 'localStorageService', function ($http, $q, localStorageService) {

          var loginServiceFactory = {};
          var token = "";

          var _authentication = {
              isAuth: false,
              userName: ""
          };

          var _login = function (loginData) {

              var data = "grant_type=password&username=" + loginData.userName + "&password=" + loginData.password;

              var deferred = $q.defer();

              $http.post('http://localhost:45559/' + 'token', data, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }).then(function (response) {

                  localStorageService.set('authorizationData', { token: response.data.access_token });

                  _authentication.isAuth = true;
                  _authentication.userName = loginData.userName;

                  deferred.resolve(response);

              }),
              function (err, status) {
                  _logOut();
                  deferred.reject(err);
              };

              return deferred.promise;

          };

          var _fillAuthData = function () {

              var authData = localStorageService.get('authorizationData');
              if (authData) {
                  _authentication.isAuth = true;
                  _authentication.userName = authData.userName;
              }

          }

          var _logOut = function () {

              localStorageService.remove('authorizationData');

              _authentication.isAuth = false;
              _authentication.userName = "";

          };

          loginServiceFactory.logOut = _logOut
          loginServiceFactory.login = _login;
          loginServiceFactory.fillAuthData = _fillAuthData;
          loginServiceFactory.authentication = _authentication;

          return loginServiceFactory;

      }]);
})();