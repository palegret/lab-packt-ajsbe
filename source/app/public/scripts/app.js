+function (window, angular) {
	'use strict';
	
	window.sevenMinuteWorkout = angular.module('7MinuteWorkout', []);
	
	var app = angular.module('app', [
		'ngRoute', 
		'ngSanitize', 
		'ngAnimate', 
		'ui.bootstrap', 
		'mediaPlayer', 
		'7MinuteWorkout'
	]);

	app.config(function ($routeProvider, $sceDelegateProvider) {
	    var VIEW_ROOT = 'content/views/';
	    
		$routeProvider.when('/start', {
			templateUrl: VIEW_ROOT + 'start.html'
		});

		$routeProvider.when('/workout', {
			templateUrl: VIEW_ROOT + 'workout.html',
			controller: 'WorkoutController'
		});

		$routeProvider.when('/finish', {
			templateUrl: VIEW_ROOT + 'finish.html'
		});

		$routeProvider.otherwise({
			redirectTo: '/start'
		}); 

		$sceDelegateProvider.resourceUrlWhitelist([
			'self', // Allow same origin resource loads.
			'http://*.youtube.com/**',
			'https://*.youtube.com/**'
		]);
	});
}(this, this.angular);
