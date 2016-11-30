var myApp = angular.module('myApp', ['ngCookies', 'ngResource'],function($interpolateProvider) {
    $interpolateProvider.startSymbol('[[[');
    $interpolateProvider.endSymbol(']]]');
});
myApp.filter("sanitize", ['$sce', function($sce) {
  return function(htmlCode){
    return $sce.trustAsHtml(htmlCode);
};
}]);
myApp.config(['$httpProvider', function($httpProvider){
    $httpProvider.defaults.xsrfCookieName = 'csrftoken';
    $httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';
}]);


myApp.controller('mainController', ['$scope', '$http', '$cookies', function($scope, $http, $cookies) {
     $scope.textarea4selection = "";
     $scope.textselection="";
    $scope.$watch('textselection', function(newValue, oldValue){

                    // console.info('Change!');
                    // console.log("Old:"+ oldValue);
                    // console.log("New:" + newValue);
                var in_data = {'word': newValue};
                var req = {
                     method: 'POST',
                     url: '/get_words/',
                     data: in_data
                 };

                    $http(req).success(function(data, status, headers, config) {
                    $scope.key = Object.keys(data)[0];
			        $scope.message = data[$scope.key];
                    // console.log(data);
		              });


                });
  $scope.$watch('textarea4selection', function(newValue, oldValue){

                  // console.info('Change!');
                  // console.log("Old:"+ oldValue);
                  // console.log("New:" + newValue);
              var in_data = {'para': newValue};
              var req = {
                   method: 'POST',
                   url: '/get_markdown/',
                   data: in_data
               };

                  $http(req).success(function(data, status, headers, config) {
                    paragraph = Object.keys(data)[0];
            $scope.changemarkdown = data[paragraph];
                // console.log(data[paragraph]);
                //  console.log(paragraph);
                //   console.log(data);
                });


              });








  console.log("hello world");

}]);

myApp.controller('secondController', ['$scope', function($scope){
    $scope.name = "Second";
}]);

myApp.directive("findword", function(){
    return {
        link: function(scope,elem,attrs){
            // console.log(elem);
            // console.log($(elem).textrange());
            // console.log(scope);
            // console.log(attrs);
            $(elem).select(function() {


               scope.textselection = $(elem).textrange().text;
            // console.log(scope);
               scope.$apply();

            // console.log($(elem).textrange());

                });


            }};

        });
myApp.directive('elastic', [
    '$timeout',
    function($timeout) {
        return {
            restrict: 'A',
            link: function($scope, element) {
                $scope.initialHeight = $scope.initialHeight || element[0].style.height;
                var resize = function() {
                    element[0].style.height = $scope.initialHeight;
                    element[0].style.height = "" + element[0].scrollHeight + "px";
                };
                element.on("input change", resize);
                $timeout(resize, 0);
            }
        };
    }
]);
