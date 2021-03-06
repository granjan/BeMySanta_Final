'use strict';

var services = angular.module('beMySanta.services', [ 'ngResource' ]);

var baseUrl = 'http://localhost:8080';
//var baseUrl = 'http://delmw16410:8080'; uncomment this for pointing the service to the hot system

services.factory('WishesFactory', [ '$http', function($http) {
	var wishesFactory = {};

	wishesFactory.query = function() {
		return $http.get(baseUrl + '/bemysanta/web/wishes/getAll');
	};
	return wishesFactory;
} ]);

services.factory('CompletedWishFactory', [ '$http', function($http) {
	var wishesFactory = {};

	wishesFactory.query = function() {
		return $http.get(baseUrl + '/bemysanta/web/wishes/getAllComplete');
	};
	return wishesFactory;
} ]);

services.factory('WishFactory', [ '$http', function($http) {
	var wishFactory = {};

	wishFactory.query = function(id) {
		return $http.get(baseUrl + '/bemysanta/web/wishes/' + id);
	};
	return wishFactory;
} ]);

services.factory('SearchByWishIdFactory', [ '$http', function($http) {
	var wishFactory = {};

	wishFactory.query = function(wishId) {
		return $http.get(baseUrl + '/bemysanta/web/wishes/' + wishId);
	};
	return wishFactory;
} ]);

services.factory('SearchByRacfIdFactory', [
		'$http',
		function($http) {
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
			var wishFactory = {};

			wishFactory.query = function(wish) {
				return $http.put(baseUrl
						+ '/bemysanta/web/wishes/registerWish/' + wish.wishId,
						wish);
			};
			return wishFactory;
		} ]);

services.factory('CompleteWishFactory',
		[
				'$http',
				function($http) {
					var wishFactory = {};

					wishFactory.query = function(wishId, username, password) {
						var data = {
							'wishId' : wishId,
							'username' : username,
							'password' : password
						};
						return $http.put(baseUrl
								+ '/bemysanta/web/wishes/completeWish/'
								+ wishId, data);
					};
					return wishFactory;
				} ]);

services.factory('ContactsFactory', [ '$http', function($http) {
	var wishFactory = {};

	wishFactory.query = function() {
		return $http.get(baseUrl + '/bemysanta/web/wishes/getAllContacts/');
	};
	return wishFactory;
} ]);

services.factory('WishesCountFactory', [ '$http', function($http) {
	var wishFactory = {};

	wishFactory.query = function() {
		return $http.get(baseUrl + '/bemysanta/web/wishes/getWishesCount/');
	};
	return wishFactory;
} ]);
