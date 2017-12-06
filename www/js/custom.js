$( document ).ready(function() {
    console.log( "ready!" );
	loadTemplate();
	//getContents();
});

function getDetail(){
	$.ajax({
		url: "yourwebsite.com/hello.php",
		type: 'GET',
		dataType: 'json',
		contentType: "application/json; charset=utf-8",
		success: function (arr) {
			_getdata(arr);
		},
		error: function () {
			validationMsg();
		}
	});
}
function _getdata(arr){
	//your JSON resuls are now in arr. Do what you need with the array.
}
function loadTemplate() {
	console.log('start load template');
	var intraurl = "http://intra.coe.psu.ac.th/announce/template";
	$.get( intraurl, {
		isinit: true
	})
    .done(function( data ) {
		//console.log(data);
		console.log( "Load Template!" );
		$('body').html(data);
		//$("#main").trigger("create");
		$.mobile.changePage( "#main", { transition: "fade", changeHash: true })
	});
}
