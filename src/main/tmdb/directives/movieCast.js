
define( [ 'angular',
          'tmdb/partials/remoteImageLoader/ImageController' ], 
    function( angular, ImageController ) {
        "use strict";

        return function() {
            return {
                transclude: true,
                replace: true,
                controller: ImageController,
                templateUrl: '/tmdb/partials/movie/cast.html',
                restrict: 'E',
                scope: {
                    movieName: '=',
                    movieCredits: '='
                },
                link: function($scope, element) {
                
                    function setDivHeight() { 
                        $scope.utilsInstance.extendToLowWindowEdge(element.find('#movies-actors'));
                    }
                    
                    $scope.$on('layoutChange', setDivHeight);
                    
                    //
                    $scope.altProfilePath = "http://nick.mtvnimages.com/nick/properties/spongebob-squarepants/characters/spongebob-about-web-desktop.jpg?quality=0.75";
                }
            };
        };
    }
);