(function() {
    'use strict';

    angular
        .module('arepApp')
        .factory('ProjectService', ProjectService);

    /** @ngInject */
    function ProjectService($firebaseArray, FirebaseDataService, $firebaseObject) {
        var projects = null;
        var actualProject= null;

        var service = {
            Project: Project,
            getActualProject: getActualProject,
            getProjects: getProjects,
            getProjectById: getProjectById,
            addProject: addProject,
            removeProject: removeProject,
            setActualProject: setActualProject
        };

        init();

        return service;

        function init(){
            projects = $firebaseArray(FirebaseDataService.projects);
        }

        function Project() {
            this.title = '';
            this.id = '';
        }

        function setActualProject(project) {
            actualProject = project;
        }

        function getActualProject() {
            return actualProject;
        }

        function getProjects() {
            return projects;
        }

        function getProjectById(id){
            return $firebaseObject(FirebaseDataService.projects.child(id));
        }

        function addProject(project){
            return projects.$add(project);
        }

        function removeProject(project){
            return projects.$remove(project);
        }

    }

})();
