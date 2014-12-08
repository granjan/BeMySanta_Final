'use strict';

var services = angular.module('beMySanta.services', [ 'ngResource' ]);

var baseUrl = 'http://localhost\\:8080';

services.factory('WishesFactory', [ '$http', function($http) {
	var baseUrl = 'http://localhost:8080';
	var wishesFactory = {};

	wishesFactory.query = function() {
		return $http.get(baseUrl + '/bemysanta/web/wishes/getAll');
	};
	return wishesFactory;
} ]);

services.factory('WishFactory', [ '$http', function($http) {
	var baseUrl = 'http://localhost:8080';
	var wishFactory = {};

	wishFactory.query = function(id) {
		return $http.get(baseUrl + '/bemysanta/web/wishes/' + id);
	};
	return wishFactory;
} ]);

services.factory('SearchByWishIdFactory', [ '$http', function($http) {
	var baseUrl = 'http://localhost:8080';
	var wishFactory = {};

	wishFactory.query = function(wishId) {
		return $http.get(baseUrl + '/bemysanta/web/wishes/' + wishId);
	};
	return wishFactory;
} ]);

services.factory('SearchByRacfIdFactory', [
		'$http',
		function($http) {
			var baseUrl = 'http://localhost:8080';
			var wishFactory = {};

			wishFactory.query = function(employeeRacfId) {
				return $http.get(baseUrl + '/bemysanta/web/wishes/getByRacfId/'
						+ employeeRacfId);
			};
			return wishFactory;
		} ]);

services.factory('RegisterWishFactory', [
		'$http',
		function($http) {
			var baseUrl = 'http://localhost:8080';
			var wishFactory = {};

			wishFactory.query = function(wish) {
				return $http.put(baseUrl
						+ '/bemysanta/web/wishes/registerWish/' + wish.wishId,
						wish);
			};
			return wishFactory;
		} ]);

services.factory('FetchWishesFactory', function($resource) {
	return $resource(baseUrl + '/bemysanta/web/getAll', {}, {
		query : {
			method : 'GET',
			isArray : true
		},
	});
});