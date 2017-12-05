$( document ).ready(function() {
    console.log( "ready!" );
	getContents();
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

function getContents() {
	var intraurl = "http://intra.coe.psu.ac.th/announce/";
	$.getJSON( intraurl, {
		data1: "test1",
		data2: "test2",
		data3: "test3"
	})
    .done(function( data ) {
		console.log( "Accept!" );
  		$.each( data, function( key, value ) {
			if(key === 'News'){
				$.each(value, function(k, v){
					console.log(k + '/' + v.topic + '/' + v.desc);
					var div = $('<div data-role="collapsible" data-theme="a" data-content-theme="a"></div>');//'<div data-role="collapsible" data-theme="a" data-content-theme="a"></div>';
					var title = $("<h4></h4>").text(v.topic);//'<h4>' + v.topic + '</h4>';	
                	var desc = $("<p></p>").text(v.desc); //'<p>' +  v.desc + '</p>';
					div.append(title);
					div.append(desc);
					$("#news-content").append(div);
				});
			}
			if(key === 'Student'){
				$.each(value, function(k, v){
					console.log(k + '/' + v);
				});
			}

		/*
		$( "<img>" ).attr( "src", item.media.m ).appendTo( "#images" );
		if ( i === 3 ) {
		  return false;
		}
		*/
		});
		$("#main").trigger("create");
	});
}

function changePage(){
	console.log("Change Page!");
	$.mobile.changePage( "#detail-view", { transition: "slideup", changeHash: false });	
}