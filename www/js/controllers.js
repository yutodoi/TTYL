angular.module('ttyl.controllers', [])

.controller('LoginCtrl', function ($scope, $state, $firebaseAuth, $ionicModal) {

    var ref = new Firebase(firebaseUrl);
    var auth = $firebaseAuth(ref);

    $ionicModal.fromTemplateUrl('templates/signup.html', {
        scope: $scope
    }).then(function (modal) {
        $scope.modal = modal;
    })

    $scope.signUp = function (user) {
        if(user.email && user.password && user.username) {
            auth.$createUser({
                email: user.email,
                password: user.password
            }).then(function (userData) {
                alert("New account created successfully!");
                ref.child("users").child(userData.uid).set({
                    email: user.email,
                    password: user.password,
                    username: user.username,
                    team: user.team
                });
                $scope.modal.hide();
            }).catch(function (error) {
                alert("Error: " + error);
            })
        } else {
            alert("Fill in all blanks.");
        }
    }

    // auth.$onAuth(function(authData) {
    //     if (authData) {
    //         console.log("Logged in as:", authData.uid);
    //     } else {
    //         console.log("Logged out");
    //     }
    // });

    $scope.signIn = function (user) {
        if(user.email && user.password) {
            auth.$authWithPassword({
                email: user.email,
                password: user.password
            }).then(function (authData) {
                console.log("Logged in as " + authData.uid);
                // ref.child("users").child(authData.uid)
                $state.go('tab.logout');
            }).catch(function (error) {
                alert("You are not registered." + error.message);
            })
        } else {
            alert("Enter both email and password.");
        }
    }

})

.controller('LogoutCtrl', function ($scope, $stateParams, Users) {
    $scope.users = Users.all();
})

.controller('StatusCtrl', function ($scope) {

})

.controller('RoomCtrl', function ($scope) {
    
})

.controller('RoomMemberCtrl', function ($scope, Users) {
    $scope.users = Users.all();
});



// .controller('AccountDetailCtrl', function($scope, $stateParams, Users) {
//   $scope.user = Users.get($stateParams.userId);
// });




