angular.module('santa')

.factory('shuffle', ['$q', 'storage', function($q, storage) {
 	
	function build(list) {
		var friends = list.map(function(item){ return item.friend; });
		var secrets = shuffle(friends);

		for (var i = 0; i < list.length; i++) {
			list[i].secret = secrets[i];
		}

		return list;
	}
	
	function shuffle(list) {
		var secrets = [];
		var notPicked = fillArray(list.length);
		
		for(var i = 0; i < list.length; i++) {
			// se chegou ao fim e o último é a última opção sorteável, então tenta de novo
			if (notPicked.length === 1 && notPicked[0] === i) return shuffle(list);
			
			// sorteia um índice da lista de sorteáveis
			var pickedIndex = getNextIndex(notPicked, i);
			
			// adiciona sorteado na lista de secretos
			secrets[i] = list[pickedIndex];
		
			// remove sorteado da lista de sorteáveis
			notPicked.splice(notPicked.indexOf(pickedIndex), 1);
		}
		
		return secrets;
	}

	function fillArray(length) {
		var arr = [];

		for (var i = 0; i < length; i++) {
			arr.push(i);
		}

		return arr;
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
			
			else if (storage.isReady()) {
				deferred.resolve(list);
			} 
			
			else {
				deferred.resolve(build(list));
			}
			
			return deferred.promise;
		}
	};
	
}]);