/* Controllers */
    
+function (window, angular) {
    'use strict';
    
    var sevenMinuteWorkout = angular.module('7MinuteWorkout');
    
    sevenMinuteWorkout.controller('WorkoutController', ['$scope', '$interval', '$location', function ($scope, $interval, $location) {
        function WorkoutPlan(args) {
            this.exercises = [];
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
        }
    
        function Exercise(args) {
            this.name = args.name;
            this.title = args.title;
            this.description = args.description;
            this.image = args.image;
            this.related = {};
            this.related.videos = args.videos;
            this.nameSound = args.nameSound;
            this.procedure = args.procedure;
        }
    
        var restExercise;
    
        var startWorkout = function () {
            $scope.workoutPlan = createWorkout();
            $scope.workoutTimeRemaining = $scope.workoutPlan.totalWorkoutDuration();
            
            restExercise = {
                details: new Exercise({
                    name: 'rest',
                    title: 'Relax!',
                    description: 'Relax a bit!',
                    image: 'assets/images/rest.png',
                }),
                duration: $scope.workoutPlan.restBetweenExercise
            };
            
            var updateWorkoutTimeRemaining = function () {
                $scope.workoutTimeRemaining--;
            };
            
            $interval(updateWorkoutTimeRemaining, 1000, $scope.workoutTimeRemaining);
            
            startExercise($scope.workoutPlan.exercises.shift());
        };
         
        var startExercise = function (exercisePlan) {
            var updateExerciseDuration = function () { 
                $scope.currentExerciseDuration++; 
            };
            
            var getNextExercise = function () {
        		var nextExercise = null;
    
        		if (exercisePlan === restExercise)
        			nextExercise = $scope.workoutPlan.exercises.shift();
        		else if ($scope.workoutPlan.exercises.length !== 0)
    				nextExercise = restExercise;
        
                if (nextExercise)
                    startExercise(nextExercise);
                else
                    $location.path('/finish');
            };
            
            $scope.currentExercise = exercisePlan;
            $scope.currentExerciseDuration = 0;
            
            $interval(updateExerciseDuration, 1000, $scope.currentExercise.duration)
                .then(getNextExercise);
        };
    
    	/*
    	$scope.$watch('currentExerciseDuration', function (nVal) {
    		if (nVal === $scope.currentExercise.duration) {
    			var next = getNextExercise($scope.currentExercise);
    			
    			if (next) {
    				startExercise(next);
    			} else {
    				console.log('Workout complete!')
    			}
    		} 
    	});
    	*/
    
        var createWorkout = function () {
            var workout = new WorkoutPlan({
                name: '7minWorkout',
                title: '7 Minute Workout',
                restBetweenExercise: 10
            });
            
            workout.exercises.push({
                details: new Exercise({
                    name: 'jumpingJacks',
                    title: 'Jumping Jacks',
                    description: 'A jumping jack or star jump, also called side-straddle hop is a physical jumping exercise.',
                    image: 'assets/images/JumpingJacks.png',
                    videos: [
                        '//www.youtube.com/embed/dmYwZH_BNd0',
                        '//www.youtube.com/embed/BABOdJ-2Z6o',
                        '//www.youtube.com/embed/c4DAnQ6DtF8'
                    ],
                    procedure: '<ul class="procedure"><li>Assume an erect position, with feet together and arms at your side.</li>\
                        <li>Slightly bend your knees, and propel yourself a few inches into the air.</li>\
                        <li>While in air, bring your legs out to the side about shoulder width or slightly wider.</li>\
                        <li>As you are moving your legs outward, you should raise your arms up over your head; arms should be slightly bent throughout the entire in-air movement.</li>\
                        <li>Your feet should land shoulder width or wider as your hands meet above your head with arms slightly bent.</li></ul>'
                }),
                duration: 30
            });
                
            workout.exercises.push({
                details: new Exercise({
                    name: 'wallSit',
                    title: 'Wall Sit',
                    description: 'A wall sit, also known as a Roman Chair, is an exercise done to strengthen the quadriceps muscles.',
                    image: 'assets/images/wallsit.png',
                    videos: [
                        '//www.youtube.com/embed/y-wV4Venusw',
                        '//www.youtube.com/embed/MMV3v4ap4ro'
                    ],
                    procedure: '<ul class="procedure"><li>Place your back against a wall with your feet shoulder width apart and a little ways out from the wall.</li>\
                        <li>Then, keeping your back against the wall, lower your hips until your knees form right angles.</li></ul>'
                }),
                duration: 30
            });
            
            workout.exercises.push({
                details: new Exercise({
                    name: 'pushUp',
                    title: 'Push Up',
                    description: 'A push-up is a common exercise performed in a prone position by raising and lowering the body using the arms',
                    image: 'assets/images/Pushup.png',
                    videos: [
                        '//www.youtube.com/embed/Eh00_rniF8E',
                        '//www.youtube.com/embed/ZWdBqFLNljc',
                        '//www.youtube.com/embed/UwRLWMcOdwI',
                        '//www.youtube.com/embed/ynPwl6qyUNM',
                        '//www.youtube.com/embed/OicNTT2xzMI'
                    ],
                    procedure: '<ul class="procedure"><li>Lie prone on the ground with hands placed as wide or slightly wider than shoulder width.</li>\
                        <li>Keeping the body straight, lower body to the ground by bending arms at the elbows.</li>\
                        <li>Raise body up off the ground by extending the arms.</li></ul>'
                }),
                duration: 30
            });
                
            workout.exercises.push({
                details: new Exercise({
                    name: 'crunches',
                    title: 'Abdominal Crunches',
                    description: 'The basic crunch is a abdominal exercise in a strength-training program.',
                    image: 'assets/images/crunches.png',
                    videos: [
                        '//www.youtube.com/embed/Xyd_fa5zoEU',
                        '//www.youtube.com/embed/MKmrqcoCZ-M'
                    ],
                    procedure: '<ul class="procedure"><li>Lie on your back with your knees bent and feet flat on the floor, hip-width apart.</li>\
                        <li>Place your hands behind your head so your thumbs are behind your ears.</li>\
                        <li>Hold your elbows out to the sides but rounded slightly in.</li>\
                        <li>Gently pull your abdominals inward.</li>\
                        <li>Curl up and forward so that your head, neck, and shoulder blades lift off the floor.</li>\
                        <li>Hold for a moment at the top of the movement and then lower slowly back down.</li></ul>'
                }),
                duration: 30
            });
            
            workout.exercises.push({
                details: new Exercise({
                    name: 'stepUpOntoChair',
                    title: 'Step Up Onto Chair',
                    description: 'Step exercises are ideal for building muscle in your lower body.',
                    image: 'assets/images/stepUpOntoChair.png',
                    videos: [
                        '//www.youtube.com/embed/aajhW7DD1EA'
                    ],
                    procedure: '<ul class="procedure"><li>Position your chair in front of you.</li>\
                        <li>Stand with your feet about hip width apart, arms at your sides.</li>\
                        <li>Step up onto the seat with one foot, pressing down while bringing your other foot up next to it.</li>\
                        <li>Step back with the leading foot and bring the trailing foot down to finish one step-up.</li></ul>'
                }),
                duration: 30
            });
            
            workout.exercises.push({
                details: new Exercise({
                    name: 'squat',
                    title: 'Squat',
                    description: 'The squat is a compound, full body exercise that trains primarily the muscles of the thighs, hips, buttocks and quads.',
                    image: 'assets/images/squat.png',
                    videos: [
                        '//www.youtube.com/embed/QKKZ9AGYTi4',
                        '//www.youtube.com/embed/UXJrBgI2RxA'
                    ],
                    procedure: '<ul class="procedure"><li>Stand with your head facing forward and your chest held up and out.\
                        <li>Place your feet shoulder-width apart or little wider. Extend your hands straight out in front of you.\
                        <li>Sit back and down like you\'re sitting into a chair. Keep your head facing straight as your upper body bends forward a bit. Rather than allowing your back to round, let your lower back arch slightly as you go down.\
                        <li>Lower down so your thighs are parallel to the floor, with your knees over your ankles. Press your weight back into your heels.\
                        <li>Keep your body tight, and push through your heels to bring yourself back to the starting position.'
                }),
                duration: 30
            });
                
            workout.exercises.push({
                details: new Exercise({
                    name: 'tricepdips',
                    title: 'Tricep Dips On Chair',
                    description: 'A body weight exercise that targets triceps.',
                    image: 'assets/images/tricepdips.png',
                    videos: [
                        '//www.youtube.com/embed/tKjcgfu44sI',
                        '//www.youtube.com/embed/jox1rb5krQI'
                    ],
                    procedure: '<ul class="procedure"><li>Sit up on a chair. Your legs should be slightly extended, with your feet flat on the floor.\
                        <li>Place your hands edges of the chair. Your palms should be down, fingertips pointing towards the floor.\
                        <li>Without moving your legs, bring your glutes forward off the chair.\
                        <li>Steadily lower yourself. When your elbows form 90 degrees angles, push yourself back up to starting position.'
                }),
                duration: 30
            });
            
            workout.exercises.push({
                details: new Exercise({
                    name: 'plank',
                    title: 'Plank',
                    description: 'The plank (also called a front hold, hover, or abdominal bridge) is an isometric core strength exercise that involves maintaining a difficult position for extended periods of time. ',
                    image: 'assets/images/Plank.png',
                    videos: [
                        '//www.youtube.com/embed/pSHjTRCQxIw',
                        '//www.youtube.com/embed/TvxNkmjdhMM'
                    ],
                    procedure: '<ul class="procedure"><li>Get into pushup position on the floor.</li>\
                        <li>Bend your elbows 90 degrees and rest your weight on your forearms.</li>\
                        <li>Your elbows should be directly beneath your shoulders, and your body should form a straight line from head to feet.</li>\
                        <li>Hold this position.</li></ul>'
                }),
                duration: 30
            });
            
            workout.exercises.push({
                details: new Exercise({
                    name: 'highKnees',
                    title: 'High Knees',
                    description: 'A form exercise that develops strength and endurance of the hip flexors and quads and stretches the hip extensors.',
                    image: 'assets/images/highknees.png',
                    videos: [
                        '//www.youtube.com/embed/OAJ_J3EZkdY',
                        '//www.youtube.com/embed/8opcQdC-V-U'
                    ],
                    procedure: '<ul class="procedure"><li>Start standing with feet hip-width apart.</li>\
                        <li>Do inplace jog with your knees lifting as much as possible towards your chest.</li></ul>'
                }),
                duration: 30
            });
                
            workout.exercises.push({
                details: new Exercise({
                    name: 'lunges',
                    title: 'Lunges',
                    description: 'Lunges are a good exercise for strengthening, sculpting and building several muscles/muscle groups, including the quadriceps (or thighs), the gluteus maximus (or buttocks) as well as the hamstrings. ',
                    image: 'assets/images/lunges.png',
                    videos: [
                        '//www.youtube.com/embed/Z2n58m2i4jg'
                    ],
                    procedure: '<ul class="procedure"><li>Stand erect with your feet about one shoulder width apart.</li>\
                        <li>Put your hands on your hips, keep your back as straight as possible, relax your shoulders and keep your eyes facing directly ahead.</li>\
                        <li>Take a large step forward with one leg.</li>\
                        <li>As you step forward, lower your hips and bend your knees until they both form 90 degree angles.</li>\
                        <li>Return to starting position.</li>\
                        <li>Repeat with your alternate leg.</li></ul>'
                }),
                duration: 30
            });
            
            workout.exercises.push({
                details: new Exercise({
                    name: 'pushupNRotate',
                    title: 'Pushup And Rotate',
                    description: 'A variation of pushup that requires you to rotate.',
                    image: 'assets/images/pushupNRotate.png',
                    videos: [
                        '//www.youtube.com/embed/qHQ_E-f5278'
                    ],
                    procedure: '<ul class="procedure"><li>Assume the classic pushup position, but as you come up, rotate your body so your right arm lifts up and extends overhead.</li>\
                        <li>Return to the starting position, lower yourself, then push up and rotate till your left hand points toward the ceiling.</li></ul>'
                }),
                duration: 30
            });
                
            workout.exercises.push({
                details: new Exercise({
                    name: 'sidePlank',
                    title: 'Side Plank',
                    description: 'A variation to Plank done using one hand only',
                    image: 'assets/images/sideplank.png',
                    videos: [
                        '//www.youtube.com/embed/wqzrb67Dwf8',
                        '//www.youtube.com/embed/_rdfjFSFKMY'
                    ],
                    procedure: '<ul class="procedure"><li>Lie on your side, in a straight line from head to feet, resting on your forearm.</li>\
                        <li>Your elbow should be directly under your shoulder.</li>\
                        <li>With your abdominals gently contracted, lift your hips off the floor, maintaining the line.</li>\
                        <li>Keep your hips square and your neck in line with your spine. Hold the position.</li></ul>'
                }),
                duration: 30
            });
                
            return workout;
        };
    
        var init = function () {
            startWorkout();
        };
    
        init();
    }]);
}(window, window.angular);