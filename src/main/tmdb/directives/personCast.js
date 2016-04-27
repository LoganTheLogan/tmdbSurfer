
define( [ 'angular',
          'tmdb/partials/remoteImageLoader/ImageController'], 
    function( angular, ImageController ) {
        "use strict";

        return function() {
            return {
                transclude: true,
                replace: true,
                controller: ImageController,
                templateUrl: '/tmdb/partials/person/cast.html',
                restrict: 'E',
                scope: {
                    personName: '=',
                    castCredits: '='
                },
                link: function($scope, element) {
                
                    function setDivHeight() { 
                        $scope.utilsInstance.extendToLowWindowEdge(element.find('#cast-movies'));
                    }
                    
                    $scope.$on('layoutChange', setDivHeight);
                }
            };
        };
    }
);