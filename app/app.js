var app = angular.module('main', []);

app.controller('nav', function($scope) {
    $scope.view = 0;
});

app.directive('menu', function() {
    return {
        restrict: 'E',
        templateUrl: 'templates/menu.html'
    }
});

app.directive('calendar', function() {
    return {
        template: '<section class="row"><div id="calendar" class="col-md-10 col-md-offset-1"></div></section>'
    };
});