$(function() {	
});

//JQgrid
function setNodata(grid_ID, no_text){ 
	var grid = $(grid_ID);
	if (grid.getGridParam('records') === 0) {	
		grid.prev("div").addClass("nodata active").html(no_text);
		grid.parent().parent().parent().find(".frozen-bdiv").addClass("hidden");
	}else{
		grid.prev("div").removeClass("nodata active").html("");
		grid.parent().parent().parent().find(".frozen-bdiv").removeClass("hidden");
	}
}
function setGridSize(grid_id){
	setTimeout(function(){
		var grid_width = $('#gbox_' + grid_id).parent(".wrap-grid").width()*1;
		var grid_header = $('#gbox_' + grid_id).parent(".wrap-grid").find(".grid-header").height();
		var grid_height = $('#gbox_' + grid_id).parent(".wrap-grid").height()-grid_header-40;
		$('#' + grid_id).jqGrid('setGridWidth', grid_width).jqGrid('setGridHeight', grid_height); 
	}, 400);
}
//Height auto일 경우
function setGridWidth(grid_id){
	setTimeout(function(){
		var grid_width = $('#gbox_' + grid_id).parent(".wrap-grid").width()*1;
		$('#' + grid_id).jqGrid('setGridWidth', grid_width); 
	}, 400);
}

function moveTo(url) {
	document.location.href=url;
}

//Popup
function windowOpen(url, title, w, h) {
    var dualScreenLeft = window.screenLeft != undefined ? window.screenLeft : screen.left;
    var dualScreenTop = window.screenTop != undefined ? window.screenTop : screen.top;
 
    var width = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width;
    var height = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height;
 
    var left = ((width / 2) - (w / 2)) + dualScreenLeft;
    var top = ((height / 2) - (h / 2)) + dualScreenTop;
    var newWindow = window.open(url, title, 'scrollbars=auto, resizable=no, width=' + w + ', height=' + h + ', top=' + top + ', left=' + left);
    try{
        parent.coreData.arrPop.push(newWindow);
    }catch(err){}
     
    if (window.focus) {
        newWindow.focus();
    }
}
function windowClose(){
	window.open('', '_self').close(); 
}
/*
 * 공통 알림 Dialog
 * parameter : 알림메세지, obj (function name)
 */
function msgAlert(argMsg, obj, lang) {
	var btnText = (lang == "en" ? "O K" : "확 인");
	var msg;
	try{
		msg = argMsg.replace(/\r|\n|\\n/gi,"<br>");
	}catch(err){
		msg = argMsg;
	}
	$("#msg").html(msg);
	$("#message" ).dialog({
    	//autoOpen: false,
        resizable: false,
        height: "auto",
        width: "auto",
        modal: true,
        create: function( event, ui ) {
            // Set maxWidth
            $(this).css("maxWidth", "550px");
        },
        close: function() { 
			$( this ).dialog( "close" );
			if(typeof obj == 'function'){
				obj();
			}
		},
        buttons: [
        	{
        		text: btnText,
        		open: function() { $(this).addClass("sm btn-main"); },
        		click: function() { 
        			$( this ).dialog( "close" );
        			if(typeof obj == 'function'){
        				obj();
        			}
				}
        	}
        ]
	});
}
/*
 * 공통 알림 Dialog
 * parameter : 알림메세지, obj (function name)
 */
function msgAlertRandom(msg, obj, lang) {
	var btnText = (lang == "en" ? "O K" : "확 인");
	$("#msgs").html(msg.replace(/\r|\n|\\n/gi,"<br>"));
	var _random = getRandomInt(10,100);
	var _val		= _random%2;
	console.log("_random="+_random+", div = "+_random%2);
	var _position = (_val == 1) ? "left+"+_random+" top+"+_random : "right+"+_random+" top+"+_random;
	var _position ="center+"+_random;
	//var _position = "top+"+_random;
	$("#messages" ).dialog({
    	position : { my: 'center', at: _position, of: '#tab' },
		resizable: false,
        height: "auto",
        width: 400,
        modal: true,
        close: function() { 
			$( this ).dialog( "close" );
			if(typeof obj == 'function'){
				obj();
			}
		},
        buttons: [
        	{
        		text: btnText,
        		open: function() { 
        			$(this).addClass("main");
        			$(this).keypress(function(e) {
						 if (e.keyCode == $.ui.keyCode.ENTER) {
					       return false;
							 //$(this).parent().find("button:eq(0)").trigger("click");
					  }
					});
        		},
        		click: function() { 
        			$( this ).dialog( "close" );
        			if(typeof obj == 'function'){
        				obj();
        			}
				}
        	}
        ]
	});
}
/*
 * 저장, 삭제시 컨펌 Dialog
 * parameter : 과목명, 파라미터, rowid, mode
 */
function msgConfirm(lec_nm,params,rowid, mode, lang){
	var btnText1 = "확 인";
	var btnText2 = "취 소";
	//var res = lec_nm.split("<br>");
	//var lec_nm_ko	= res[0];
	var temp = (mode == "insert") ? "신청":"삭제";
	var msg = "["+lec_nm+ "]을 " + temp + " 하시겠습니까?";
	//temp = (mode == "insert") ? "register":"delete";
	//msg = msg+"\n"+"Do you want to "+temp+"?"
	
	
	if(lang == "en"){
		btnText1 = "O K";
		btnText2 = "Cancel";
		temp = (mode == "insert") ? "register":"delete";
		 msg = "Do you want to "+temp+" [" + lec_nm+"]?"
	}	
	
	$("#msg").html(msg.replace(/\r|\n|\\n/gi,"<br>"));
	$("#message").dialog({
		resizable: false,
		width: 400,
		height: 'auto',
		modal: true,
		closeOnEscape: true,
		resizable: false,
        draggable: true,
        buttons: [
						{
							text: btnText1,
							open: function() { $(this).addClass("sm btn-main") },
							click: function() { 
								$( this ).dialog( "close" );
								okMode(lec_nm,params,rowid, mode);
							}
						},
						{
							text: btnText2,
							click: function() { 
								$( this ).dialog( "close" );
							}
						}	
					]
	});// end dialog
}
/*
 * 공통 컨펌 Dialog
 * parameter : 과목명, 파라미터, rowid, mode
 */
function comConfirm(argMsg, obj, lang){
	lang = "en";
	var btnText1 = "확 인";
	var btnText2 = "취 소";
	var msg;
	try{
		msg = argMsg.replace(/\r|\n|\\n/gi,"<br>");
	}catch(err){
		msg = argMsg;
	}
	
	if(lang == "en"){
		btnText1 = "O K";
		btnText2 = "Cancel";
	}	
	$("#msg").html(msg);
	$("#message").dialog({
		resizable: false,
		width: 'auto',
		height: 'auto',
		modal: true,
		closeOnEscape: true,
		resizable: false,
        draggable: true,
        create: function( event, ui ) {
            // Set maxWidth
            $(this).css("maxWidth", "550px");
        },
        buttons: [
						{
							text: btnText1,
							open: function() { $(this).addClass("sm btn-main") },
							click: function() { 
								$( this ).dialog( "close" );
								if(typeof obj == 'function'){
			        				obj();
			        			}
							}
						},
						{
							text: btnText2,
							click: function() { 
								$( this ).dialog( "close" );
							}
						}	
					]
	});// end dialog
}
/*
 * 공통 Dialog
 * parameter : 넒이, 높이, 타이틀, 주소, 아규먼트( ex - var args = {leccd:0001, bunban:01})
 */
function switDialog(a_width, a_height,	a_title,  a_url,  a_args){
	$( "#switDialog" ).dialog({
		//position: 'center',
		resizable: false,
		//position: ["top",150],
		width: a_width,
		height: a_height,
		title:a_title,
		modal: true,
		resizable: true,
        beforeClose: function() {
          //$(this).empty();
        },
	    open: function(event, ui) {
			$(this).load(context +a_url,a_args, function() {
	     });
	   }
	});
}
function getContextPath() {
	var hostIndex = location.href.indexOf( location.host ) + location.host.length;
	return location.href.substring( hostIndex, location.href.indexOf("/", hostIndex + 1));
}
/*
* valid
*/
function topCheck(){
	try{
		top.getToken();
	}catch(err){
		location.href = getContextPath()+ "/login?attribute=loginTab";
	}
}
//min (포함) 과 max (불포함) 사이의 임의 정수를 반환
//Math.round() 를 사용하면 고르지 않은 분포를 얻게된다!
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}
/* 금액 콤마 표시 */
function addComma(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}