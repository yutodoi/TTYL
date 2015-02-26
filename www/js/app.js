// Ionic Starter App

var firebaseUrl = "https://ttyl.firebaseio.com/";

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('ttyl', ['ionic', 'ttyl.controllers', 'ttyl.services', 'firebase'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }

    //logout
    var ref = new Firebase("https://ttyl.firebaseio.com/");
    ref.unauth();

  });
})

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
    .state('tab', {
    url: "/tab",
    abstract: true,
    templateUrl: "templates/tabs.html"
  })

  // Each tab has its own nav history stack:

  .state('tab.login', {
    url: '/login',
    views: {
      'tab-login': {
        templateUrl: 'templates/login.html',
        controller: 'LoginCtrl'
      }
    }
  })

  .state('tab.logout', {
    url: '/login/:userId',
    views: {
      'tab-logout': {
        templateUrl: 'templates/logout.html',
        controller: 'LogoutCtrl'
      }
    }
  })

  .state('tab.status', {
    url: '/status',
    views: {
      'tab-status': {
        templateUrl: 'templates/status.html',
        controller: 'StatusCtrl'
      }
    }
  })

  .state('tab.room', {
    url: '/room',
    views: {
      'tab-room': {
        templateUrl: 'templates/room.html',
        controller: 'RoomCtrl'
      }
    }
  })

  .state('tab.room-member', {
    url: '/room/:roomId',
    views: {
      'tab-room-member': {
        templateUrl: 'templates/room-member.html',
        controller: 'RoomMemberCtrl'
      }
    }
  })



  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/login');

});
