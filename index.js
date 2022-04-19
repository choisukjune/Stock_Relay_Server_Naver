//----------------------------------------------------------------------------------------------------;
var fileNm = "Server/index.js";
if( console ) console.log( "[ S ] - " + fileNm + "----------" );
//----------------------------------------------------------------------------------------------------;
//-------------------------------------------------------;
// REQUIRE;
//-------------------------------------------------------;

var cp = require( "child_process" );
var fs = require('fs');
var http = require('http');
var path = require('path');
var WebSocket = require('ws');

//-------------------------------------------------------;
// VARIABLE;
//-------------------------------------------------------;
// 정리해야함 ---- 생각나는데로 하고있음.....;
//-------------------------;
//-------------------------;
//-------------------------;
//-------------------------;

global.server = {};
global.server.addRouter = function(a,b){ return global.ROUTER_LIST[ a ] = b; };

//-------------------------;
//-------------------------;
//-------------------------;
//-------------------------;
//-------------------------;

global.ROUTER_LIST = {};

//-------------------------;
//-------------------------;
//-------------------------;
//-------------------------;
//-------------------------;


global.CONST = {};
global.CONST.MongoDB = {};
global.CONST.MongoDB.OPTIONS = {
	"self" : { ID : "admin", PWD : "tjrwns2482", HOST : "localhost", PORT : 59320 }	
};

//-------------------------;
//-------------------------;
//-------------------------;
//-------------------------;

var CWD = global.process.cwd();
var server_port = 8887;

var ROUTER_DIRECTORY_PATH = CWD + "/js/";

//router등록을 한다.
(function(){
	var ROUTER_FILE_LIST = fs.readdirSync( ROUTER_DIRECTORY_PATH );
	var i =0,iLen = ROUTER_FILE_LIST.length,io;
	for(;i<iLen;++i){
		//라우터를 등록한다;
		eval( fs.readFileSync( ROUTER_DIRECTORY_PATH + ROUTER_FILE_LIST[ i ] ).toString() );
	}
})();
//-------------------------;
//-------------------------;
//-------------------------;
//-------------------------;

//-------------------------------------------------------;
// LOGIC;
//-------------------------------------------------------;
onload = function(){
	
	var webview = document.querySelector('webview')
	
	webview.addEventListener('did-finish-load', () => {

		//webview.loadURL( "https://m.stock.naver.com" );
//		global.getStockInfo = function(cd,cbFunction){
//			webview.executeJavaScript(`
//
//			new Promise((resolve, reject) => {
//				var xhr = new XMLHttpRequest();
//					xhr.onload = function() {
//					if (xhr.status === 200 || xhr.status === 201) {
//						//console.log(JSON.parse(  ));
//						resolve( xhr.responseText )
//					} else {
//						console.error(xhr.responseText);
//					}
//				};
//				xhr.open('GET', 'https://polling.finance.naver.com/api/realtime/domestic/stock/${cd}');
//				xhr.send();
//			});
//
//			`
//			).then(function(data){
//				
//				//여기서처리해야함
//				console.log( JSON.parse( data ) )
//				cbFunction( data );
//			})
//		}

//		global.getMarketIndex = function(cbFunction){
//			webview.executeJavaScript(`
//
//			new Promise((resolve, reject) => {
//				var xhr = new XMLHttpRequest();
//					xhr.onload = function() {
//					if (xhr.status === 200 || xhr.status === 201) {
//						//console.log(JSON.parse(  ));
//						resolve( xhr.responseText )
//					} else {s
//						console.error(xhr.responseText);
//					}
//				};
//				xhr.open('GET', 'https://polling.finance.naver.com/api/realtime/domestic/index/KOSPI,KOSDAQ');
//				xhr.send();
//			});
//
//			`
//			).then(function(data){
//				
//				//여기서처리해야함
//				console.log( JSON.parse( data ) )
//				cbFunction( data );
//			})
//		}


//		global.getMarketIndexGlobal = function(cbFunction){
//			webview.executeJavaScript(`
//
//			window.r = {};
//			window.arr = [
//			 "USA","CHN","HKG","JPN","VNM","ETC"
//			]
//
//			var getMarketIndexGlobal__00 = function( cd, cbFunction ){
//				if( window.arr.length -1 == getMarketIndexGlobal__00.cnt )
//				{
//					cbFunction()
//				}
//
//				var xhr = new XMLHttpRequest();
//				xhr.open("GET" , encodeURI("https://api.stock.naver.com/index/nation/" + cd ) , true);
//				xhr.onreadystatechange = function(){
//					if(xhr.readyState == 4 && xhr.status == 200)
//					{
//						if( !window.r[ cd ] ) window.r[ cd ] =  [];
//						var d = JSON.parse( xhr.responseText );
//						window.r[ cd ] = d
//
//						++getMarketIndexGlobal__00.cnt;
//						getMarketIndexGlobal__00( window.arr[ getMarketIndexGlobal__00.cnt ], cbFunction );
//
//					}
//				}
//				xhr.send();
//			}
//			getMarketIndexGlobal__00.cnt = 0;
//			
//			var getMarketIndexGlobal__01 = function( cd, cbFunction ){
//				if( window.arr.length -1 == getMarketIndexGlobal__01.cnt )
//				{
//					cbFunction()
//				}
//
//				var xhr = new XMLHttpRequest();
//				xhr.open("GET" , encodeURI("https://api.stock.naver.com/futures/nation/" + cd ) , true);
//				xhr.onreadystatechange = function(){
//					if(xhr.readyState == 4 && xhr.status == 200)
//					{
//						//if( !window.r[ cd ] ) window.r[ cd ] = { i : [], f : [] }
//						var d = JSON.parse( xhr.responseText );
//						var i = 0,iLen = d.length,io;
//						for(;i<iLen;++i){
//							io = d[ i ]
//							window.r[ cd ].push( io );
//						}
//						//window.r[ cd ].concat( d )
//
//						++getMarketIndexGlobal__01.cnt;
//						getMarketIndexGlobal__01( window.arr[ getMarketIndexGlobal__01.cnt ], cbFunction );
//
//
//					}
//				}
//				xhr.send();
//			}
//			getMarketIndexGlobal__01.cnt = 0
//
//			new Promise((resolve, reject) => {
//				getMarketIndexGlobal__00( window.arr[ getMarketIndexGlobal__00.cnt], function(){
//					resolve();
//				})
//			}).then(function(){
//				return new Promise((resolve, reject) => {
//					getMarketIndexGlobal__01( window.arr[ getMarketIndexGlobal__01.cnt], function(){
//						resolve();
//					})
//				})
//
//			}).then(function(){
//				return window.r;
//			});
//
//			`
//			).then(function(data){
//				
//				//여기서처리해야함
//				console.log( data )
//				cbFunction( JSON.stringify( data ) );
//			})
//		}
//
//		global.getNewsByCd = function(cd,cbFunction){
//			webview.executeJavaScript(`
//
//			new Promise((resolve, reject) => {
//				var xhr = new XMLHttpRequest();
//					xhr.onload = function() {
//					if (xhr.status === 200 || xhr.status === 201) {
//						//console.log(JSON.parse(  ));
//						resolve( xhr.responseText )
//					} else {s
//						console.error(xhr.responseText);
//					}
//				};
//				xhr.open('GET', 'https://m.stock.naver.com/api/news/stock/${cd}?pageSize=20&page=1&searchMethod=title_entity_id.basic');
//				xhr.send();
//			});
//
//			`
//			).then(function(data){
//				
//				//여기서처리해야함
//				console.log( JSON.parse( data ) )
//				cbFunction( data );
//			})
//		}

//		global.getCandleDataByCd = function(cd, startTime,endTime,cbFunction){
//			webview.executeJavaScript(`
//
//			new Promise((resolve, reject) => {
//				var xhr = new XMLHttpRequest();
//					xhr.onload = function() {
//					if (xhr.status === 200 || xhr.status === 201) {
//						//console.log(JSON.parse(  ));
//						resolve( xhr.responseText )
//					} else {s
//						console.error(xhr.responseText);
//					}
//				};
//				xhr.open('GET', 'https://api.finance.naver.com/siseJson.naver?symbol=${cd}&requestType=1&startTime=${startTime}&endTime=${endTime}&timeframe=day');
//				xhr.send();
//			});
//
//			`
//			).then(function(data){
//				
//				//여기서처리해야함
//				var _data = JSON.parse( data.replace(/\n/gi,"").replace(/\t/gi,"").replace(/\'/gi,"\"") );
//				_data.shift();
//				var data = _data
//				debugger;
//				cbFunction( JSON.stringify( data ) );
//			})
//		}
//
//		global.getExchangeIndex = function(cbFunction){
//			webview.executeJavaScript(`
//
//			new Promise((resolve, reject) => {
//				var xhr = new XMLHttpRequest();
//					xhr.onload = function() {
//					if (xhr.status === 200 || xhr.status === 201) {
//						//console.log(JSON.parse(  ));
//						resolve( xhr.responseText )
//					} else {s
//						console.error(xhr.responseText);
//					}
//				};
//				xhr.open('GET', 'https://api.stock.naver.com/marketindex/exchange/majors');
//				xhr.send();
//			});
//
//			`
//			).then(function(data){
//				
//				//여기서처리해야함
//				console.log( JSON.parse( data ) )
//				cbFunction( data );
//			})
//		}
//
//		global.getEnergyIndex = function(cbFunction){
//			webview.executeJavaScript(`
//
//			new Promise((resolve, reject) => {
//				var xhr = new XMLHttpRequest();
//					xhr.onload = function() {
//					if (xhr.status === 200 || xhr.status === 201) {
//						//console.log(JSON.parse(  ));
//						resolve( xhr.responseText )
//					} else {s
//						console.error(xhr.responseText);
//					}
//				};
//				xhr.open('GET', 'https://api.stock.naver.com/marketindex/energy');
//				xhr.send();
//			});
//
//			`
//			).then(function(data){
//				
//				//여기서처리해야함
//				console.log( JSON.parse( data ) )
//				cbFunction( data );
//			})
//		}

//		global.getMetalIndex = function(cbFunction){
//			webview.executeJavaScript(`
//
//			new Promise((resolve, reject) => {
//				var xhr = new XMLHttpRequest();
//					xhr.onload = function() {
//					if (xhr.status === 200 || xhr.status === 201) {
//						//console.log(JSON.parse(  ));
//						resolve( xhr.responseText )
//					} else {s
//						console.error(xhr.responseText);
//					}
//				};
//				xhr.open('GET', 'https://api.stock.naver.com/marketindex/metals');
//				xhr.send();
//			});
//
//			`
//			).then(function(data){
//				
//				//여기서처리해야함
//				console.log( JSON.parse( data ) )
//				cbFunction( data );
//			})
//		}
//
//		global.getAgriculturalIndex = function(cbFunction){
//			webview.executeJavaScript(`
//
//			new Promise((resolve, reject) => {
//				var xhr = new XMLHttpRequest();
//					xhr.onload = function() {
//					if (xhr.status === 200 || xhr.status === 201) {
//						//console.log(JSON.parse(  ));
//						resolve( xhr.responseText )
//					} else {s
//						console.error(xhr.responseText);
//					}
//				};
//				xhr.open('GET', 'https://api.stock.naver.com/marketindex/agricultural');
//				xhr.send();
//			});
//
//			`
//			).then(function(data){
//				
//				//여기서처리해야함
//				console.log( JSON.parse( data ) )
//				cbFunction( data );
//			})
//		}
	})
}

global.server = http.createServer(function(req, res){

	req.on('error', function( err ){
		console.error(err);
		res.statusCode = 400;
		res.end('400: Bad Request');
		return;
	});

	res.on('error', function( err ){ console.error(err); });
	

	//var routerNm = req.url.replace(/\//,"");
	var routerNm = req.url.split("?")[0];
	
	
	if( req.url == "/" )
	{
		res.end( JSON.stringify( fs.readdirSync( ROUTER_DIRECTORY_PATH ) ) );
	}
	else if( global.ROUTER_LIST[ routerNm ] )
	{
		res.statusCode = 200;
		global.ROUTER_LIST[ routerNm ]( req, res );
	}
	else
	{
		var filePath = '.' + req.url.split("?")[0];
		console.log( filePath );
		var extname = path.extname(filePath);
		
		var _oContentTypes = {
			'.html' : "text/html"
			, '.js' : 'text/javascript'
			, '.css' : 'text/css'
			, '.json' : 'application/json'
			, '.png' : 'image/png'
			, '.jpg' : 'image/jpg'
			, '.wav' : 'audio/wav'
		};
		var contentType = _oContentTypes[ extname ];
		
		fs.readFile(filePath, function(error, content) {
			if(error)
			{
				if(error.code == 'ENOENT')
				{
					res.statusCode = 404;
					res.end('404: File Not Found');
				}
				else
				{
					res.writeHead(500);
					res.end('Sorry, check with the site admin for error: '+error.code+' ..\n');
					res.end(); 
				}
			}
			else
			{
				
				res.writeHead(200, { 'Content-Type': contentType });
				res.end(content, 'utf-8');
			}
		});
	}

	return;

})


//--------------------------------------------------;
//--------------------------------------------------;
//--------------------------------------------------;
//--------------------------------------------------;
//--------------------------------------------------;
//웹소켓연결부분;

global.wss = new WebSocket.Server({ server : global.server });
global.ws = {};
global.ws.clients = {};
global.wss.on('connection', function connection( ws ) {

  ws.on('message', function incoming( message ){
	console.log('received: %s', message);
  });
   ws.on('close', function close() {
	console.log('disconnected SOCKET - PORT : 5000');
  });
  //var r = {	type : "connection", data : id };
  //global.ws.send( JSON.stringify( r ) );
});
//--------------------------------------------------;
//--------------------------------------------------;
//--------------------------------------------------;
//--------------------------------------------------;
//--------------------------------------------------;
//--------------------------------------------------;

global.server.listen( server_port );




//-------------------------;
//-------------------------;
//-------------------------;
//-------------------------;
//----------------------------------------------------------------------------------------------------;
if( console ) console.log( "[ E ] - " + fileNm + "----------" );
//----------------------------------------------------------------------------------------------------;