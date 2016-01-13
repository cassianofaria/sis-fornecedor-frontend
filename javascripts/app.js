/**
 * Created by cassiano on 12/01/16.
 */
var app = angular.module("app", [
    'ngRoute',
    'ngResource',
    'oitozero.ngSweetAlert',
    'app.fornecedores'
]);


app.config(['$routeProvider', function ($routeProvider) {

    $routeProvider.otherwise('/home', {
        templateUrl: 'app/home/index.html'
    });

    $routeProvider.when('/home', {
        templateUrl: 'app/home/index.html'
    });

    $routeProvider.when('/fornecedores', {
        templateUrl: 'app/fornecedores/index.html',
        controller: 'FornecedorIndexController'
    });

    $routeProvider.when('/fornecedores/new', {
        templateUrl: 'app/fornecedores/new.html',
        controller: 'FornecedorNewController'
    });

    $routeProvider.when('/fornecedores/:id/edit', {
        templateUrl: 'app/fornecedores/edit.html',
        controller: 'FornecedorEditController',
        resolve: {
            fornecedorId: function ($route) {
                return $route.current.params.id;
            }
        }
    });

}]);