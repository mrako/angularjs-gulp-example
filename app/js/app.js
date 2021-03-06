'use strict';

/*global angular */

/**
 * The main Todo app module
 *
 * @type {angular.Module}
 */
angular.module('todo', ['ngRoute', 'ngResource'])
	.config(function ($routeProvider) {
		var routeConfig = {
			controller: 'TodoCtrl',
			templateUrl: 'todo-index.html',
			resolve: {
				store: function (todoStorage) {
					// Get the correct module (API or localStorage).
					return todoStorage.then(function (module) {
						module.get(); // Fetch the todo records in the background.
						return module;
					});
				}
			}
		};

		$routeProvider
			.when('/', routeConfig)
			.when('/:status', routeConfig)
			.otherwise({
				redirectTo: '/'
			});
	});
