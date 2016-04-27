

define( [ 'angular',
          'ngRoute',
          'config/config',
          'tmdb/services/TMDBAPIService'],
    function( angular, $routeParams, config, TMDBAPIService ) {
        "use strict";
        
        
        //sometime tmdb returns redundant-id'd results
        function scrub(listWithIds, requiredField) {
            var scrubbed = [];
            
            var idsSeen = {};
            listWithIds.forEach(function(item) {
                if((!idsSeen[item.id]) && (item[requiredField])) {
                    scrubbed.push(item);
                    idsSeen[item.id] = true;
                }
            });
            
            return scrubbed;
        }
        
        var ResultsController = function($scope, TMDBAPIService, $routeParams, $timeout ) {
        
            $scope.$watch('chosenItem', function(item) {
            
                $scope.err = undefined;

                if(!item)
                    return;
                    
                $scope.searching = true;
                
                function process(serviceType, scrubFunc) {
                    serviceType(item.id).then( 
                        function (response) {
                            $scope.searching = false;
                            if(response.status != 200) {
                                $scope.err = "Query returned with status: " + response.status;
                            }
                            else {
                                $scope.searchResults = response.data;
                                scrubFunc($scope.searchResults);
                                $scope.resultsChanged();
                            }
                        },
                        function(err) {
                            $scope.err = "Query returned with error: " + JSON.stringify(err);
                        }
                    );
                }
                    
                if(item.media_type == 'movie') {
                    //look for actors in this movie
                    process(TMDBAPIService.Movie().movie.movie, function(results) { results.credits.cast = scrub(results.credits.cast, 'profile_path');})
                }
                else if(item.media_type == 'person') {
                    //look for movies this person has acted in
                    process(TMDBAPIService.Person().person.person, function(results) { results.movie_credits.cast = scrub(results.movie_credits.cast, 'profile_path');})
                }
            });
        

        };

        ResultsController.$inject = [ '$scope', 'TMDBAPIService', '$routeParams', '$timeout' ];

        return ResultsController;
    }
);