angular.module('santa').controller('MainCtrl', ['$scope', 'storage', 'shuffle', 'popup', function ($scope, storage, shuffle, popup) {
	
	$scope.ready = storage.isReady();
	$scope.raffle = storage.getRaffle();
	
	$scope.addFriend = function() {
		var friend = $scope.newFriend;

		if (alreadyAdded(friend)) {
			return popup.alert('O nome ' + friend + ' já foi adicionado!').then(clearNewFriendField);
		} 
		
		addNewFriend(friend);
		clearNewFriendField();

		updateStorage();
	};
	
	$scope.reset = function() {
		popup.confirm().then(function() {
			clearNewFriendField();
			storage.clean();
		});
	};
	
	$scope.pick = function(item) {
		shuffle.run($scope.raffle).then(function(list) {

			if (item.viewed) {
				popup.alert('Você já escolheu seu amigo secreto.');
			} else {
				popup.confirm(item.friend + ', é você mesmo?!').then(function() {
					popup.show('Seu amigo secreto é', item.secret);
					markAsViewed(item, list);
				});
			}

		}).catch(function(error) {
			popup.alert(error);
		})
	};

	function markAsViewed (item, list) {
		item.viewed = true;
		updateStorage(list, true);
	}

	function addNewFriend(friend) {
		$scope.raffle.push({ friend: friend, secret: null, viewed: false });
	}

	function clearNewFriendField() {
		$scope.newFriend = null;
	}

	function alreadyAdded(friend) {
		var friendsLowerCase = $scope.raffle.map(function(x) { return x.friend.toLowerCase(); });
		return friendsLowerCase.indexOf(friend.toLowerCase()) > -1;
	}
	
	function updateStorage(list, ready) {
		$scope.ready = angular.isDefined(ready) ? ready : $scope.ready;
		$scope.raffle = angular.isDefined(list) ? list : $scope.raffle;

		storage.setReady($scope.ready);
		storage.setRaffle($scope.raffle);
	}
	
}]);
