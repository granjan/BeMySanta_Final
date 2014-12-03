'use strict';

var services = angular.module('beMySanta.services', ['ngResource']);

var baseUrl = 'http://localhost\\:8080';

services.factory('WishesFactory', function ($resource) {
    return $resource(baseUrl + '/bemysanta/web/getAll', {}, {
        query: { method: 'GET', isArray: true },
        create: { method: 'POST' }
    })
});

services.factory('WishFactory', function ($resource) {
    return $resource(baseUrl + '/bemysanta/web/wishes/:id', {}, {
        show: { method: 'GET' },
        update: { method: 'PUT', params: {id: '@id'} },
        delete: { method: 'DELETE', params: {id: '@id'} }
    })
});
