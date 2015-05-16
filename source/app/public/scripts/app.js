/* globals angular */

'use strict';

angular.module('7MinuteWorkout', []);

angular.module('app', ['ngRoute', 'ngSanitize', 'ngAnimate', 'ui.bootstrap', 'mediaPlayer', '7MinuteWorkout'])
	.config(function ($routeProvider, $sceDelegateProvider) {
	    var viewRoot = 'content/views/';
	    
		$routeProvider.when('/start', {
			templateUrl: viewRoot + 'start.html'
		});

		$routeProvider.when('/workout', {
			templateUrl: viewRoot + 'workout.html',
			controller: 'WorkoutController'
		});

		$routeProvider.when('/finish', {
			templateUrl: viewRoot + 'finish.html'
		});

		$routeProvider.otherwise({
			redirectTo: '/start'
		}); 

		$sceDelegateProvider.resourceUrlWhitelist([
			// Allow same origin resource loads.
			'self',
			'http://*.youtube.com/**',
			'https://*.youtube.com/**'
		]);
	});
