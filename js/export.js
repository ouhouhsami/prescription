$(document).ready(function() {
	var items = localStorage.length;
	var obj = {};
	for (var i=0;i<items;i++) {
		var value = localStorage.key(i);
		obj[value] = localStorage.getItem(value);
	}
	$('#export').val(JSON.stringify(obj));
});