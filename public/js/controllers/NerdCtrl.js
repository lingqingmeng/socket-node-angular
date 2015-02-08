angular.module('NerdCtrl', []).controller('NerdController', function($scope) {

	$scope.tagline = 'Nothing beats a pocket protector!';
	$scope.items = [
	    'Sunken D no leakers',
	    '2003 Cannon D',
	    'E V O L V E S'
	  ];

	  $scope.status = {
	    isopen: false,
	    isopen2: false
	  };

	  $scope.toggled = function(open) {
	    $log.log('Dropdown is now: ', open);
	  };

	  $scope.toggleDropdown = function($event) {
	    $event.preventDefault();
	    $event.stopPropagation();
	    $scope.status.isopen = !$scope.status.isopen;

	  };
});