

define( [ 'angular', 'config/config', 'tmdb/services/UtilsService' ],
    function( angular, config, UtilsService ) {
        "use strict";

        var ImageController = function( $scope, UtilsService ) {
            var config  = angular.module("config");
            $scope.view = {images: config.apiImg};
            
            $scope.utilsInstance = UtilsService;
        };

        ImageController.$inject = [ '$scope', 'UtilsService' ];

        return ImageController;
    }
);