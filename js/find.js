//-------------------------------------------------------;
var fileNm = "js/find.js";
if( console ) console.log( "[ S ] - " + fileNm + "----------" );
//-------------------------------------------------------;
(function(){
//-------------------------------------------------------;
// REQUIRE;
//-------------------------------------------------------;

var fs = require( "fs" );
var url = require('url');
var https = require( "https" );

//-------------------------------------------------------;
// VARIABLE;
//-------------------------------------------------------;

var ROOT_PATH = process.cwd();

var CP_COMMAND = {};
	//CP_COMMAND.MONGO = "..\\Binary\\Mongodb\\mongodb-win32-x86_64-windows-4.4.3\\bin\\mongo";
	CP_COMMAND.MONGO = "mongo";

var DBJS_DIRECTORY_PATH = ROOT_PATH + "/dbjs/";
var _tDbjs_PATH = ROOT_PATH + "/tdbjs/";

//-------------------------------------------------------;
// FUNCTION;
//-------------------------------------------------------;
//-------------------------;
//-------------------------;
//-------------------------;
//-------------------------;
//-------------------------;

/*
 * @function
 * @param {String} dbjsNm
 * @param {boolean} bResult
 * @return {String} r
 */
var exec_query_DB = function( dbjsNm, bResult ){

	var DBJS_NM = dbjsNm;
	var FILE_PATH = ROOT_PATH + "/dbjs/" + DBJS_NM;

	var _t_command = CP_COMMAND.MONGO + " --username <!=ID=!> --password <!=PWD=!> --authenticationDatabase admin --host <!=HOST=!> --port <!=PORT=!> admin \"<!=FILE_PATH=!>\"";
	if( bResult ) _t_command = _t_command + " > " + dbjsNm + "__" + Date.now() + ".result";
	
	var command = _t_command.replace( "<!=ID=!>", global.CONST.MongoDB.OPTIONS.self.ID )
		.replace( "<!=PWD=!>", global.CONST.MongoDB.OPTIONS.self.PWD )
		.replace( "<!=HOST=!>", global.CONST.MongoDB.OPTIONS.self.HOST )
		.replace( "<!=PORT=!>", global.CONST.MongoDB.OPTIONS.self.PORT )
		.replace( "<!=FILE_PATH=!>", FILE_PATH );
	console.log( command )
	var r = cp.execSync( command ).toString();
		r = deleteLines( r , 4 )
	return r;
};

//-------------------------;
//-------------------------;
//-------------------------;
//-------------------------;
//-------------------------;
/*
 * @function
 * @param {String} str
 * @param {Number} n
 * @return {String} str
 */
var deleteLines = function( str, n ){
	var i = 0,iLen = n,io;
	for(;i<iLen;++i){ str = str.slice(str.indexOf("\n") + 1, str.length ); }
	//str = str.replace( /\t/g, '' );
	//str = str.replace( /\r\n/g, '' );
	return str;
};
//-------------------------;
//-------------------------;
//-------------------------;
//-------------------------;
//-------------------------;
/*
 * @function
 * @param {String} url
 * @return {Object} o
 */
var paramToObject = function( _url ){
	
//	var r =  url.split("?")[ 1 ];
//	var a = r.split("&");
//	var o = {};
//	var i = 0,iLen = a.length,io;
//	
//	for(;i<iLen;++i){
//		io = a[ i ];
//		var _ta = io.split( "=" );
//		o[ _ta[0] ] = _ta[ 1 ];
//	}
//	console.log( o )
	var queryData = url.parse( _url, true).query;
	return queryData;
};
//-------------------------;
//-------------------------;
//-------------------------;
//-------------------------;
//-------------------------;

//-------------------------------------------------------;
// ROUTER;
//-------------------------------------------------------;
//-------------------------;
//-------------------------;
//-------------------------;
//-------------------------;
//-------------------------;
	/**
	 * 쿼리파일을 실행하는 라우터
	 * @function
	 * @param {http.ClientRequest} req
	 * <code>
		{

		}
	* </code>
	*
	* @param {http.ClientResponse} res
	* <code>
		{

		}
	* </code>
	*
	* @example
	* <code>
		http://localhost:8888/getStockInfo?cd=035720
	* </code>
	*/
	global.server.addRouter("/getStockInfo",function( req, res ){

		var routerNm = req.url.split("?")[0];
		var paramsO = paramToObject( req.url );

		res.statusCode = 200;
		res.setHeader( "Access-Control-Allow-Headers", "Content-Type" );
		res.setHeader( "Access-Control-Allow-Origin", "*" );
		res.setHeader( "Access-Control-Allow-Methods", "OPTIONS,POST,GET" );
		res.writeHead(200, {'Content-Type': 'application/json;charset=UTF-8'});
		
//		global.getStockInfo( paramsO.cd, function(d){
//
//			res.end( d )		
//		})
		var url = `https://polling.finance.naver.com/api/realtime/domestic/stock/${paramsO.cd}`
		https.get( url, function(response){
			response.setEncoding('utf8');
			var d=""
			response.on('end', function () {
				res.end( d );
			});

			response.on('data', function (body) {
				d += body;
			});
		});
		

	});
		/**
	 * 쿼리파일을 실행하는 라우터
	 * @function
	 * @param {http.ClientRequest} req
	 * <code>
		{

		}
	* </code>
	*
	* @param {http.ClientResponse} res
	* <code>
		{

		}
	* </code>
	*
	* @example
	* <code>
		http://localhost:8888/getStockInfo?cd=035720
	* </code>
	*/
	global.server.addRouter("/getMarketIndex",function( req, res ){

		var routerNm = req.url.split("?")[0];
		var paramsO = paramToObject( req.url );

		res.statusCode = 200;
		res.setHeader( "Access-Control-Allow-Headers", "Content-Type" );
		res.setHeader( "Access-Control-Allow-Origin", "*" );
		res.setHeader( "Access-Control-Allow-Methods", "OPTIONS,POST,GET" );
		res.writeHead(200, {'Content-Type': 'application/json;charset=UTF-8'});
//		global.getMarketIndex( function(d){
//
//			res.end( d )		
//		})

		var url = `https://polling.finance.naver.com/api/realtime/domestic/index/KOSPI,KOSDAQ`;
		https.get( url, function(response){
			response.setEncoding('utf8');
			var d=""
			response.on('end', function () {
				res.end( d );
			});

			response.on('data', function (body) {
				d += body;
			});
		});
		

	});
	/**
	 * 쿼리파일을 실행하는 라우터
	 * @function
	 * @param {http.ClientRequest} req
	 * <code>
		{

		}
	* </code>
	*
	* @param {http.ClientResponse} res
	* <code>
		{

		}
	* </code>
	*
	* @example
	* <code>
		http://localhost:8888/getStockInfo?cd=035720
	* </code>
	*/
	global.server.addRouter("/getMarketIndexGlobal",function( req, res ){

		var routerNm = req.url.split("?")[0];
		var paramsO = paramToObject( req.url );

		res.statusCode = 200;
		res.setHeader( "Access-Control-Allow-Headers", "Content-Type" );
		res.setHeader( "Access-Control-Allow-Origin", "*" );
		res.setHeader( "Access-Control-Allow-Methods", "OPTIONS,POST,GET" );
		res.writeHead(200, {'Content-Type': 'application/json;charset=UTF-8'});
//		global.getMarketIndexGlobal( function(d){
//
//			res.end( d )		
//		})
		
		var r = {};
		var arr = [ "USA","CHN","HKG","JPN","VNM","ETC"	];

		var reqMarketIndexGlobal = function(){
			
			var cd = arr[ reqMarketIndexGlobal.cnt ];

			var url00 = `https://api.stock.naver.com/index/nation/${cd}`
			var url01 = `https://api.stock.naver.com/futures/nation/${cd}`

			https.get( url00, function(response){
				response.setEncoding('utf8');
				var d=""
				response.on('end', function (){
					
					if( !r[ cd ] ) r[ cd ] = [];
					var _d  = JSON.parse( d );
					r[ cd ] = _d;

					https.get( url01, function(response){
						response.setEncoding('utf8');
						var d=""
						response.on('end', function () {

							if( !r[ cd ] ) r[ cd ] = [];
							var _d  = JSON.parse( d );

							var i = 0,iLen = _d.length,io;
							for(;i<iLen;++i){
								io = _d[ i ]
								r[ cd ].push( io );
							}

							if( reqMarketIndexGlobal.cnt == arr.length -1 )
							{
								res.end( JSON.stringify( r ) );
							}
							else
							{
								++reqMarketIndexGlobal.cnt;
								reqMarketIndexGlobal()
							}
						});

						response.on('data', function (body) {
							d += body;
						});
					});	
				});

				response.on('data', function (body) {
					d += body;
				});
			});	
		}
		reqMarketIndexGlobal.cnt = 0;
		reqMarketIndexGlobal();
			
	});
			/**
	 * 쿼리파일을 실행하는 라우터
	 * @function
	 * @param {http.ClientRequest} req
	 * <code>
		{

		}
	* </code>
	*
	* @param {http.ClientResponse} res
	* <code>
		{

		}
	* </code>
	*
	* @example
	* <code>
		http://localhost:8888/getStockInfo?cd=035720
	* </code>
	*/
	global.server.addRouter("/getNewsByCd",function( req, res ){

		var routerNm = req.url.split("?")[0];
		var paramsO = paramToObject( req.url );

		res.statusCode = 200;
		res.setHeader( "Access-Control-Allow-Headers", "Content-Type" );
		res.setHeader( "Access-Control-Allow-Origin", "*" );
		res.setHeader( "Access-Control-Allow-Methods", "OPTIONS,POST,GET" );
		res.writeHead(200, {'Content-Type': 'application/json;charset=UTF-8'});

//		global.getNewsByCd( paramsO.cd, function(d){
//
//			res.end( d )		
//		})

		var url = `https://m.stock.naver.com/api/news/stock/${paramsO.cd}?pageSize=20&page=1&searchMethod=title_entity_id.basic`
		https.get( url, function(response){
			response.setEncoding('utf8');
			var d=""
			response.on('end', function () {
				res.end( d );
			});

			response.on('data', function (body) {
				d += body;
			});
		});


	});
				/**
	 * 쿼리파일을 실행하는 라우터
	 * @function
	 * @param {http.ClientRequest} req
	 * <code>
		{

		}
	* </code>
	*
	* @param {http.ClientResponse} res
	* <code>
		{

		}
	* </code>
	*
	* @example
	* <code>
		http://localhost:8888/getCandleDataByCd?cd=035720&startTime=20220201&endTime=20220211
	* </code>
	*/
	global.server.addRouter("/getCandleDataByCd",function( req, res ){

		var routerNm = req.url.split("?")[0];
		var paramsO = paramToObject( req.url );

		res.statusCode = 200;
		res.setHeader( "Access-Control-Allow-Headers", "Content-Type" );
		res.setHeader( "Access-Control-Allow-Origin", "*" );
		res.setHeader( "Access-Control-Allow-Methods", "OPTIONS,POST,GET" );
		res.writeHead(200, {'Content-Type': 'application/json;charset=UTF-8'});
		
//		global.getCandleDataByCd( paramsO.cd,paramsO.startTime,paramsO.endTime, function(d){
//
//			res.end( d )		
//		})
		
		var url = `https://api.finance.naver.com/siseJson.naver?symbol=${paramsO.cd}&requestType=1&startTime=${paramsO.startTime}&endTime=${paramsO.endTime}&timeframe=day`
		https.get( url, function(response){
			response.setEncoding('utf8');
			var d=""
			response.on('end', function () {

				var _data = JSON.parse( d.replace(/\n/gi,"").replace(/\t/gi,"").replace(/\'/gi,"\"") );
					_data.shift();
				var data = _data
				res.end( JSON.stringify( data ) );
			});

			response.on('data', function (body) {
				d += body;
			});
		});

	});
				/**
	 * 쿼리파일을 실행하는 라우터
	 * @function
	 * @param {http.ClientRequest} req
	 * <code>
		{

		}
	* </code>
	*
	* @param {http.ClientResponse} res
	* <code>
		{

		}
	* </code>
	*
	* @example
	* <code>
		http://localhost:8888/getCandleDataByCd?cd=035720&startTime=20220201&endTime=20220211
	* </code>
	*/
	global.server.addRouter("/getExchangeIndex",function( req, res ){

		var routerNm = req.url.split("?")[0];
		var paramsO = paramToObject( req.url );

		res.statusCode = 200;
		res.setHeader( "Access-Control-Allow-Headers", "Content-Type" );
		res.setHeader( "Access-Control-Allow-Origin", "*" );
		res.setHeader( "Access-Control-Allow-Methods", "OPTIONS,POST,GET" );
		res.writeHead(200, {'Content-Type': 'application/json;charset=UTF-8'});
		
//		global.getExchangeIndex(function(d){
//			res.end( d )		
//		})
		
		var url = `https://api.stock.naver.com/marketindex/exchange/majors`;
		https.get( url, function(response){
			response.setEncoding('utf8');
			var d=""
			response.on('end', function () {
				res.end( d );
			});

			response.on('data', function (body) {
				d += body;
			});
		});

	});
				/**
	 * 쿼리파일을 실행하는 라우터
	 * @function
	 * @param {http.ClientRequest} req
	 * <code>
		{

		}
	* </code>
	*
	* @param {http.ClientResponse} res
	* <code>
		{

		}
	* </code>
	*
	* @example
	* <code>
		http://localhost:8888/getCandleDataByCd?cd=035720&startTime=20220201&endTime=20220211
	* </code>
	*/
	global.server.addRouter("/getEnergyIndex",function( req, res ){

		var routerNm = req.url.split("?")[0];
		var paramsO = paramToObject( req.url );

		res.statusCode = 200;
		res.setHeader( "Access-Control-Allow-Headers", "Content-Type" );
		res.setHeader( "Access-Control-Allow-Origin", "*" );
		res.setHeader( "Access-Control-Allow-Methods", "OPTIONS,POST,GET" );
		res.writeHead(200, {'Content-Type': 'application/json;charset=UTF-8'});
		
//		global.getEnergyIndex(function(d){
//			res.end( d )		
//		})

		var url = `https://api.stock.naver.com/marketindex/energy`;
		https.get( url, function(response){
			response.setEncoding('utf8');
			var d=""
			response.on('end', function () {
				res.end( d );
			});

			response.on('data', function (body) {
				d += body;
			});
		});

	});
				/**
	 * 쿼리파일을 실행하는 라우터
	 * @function
	 * @param {http.ClientRequest} req
	 * <code>
		{

		}
	* </code>
	*
	* @param {http.ClientResponse} res
	* <code>
		{

		}
	* </code>
	*
	* @example
	* <code>
		http://localhost:8888/getCandleDataByCd?cd=035720&startTime=20220201&endTime=20220211
	* </code>
	*/
	global.server.addRouter("/getMetalIndex",function( req, res ){

		var routerNm = req.url.split("?")[0];
		var paramsO = paramToObject( req.url );

		res.statusCode = 200;
		res.setHeader( "Access-Control-Allow-Headers", "Content-Type" );
		res.setHeader( "Access-Control-Allow-Origin", "*" );
		res.setHeader( "Access-Control-Allow-Methods", "OPTIONS,POST,GET" );
		res.writeHead(200, {'Content-Type': 'application/json;charset=UTF-8'});
		
//		global.getMetalIndex(function(d){
//			res.end( d )		
//		})

		var url = `https://api.stock.naver.com/marketindex/metals`;
		https.get( url, function(response){
			response.setEncoding('utf8');
			var d=""
			response.on('end', function () {
				res.end( d );
			});

			response.on('data', function (body) {
				d += body;
			});
		});

	});
				/**
	 * 쿼리파일을 실행하는 라우터
	 * @function
	 * @param {http.ClientRequest} req
	 * <code>
		{

		}
	* </code>
	*
	* @param {http.ClientResponse} res
	* <code>
		{

		}
	* </code>
	*
	* @example
	* <code>
		http://localhost:8888/getCandleDataByCd?cd=035720&startTime=20220201&endTime=20220211
	* </code>
	*/
	global.server.addRouter("/getAgriculturalIndex",function( req, res ){

		var routerNm = req.url.split("?")[0];
		var paramsO = paramToObject( req.url );

		res.statusCode = 200;
		res.setHeader( "Access-Control-Allow-Headers", "Content-Type" );
		res.setHeader( "Access-Control-Allow-Origin", "*" );
		res.setHeader( "Access-Control-Allow-Methods", "OPTIONS,POST,GET" );
		res.writeHead(200, {'Content-Type': 'application/json;charset=UTF-8'});
		
//		global.getAgriculturalIndex(function(d){
//			res.end( d )		
//		})

		var url = `https://api.stock.naver.com/marketindex/agricultural`;
		https.get( url, function(response){
			response.setEncoding('utf8');
			var d=""
			response.on('end', function () {
				res.end( d );
			});

			response.on('data', function (body) {
				d += body;
			});
		});
		

	});
	/**
	 * 쿼리파일을 실행하는 라우터
	 * @function
	 * @param {http.ClientRequest} req
	 * <code>
		{

		}
	* </code>
	*
	* @param {http.ClientResponse} res
	* <code>
		{

		}
	* </code>
	*
	* @example
	* <code>
		http://localhost:8888/getCandleDataByCd?cd=035720&startTime=20220201&endTime=20220211
	* </code>
	*/
	global.server.addRouter("/getIntegration",function( req, res ){

		var routerNm = req.url.split("?")[0];
		var paramsO = paramToObject( req.url );

		res.statusCode = 200;
		res.setHeader( "Access-Control-Allow-Headers", "Content-Type" );
		res.setHeader( "Access-Control-Allow-Origin", "*" );
		res.setHeader( "Access-Control-Allow-Methods", "OPTIONS,POST,GET" );
		res.writeHead(200, {'Content-Type': 'application/json;charset=UTF-8'});
	
		var url = `https://m.stock.naver.com/api/stock/005930/integration`;
		https.get( url, function(response){
			response.setEncoding('utf8');
			var d=""
			response.on('end', function () {
				res.end( d );
			});

			response.on('data', function (body) {
				d += body;
			});
		});
		

	});
	
})();

//-------------------------------------------------------;
if( console ) console.log( "[ E ] - " + fileNm + "----------" );
//-------------------------------------------------------;
