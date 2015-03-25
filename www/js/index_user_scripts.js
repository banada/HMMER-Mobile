(function()
{
 "use strict";
 /*
   hook up event handlers 
 */
 function register_event_handlers()
 {
    
     
     
     /* button  #search_btn */
    $(document).on("click", "#search_btn", function(evt)
    {
        $('#search_btn').hide();
        $('#next-btn-1').show();
        //CANVAS SIZE
        var canvas_width = 375;
        var canvas_height = 375;
        
        /*//initialize database
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
        });*/
        
        var canvas = document.getElementById("canvas_1");
        var context = canvas.getContext("2d");
        context.rect(0,0,canvas_width,canvas_height);
        context.stroke();
        
        context.font = "18px Georgia";
        
        //Source node
        context.beginPath();
        context.arc(0.25*canvas_width,0.50*canvas_height,15,0,2*Math.PI);
        context.stroke();
        context.fillText("Query", 0.20*canvas_width, 0.50*canvas_height+0.08*canvas_height);
                
        //Tier 1 nodes
        var db = window.openDatabase("oar_results.db", "1.0", "oar_results", 1000000);
        db.transaction(function(tx) {
            tx.executeSql('SELECT * FROM tier_1', [], function (tx, res) {
                for (var i=0; i<res.rows.length; i++) {
                    //console.log(res.rows.item(i).id);
                    //Draw circle
                    context.beginPath();
                    context.arc(0.75*canvas_width, 0.25*res.rows.item(i).id*canvas_height, 15, 0, 2*Math.PI);
                    context.stroke();
                    //Draw text
                    context.fillText(res.rows.item(i).species, 0.70*canvas_width, 0.25*res.rows.item(i).id*canvas_height+0.08*canvas_height);
                    //Draw line from source
                    context.beginPath();
                    context.moveTo(0.25*canvas_width, 0.50*canvas_height);
                    context.lineTo(0.75*canvas_width, 0.25*res.rows.item(i).id*canvas_height);
                    context.stroke();
                }
            });
        });
        
    });
    
        /* button  #next-btn */
    $(document).on("click", "#next-btn-1", function(evt)
    {
        $('#next-btn-1').hide();
        $('#next-btn-2').show();
        //CANVAS SIZE
        var canvas_width = 375;
        var canvas_height = 375;
        
        var canvas = document.getElementById("canvas_1");
        var context = canvas.getContext("2d");
        
        //Clear canvas
        context.clearRect(0, 0, canvas_width, canvas_height);
        
        context.font = "18px Georgia";
        context.rect(0,0,canvas_width,canvas_height);
        context.stroke();
        
        //Tier 1 node
        context.beginPath();
        context.arc(0.25*canvas_width,0.50*canvas_height,15,0,2*Math.PI);
        context.stroke();
        context.fillText("H. sapiens", 0.20*canvas_width, 0.50*canvas_height+0.08*canvas_height);
        
        //Tier 1 nodes
        var db = window.openDatabase("oar_results.db", "1.0", "oar_results", 1000000);
        db.transaction(function(tx) {
            tx.executeSql('SELECT * FROM tier_2', [], function (tx, res) {
                for (var i=0; i<res.rows.length; i++) {
                    //console.log(res.rows.item(i).id);
                    //Draw circle
                    context.beginPath();
                    context.arc(0.75*canvas_width, 0.125*res.rows.item(i).id*canvas_height, 15, 0, 2*Math.PI);
                    context.stroke();
                    //Draw text
                    context.fillText(res.rows.item(i).species, 0.70*canvas_width, 0.125*res.rows.item(i).id*canvas_height+0.08*canvas_height);
                    //Draw line from source
                    context.beginPath();
                    context.moveTo(0.25*canvas_width, 0.50*canvas_height);
                    context.lineTo(0.75*canvas_width, 0.125*res.rows.item(i).id*canvas_height);
                    context.stroke();
                }
            });
        });
        
        
    });
    
        /* button  #next-btn-2 */
    $(document).on("click", "#next-btn-2", function(evt)
    {
        $('#next-btn-2').hide();
        $('#reset-btn').show();
        //CANVAS SIZE
        var canvas_width = 375;
        var canvas_height = 375;
        
        var canvas = document.getElementById("canvas_1");
        var context = canvas.getContext("2d");
        
        //Clear canvas
        context.clearRect(0, 0, canvas_width, canvas_height);
        
        context.font = "12px Georgia";
        context.rect(0,0,canvas_width,canvas_height);
        context.stroke();
        
        //Tier 1 node
        context.beginPath();
        context.arc(0.25*canvas_width,0.50*canvas_height,15,0,2*Math.PI);
        context.stroke();
        context.fillText("R. norvegicus", 0.20*canvas_width, 0.50*canvas_height+0.08*canvas_height);
        
        //Tier 1 nodes
        var db = window.openDatabase("oar_results.db", "1.0", "oar_results", 1000000);
        db.transaction(function(tx) {
            tx.executeSql('SELECT * FROM tier_3', [], function (tx, res) {
                for (var i=0; i<res.rows.length; i++) {
                    //console.log(res.rows.item(i).id);
                    //Draw circle
                    context.beginPath();
                    context.arc(0.75*canvas_width, 0.09*res.rows.item(i).id*canvas_height, 10, 0, 2*Math.PI);
                    context.stroke();
                    //Draw text
                    context.fillText(res.rows.item(i).species, 0.70*canvas_width, 0.09*res.rows.item(i).id*canvas_height+0.05*canvas_height);
                    //Draw line from source
                    context.beginPath();
                    context.moveTo(0.25*canvas_width, 0.50*canvas_height);
                    context.lineTo(0.75*canvas_width, 0.09*res.rows.item(i).id*canvas_height);
                    context.stroke();
                }
            });
        });

    });
    
        /* button  #reset-btn */
    $(document).on("click", "#reset-btn", function(evt)
    {
        $('#reset-btn').hide();
   
        //CANVAS SIZE
        var canvas_width = 375;
        var canvas_height = 375;
        
        var canvas = document.getElementById("canvas_1");
        var context = canvas.getContext("2d");
        //Clear canvas
        context.clearRect(0, 0, canvas_width, canvas_height);
        $('#search_btn').click();
    });
    
    }
 document.addEventListener("app.Ready", register_event_handlers, false);
})();
