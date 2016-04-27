

define( [ 'angular', 
          'ngRoute',
          'ngResource',
          'LocalStorageModule',
          'config/config' ], 
    function ( angular ) {
        "use strict";

        var UtilsService = function ( $rootScope, $http, $timeout, $resource, localStorageService, $location ) {
            
            /*
                This sets the height attribute on the specified element such that the
                element extends to the low edge of the window.  This is not a permanent/recurring
                action in and of itself, so anticipated that this will be called whenever
                a window resizes or a layout change occurs.
            */
            this.extendToLowWindowEdge = function(element) { 
                var offset = element ? element.offset() : undefined;
                if(offset !== undefined) {
                    var divHeight = (window.innerHeight - offset.top) + "px"; 
                    element.css({"height":divHeight}); 
                }
            }

        
        };

        UtilsService.$inject = [ '$rootScope', '$http', '$timeout', '$resource', 'localStorageService', '$location' ];

        return UtilsService;
}
);