
define([ 'angular',
         'config/config',
         'ngRoute', 
         'ngResource', 
         'LocalStorageModule',
         
         'tmdb/directives/movieCast',
         'tmdb/directives/personCast',
         'tmdb/directives/results',
         'tmdb/directives/search',
         'tmdb/partials/home/HomeController',
         'tmdb/partials/remoteImageLoader/ImageController',
         'tmdb/partials/results/ResultsController',
         'tmdb/partials/search/SearchController',
         'tmdb/services/TMDBAPIService',
         'tmdb/services/UtilsService',
         ], 
    function(   angular, config, $resource, $location, LocalStorageModule, 
                movieCastDirective, personCastDirective, resultsDirective, searchDirective,
                HomeController, ImageController, ResultsController, SearchController,
                TMDBAPIService, UtilsService ) {
    	"use strict";

        var angularModules = config.standardAngularModules.concat( 'LocalStorageModule' );

        var app = angular.module("app", angularModules );

        //  Configure $locationProvider and $routeProvider to allow top-level navigation within this route
    	app.config(['$locationProvider', function($locationProvider) {
            $locationProvider.html5Mode(false);
    	}]);

        app.service( "TMDBAPIService", TMDBAPIService);
        app.service( "UtilsService", UtilsService);

        app.controller( "ImageController", ImageController );

        app.controller( "HomeController", HomeController );

        app.controller( "SearchController", SearchController);
        app.directive( "search", searchDirective );

        app.controller( "ResultsController", ResultsController );
        app.directive( "results", resultsDirective );
        app.directive( "personCast", personCastDirective );
        app.directive( "movieCast", movieCastDirective );
        

        app.config(['$routeProvider', function($routeProvider) {
            $routeProvider.otherwise( { templateUrl: '/tmdb/partials/home/home.html', controller: 'HomeController' });
        }]);

    	return app;
    }
);