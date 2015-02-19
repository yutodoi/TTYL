angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {})

.controller('ChatsCtrl', function($scope, Chats) {
  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  }
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('FriendsCtrl', function($scope, Friends) {
  $scope.friends = Friends.all();
})

.controller('FriendDetailCtrl', function($scope, $stateParams, Friends) {
  $scope.friend = Friends.get($stateParams.friendId);
})

.controller('AccountCtrl', function($scope, $rootScope, $firebaseAuth, $location) {

  var authUser = $firebaseAuth(ref);

  $scope.signin = function(username, password) {

    authUser.$authWithPassword({
      email: username,
      password: password
    }).then(function(authData) {
      console.log("Signed in as ", authData.uid);
    }).catch(function(error) {
      console.log("Authentification failed", error);
    })

  }

  $scope.signup = function(username, password) {

    var email = this.user.email;
    var password = this.user.password;

    if(!email || !password) {
      $rootScope.notify("Please enter valid credentials");
      return false;
    }

    authUser.$createUser({
      email: username,
      password: password
    }).then(function(userData) {
      console.log("User " + userData.uid + " created successfully!!");

      return authUser.$authWithPassword({
        email: username,
        password: password
      });
    })

    .then(function(authData) {
      console.log("Signed in as ", authData.uid);
      $location.path('/account/:userId');
    }).catch(function(error) {
      console.log("Authentification failed", error);
    });

  }

  $scope.settings = {
    enableFriends: true
  };
})

.controller('AccountDetailCtrl', function($scope, $stateParams, Users) {
  $scope.user = Users.get($stateParams.userId);
});




