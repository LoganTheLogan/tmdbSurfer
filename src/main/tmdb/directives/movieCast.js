
define( [ 'angular',
          'tmdb/partials/remoteImageLoader/RemoteImageLoader' ], 
    function( angular, RemoteImageLoader ) {
        "use strict";

        return function() {
            return {
                transclude: true,
                replace: true,
                controller: RemoteImageLoader,
                templateUrl: '/tmdb/partials/movie/cast.html',
                restrict: 'E',
                scope: {
                    movieName: '=',
                    movieCredits: '='
                }
            };
        };
    }
);