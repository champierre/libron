onReadyGM = function(){}
function isChromeExtension() { return (typeof chrome == 'object') && (typeof chrome.extension == 'object') }
function chromeCompatible() {
    var localStorage ,
        isInitialized = false ,
        port = chrome.extension.connect() ;
        Connection = (function(){
            var callbackList = {} ,
                callbackId = 0 ;

            function callbackResponse ( id , response ){
                callbackList[ id ]( response );
                delete callbackList[ id ];
            }

            function registCallBack( callback ){
                callbackList[ ++callbackId ] = callback ;
                return callbackId ;
            }

            return {
                callbackResponse : callbackResponse ,
                registCallBack   : registCallBack
            };
        })();
    ;

    function onInitializedGM( response ){
        localStorage = response ;
        isInitialized = true ;

        ( onReadyGM || function(){} )();
    }

    GM_xmlhttpRequest = function( opt ) {
        var xhr = new XMLHttpRequest();
        xhr.open("GET", opt.url, true);
        xhr.onreadystatechange = function() {
          if (xhr.readyState == 4) {
            opt.onload(xhr);
          }
        }
        xhr.send();
    };

    GM_log = function ( message ){ console.log( message ); }
    GM_setValue = function ( key , value ){
        if( !isInitialized ){
            console.log( "Error" , "GM_setValue was called before finished initializing" );
            return ;
        }
        localStorage[ key ] = value ;
        port.postMessage( { action : "setValue" , args : [ key , value ] } );
    };
    GM_getValue = function ( key , def   ){
        if( !isInitialized ){
            console.log( "Error" , "GM_getValue was called before finished initializing" );
            return ;
        }

        if( localStorage[ key ] == undefined && def != undefined ){
            GM_setValue( key , def );
        }
        return localStorage[ key ] ;
    };
    GM_registerMenuCommand = function ( menuText , callbackFunction ) {};

    port.onMessage.addListener( function( res ) {
        ( Connection[ res.action ] || function(){} ).apply( Connection , res.args );
    } ) ;

    port.postMessage( { action : "initGM" , args : Connection.registCallBack( onInitializedGM ) } );
}

chromeCompatible();
