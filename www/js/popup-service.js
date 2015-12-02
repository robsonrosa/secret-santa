angular.module('santa')

.factory('popup', ['$ionicPopup', '$q', function($ionicPopup, $q) {
	var defaultTitle = 'Amigo Secreto';
	var defaultMessage = 'Você tem certeza?';
	var defaultConfirm = 'Sim';
	var defaultDismiss = 'Não';
	
	return {
		confirm: function(message, yes, no) {
			var deferred = $q.defer();
			
			$ionicPopup.confirm({
				title: defaultTitle,
				template: message || defaultMessage,
				cancelText: no || defaultDismiss,
				okText: yes || defaultConfirm
			}).then(function(res) {
				if (res) {
					deferred.resolve(true);
				} else {
					deferred.reject();
				}
			});
			
			return deferred.promise;
		},
		
		alert: function(message) {
			return $ionicPopup.alert({
     			title: defaultTitle,
     			template: message
   			});
		}
	};
}]);