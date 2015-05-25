+function (window, angular, sevenMinuteWorkout) {
    'use strict';
    
    sevenMinuteWorkout.factory('workoutHistoryTracker', ['$rootScope', 'localStorageService', 'appEvents', function ($rootScope, localStorageService, appEvents) {
        var MAX_HISTORY_ITEMS = 20, // Track for last 20 exercises
            _storageKey = 'workouthistory',
            _workoutHistory = localStorageService.get(_storageKey) || [],
            _currentWorkoutLog = null;
            
        var _service = {
            startTracking: function () {
                _currentWorkoutLog = { 
                    startedOn: new Date().toISOString(),
                    completed: false,
                    exercisesDone: 0 
                };
                
                if (_workoutHistory.length >= MAX_HISTORY_ITEMS)
                    _workoutHistory.shift();

                _workoutHistory.push(_currentWorkoutLog);
                localStorageService.add(_storageKey, _workoutHistory);
            },
            endTracking: function (completed) {
                _currentWorkoutLog.completed = completed;
                _currentWorkoutLog.endedOn = new Date().toISOString();
                _currentWorkoutLog = null;
                localStorageService.add(_storageKey, _workoutHistory);
            },
            getHistory: function () {
                return _workoutHistory;
            }
        };

        $rootScope.$on(appEvents.workout.exerciseStarted, function (e, args) { 
            _currentWorkoutLog.lastExercise = args.title;
            _currentWorkoutLog.exercisesDone++;
            localStorageService.add(_storageKey, _workoutHistory);
        });
   
        $rootScope.$on('$routeChangeSuccess', function (e, args) {
            // End the current tracking if the route changes while in progress 
            if (_currentWorkoutLog)
                _service.endTracking(false); 
        });
        
        return _service;
    }]);
}(this, this.angular, this.sevenMinuteWorkout);
