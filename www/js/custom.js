var state = '';
var interval = 60;
var pageurl = 'http://intra.coe.psu.ac.th/announce/page';
var configurl = "http://intra.coe.psu.ac.th/announce/config";
var stateurl = "http://intra.coe.psu.ac.th/announce/state";
$( document ).ready(function() {
    console.log( "ready!" );
	//loadTemplate();
	//getContents();
	getConfig();
	//checkState();
	
});

function start()
{
	checkState();
	//alert('start loop... ('+ interval + 'S)' );
	var refresh,       
	intvrefresh = function() {
		clearInterval(refresh);
		refresh = setTimeout(function() {
		   console.log('Current Page ' + $.mobile.activePage.attr("id"));
		   
		   checkState();
		   if($.mobile.activePage.attr("id") !== 'main'){
				   $.mobile.changePage( "#main", { transition: "slidedown", changeHash: true });	
		   }
		   intvrefresh();
		}, interval * 1000);
	};

	$(document).on('keypress click mousedown mouseover mouseout drag drop', function() { console.log('reset timeout');intvrefresh(); });
	intvrefresh();
}

function getpage()
{
	console.log('Get Page');
	$.get( pageurl, {
		isinit: true
	})
    .done(function( data ) {
		//alert('Loading Page...');
		//console.log(data);
		console.log( "Load Template!" );
		$('body').empty();
		$('body').html(data);
		//$("#main").trigger("create");
		$.mobile.changePage( "#main", { transition: "fade", changeHash: true })
	});
}
function getConfig()
{
	console.log('Get Config!!');
	//alert('Get Config!!');
	
	$.getJSON( configurl)
    .done(function( data ) {
		//alert(data);
		if(data['interval'] !== null && !isNaN(data['interval']))
		{
			interval = data['interval'];
		}
		if(data['pageurl'] !== null && data['pageurl'].length > 0)
			pageurl = data['pageurl'];
		if(data['stateurl'] !== null && data['stateurl'].length > 0)
			stateurl = data['stateurl'];
		//alert('Interval:' + interval + ' PageUrl:' + pageurl + ' StateUrl:' + stateurl);
		
		start();
	});	
}

function checkState()
{
	console.log('Check State!!');
	$.getJSON( stateurl)
    .done(function( data ) {
		if(data['state'] !== null){
			//alert('State ' + data['state']);
			if(state != data['state'])
			{
				state = data['state'];
				getpage();
			}
			else
			{
				$("div[data-role='collapsible']").collapsible({	collapsed: true });
			}
		}
	});	
}


//------------------------------------------------- v1 section ------------------------------------
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
