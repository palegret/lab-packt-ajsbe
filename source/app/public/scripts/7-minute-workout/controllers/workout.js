+function (window, angular, sevenMinuteWorkout) {
    'use strict';
    
    sevenMinuteWorkout.controller('WorkoutController', ['$scope', '$interval', '$location', 'workoutEntities', 'workoutExercises', 'workoutHistoryTracker', function ($scope, $interval, $location, workoutEntities, workoutExercises, workoutHistoryTracker) {
        var restExercise,
            exerciseIntervalPromise;
    
        var startWorkout = function () {
            $scope.workoutPlan = createWorkout();
            $scope.workoutTimeRemaining = $scope.workoutPlan.totalWorkoutDuration();
            
            restExercise = {
                details: new workoutEntities.Exercise({
                    name: 'rest',
                    title: 'Relax!',
                    description: 'Relax a bit!',
                    image: 'assets/images/rest.png',
                }),
                duration: $scope.workoutPlan.restBetweenExercise
            };
            
            workoutHistoryTracker.startTracking();
            $scope.currentExerciseIndex = -1;
            startExercise($scope.workoutPlan.exercises.shift());
        };

        var getNextExercise = function (currentExercisePlan) {
            var nextExercise = null;
            
            if (currentExercisePlan === restExercise)
                nextExercise = $scope.workoutPlan.exercises[$scope.currentExerciseIndex + 1];
            else if ($scope.currentExerciseIndex < $scope.workoutPlan.exercises.length - 1)
                nextExercise = restExercise;
    
            return nextExercise;
        };

        var startExerciseTimeTracking = function () {
            var workoutComplete = function () {
                workoutHistoryTracker.endTracking(true);
                $location.path('/finish');
            };

            var updateTimeAndDuration = function () {
                ++$scope.currentExerciseDuration;
                --$scope.workoutTimeRemaining;
            };
            
            var promise = $interval(updateTimeAndDuration, 1000, ($scope.currentExercise.duration - $scope.currentExerciseDuration));
            
            promise.then(function () {
                var next = getNextExercise($scope.currentExercise);
                
                if (next)
                    startExercise(next);
                else
                    workoutComplete();
            });
            
            return promise;
        };

        $scope.pauseWorkout = function () {
            $interval.cancel(exerciseIntervalPromise);
            $scope.workoutPaused = true;
        };
        
        $scope.resumeWorkout = function () {
            exerciseIntervalPromise = startExerciseTimeTracking();
            $scope.workoutPaused = false;
        };
        
        $scope.pauseResumeToggle = function () {
            if ($scope.workoutPaused)
                $scope.resumeWorkout();
            else
                $scope.pauseWorkout();
        };

        $scope.onKeyPressed = function (event) {
            var p = 80, 
                P = 112;
                
            if (event.which === p || event.which === P)
                $scope.pauseResumeToggle();
        };

        var startExercise = function (exercisePlan) {
            $scope.currentExercise = exercisePlan;
            $scope.currentExerciseDuration = 0;
        
            if (exercisePlan.details.name != 'rest')
                $scope.currentExerciseIndex++;
        
            exerciseIntervalPromise = startExerciseTimeTracking();
        };
    
        var createWorkout = function () {
            var workout = new workoutEntities.WorkoutPlan({
                name: '7minWorkout',
                title: '7 Minute Workout',
                restBetweenExercise: 10,
                exercises: workoutExercises.get()
            });
            
            return workout;
        };
    
        var init = function () {
            startWorkout();
        };
    
        init();
    }]);
}(this, this.angular, this.sevenMinuteWorkout);
