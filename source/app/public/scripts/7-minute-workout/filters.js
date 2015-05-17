+function (window, angular, sevenMinuteWorkout) {
	'use strict';

	sevenMinuteWorkout.filter('secondsToTime', ['$window', function ($window) {
			return function (input) {
				var sec = $window.parseInt(input, 10);
	
				if ($window.isNaN(sec)) 
					return '00:00:00';
	
				var hours = $window.Math.floor(sec / 3600),
					minutes = $window.Math.floor((sec - (hours * 3600)) / 60),
					seconds = sec - (hours * 3600) - (minutes * 60);
	
				return ('0' + hours).substr(-2) + ':' + ('0' + minutes).substr(-2) + ':' + ('0' + seconds).substr(-2);
			};
		}]);
}(this, this.angular, this.sevenMinuteWorkout);
