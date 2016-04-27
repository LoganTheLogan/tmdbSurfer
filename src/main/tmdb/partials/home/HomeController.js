
define( [ 'angular',
          'config/config',
          'tmdb/services/TMDBAPIService'],
    function( angular, config, TMDBAPIService ) {
        "use strict";

        var HomeController = function($scope, TMDBAPIService, $timeout, $window ) {

            $scope.chosenItem = undefined;
            
            $scope.setItem = function(item) {
                $scope.chosenItem = item;
            };
            
            angular.element($window).bind('resize', function(){
                $scope.$broadcast('layoutChange');
            });
            
            $scope.resultsChanged = function() {
                $timeout(function() {   //timeout to give dom time to be constructed so height can be measured
                    $scope.$broadcast('layoutChange');
                });
            };
            
            $scope.$on('navToItem', function(event, item) {
                $scope.chosenItem = item;
            });
        };

        HomeController.$inject = [ '$scope', 'TMDBAPIService', '$timeout', '$window' ];

        return HomeController;
    }
);