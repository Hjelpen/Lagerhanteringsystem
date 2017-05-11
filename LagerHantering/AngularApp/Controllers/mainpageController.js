(function () {
    angular.module('App')
        .controller('mainpageController', ['$scope', '$http', function ($scope, $http) {


            $scope.component = {
                Name: "",
                ArticleNumber: "",
                OrderTime: "",
                Amount: "",
                Price: "",        
            };

            

            $scope.saveComponent = function (index) {
                $http({
                    method: 'POST',
                    url: 'http://localhost:45559/api/Components/PostComponent' + $scope.component,
                }).then(function successCallback(response) {
                    $scope.component = null;                   
                }, function errorCallback(response) {
                    alert("Error : " + response.data.ExceptionMessage);
                });
            };
                

        }]);
})();