angular.module('ttyl.controllers', [])

.controller('LoginCtrl', function ($scope, $state, fireBaseData, Users, $ionicModal) {

    $scope.user = fireBaseData.ref().getAuth();

    $ionicModal.fromTemplateUrl('templates/signup.html', {
        scope: $scope
    }).then(function (modal) {
        $scope.modal = modal;
    })

    //Sign up
    $scope.signUp = function (email, password, username, team) {
        if(email && password && username) {
            fireBaseData.ref().createUser({
                email: email,
                password: password
            }, function (error, userData) {
                if (error) {
                    switch (error.code) {
                        case "EMAIL_TAKEN":
                            alert("You already have been registered.");
                            break;
                        case "INVALID_EMAIL":
                            alert("your email is not valid.");
                            break;
                        default:
                            console.log("Error creating user:", error);
                            alert("Fill in all blanks.");
                     }
                } else {
                    console.log("Successful uid:", userData.uid);
                    fireBaseData.refUsers().child(userData.uid).set({
                        email: email,
                        password: password,
                        username: username,
                        team: team
                    });
                    $scope.modal.hide();
                }
            });
        } else {
            alert("Fill in all blanks.");
        }
    }

    //Log in
    $scope.signIn = function (email, password) {
        if(email && password) {
            fireBaseData.ref().authWithPassword({
                email: email,
                password: password
            }, function (error, authData) {
                if (error) {
                    alert("You are not registered." + error.message);
                } else {
                    console.log("Logged in as " + authData.uid);
                    $scope.user = fireBaseData.ref().getAuth();
                    $scope.$apply();

                    var loginUser = fireBaseData.refUsers().once('value', function (snapshot) {
                        var val = snapshot.child(authData.uid).val();
                        console.log(val.username);
                        $state.go('tab.account', {
                            userId: val.username
                        });
                    });
           
                }
            })
        } else {
            alert("Enter both email and password.");
        }
    };

})

.controller('AccountCtrl', function ($scope, $stateParams, Users) {
    $scope.user = Users.getLoginUser($stateParams.userId);    
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




