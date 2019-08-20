module.exports = function(){
    var express = require('express');
    var router = express.Router();

    /*This is the select query to display Zip Code data*/
    function getZipCodes(res, mysql, context, complete){
        mysql.pool.query("SELECT ZIP_CODE.zipID, areaName, weatherArea FROM ZIP_CODE", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.ZipCode = results;

        mysql.pool.query("SELECT weatherID, currTemp FROM WEATHER", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.Weather  = results;

            complete();
             });
        });
    }

    /* Find zip codes whose areaName starts with a given string in the req */
    function getZipCodesWithNamesLike(data, res, mysql, context, complete) {
       /* console.log("this is what's in the request " +data);*/
        mysql.pool.query("SELECT ZIP_CODE.zipID, areaName, weatherArea " +
            "FROM ZIP_CODE WHERE ZIP_CODE.areaName LIKE \'" +
            data + "%\'", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.ZipCode = results;
            console.log ("Here are the query results"+ context.ZipCode);
            complete();
        });
    }

    /*Display all zipcodes. Requires web based javascript to delete users with AJAX*/
    router.get('/', function(req, res){
        var callbackCount = 0;
        var context = {};
        var mysql = req.app.get('mysql');
        getZipCodes(res, mysql, context, complete );
        function complete(){

            res.render('ZipCode', context);

        }
    });

    /* UPDATE a zip code, redirects to the ZipCode page after adding */
    router.post('/update', function(req, res){

        console.log ("updated");
        /*  console.log(req.body.homeworld)*/
        console.log(req.body);
        var mysql = req.app.get('mysql');
        var sql = "UPDATE ZIP_CODE SET areaName=?, weatherArea=? WHERE zipID=?";
        var inserts = [req.body.areaName,req.body.weatherArea, req.body.zipID];
        sql = mysql.pool.query(sql,inserts,function(error, results, fields){
            if(error){
                console.log(JSON.stringify(error))
                res.write(JSON.stringify(error));
                res.end();
            }else{
                /* res.send(req.body)*/
                res.redirect('/ZipCode');
            }
        });
    });

    /* ADD a zip code, redirects to the ZipCode page after adding */
    router.post('/add', function(req, res){

        console.log ("zipcode added");
        /*  console.log(req.body.homeworld)*/
        var context = {};
        console.log(req.body);
        var mysql = req.app.get('mysql');
        var sql = "INSERT INTO ZIP_CODE (zipID, areaName, weatherArea) VALUES (?,?,?)";
        var inserts = [req.body.zipID, req.body.areaName, req.body.weatherArea];
        sql = mysql.pool.query(sql,inserts,function(error, results, fields){
            if(error){
                console.log(JSON.stringify(error))
                res.write(JSON.stringify(error));
                res.end();
            }else{

                function complete(){

                    res.render('ZipCode', context);
                }
                res.redirect('/ZipCode');
            }
        });
    });

    /*post route for the zip code DELETE */
    router.post('/delete', function(req,res){
        var mysql = req.app.get('mysql');
        var sql = "DELETE FROM ZIP_CODE WHERE zipID= ?";
        var inserts = [req.body.zipID];
        sql = mysql.pool.query(sql, inserts, function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.status(400);
                res.end();
            }else{
                res.redirect('/ZipCode');
            }
        })
    });

/*post route for the zip code SEARCH */
    router.post('/zipsearch', function(req,res){

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