+function (window, angular, sevenMinuteWorkout) {
    'use strict';
    
    sevenMinuteWorkout.value('appEvents', {
        workout: { 
            exerciseStarted: 'event:workout:exerciseStarted'
        }
    });
}(this, this.angular, this.sevenMinuteWorkout);
