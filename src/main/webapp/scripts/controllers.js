'use strict';

var controllers = angular.module('beMySanta.controllers', [ 'ngResource' ]);

controllers
		.controller(
				'WishesListController',
				[
						'$rootScope',
						'$scope',
						'WishesFactory',
						'WishFactory',
						'SearchByWishIdFactory',
						'SearchByRacfIdFactory',
						'CreateWishFactory',
						'RegisterWishFactory',
						'CompleteWishFactory',
						'$location',
						function($rootScope, $scope, WishesFactory,
								WishFactory, SearchByWishIdFactory,
								SearchByRacfIdFactory, CreateWishFactory,
								RegisterWishFactory, CompleteWishFactory,
								$location) {

							$scope.wishes = {};
							getWishes();
							$scope.wishRegisterRequest = false;
							$scope.wishRegistered = false;
							$scope.wishToRegister = {};
							$scope.registeredWish = {};
							$scope.message = "";

							function getWishes() {
								WishesFactory
										.query()
										.success(function(custs) {
											$scope.wishes = custs;
										})
										.error(
												function(error) {
													$scope.status = 'Unable to load customer data: '
															+ error.message;
												});
							}
							;

							$scope.registerWishForm = function(msg) {
								$scope.wishRegisterRequest = true;
								$scope.wishToRegister = msg;
							};

							$scope.registerWish = function(wish) {
								RegisterWishFactory
										.query(wish)
										.success(
												function(result) {
													$scope.registeredWish = result;
													$scope.wishRegistered = true;
													$scope.message = "You have successfully registered for the wish "
															+ $scope.registeredWish.wishId
															+ ".";
												})
										.error(
												function(error) {
													$scope.status = 'Unable to load customer data: '
															+ error.message;
												});
							};

						} ]);

controllers.controller('RegisterWishController', [
		'$rootScope',
		'$scope',
		'WishesFactory',
		'WishFactory',
		'SearchByWishIdFactory',
		'SearchByRacfIdFactory',
		'CreateWishFactory',
		'RegisterWishFactory',
		'CompleteWishFactory',
		'$location',
		function($rootScope, $scope, WishesFactory, WishFactory,
				SearchByWishIdFactory, SearchByRacfIdFactory,
				CreateWishFactory, RegisterWishFactory, CompleteWishFactory,
				$location) {

			$rootScope.$on('handleBroadcast', function(event, args) {
				$scope.wish = args.message;
				$scope.message = 'ONE: ' + args.message;
			});

			$scope.wishRegistered = false;
			$scope.wish = {};

			$scope.registerWish = function(wish) {
				RegisterWishFactory.query(wish).success(function(result) {
					$scope.wish = result;
					$scope.wishRegistered = true;
				}).error(
						function(error) {
							$scope.status = 'Unable to load customer data: '
									+ error.message;
						});
			};
		} ]);

controllers.controller('WishController', [
		'$scope',
		'WishesFactory',
		'WishFactory',
		'SearchByWishIdFactory',
		'SearchByRacfIdFactory',
		'CreateWishFactory',
		'RegisterWishFactory',
		'CompleteWishFactory',
		'$location',
		function($scope, WishesFactory, WishFactory, CreateWishFactory,
				CompleteWishFactory, $location) {

			$scope.wish = {};

			function getWish() {
				WishFactory.query().success(function(custs) {
					$scope.wish = custs;
				}).error(
						function(error) {
							$scope.status = 'Unable to load customer data: '
									+ error.message;
						});
			}
			;
		} ]);

controllers.controller('SearchWishByIdController', [
		'$scope',
		'WishesFactory',
		'WishFactory',
		'SearchByWishIdFactory',
		'SearchByRacfIdFactory',
		'CreateWishFactory',
		'RegisterWishFactory',
		'CompleteWishFactory',
		'$location',
		function($scope, WishesFactory, WishFactory, SearchByWishIdFactory,
				CreateWishFactory, CompleteWishFactory, $location) {

			$scope.inputWishId = "";

			$scope.getWish = function(inputWishId) {
				SearchByWishIdFactory.query(inputWishId).success(
						function(result) {
							$scope.wishes = result;
							$scope.message = $scope.wishes.length + " Results Found.";
						}).error(
						function(error) {
							$scope.status = 'Unable to load customer data: '
									+ error.message;
						});
			};
		} ]);

controllers.controller('SearchWishByRacfIdController', [
		'$scope',
		'WishesFactory',
		'WishFactory',
		'SearchByWishIdFactory',
		'SearchByRacfIdFactory',
		'CreateWishFactory',
		'RegisterWishFactory',
		'CompleteWishFactory',
		'$location',
		function($scope, WishesFactory, WishFactory, SearchByWishIdFactory,
				SearchByRacfIdFactory, CreateWishFactory, CompleteWishFactory,
				$location) {

			$scope.inputRacfId = "";
			$scope.message = "";

			$scope.getWish = function(inputRacfId) {
				SearchByRacfIdFactory.query(inputRacfId).success(
						function(result) {
							$scope.wishes = result;
							$scope.message = $scope.wishes.length + " Results Found.";
						}).error(
						function(error) {
							$scope.status = 'Unable to load customer data: '
									+ error.message;
						});
			};
		} ]);

controllers.controller('IntroductionPageController', [ '$scope',
		'WishesFactory', 'WishFactory', 'SearchByWishIdFactory',
		'SearchByRacfIdFactory', 'CreateWishFactory', 'RegisterWishFactory',
		'CompleteWishFactory', '$location', function($scope, $location) {

			$scope.message = "Blah Blah";

		} ]);