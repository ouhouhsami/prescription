$(document).ready(function() {
	$('#import-btn').click(function(e){
		var obj = JSON.parse($('#import').val());
		for(var key in obj){
			//console.log(key, obj[key]);
			localStorage.setItem(key, obj[key]);
		};
	});
});