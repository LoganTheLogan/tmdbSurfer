

define( [ 'angular', 'config/config' ],
    function( angular, config ) {
        "use strict";

        var RemoteImageLoader = function( $scope ) {
            var config  = angular.module("config");
            $scope.view = {images: config.apiImg};
        };

        RemoteImageLoader.$inject = [ '$scope' ];

        return RemoteImageLoader;
    }
);