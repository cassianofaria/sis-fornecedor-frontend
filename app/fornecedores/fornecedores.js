/**
 * Created by cassiano on 12/01/16.
 */

var appFornecedores = angular.module('app.fornecedores', []);

appFornecedores.controller("FornecedorIndexController", ['$scope', '$location', 'FornecedorFactory', 'SweetAlert', function ($scope, $location, FornecedorFactory, SweetAlert) {

    $scope.fornecedores = [];

    var atualizarLista = function() {
        FornecedorFactory.query(

            function(response) {
                $scope.fornecedores = response;
            },

            function(response) {
                console.log(response)
            }
        );
    };

    atualizarLista();

    $scope.removeFornecedor = function (idFornecedor) {

        SweetAlert.swal({
                title: "Excluir?",
                text: "Tem certeza que deseja excluir o fornecedor?",
                type: "error",
                showCancelButton: true,
                cancelButtonText: "Cancelar",
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "Sim",
                closeOnConfirm: true
            },
            function(isConfirmed){
                if(isConfirmed) {
                    FornecedorFactory.delete({'id': idFornecedor}).$promise.then(

                        function(response) {
                            atualizarLista();
                        },

                        function(response) {
                            console.log(response)
                        }
                    );
                }
            });

    };

}]);

appFornecedores.controller("FornecedorNewController", ['$scope', '$location', 'FornecedorFactory', function($scope, $location, FornecedorFactory) {

    $scope.fornecedor = {
        'ativo': false
    };

    $scope.save = function () {
        $scope.fornecedor.dtCadastro = new Date();
        FornecedorFactory.save($scope.fornecedor).$promise.then(

            function(response) {
                $scope.fornecedor = {};
                $location.path('/fornecedores');
            },

            function(response) {
                console.log(response)
            }
        );
    };

}]);

appFornecedores.controller("FornecedorEditController", ['$scope', '$location', 'FornecedorFactory', 'fornecedorId', function($scope, $location, FornecedorFactory, fornecedorId) {

    $scope.fornecedor = {};

    FornecedorFactory.get({'id': fornecedorId}).$promise.then(

        function(response) {
            $scope.fornecedor = response;
        },

        function(response) {
            console.log(response)
        }
    );

    $scope.update = function () {
        $scope.fornecedor.dtAtualizacao = new Date();
        FornecedorFactory.update({'id':$scope.fornecedor.id}, $scope.fornecedor).$promise.then(

            function(response) {
                $scope.fornecedor = {};
                $location.path('/fornecedores');
            },

            function(response) {
                console.log(response)
            }
        );
    };

}]);

appFornecedores.filter('linkEmail', ['$sce',function ($sce) {
    return function (email) {
        return $sce.trustAsHtml('<a href="mailto:'+email+'">' + email + '</a>');
    } ;
}]);

appFornecedores.factory('FornecedorFactory', ['$http', '$q', '$resource', function($http, $q, $resource) {

    return $resource("http://localhost:3000/fornecedores/:id",{},  {'update':{method:'PUT' }});

}]);
