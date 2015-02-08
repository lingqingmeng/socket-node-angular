angular.module('sampleApp', ['ngRoute', 'ui.bootstrap', 'appRoutes','btford.socket-io', 'MainCtrl', 'NerdCtrl', 'NerdService', 'GeekCtrl', 'GeekService', 'PlayerCtrl'])
.value('nickName','anonymous');

