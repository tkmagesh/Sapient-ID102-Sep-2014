angular.module('assessment.angular.bugs')
    .controller('NewBugController',function($scope,ProjectsService,BugsService, $location){
        $scope.projects = ProjectsService.query();
        $scope.save = function(){
            $scope.newBug.projectId = $scope.project.id;
            BugsService.save({projectId : $scope.project.id},$scope.newBug)
                .$promise.then(function(){
                    var url = 'projects/'+$scope.project.id + '/bugs';
                    $location.url(url); 
                });

        }
});