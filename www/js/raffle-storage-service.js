angular.module('santa')

.factory('raffleStorage', ['$window', function($window) {

	var readyKey = 'ready';
	var raffleKey = 'raffle';

	var service = {
		clean: clean,
		setReady: setReady,
		setRaffle: setRaffle,
		isReady: isReady,
		getRaffle: getRaffle
	};

	return service;

	function clean () {
		setReady(false);
		setRaffle([]);
	}

	function setReady (ready) {
		setBoolean(readyKey, ready);
	}

	function setRaffle (raffle) {
		setArray(raffleKey, raffle);
	}

	function isReady () {
		return getBoolean(readyKey);
	}

	function getRaffle () {
		return getArray(raffleKey);
	}

	function setBoolean (key, value) {
		$window.localStorage[key] = value;
	}

    function getBoolean (key) {
      return $window.localStorage[key] === "true";
    }

	function setArray (key, value) {
      $window.localStorage[key] = JSON.stringify(value);
    }

    function getArray (key) {
      return JSON.parse($window.localStorage[key] || '[]');
    }

}]);