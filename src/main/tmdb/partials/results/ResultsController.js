

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
                    
                if(item.media_type == 'movie') {
                    //look for actors in this movie
                    
                    var api = TMDBAPIService.Movie();
                    api.movie.movie(item.id).then( 
                        function (response) {
                            $scope.searching = false;
                            if(response.status != 200) {
                                $scope.err = "Query returned with status: " + response.status;
                            }
                            else {
                                $scope.searchResults = response.data;
                                $scope.searchResults.credits.cast = scrub($scope.searchResults.credits.cast, 'profile_path');
                                $scope.resultsChanged();
                            }
                        },
                        function(err) {
                            $scope.err = "Query returned with error: " + JSON.stringify(err);
                        }
                    );
                }
                else if(item.media_type == 'person') {
                    //look for movies this person has acted in
                                
                    var api = TMDBAPIService.Person();
                    api.person.person(item.id).then( 
                        function (response) {  
                            $scope.searching = false;  
                            if(response.status != 200) {
                                $scope.err = "Query returned with status: " + response.status;
                            }
                            else {
                                $scope.searchResults = response.data;
                                $scope.searchResults.movie_credits.cast = scrub($scope.searchResults.movie_credits.cast, 'poster_path');
                                $scope.resultsChanged();
                            }
                        },
                        function(err) {
                            $scope.err = "Query returned with error: " + JSON.stringify(err);
                        }
                    );
                }
            });
        

        };

        ResultsController.$inject = [ '$scope', 'TMDBAPIService', '$routeParams', '$timeout' ];

        return ResultsController;
    }
);