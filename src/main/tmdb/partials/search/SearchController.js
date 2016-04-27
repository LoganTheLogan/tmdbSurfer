

define( [ 'angular',
          'ngRoute',
          'config/config',
          'tmdb/services/TMDBAPIService'],
    function( angular, $routeParams, config, TMDBAPIService ) {
        "use strict";

        var SearchController = function($scope, TMDBAPIService, $routeParams, $timeout ) {
        
            var config    = angular.module("config");
            $scope.view   = {
                searchPhrase: "",
                resultList: []
            };
            
            $scope.clearSearch = function() {
                if(cancelDelayed) {
                    $timeout.cancel(cancelDelayed);
                    cancelDelayed = undefined;
                }
                $scope.view.searchPhrase = '';
                $scope.view.resultlist = [];
            };
            

            var api = TMDBAPIService.Search();

            var self = this;

            $scope.search = function () {
                self.applyQuery();
            };
            
            var cancelDelayed;

            self.applyQuery = function() {
                if ( $scope.view.searchPhrase ) { 
                    var searchPhrase = $scope.view.searchPhrase; 
                    if(cancelDelayed)
                        $timeout.cancel(cancelDelayed);
                    cancelDelayed = $timeout(function() {
                        api.search.multi(searchPhrase).then( function ( response ) {
                            $scope.view.resultlist = response.data.results;
                        });
                    }, 1000);   //debounced
                
                } else {
                    $scope.view.resultlist = [];
                }
            };

            $scope.$on( '$routeChangeSuccess', function() {
                $scope.clearSearch();
            });
            

        };

        SearchController.$inject = [ '$scope', 'TMDBAPIService', '$routeParams', '$timeout' ];

        return SearchController;
    }
);