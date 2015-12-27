angular.module('santa', ['ionic', 'pascalprecht.translate'])

.config(['$translateProvider', function($translateProvider) {

	$translateProvider.useStaticFilesLoader({
		prefix: 'locale/',
		suffix: '.json'
	});

	$translateProvider.fallbackLanguage('en-us');
	$translateProvider.preferredLanguage(navigator.language || navigator.userLanguage);
	
	$translateProvider.useSanitizeValueStrategy('sanitize');
}])

.run(function($ionicPlatform) {
	$ionicPlatform.ready(function() {
		if(window.cordova && window.cordova.plugins.Keyboard) {
			cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
		}

		if(window.StatusBar) {
			StatusBar.styleDefault();
		}
	});
})
