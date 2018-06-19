import angular from 'angular';
import Chart from 'chart.js';
require("angular-route");

import '../style/app.scss';

const MODULE_NAME = 'app';

angular.module(MODULE_NAME, ['ngRoute'])
  .controller('AppCtrl', function ($scope, $route) {
    // Home page controller
  var ctx = document.getElementById("myChart").getContext('2d');
  var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ["Sunday","Sunday", "Monday", "Monday","Tuesday", "Tuesday","Wednesday", "Wednesday","Thursday", "Thursday","Friday", "Friday","Saturday","Saturday"],
        datasets: [{
            label: '# of Steps, red color for current week and blue color for last week',
            data: [7700, 4000, 5000, 4500, 11000, 7800, 8700, 9800, 17500, 12000, 6000, 5000, 12000, 11000],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)'
            ],
            borderColor: [
                'rgba(255,99,132,1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255,99,132,1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255,99,132,1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255,99,132,1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255,99,132,1)',
                'rgba(54, 162, 235, 1)',
                  'rgba(255,99,132,1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255,99,132,1)',
                'rgba(54, 162, 235, 1)',
            ],
            borderWidth: 0.5
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero:true
                }
            }]
        }
    }
});
  })
  .controller('LeaderboardCtrl', function ($scope, $http) {
    // Leaderboard controller
    $http({
      method: 'GET',
      url: 'https://randomuser.me/api/?results=10'
    }).then(function successCallback(response) {
      $scope.users = response.data.results.map(user => {
        user.steps = randomInt(1000, 20000);
        return user;
      });
    }, function errorCallback(response) {
      console.log('api call error');
    });

    var randomInt = function (min, max) {
      return Math.floor(min + Math.random() * (max + 1 - min))
    }
  })

  .controller('FriendsCtrl', function ($scope, $http) {
    // Friends controller
    $http({
      method: 'GET',
      url: 'https://randomuser.me/api/?results=4'
    }).then(function successCallback(response) {
      $scope.friends = response.data.results.map(friend => {
        return friend;
      });
    }, function errorCallback(response) {
      console.log('api call error');
    });
  })
  
  .config(function ($routeProvider, $locationProvider) {
    $routeProvider
      .when('/', {
        template: require('./home.html'),
        controller: 'AppCtrl'
      })
      .when('/leaderboard', {
        template: require('./leaderboard.html'),
        controller: 'LeaderboardCtrl'
      })
      .when('/friends', {
        template: require('./friends.html'),
        controller: 'FriendsCtrl'
      })
    $locationProvider.hashPrefix('');
  });

export default MODULE_NAME;
