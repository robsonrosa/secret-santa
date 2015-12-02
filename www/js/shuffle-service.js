angular.module('santa')

.factory('shuffle', ['$q', 'storage', function($q, storage) {
 	
	function build(list) {
		var secrets = shuffle(list.map(function(item){ return item.friend; }));
		for (var i = 0; i < list.length; i++) {
			list[i].secret = secrets[i];
		}
		return list;
	}
	
	function shuffle(list) {
		var raffle = [];
		var notPicked = Array(list.length).fill().map((x,i)=>i);
		
		for(var i = 0; i < list.length; i++) {
			// se chegou ao fim e o último é a última opção sorteável, então recomeça
			if (notPicked.length === 1 && notPicked[0] === i) return shuffle(list);
			
			var pickedIndex = getNextIndex(notPicked, i);
			
			raffle[i] = list[pickedIndex] ;
		
			notPicked.splice(notPicked.indexOf(pickedIndex), 1);
		}
		
		return raffle;
	}
	
	function getNextIndex(notPicked, currentIndex) {
		var pickedIndex = currentIndex;
		while (pickedIndex === currentIndex) {
			pickedIndex = notPicked[Math.floor(Math.random() * notPicked.length)];
		}
		return pickedIndex;
	}
	
	return {
		run: function(list) {
			var deferred = $q.defer();
			
			if (list.length <= 1) {
				deferred.reject('Você precisa urgentemente de novos amigos!');
			}
			
			else if (storage.getBoolean('ready')) {
				deferred.resolve(list);
			} 
			
			else {
				deferred.resolve(build(list));
			}
			
			return deferred.promise;
		}
	};
	
}]);