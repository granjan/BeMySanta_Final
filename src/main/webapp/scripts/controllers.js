'use strict';

var controllers = angular.module('beMySanta.controllers', [ 'ngResource' ]);

controllers.filter('offset', function() {
	return function(input, start) {
		start = parseInt(start, 10);
		return input.slice(start);
	};
});

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

							/* Changes for pagination of the results */
							$scope.itemsPerPage = 5;
							$scope.currentPage = 0;

							$scope.range = function() {
								var rangeSize = 5;
								var ret = [];
								var start;
								var initPage = 0;

								start = $scope.currentPage;
								if (start > ($scope.pageCount() - rangeSize)) {
									start = $scope.pageCount() - rangeSize + 1;
								}

								if (start < 0) {
									initPage = 0;
								} else {
									initPage = start;
								}

								for (var i = initPage; i < initPage + rangeSize; i++) {
									ret.push(i);
								}
								return ret;
							};

							$scope.prevPage = function() {
								if ($scope.currentPage > 0) {
									$scope.currentPage--;
								}
							};
							$scope.prevPageDisabled = function() {
								return $scope.currentPage === 0 ? "disabled"
										: "";
							};

							$scope.pageCount = function() {
								return Math.ceil($scope.wishes.length
										/ $scope.itemsPerPage) - 1;
							};
							$scope.nextPage = function() {
								if ($scope.currentPage < $scope.pageCount()) {
									$scope.currentPage++;
								}
							};
							$scope.nextPageDisabled = function() {
								return $scope.currentPage === $scope
										.pageCount() ? "disabled" : "";
							};

							$scope.setPage = function(n) {
								$scope.currentPage = n;
							};

							/* End of changes for pagination */
							function getWishes() {
								WishesFactory
										.query()
										.success(function(custs) {
											$scope.wishes = custs;
										})
										.error(
												function(error) {
													$scope.status = 'Unable to load wishes data: '
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
														$scope.status = 'Unable to load wishes data: '
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
								if (wishStatus.toUpperCase() == ("Registered")
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
							$scope.status = 'Unable to load wishes data: '
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
							$scope.status = 'Unable to load wishes data: '
									+ error.message;
						});
			}
			;
		} ]);

controllers.controller('CompleteWishController', [
		'$rootScope',
		'$scope',
		'WishesFactory',
		'WishFactory',
		'SearchByWishIdFactory',
		'SearchByRacfIdFactory',
		'RegisterWishFactory',
		'CompleteWishFactory',
		'$location',
		function($rootScope, $scope, WishesFactory, WishFactory,
				SearchByWishIdFactory, SearchByRacfIdFactory,
				RegisterWishFactory, CompleteWishFactory, $location) {

			$scope.completeWishId = "";
			$scope.userName = "";
			$scope.password = "";
			$scope.completedWish = {};
			$scope.completeWishRequest = true;
			$scope.message = "Only for Be My Santa Volunteers";

			$scope.completeWishById = function(completeWishId, username,
					password) {

				if (completeWishId == '' || completeWishId == null
						|| username == '' || username == null || password == ''
						|| password == null) {
					$scope.message = "There is an error in the form.";
				} else {

					CompleteWishFactory.query(completeWishId, username,
							password).success(
							function(result) {
								$scope.completedWish = result;
								$scope.completeWishRequest = false;
								$scope.message = $scope.completedWish.wishId
										+ " Completed.";
							}).error(
							function(error) {
								$scope.status = 'Unable to load wishes data: '
										+ error.message;
							});
				}
			};

			$scope.canComplete = function(wishStatus) {
				if (wishStatus.toUpperCase() == ("Registered").toUpperCase()) {
					return true;
				} else {
					return false;
				}
			};

		} ]);

controllers
		.controller(
				'CompletedWishController',
				[
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
						function($rootScope, $scope, WishesFactory,
								WishFactory, SearchByWishIdFactory,
								SearchByRacfIdFactory, RegisterWishFactory,
								CompleteWishFactory, CompletedWishFactory,
								$location) {

							$scope.wishes = {};
							$scope.message = "This page displays all the completed wishes so far.";

							$scope.completedWishes = function() {
								CompletedWishFactory
										.query()
										.success(function(result) {
											$scope.wishes = result;
										})
										.error(
												function(error) {
													$scope.status = 'Unable to load wishes data: '
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
			$scope.showWishTable = false;
			$scope.message = '';

			$scope.getWish = function(inputWishId) {
				SearchByWishIdFactory.query(inputWishId).success(
						function(result) {
							$scope.wishes = result;
							$scope.message = " Results Found.";
							$scope.showWishTable = true;
						}).error(
						function(error) {
							$scope.status = 'Unable to load wishes data: '
									+ error.message;
						});
			};

			$scope.canComplete = function(wish) {

				if (wish != null && wish != '') {

					if (wish.wishStatus.toUpperCase() == ("Registered")
							.toUpperCase()) {
						return true;
					} else {
						return false;
					}
				}
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
							$scope.status = 'Unable to load wishes data: '
									+ error.message;
						});
			};
		} ]);

controllers
		.controller(
				'IntroductionPageController',
				[
						'$rootScope',
						'$scope',
						'WishesFactory',
						'WishFactory',
						'SearchByWishIdFactory',
						'SearchByRacfIdFactory',
						'RegisterWishFactory',
						'WishesCountFactory',
						'$location',
						function($rootScope, $scope, WishesFactory,
								WishFactory, SearchByWishIdFactory,
								SearchByRacfIdFactory, RegisterWishFactory,
								WishesCountFactory, $location) {

							$scope.message = "Blah Blah";
							$scope.wishesCount = {};

							$scope.wishesCount = function() {
								WishesCountFactory
										.query()
										.success(function(result) {
											$scope.wishesCount = result;

											$scope.showWishesBar();
										})
										.error(
												function(error) {
													$scope.status = 'Unable to load wishes data: '
															+ error.message;
												});
							};

							$scope.showWishesBar = function() {
								$('#bar-1')
										.jqbar(
												{
													label : 'Completed Wishes',
													value : Math
															.floor(($scope.wishesCount.completeWishes * 100)
																	/ $scope.wishesCount.totalWishes),
													barColor : '#3C8301' // '#D64747'
												});
								$('#bar-2')
										.jqbar(
												{
													label : 'Incomplete Wishes',
													value : Math
															.ceil(($scope.wishesCount.incompleteWishes * 100)
																	/ $scope.wishesCount.totalWishes),
													barColor : '#EA0200'// '#FF681F'
												});
								$('#bar-3')
										.jqbar(
												{
													label : 'Registered Wishes',
													value : Math
															.ceil(($scope.wishesCount.registeredWishes * 100)
																	/ $scope.wishesCount.totalWishes),
													barColor : '#ea805c'
												});
								$('#bar-4').jqbar({
									label : 'HTML5',
									value : 50,
									barColor : '#88bbc8'
								});
								$('#bar-5').jqbar({
									label : 'CSS3',
									value : 60,
									barColor : '#939393'
								});
								$('#bar-6').jqbar({
									label : 'jQuery',
									value : 70,
									barColor : '#3a89c9'
								});
								$('#bar-7').jqbar({
									label : 'Wal',
									value : 90,
									barColor : '#D64747',
									orientation : 'v'
								});
								$('#bar-8').jqbar({
									label : 'Ohi',
									barColor : '#FF681F',
									value : 70,
									orientation : 'v'
								});
								$('#bar-9').jqbar({
									label : 'Song',
									barColor : '#ea805c',
									value : 50,
									orientation : 'v'
								});
								$('#bar-10').jqbar({
									label : 'Pisho',
									barColor : '#88bbc8',
									value : 90,
									orientation : 'v'
								});
								$('#bar-11').jqbar({
									label : 'Mara',
									barColor : '#939393',
									value : 70,
									orientation : 'v'
								});
								$('#bar-12').jqbar({
									label : 'Dagha',
									barColor : '#3a89c9',
									value : 50,
									orientation : 'v'
								});
							};

							$scope.wishesCount();

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
							$scope.viewAllContacts();
						} ]);
