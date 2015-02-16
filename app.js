/***

	Sam Weekes Potato Test
	Using Angular.JS

***/
var app = angular.module('Potato', []);
var monthNames = [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ];

app.controller('PotatoController', function($scope, $http) {
	$scope.photos = [];
	$scope.loaded_photo = null;
	$scope.description = null;
	$scope.popup = '';
	$.ajax({
		url : "https://api.flickr.com/services/feeds/photos_public.gne?tags=potato&tagmode=all&format=json",
		dataType : "jsonp",
		jsonpCallback : "jsonFlickrFeed"	,
		success : function( data ) {
			$scope.photos = data.items;
			GetInfo( $scope.photos );
		},
		error : function( errors ) {
			console.log('error');	
		}
	});
	$http.get('https://api.flickr.com/services/feeds/photos_public.gne?tags=potato&tagmode=all&format=json');
	
	$scope.LoadPhoto = function( data ) {
		$scope.popup = 'active'
		$scope.loaded_photo = data;
		$scope.description = $scope.loaded_photo.description;
	}
	$scope.ClosePhoto = function() {
		$scope.popup = '';
	}
	
});

function GetInfo( array ) {
	for( var i = 0; i < array.length; i++) {
		// Get Authors Name
		var string = array[i].author;
		var temp = string.split( /[()]/ );
		array[i].author = temp[1];
		
		// Get Tags into an array
		var string = array[i].tags;
		var temp = string.split( /[ ]/ );
		array[i].tags = temp;
		
		// Get Published Date in Correct Format
		var date_temp = new Date( array[i].published );
		string = date_temp.toString();
		temp = string.split( /[ ]/ );
		var x = parseInt( temp[2] );
		var th = 'th';
		if( x == 1 || x == 21 || x == 31 ) { th = 'st'; } else if( x == 2 || x == 22 ) { th = 'nd'; }
		string = x + th + ' ' + temp[1] + ' ' + temp[3] + ' at ' + temp[4].substr(0,5);
		array[i].published = string;
		
		// Get Description
		string = array[i].description;
		temp = string.split( /[><]/ );
		x = temp.length - 3;
		array[i].description = temp[ x ];
	}
}