module.exports = function(){
    var express = require('express');
    var router = express.Router();

    function getSocialLocation(res, mysql, context, complete){

        mysql.pool.query("SELECT * FROM SOCIAL_LOCATION", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.SocialLocation = results;

            /*This is the select query to display info in the ZipCode  dropdown*/
            mysql.pool.query("SELECT zipID FROM ZIP_CODE", function(error, results, fields){
                if(error){
                    res.write(JSON.stringify(error));
                    res.end();
                }
                context.ZipCode = results;

        /*This is the select query to display info in the Historical Event  dropdown*/
        mysql.pool.query("SELECT histID, eventName FROM HISTORICAL_EVENT", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.HistoricalEvent = results;
            complete();
                 });
             });
        });

    }

    /*Display all social locations.*/
    router.get('/', function(req, res){
        var callbackCount = 0;
        var context = {};
        var mysql = req.app.get('mysql');
        getSocialLocation(res, mysql, context, complete );
        function complete(){
            res.render('SocialLocation', context);

        }
    });

    /* UPDATE a social location, redirects to the Social Location page after adding */
    router.post('/update', function(req, res){

        console.log ("updated");
        /*  console.log(req.body.homeworld)*/
        console.log(req.body);
        var mysql = req.app.get('mysql');
        var sql = "UPDATE SOCIAL_LOCATION SET priceRange=?, businessType=?, streetAddress=?, zipRegion=? WHERE socialName=?";
        var inserts = [req.body.priceRange,req.body.businessType, req.body.streetAddress,req.body.zipCode,req.body.socialName];
        var sqlNULL = "UPDATE SOCIAL_LOCATION SET priceRange=?, businessType=?, streetAddress=?, zipRegion=NULL WHERE socialName=?";
        var insertsNULL = [req.body.priceRange,req.body.businessType, req.body.streetAddress,req.body.socialName];
        
        if (req.body.zipCode=='NULL'){
            sql=sqlNULL;
            inserts=insertsNULL;
        }
        sql = mysql.pool.query(sql,inserts,function(error, results, fields){
            if(error){
                console.log(JSON.stringify(error))
                res.write(JSON.stringify(error));
                res.end();
            }else{
                /* res.send(req.body)*/
                res.redirect('/SocialLocation');
            }
        });
    });

    /* ADD a social location redirects to the SL page after adding */
    router.post('/add', function(req, res){

        console.log ("social location added");
        /*  console.log(req.body.homeworld)*/
        var context = {};
        console.log(req.body);
        var mysql = req.app.get('mysql');
        var sql = "INSERT INTO SOCIAL_LOCATION (socialID, socialName, priceRange, businessType,streetAddress,zipRegion) VALUES (0,?,?,?,?,?)";
        var inserts = [req.body.socialName, req.body.priceRange, req.body.businessType, req.body.streetAddress, req.body.zipCode];
        sql = mysql.pool.query(sql,inserts,function(error, results, fields){
            if(error){
                console.log(JSON.stringify(error))
                res.write(JSON.stringify(error));
                res.end();
            }
            else{
                function complete(){
                    res.render('SocialLocation', context);
                }
                res.redirect('/SocialLocation');
            }
        });
    });

    return router;
}();