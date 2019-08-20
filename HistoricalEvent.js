module.exports = function(){
    var express = require('express');
    var router = express.Router();

    /*This is the select query to display Zip Code data*/
    function getHistoricalEvent(res, mysql, context, complete){
        mysql.pool.query("SELECT * FROM HISTORICAL_EVENT LEFT JOIN EVENT_REGION ON HISTORICAL_EVENT.histID=EVENT_REGION.histEventID", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.HistoricalEvent = results;

/*This is the select query to display info in the weather dropdown*/
        mysql.pool.query("SELECT zipID FROM ZIP_CODE", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.ZipCode = results;

        /*This is the select query to display info in the Historical Event  dropdown*/
        mysql.pool.query("SELECT socialID, socialName FROM SOCIAL_LOCATION", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.SocialLocation = results;
            complete();
            });
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
        getHistoricalEvent(res, mysql, context, complete );
        function complete(){

            res.render('HistoricalEvent', context);

        }
    });

    /* UPDATE a zip code, redirects to the ZipCode page after adding */
    router.post('/update', function(req, res){

        console.log ("updated");
        /*  console.log(req.body.homeworld)*/
        console.log(req.body);
        var mysql = req.app.get('mysql');
        var sql = "UPDATE HISTORICAL_EVENT SET startDate=?, description=? WHERE eventName=?";
        var inserts = [req.body.startDate, req.body.description, req.body.eventName];
        sql = mysql.pool.query(sql,inserts,function(error, results, fields){
            if(error){
                console.log(JSON.stringify(error))
                res.write(JSON.stringify(error));
                res.end();
            }else{
                /* res.send(req.body)*/
                res.redirect('/HistoricalEvent');
            }
        });
    });

    router.post('/delete', function(req,res){
        var mysql = req.app.get('mysql');
        var sql = "DELETE FROM EVENT_REGION WHERE region= ?";
        var inserts = [req.body.zipID2];
        sql = mysql.pool.query(sql, inserts, function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.status(400);
                res.end();
            }else{
                res.redirect('/HistoricalEvent');
            }
        })
    });

    /* ADD a zip code, redirects to the ZipCode page after adding */
    router.post('/add', function(req, res){

        console.log ("zipcode added");
        /*  console.log(req.body.homeworld)*/
        var context = {};
        console.log(req.body);
        var mysql = req.app.get('mysql');
        var sql = "INSERT INTO HISTORICAL_EVENT (histID, eventName, startDate, description) VALUES (0,?,?,?)";
        var inserts = [req.body.eventName, req.body.startDate, req.body.description];

        sql = mysql.pool.query(sql,inserts,function(error, results, fields){
            if(error){
                console.log(JSON.stringify(error))
                res.write(JSON.stringify(error));
                res.end();
            }
        
/* need to get the histID */
        var sqlGetID=mysql.pool.query("SELECT H.histID FROM HISTORICAL_EVENT H WHERE H.eventName=? AND H.startDate=? AND H.description=?", inserts, function(err, values){
            if (err){
                console.log(JSON.stringify(err))
                res.write(JSON.stringify(err));
                res.end();
            }
            var sqlEventRegion = "INSERT INTO EVENT_REGION (histEventID, region) VALUES (?,?)";
            var insertsEventRegion = [values[0].histID, req.body.zipCode];
            sqlEventRegion = mysql.pool.query(sqlEventRegion,insertsEventRegion,function(error, results, fields){
                if(error){
                    console.log(JSON.stringify(error))
                    res.write(JSON.stringify(error));
                    res.end();
                }
                });

            var sqlSOCIAL= "INSERT INTO LOCATION_EVENTS (socialID, histEventID) VALUES (?,?)";
            var insertsSOCIAL = [req.body.HistEvent,values[0].histID];
            sqlSOCIAL = mysql.pool.query(sqlSOCIAL,insertsSOCIAL,function(error, results, fields){
                if(error){
                    console.log(JSON.stringify(error))
                    res.write(JSON.stringify(error));
                    res.end();
                }
                else{
                    function complete(){
                        res.render('HistoricalEvent', context);
                    }
                     res.redirect('/HistoricalEvent');
                    }
         
                });
        
            
        });
            });

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