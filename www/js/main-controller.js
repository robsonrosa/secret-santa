angular.module('santa').controller('MainCtrl', ['$scope', '$translate', 'storage', 'shuffle', 'popup', 
										function ($scope, $translate, storage, shuffle, popup) {
	
	$scope.ready = storage.isReady();
	$scope.raffle = storage.getRaffle();
	
	$scope.add = function () {
		var friend = $scope.newFriend;

		if (alreadyAdded(friend)) {
			return popup.alert($translate.instant('error.already_added', { name: friend })).then(clearNewFriendField);
		} 
		
		addNewFriend(friend);
		clearNewFriendField();

		updateStorage();
	};

	$scope.remove = function (friend) {
		removeFriend(friend);
		updateStorage();
	}
	
	$scope.reset = function () {
		popup.confirm().then(function() {
			clearNewFriendField();
			cleanStorage();
		});
	};
	
	$scope.pick = function (item) {
		shuffle.run($scope.raffle).then(function(list) {

			if (item.viewed) {
				popup.alert($translate.instant('error.already_viewed'));
			} else {
				popup.confirm($translate.instant('confirmation.view', { name: item.friend })).then(function() {
					popup.show($translate.instant('the_secret'), item.secret);
					markAsViewed(item, list);
				});
			}

		}).catch(function(error) {
			popup.alert(error);
		})
	};

	function addNewFriend (friend) {
		$scope.raffle.push({ friend: friend, secret: null, viewed: false });
	}

	function removeFriend (friend) {
		$scope.raffle.splice($scope.raffle.indexOf(friend), 1);
	}

	function clearNewFriendField () {
		$scope.newFriend = null;
	}

	function alreadyAdded (friend) {
		var friendsLowerCase = $scope.raffle.map(function(x) { return x.friend.toLowerCase(); });
		return friendsLowerCase.indexOf(friend.toLowerCase()) > -1;
	}

	function markAsViewed (item, list) {
		item.viewed = true;
		updateStorage(list, true);
	}

	function cleanStorage () {
		updateStorage([], false);
	}
	
	function updateStorage (list, ready) {
		$scope.ready = angular.isDefined(ready) ? ready : $scope.ready;
		$scope.raffle = angular.isDefined(list) ? list : $scope.raffle;

		storage.setReady($scope.ready);
		storage.setRaffle($scope.raffle);
	}
	
}]);
