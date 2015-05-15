+function (window, Math, angular) {
    'use strict';
    
    var sevenMinuteWorkout = angular.module('7MinuteWorkout');
    
    sevenMinuteWorkout.controller('WorkoutVideoController', ['$scope', '$modal', function ($scope, $modal) {
        $scope.playVideo = function (videoId) {
            $scope.pauseWorkout();
            
            var options = {
                templateUrl: 'youtube-modal',
                controller: VideoPlayerController,
                scope: $scope.$new(true),
                resolve: {
                    video: function () {  
                        return '//www.youtube.com/embed/' + videoId;
                    }
                },
                size: 'lg'
            };
            
            var resumeWorkout = function () {
                $scope.resumeWorkout();
            };
            
            var modal = $modal.open(options)
                .result['finally'](resumeWorkout);
        };

        var VideoPlayerController = function ($scope, $modalInstance, video) {
            $scope.video = video;
            
            $scope.ok = function () {
                $modalInstance.close();
            };
        };
      
        VideoPlayerController.$inject = ['$scope', '$modalInstance', 'video'];

        // In book:
        // VideoPlayerController['$inject'] = ['$scope', '$modalInstance', 'video'];

        var init = function () {
        };
        
        init();
    }]);
}(window, window.Math, window.angular);