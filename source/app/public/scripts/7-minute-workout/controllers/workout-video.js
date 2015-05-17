+function (window, angular, sevenMinuteWorkout) {
    'use strict';
    
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
            
            // I think the 'finally' method on the promise is invoked using 
            // square bracket notation because certain JavaScript parsers 
            // (probably older ones) interpret 'finally' as a reserved word.
            
            $modal.open(options).result['finally'](resumeWorkout);
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
}(this, this.angular, this.sevenMinuteWorkout);
