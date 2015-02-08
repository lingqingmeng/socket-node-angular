angular.module('PlayerCtrl', ['btford.socket-io', 'PlayerService', 'socketService']).controller('PlayerController', function ($scope, messageFormatter, chatSocket, socketFactory, nickName, $log) {
	$scope.nickName = nickName;
	$scope.messageLog = 'Ready to chat!';
	$scope.message = '';

	$scope.disableInput = function (input){
		if (input === '')
			return true;
		else
			return false;
	}

	$scope.sendMessage = function () {
		var match = $scope.message.match('^\/nick (.*)');
	    if (angular.isDefined(match) && angular.isArray(match) && match.length === 2) {
	      var oldNick = nickName;
	      nickName = match[1];
	      $scope.message = '';
	      $scope.messageLog = messageFormatter(new Date(), 
	                      nickName, 'nickname changed - from ' + 
	                        oldNick + ' to ' + nickName + '!') + $scope.messageLog;
	      $scope.nickName = nickName;
	      chatSocket.emit('message', nickName, 'NOTIFICATION: ' + oldNick + ' changed name to ' + nickName);
	    }

	    $log.debug('sending message', $scope.message);
	    chatSocket.emit('message', nickName, $scope.message);
	    $scope.message = '';
	}

	$scope.$on('socket:broadcast', function(event, data) {
		$log.debug('got a message', event.name);
		// if (data.payload === null) {
		//   $log.error('invalid message', 'event', event, 'data', JSON.stringify(data));
		//   return;
		// } 
		$scope.$apply(function() {
		  $scope.messageLog = messageFormatter(new Date(), data.source, data.payload) + $scope.messageLog;
		});
	});
	//console.log('mySocket',socketFactory);
	$scope.tagline = 'Hate the game.';
});