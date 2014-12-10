'use strict';

var app = angular.module('beMySanta', [ 'beMySanta.services',
		'beMySanta.controllers' ]);

app.config(function($routeProvider, $httpProvider) {
	$routeProvider.when('/wishes', {
		templateUrl : 'views/wishes.html',
		controller : 'WishesListController'
	});
	$routeProvider.when('/searchWishById', {
		templateUrl : 'views/searchWishById.html',
		controller : 'SearchWishByIdController'
	});

	$routeProvider.when('/searchWishByRacfId', {
		templateUrl : 'views/searchWishByRacfId.html',
		controller : 'SearchWishByRacfIdController'
	});
	$routeProvider.when('/introduction', {
		templateUrl : 'views/introduction.html',
		controller : 'IntroductionPageController'
	});
	$routeProvider.when('/markWishComplete', {
		templateUrl : 'views/completeWish.html',
		controller : 'CompleteWishController'
	});
	$routeProvider.when('/completeWishList', {
		templateUrl : 'views/completedWishes.html',
		controller : 'CompletedWishController'
	});

	$routeProvider.when('/contacts', {
		templateUrl : 'views/contactPage.html',
		controller : 'ContactsController'
	});
	$routeProvider.otherwise({
		redirectTo : '/introduction'
	});

	/* CORS... */
	/* http://stackoverflow.com/questions/17289195/angularjs-post-data-to-external-rest-api */
	$httpProvider.defaults.useXDomain = true;
	delete $httpProvider.defaults.headers.common['X-Requested-With'];
});

app.run(function($rootScope, $templateCache) {
	$rootScope.$on('$viewContentLoaded', function() {
		$templateCache.removeAll();
	});

	$rootScope.$on('handleEmit', function(event, args) {
		$rootScope.$broadcast('handleBroadcast', args);
	});
});
