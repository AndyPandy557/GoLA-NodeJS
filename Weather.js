module.exports = function(){
    var express = require('express');
    var router = express.Router();

    /*This is the select query to display all Weather table data*/
    function getWeather(res, mysql, context, complete){
        mysql.pool.query("SELECT WEATHER.weatherID, WEATHER.currTemp, WEATHER.barometricPressure, WEATHER.windMphs FROM WEATHER", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.Weather = results;
            complete();
             });
    }

    /*Display all weather objects.*/
    router.get('/', function(req, res){
        var callbackCount = 0;
        var context = {};
        var mysql = req.app.get('mysql');
        getWeather(res, mysql, context, complete );
        function complete(){
            res.render('Weather', context);
        }
    });

    /* UPDATE a zip code, redirects to the ZipCode page after adding */
    router.post('/update', function(req, res){

        console.log(req.body);
        var mysql = req.app.get('mysql');
        var sql = "UPDATE WEATHER SET currTemp=?, barometricPressure=?, windMphs=? WHERE weatherID=?";
        var inserts = [req.body.currTemp,req.body.barometricPressure, req.body.windMphs, req.body.weatherID];
        sql = mysql.pool.query(sql,inserts,function(error, results, fields){
            if(error){
                console.log(JSON.stringify(error))
                res.write(JSON.stringify(error));
                res.end();
            }else{
                console.log ("updated");
                res.redirect('/Weather');
            }
        });
    });

    /* ADD a weather, redirects to the ZipCode page after adding */
    router.post('/add', function(req, res){

        var context = {};
        console.log("This is what's in req.body "+ req.body);
        var mysql = req.app.get('mysql');
        var sql = "INSERT INTO WEATHER (currTemp, barometricPressure, windMphs) VALUES (?,?,?)";
        var inserts = [req.body.currTemp, req.body.barometricPressure, req.body.windMphs ];
        sql = mysql.pool.query(sql,inserts,function(error, results, fields){
            if(error){
                console.log(JSON.stringify(error))
                res.write(JSON.stringify(error));
                res.end();
            }else{
                function complete(){
                    res.render('Weather', context);
                }
                console.log ("weather added");
                res.redirect('/Weather');
            }
        });
    });

/*post route for the zip code SEARCH */
    router.post('/weathersearch', function(req,res){

        var reqData = req.body.name.toString();
        var callbackCount = 0;
        var context = {};
        var mysql = req.app.get('mysql');
        getZipCodesWithNamesLike(reqData, res, mysql, context, complete );

        function complete(){
            console.log (context)
            res.send(context);
        }

    });

    return router;
}();