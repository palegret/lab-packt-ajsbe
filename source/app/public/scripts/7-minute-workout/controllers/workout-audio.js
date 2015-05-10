+function (window, Math, angular) {
    'use strict';
    
    var sevenMinuteWorkout = angular.module('7MinuteWorkout');
    
    sevenMinuteWorkout.controller('WorkoutAudioController', ['$scope', '$timeout', function ($scope, $timeout) {
        $scope.exercisesAudio = [];

        var workoutPlanwatch = $scope.$watch('workoutPlan', function (newValue, oldValue) {
            if (newValue) { // newValue === workoutPlan
                angular.forEach( $scope.workoutPlan.exercises, function (exercise) {
                    $scope.exercisesAudio.push({
                        src: exercise.details.nameSound,
                        type: 'audio/wav'
                    });
                });
                
                workoutPlanwatch(); // Un-bind the watch.
            }
        });
      
        $scope.$watch('currentExercise', function (newValue, oldValue) {
            var isNewExercise = newValue && (newValue !== oldValue),
                isRestExercise = $scope.currentExercise.details.name === 'rest';
            
            if (isNewExercise && isRestExercise) {
                $timeout(function () { 
                    $scope.nextUpAudio.play();
                }, 2000);
                
                $timeout(function () {
                    $scope.nextUpExerciseAudio.play($scope.currentExerciseIndex + 1, true);
                }, 3000);
            }
        });
        
        $scope.$watch('currentExerciseDuration', function (newValue, oldValue) {
            if (newValue) {
                var isHalfwayPoint = (newValue === Math.floor($scope.currentExercise.duration / 2)),
                    isRestExercise = $scope.currentExercise.details.name === 'rest',
                    isAboutToComplete = (newValue === $scope.currentExercise.duration - 3);
                    
                if (isHalfwayPoint && !isRestExercise)
                    $scope.halfWayAudio.play();
                else if (isAboutToComplete)
                    $scope.aboutToCompleteAudio.play();
            }
        });

        var init = function () {
            
        };

        init();
    }]);
}(window, window.Math, window.angular);