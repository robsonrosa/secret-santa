angular.module('santa')

.factory('storage', ['$window', function($window) {
  return {
    set: function(key, value) {
      $window.localStorage[key] = value;
    },
	  
    get: function(key, defaultValue) {
      return $window.localStorage[key] || defaultValue;
    },
	  
	setBoolean: function(key, value) {
      $window.localStorage[key] = value;
    },
	  
    getBoolean: function(key) {
      return $window.localStorage[key] === "true";
    },
	  
    setObject: function(key, value) {
      $window.localStorage[key] = JSON.stringify(value);
    },
	  
    getObject: function(key) {
      return JSON.parse($window.localStorage[key] || '{}');
    },
	  
	setArray: function(key, value) {
      $window.localStorage[key] = JSON.stringify(value);
    },
	  
    getArray: function(key) {
      return JSON.parse($window.localStorage[key] || '[]');
    }
  }
}]);