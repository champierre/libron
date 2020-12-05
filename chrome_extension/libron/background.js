window.onload = init

var CMD = {
    xhr : xhr ,
    initGM : initGM ,
    setValue : setValue
} ;

function init() {
    chrome.extension.onConnect.addListener(function(port) {
        port.onMessage.addListener( function( message , con ) {
            var args = message.args ;
            if( !( args instanceof Array ) ){ args = [ args ]; }

            args.push( con );
            (CMD[ message.action ]||function(){}).apply( CMD , args ) ;
        });
    });

    chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
      if (request.contentScriptQuery == "queryLibraries") {
        var url = "https://api.calil.jp/library?appkey=" + encodeURIComponent(request.appkey) + "&pref=" + encodeURIComponent(request.prefecture) + "&format=json";
        fetch(url)
          .then(response => response.text())
          .then(text => {
            var match = text.match(/^callback\((.*)\);(\n)*$/);
            return match[1];
          })
          .then(libraries => sendResponse(libraries))
          .catch(error => {
            console.error(error);
          })
        return true;  // Will respond asynchronously.
      } else if (request.contentScriptQuery == "queryCities") {
        var url = "https://calil.jp/city_list";
        fetch(url)
          .then(response => response.text())
          .then(text => {
            var match = text.match(/^loadcity\((.*)\);(\n)*$/);
            return match[1];
          })
          .then(cities => sendResponse(cities))
          .catch(error => {
            console.error(error);
          })
        return true;  // Will respond asynchronously.
      } else if (request.contentScriptQuery == "queryAvailabilityInLibrary") {
        var url = "https://api.calil.jp/check?appkey=" + encodeURIComponent(request.appkey) + "&isbn=" + request.isbns + "&systemid=" + encodeURIComponent(request.selectedSystemId) + "&format=json";
        if (request.session) {
          url = "https://api.calil.jp/check?appkey=" + encodeURIComponent(request.appkey) + "&session=" + encodeURIComponent(request.session) + "&format=json";
        }
        fetch(url)
          .then(response => response.text())
          .then(text => {
            var match = text.match(/^callback\((.*)\);$/);
            return match[1];
          })
          .then(json => sendResponse(json))
          .catch(error => {
            console.error(error);
          })
        return true;  // Will respond asynchronously.
      }
    });
}

//GM_xmlhttpRequest
function xhr( opt , callbackid , con ) {
    var xhr = new XMLHttpRequest()
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4) {
            callback( con , callbackid , [ xhr ] );
        }
    }
    xhr.open( opt.method , opt.url , true)
    xhr.send(null)
    return xhr
}


//GM_setValue
function setValue( key , value ){
    localStorage[ key ] = value ;
}


function initGM ( callbackid , con ){
    callback( con , callbackid , localStorage );
}


function callback( con , callbackid , args ){
    if( !( args instanceof Array ) ){ args = [ args ] ; }
    args.unshift( callbackid );
    con.postMessage( { action : "callbackResponse" , args : args } );
}
