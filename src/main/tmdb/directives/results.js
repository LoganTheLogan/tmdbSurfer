

 define( [ 'angular', 
           'tmdb/partials/results/ResultsController' ], 
    function( angular, ResultsController ) {
        "use strict";
        
        return function() {
           return {
                transclude: true,
                replace: true,
                controller: ResultsController,
                templateUrl: '/tmdb/partials/results/results.html',
                restrict: 'E',
                scope: {
                    chosenItem:     '=',
                    resultsChanged: '&'
                }
            };
        };
    }
);