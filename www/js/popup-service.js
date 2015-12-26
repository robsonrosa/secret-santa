angular.module('santa')

.factory('popup', ['$ionicPopup', '$q', '$translate', function($ionicPopup, $q, $translate) {

	var defaults = {};

	$translate.onReady(function() {
		defaults.caption = $translate.instant('title');
		defaults.confirm = $translate.instant('confirmation.ok');
		defaults.toclose = $translate.instant('confirmation.close');
		defaults.dismiss = $translate.instant('confirmation.cancel');
		defaults.message = $translate.instant('confirmation.message');
	});

	return {
		confirm: function(message, yes, no) {
			var deferred = $q.defer();
			
			$ionicPopup.confirm({
				title: defaults.caption,
				okText: yes || defaults.confirm,
				cancelText: no || defaults.dismiss,
				template: message || defaults.message
			}).then(function(res) {
				if (res) deferred.resolve(true);
				else deferred.reject();
			});
			
			return deferred.promise;
		},
		
		alert: function(message) {
			return $ionicPopup.alert({
     			title: defaults.caption,
     			template: message
   			});
		},

		show: function(message, name) {
			return $ionicPopup.alert({
     			title: defaults.caption,
				okText: defaults.toclose,
     			template: '<div class="show-secret"><p>' + message + '</p>' + '<span>' + name + '</span></div>'
   			});
		}
	};
}]);