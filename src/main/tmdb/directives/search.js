
 define( [ 'angular', 
           'tmdb/partials/search/SearchController' ], 
    function( angular, SearchController ) {
        "use strict";

        return function() {
            return {
                transclude: true,
                replace: true,
                controller: SearchController,
                templateUrl: '/tmdb/partials/search/search.html',
                restrict: 'E',
                scope: {
                    movieList:      '=ngModel', //LMR
                    setParentItem:  '&'
                },
                link: function($scope, element) {
                
                    //gets the place where the popup menu should go
                    $scope.getMenuPlace = function() {
                        var searchElement = element.find('#searchPhrase');
                        var offset = searchElement.offset();
                        var height = searchElement.outerHeight();
                        return {top:(offset.top + height) + 'px', left:offset.left + 'px'};
                    };
                    
                    //enables using escape key to clear things out
                    $scope.searchKeyDown = function($event) {
                        if($event.keyCode == 27) {  //escape
                            $scope.clearSearch();
                        }
                    };
                    
                    //called when user has selected from the popup menu
                    $scope.selectionMade = function(item) {
                        $scope.setParentItem({item:item});
                        $scope.clearSearch();
                    };
                    
                    element.find('#searchPhrase').select(); //ready for the user to type
                    
                }
            };
        };
    }
);