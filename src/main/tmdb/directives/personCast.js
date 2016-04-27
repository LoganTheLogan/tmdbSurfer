
define( [ 'angular',
          'tmdb/partials/remoteImageLoader/RemoteImageLoader'], 
    function( angular, RemoteImageLoader ) {
        "use strict";

        return function() {
            return {
                transclude: true,
                replace: true,
                controller: RemoteImageLoader,
                templateUrl: '/tmdb/partials/person/cast.html',
                restrict: 'E',
                scope: {
                    personName: '=',
                    castCredits: '='
                },
                link: function($scope, element) {
                
                    function setDivHeight() { 
                        var innerElement = element.find('#cast-movies');
                    
                        var divTop = innerElement.offset().top 
                        var windowHeight = window.innerHeight;
                        var divHeight = (windowHeight - divTop) + "px"; 
                        
                        innerElement.css({"height":divHeight}); 
                    }
                    
                    $scope.$on('layoutChange', setDivHeight);
                }
            };
        };
    }
);