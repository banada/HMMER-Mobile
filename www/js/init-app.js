/*
 * Copyright © 2012-2015, Intel Corporation. All rights reserved.
 * Please see the included README.md file for license terms and conditions.
 */


/*jslint browser:true, devel:true, white:true, vars:true */
/*global $:false, intel:false, app:false, dev:false */
/*global myEventHandler:false, cordova:false, device:false */



window.app = window.app || {} ;         // there should only be one of these...



// Set to "true" if you want the console.log messages to appear.

app.LOG = app.LOG || false ;

app.consoleLog = function() {           // only emits console.log messages if app.LOG != false
    if( app.LOG ) {
        var args = Array.prototype.slice.call(arguments, 0) ;
        console.log.apply(console, args) ;
    }
} ;



// App init point (runs on custom app.Ready event from init-dev.js).
// Runs after underlying device native code and webview/browser is ready.
// Where you should "kick off" your application by initializing app events, etc.

// NOTE: Customize this function to initialize your application, as needed.

app.initEvents = function() {
    "use strict" ;
    var fName = "app.initEvents():" ;
    app.consoleLog(fName, "entry") ;

    $('#next-btn-1').hide();
    $('#next-btn-2').hide();
    $('#reset-btn').hide();
    
    //initialize database
        var db = window.openDatabase("oar_results.db", "1.0", "oar_results", 1000000);
        //Contacts Table
        db.transaction(function(tx) {
            //Tier 1 data
            tx.executeSql('CREATE TABLE IF NOT EXISTS tier_1 (id integer primary key, species text)');
            console.log("initialized tier 1 table");
            tx.executeSql('REPLACE INTO tier_1 (id, species) VALUES (1, "H. sapiens")');
            tx.executeSql('REPLACE INTO tier_1 (id, species) VALUES (2, "M. musculus")');
            tx.executeSql('REPLACE INTO tier_1 (id, species) VALUES (3, "C. familiaris")');
            //Tier 2 data
            tx.executeSql('CREATE TABLE IF NOT EXISTS tier_2 (id integer primary key, species text)');
            console.log("initialized tier 2 table");
            tx.executeSql('REPLACE INTO tier_2 (id, species) VALUES (1, "M. domestica")');
            tx.executeSql('REPLACE INTO tier_2 (id, species) VALUES (2, "O. anatinus")');
            tx.executeSql('REPLACE INTO tier_2 (id, species) VALUES (3, "T. rubripes")');
            tx.executeSql('REPLACE INTO tier_2 (id, species) VALUES (4, "P. troglodytes")');
            tx.executeSql('REPLACE INTO tier_2 (id, species) VALUES (5, "O. aries")');
            tx.executeSql('REPLACE INTO tier_2 (id, species) VALUES (6, "R. norvegicus")');
            tx.executeSql('REPLACE INTO tier_2 (id, species) VALUES (7, "M. mulatta")');
            //Tier 3 data
            tx.executeSql('CREATE TABLE IF NOT EXISTS tier_3 (id integer primary key, species text)');
            console.log("initialized tier 3 table");
            tx.executeSql('REPLACE INTO tier_3 (id, species) VALUES (1, "C. porcellus")');
            tx.executeSql('REPLACE INTO tier_3 (id, species) VALUES (2, "A. mexicanus")');
            tx.executeSql('REPLACE INTO tier_3 (id, species) VALUES (3, "S. harrisii")');
            tx.executeSql('REPLACE INTO tier_3 (id, species) VALUES (4, "B. grunniens mutus")');
            tx.executeSql('REPLACE INTO tier_3 (id, species) VALUES (5, "H. glaber")');
            tx.executeSql('REPLACE INTO tier_3 (id, species) VALUES (6, "N. leucogenys")');
            tx.executeSql('REPLACE INTO tier_3 (id, species) VALUES (7, "I. tridecemlineatus")');
            tx.executeSql('REPLACE INTO tier_3 (id, species) VALUES (8, "L. africana")');
            tx.executeSql('REPLACE INTO tier_3 (id, species) VALUES (9, "G. gorilla gorilla")');
            tx.executeSql('REPLACE INTO tier_3 (id, species) VALUES (10, "Feline sarcoma virus")');
        });
    
    // NOTE: initialize your third-party libraries and event handlers

    // initThirdPartyLibraryNumberOne() ;
    // initThirdPartyLibraryNumberTwo() ;
    // initThirdPartyLibraryNumberEtc() ;

    // NOTE: initialize your application code

    // initMyAppCodeNumberOne() ;
    // initMyAppCodeNumberTwo() ;
    // initMyAppCodeNumberEtc() ;

    // NOTE: initialize your app event handlers, see app.js for a simple event handler example

    // TODO: configure following to work with both touch and click events (mouse + touch)
    // see http://msopentech.com/blog/2013/09/16/add-pinch-pointer-events-apache-cordova-phonegap-app/

//...overly simple example...
//    var el, evt ;
//
//    if( navigator.msPointerEnabled || !('ontouchend' in window))    // if on Win 8 machine or no touch
//        evt = "click" ;                                             // let touch become a click event
//    else                                                            // else, assume touch events available
//        evt = "touchend" ;                                          // not optimum, but works
//
//    el = document.getElementById("id_btnHello") ;
//    el.addEventListener(evt, myEventHandler, false) ;

    // NOTE: ...you can put other miscellaneous init stuff in this function...
    // NOTE: ...and add whatever else you want to do now that the app has started...
    // NOTE: ...or create your own init handlers outside of this file that trigger off the "app.Ready" event...

    app.initDebug() ;           // just for debug, not required; keep it if you want it or get rid of it
    app.hideSplashScreen() ;    // after init is good time to remove splash screen; using a splash screen is optional

    // app initialization is done
    // app event handlers are ready
    // exit to idle state and wait for app events...

    app.consoleLog(fName, "exit") ;
} ;
document.addEventListener("app.Ready", app.initEvents, false) ;



// Just a bunch of useful debug console.log() messages.
// Runs after underlying device native code and webview/browser is ready.
// The following is just for debug, not required; keep it if you want or get rid of it.

app.initDebug = function() {
    "use strict" ;
    var fName = "app.initDebug():" ;
    app.consoleLog(fName, "entry") ;

    if( window.device && device.cordova ) {                     // old Cordova 2.x version detection
        app.consoleLog("device.version: " + device.cordova) ;   // print the cordova version string...
        app.consoleLog("device.model: " + device.model) ;
        app.consoleLog("device.platform: " + device.platform) ;
        app.consoleLog("device.version: " + device.version) ;
    }

    if( window.cordova && cordova.version ) {                   // only works in Cordova 3.x
        app.consoleLog("cordova.version: " + cordova.version) ; // print new Cordova 3.x version string...

        if( cordova.require ) {                                 // print included cordova plugins
            app.consoleLog(JSON.stringify(cordova.require('cordova/plugin_list').metadata, null, 1)) ;
        }
    }

    app.consoleLog(fName, "exit") ;
} ;



// Using a splash screen is optional. This function will not fail if none is present.
// This is also a simple study in the art of multi-platform device API detection.

app.hideSplashScreen = function() {
    "use strict" ;
    var fName = "app.hideSplashScreen():" ;
    app.consoleLog(fName, "entry") ;

    // see https://github.com/01org/appframework/blob/master/documentation/detail/%24.ui.launch.md
    // Do the following if you disabled App Framework autolaunch (in index.html, for example)
    // $.ui.launch() ;

    if( navigator.splashscreen && navigator.splashscreen.hide ) {   // Cordova API detected
        navigator.splashscreen.hide() ;
    }
    if( window.intel && intel.xdk && intel.xdk.device ) {           // Intel XDK device API detected, but...
        if( intel.xdk.device.hideSplashScreen )                     // ...hideSplashScreen() is inside the base plugin
            intel.xdk.device.hideSplashScreen() ;
    }

    app.consoleLog(fName, "exit") ;
} ;
