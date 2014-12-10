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
						'RegisterWishFactory',
						'$location',
						function($rootScope, $scope, WishesFactory,
								WishFactory, SearchByWishIdFactory,
								SearchByRacfIdFactory, RegisterWishFactory,
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
								var canProceed = $scope.checkDetails(wish);
								if (canProceed) {
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
								} else {
									$scope.message = "There is a missing detail in the register wish form.";
								}
							};

							$scope.checkDetails = function(wish) {
								if ((wish.wishId == null || wish.wishId == "")
										|| (wish.childName == null || wish.childName == "")
										|| (wish.childGender == null || wish.childGender == "")
										|| (wish.childAge == null || wish.childAge == "")
										|| (wish.wish == null || wish.wish == "")
										|| (wish.employeeName == null || wish.employeeName == "")
										|| (wish.employeeEmail == null || wish.employeeEmail == "")
										|| (wish.employeeRacfId == null || wish.employeeRacfId == "")
										|| (wish.employeeBuilding == null || wish.employeeBuilding == "")
										|| (wish.employeeDeskNumber == null || wish.employeeDeskNumber == "")
										|| (wish.wishStatus == null || wish.wishStatus == "")) {
									return false;
								} else {
									return true;
								}
							};

							$scope.canRegister = function(wishStatus) {
								if (wishStatus.toUpperCase() == ("Incomplete")
										.toUpperCase()) {
									return true;
								} else {
									return false;
								}
							};

							$scope.canComplete = function(wishStatus) {
								if (wishStatus.toUpperCase() == "Registered"
										.toUpperCase()) {
									return true;
								} else {
									return false;
								}
							};

							$scope.reload = function() {
								$scope.wishRegisterRequest = false;
								$scope.wishRegistered = false;
								$scope.wishToRegister = {};
								$scope.registeredWish = {};
								$scope.message = "";
							};

							$scope.completeWishForm = function(wish) {
							};

						} ]);

controllers.controller('RegisterWishController', [
		'$rootScope',
		'$scope',
		'WishesFactory',
		'WishFactory',
		'SearchByWishIdFactory',
		'SearchByRacfIdFactory',
		'RegisterWishFactory',
		'$location',
		function($rootScope, $scope, WishesFactory, WishFactory,
				SearchByWishIdFactory, SearchByRacfIdFactory,
				RegisterWishFactory, $location) {

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
		'$rootScope',
		'$scope',
		'WishesFactory',
		'WishFactory',
		'SearchByWishIdFactory',
		'SearchByRacfIdFactory',
		'RegisterWishFactory',
		'$location',
		function($rootScope, $scope, WishesFactory, WishFactory,
				SearchByWishIdFactory, SearchByRacfIdFactory,
				RegisterWishFactory, $location) {

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

controllers
		.controller(
				'CompleteWishController',
				[
						'$rootScope',
						'$scope',
						'WishesFactory',
						'WishFactory',
						'SearchByWishIdFactory',
						'SearchByRacfIdFactory',
						'RegisterWishFactory',
						'CompleteWishFactory',
						'$location',
						function($rootScope, $scope, WishesFactory,
								WishFactory, SearchByWishIdFactory,
								SearchByRacfIdFactory, RegisterWishFactory,
								CompleteWishFactory, $location) {

							$scope.completeWishId = "";
							$scope.userName = "";
							$scope.password = "";
							$scope.completedWish = {};
							$scope.completeWishRequest = true;

							$scope.completeWishById = function(completeWishId,
									username, password) {
								CompleteWishFactory
										.query(completeWishId, username,
												password)
										.success(
												function(result) {
													$scope.completedWish = result;
													$scope.completeWishRequest = false;
													$scope.message = $scope.completedWish.wishId
															+ " Completed.";
												})
										.error(
												function(error) {
													$scope.status = 'Unable to load customer data: '
															+ error.message;
												});
							};
						} ]);

controllers.controller('CompletedWishController', [
		'$rootScope',
		'$scope',
		'WishesFactory',
		'WishFactory',
		'SearchByWishIdFactory',
		'SearchByRacfIdFactory',
		'RegisterWishFactory',
		'CompleteWishFactory',
		'CompletedWishFactory',
		'$location',
		function($rootScope, $scope, WishesFactory, WishFactory,
				SearchByWishIdFactory, SearchByRacfIdFactory,
				RegisterWishFactory, CompleteWishFactory, CompletedWishFactory,
				$location) {

			$scope.wishes = {};

			$scope.completedWishes = function() {
				CompletedWishFactory.query().success(function(result) {
					$scope.wishes = result;
				}).error(
						function(error) {
							$scope.status = 'Unable to load customer data: '
									+ error.message;
						});
			};

			$scope.completedWishes();
		} ]);

controllers.controller('SearchWishByIdController', [
		'$rootScope',
		'$scope',
		'WishesFactory',
		'WishFactory',
		'SearchByWishIdFactory',
		'SearchByRacfIdFactory',
		'RegisterWishFactory',
		'$location',
		function($rootScope, $scope, WishesFactory, WishFactory,
				SearchByWishIdFactory, SearchByRacfIdFactory,
				RegisterWishFactory, $location) {

			$scope.inputWishId = "";

			$scope.getWish = function(inputWishId) {
				SearchByWishIdFactory.query(inputWishId).success(
						function(result) {
							$scope.wishes = result;
							$scope.message = $scope.wishes.length
									+ " Results Found.";
						}).error(
						function(error) {
							$scope.status = 'Unable to load customer data: '
									+ error.message;
						});
			};
		} ]);

controllers.controller('SearchWishByRacfIdController', [
		'$rootScope',
		'$scope',
		'WishesFactory',
		'WishFactory',
		'SearchByWishIdFactory',
		'SearchByRacfIdFactory',
		'RegisterWishFactory',
		'$location',
		function($rootScope, $scope, WishesFactory, WishFactory,
				SearchByWishIdFactory, SearchByRacfIdFactory,
				RegisterWishFactory, $location) {

			$scope.inputRacfId = "";
			$scope.message = "";

			$scope.getWish = function(inputRacfId) {
				SearchByRacfIdFactory.query(inputRacfId).success(
						function(result) {
							$scope.wishes = result;
							$scope.message = $scope.wishes.length
									+ " Results Found.";
						}).error(
						function(error) {
							$scope.status = 'Unable to load customer data: '
									+ error.message;
						});
			};
		} ]);

controllers.controller('IntroductionPageController', [
		'$rootScope',
		'$scope',
		'WishesFactory',
		'WishFactory',
		'SearchByWishIdFactory',
		'SearchByRacfIdFactory',
		'RegisterWishFactory',
		'$location',
		function($rootScope, $scope, WishesFactory, WishFactory,
				SearchByWishIdFactory, SearchByRacfIdFactory,
				RegisterWishFactory, $location) {

			$scope.message = "Blah Blah";

		} ]);

controllers
		.controller(
				'ContactsController',
				[
						'$rootScope',
						'$scope',
						'WishesFactory',
						'WishFactory',
						'SearchByWishIdFactory',
						'SearchByRacfIdFactory',
						'RegisterWishFactory',
						'CompleteWishFactory',
						'ContactsFactory',
						'$location',
						function($rootScope, $scope, WishesFactory,
								WishFactory, SearchByWishIdFactory,
								SearchByRacfIdFactory, RegisterWishFactory,
								CompleteWishFactory, ContactsFactory, $location) {

							$scope.contacts = {};

							$scope.viewAllContacts = function() {
								ContactsFactory
										.query()
										.success(
												function(result) {
													$scope.contacts = result;
													$scope.message = "Please Contact the volunteers listed below for any further queries.";
												})
										.error(
												function(error) {
													$scope.status = 'Unable to load contacts data: '
															+ error.message;
												});
							};
						} ]);
