angular.module('ttyl.controllers', [])

.controller('LoginCtrl', function ($scope, $firebaseAuth, $ionicModal) {

    var ref = new Firebase("https://ttyl.firebaseio.com/");
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
            }).catch(function (error) {
                alert("Error: " + error);
            })
        } else {
            alert("Fill in all blanks.");
        }
    }

})

.controller('StatusCtrl', function ($scope) {

})

.controller('RoomCtrl', function ($scope) {
    
})

.controller('RoomDetailCtrl', function ($scope) {

});



// .controller('AccountDetailCtrl', function($scope, $stateParams, Users) {
//   $scope.user = Users.get($stateParams.userId);
// });




