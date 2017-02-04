var app = angular.module('rngApp', []);

app.controller('randoController', [
    '$scope',
    '$http',
    function($scope, $http) {
        $scope.names = [{name: ''}];
        $scope.addLine = function() {
            console.log($scope.names);
            $scope.names.push({name: ''});
        };
        $scope.submitGroup = function() {
            let names = $scope.names.map(name => name.name);
            $http
                .post('/', {
                    names: names,
                    size: $scope.groupSize,
                    iterations: $scope.iterations
                })
                .then(result => $scope.result = result.data)
                .catch(err => console.log(err));
        };
    }
]);
