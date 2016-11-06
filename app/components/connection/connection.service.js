(function () {
    'use strict';

    angular
        .module('arepApp')
        .factory('ConnectionService', ConnectionService);

    /** @ngInject */
    function ConnectionService($firebaseArray, FirebaseDataService) {

        var service = {
            Connection: Connection,
            updateConnections: updateConnections,
            addConnection: addConnection,
            getConnections: getConnections,
            removeConnection: removeConnection
        };

        return service;

        function Connection() {
            this.stakeholderKey = '';
            this.viewpoint = 0;
        }

        function updateConnections(requirementId, connections) {
            _.forEach(connections, function (connection) {
                FirebaseDataService.connections.child(requirementId).child(connection.$id).set({
                    stakeholderKey: connection.stakeholderKey,
                    viewpoint: connection.viewpoint
                });
            })
        }

        function addConnection(requirementId, connection) {
            return FirebaseDataService.connections.child(requirementId).push(connection);
        }

        function removeConnection(requirementId, connection) {
            FirebaseDataService.connections.child(requirementId).child(connection.$id).remove();
        }

        function getConnections(requirement) {
            return $firebaseArray(FirebaseDataService.connections.child(requirement.$id));
        }
    }
})();
