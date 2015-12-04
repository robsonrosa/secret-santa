angular.module('santa').controller('MainCtrl', ['$scope', 'storage', 'shuffle', 'popup', function ($scope, storage, shuffle, popup) {
	
	$scope.ready = storage.getBoolean('ready');
	$scope.raffle = storage.getArray('raffle');
	
	$scope.addFriend = function() {
		if (!$scope.newFriend) return;
		
		if ($scope.raffle.indexOf($scope.newFriend) >= 0) {
			popup.alert('O nome ' + $scope.newFriend + ' já foi adicionado!');
			return;
		} 
		
		$scope.raffle.push({ friend: $scope.newFriend, secret: null, viewed: false });
		$scope.newFriend = null;
		updateStorage();
	};
	
	$scope.reset = function() {
		popup.confirm().then(function() {
			updateStorage([], false);
		});
	};
	
	$scope.pick = function(item) {
		shuffle.run($scope.raffle)
		.then(function(list) {

			if (item.viewed) {
				popup.alert('Você já escolheu seu amigo secreto.');
			} else {
				popup.show('Seu amigo secreto é', item.secret);
			}

			item.viewed = true;
			updateStorage(list, true);	
		})
		.catch(function(error) {
			popup.alert(error);
		})
	};
	
	function updateStorage(list, ready) {
		$scope.ready = angular.isDefined(ready) ? ready : $scope.ready;
		$scope.raffle = angular.isDefined(list) ? list : $scope.raffle;
		storage.set('ready', $scope.ready);
		storage.setArray('raffle',$scope.raffle);
	}
	
}]);
