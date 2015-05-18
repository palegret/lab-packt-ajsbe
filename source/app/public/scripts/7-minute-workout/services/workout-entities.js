+function (window, angular, sevenMinuteWorkout) {
    'use strict';
    
    sevenMinuteWorkout.factory('workoutEntities', function () {
        return {
            WorkoutPlan: function (args) {
                this.exercises = args.exercises || [];
                this.name = args.name;
                this.title = args.title;
                this.restBetweenExercise = args.restBetweenExercise;
                
                this.totalWorkoutDuration = function () {
                    if (this.exercises.length === 0) 
                        return 0;
                    
                    var total = 0;
                    
                    angular.forEach(this.exercises, function (exercise) {
                        total += exercise.duration;
                    });
                    
                    return this.restBetweenExercise * (this.exercises.length - 1) + total;
                };
            },
            Exercise: function (args) {
                this.name = args.name;
                this.title = args.title;
                this.description = args.description;
                this.image = args.image;
                this.related = {};
                this.related.videos = args.videos;
                this.nameSound = args.nameSound;
                this.procedure = args.procedure;
            }
        };
    });
}(this, this.angular, this.sevenMinuteWorkout);
