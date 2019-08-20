/*GoLA DMQ 3_17_2019 SELECT, INSERT, UPDATE and DELETE SQL Queries USED */

/*Read Queries (SELECT) Used in table displays and drop-down menus*/

/*Display ZipCode for drop-down*/
SELECT ZIP_CODE.zipID, areaName, weatherArea FROM ZIP_CODE
/*used for search function on the ZipCode page*/
SELECT ZIP_CODE.zipID, areaName, weatherArea FROM ZIP_CODE WHERE ZIP_CODE.areaName LIKE + data + "%"
/*This is the select query to display info in all ZipCode dropdowns*/
SELECT zipID FROM ZIP_CODE

/*Display table of Weather*/
SELECT WEATHER.weatherID, WEATHER.currTemp, WEATHER.barometricPressure, WEATHER.windMphs FROM WEATHER
/*Display Weather for drop-down*/
SELECT weatherID, currTemp FROM WEATHER

/*This is the select query to display info in the Historical Event dropdown*/
SELECT histID, eventName FROM HISTORICAL_EVENT
/*Display table  of Historical Event page*/
SELECT * FROM HISTORICAL_EVENT LEFT JOIN EVENT_REGION ON HISTORICAL_EVENT.histID=EVENT_REGION.histEventID


/*Update Queries (UPDATE)*/
-- change ZipCode using Update
UPDATE ZIP_CODE SET areaName=?, weatherArea=? WHERE zipID=?
-- change Weather using Update
UPDATE WEATHER SET currTemp=?, barometricPressure=?, windMphs=? WHERE weatherID=?
-- change SocialLocation using Update
UPDATE SOCIAL_LOCATION SET priceRange=?, businessType=?, streetAddress=?, zipRegion=NULL WHERE socialName=?


/*Create Queries (INSERT) Used in table displays*/
-- create a zip code row for Add
INSERT INTO ZIP_CODE (zipID, areaName, weatherArea) VALUES (?,?,?)
-- create a new weather object for Add
INSERT INTO WEATHER (currTemp, barometricPressure, windMphs) VALUES (?,?,?)
-- create a new social location object for Add
INSERT INTO SOCIAL_LOCATION (socialID, socialName, priceRange, businessType,streetAddress,zipRegion) VALUES (0,?,?,?,?,?)
-- create a new historical event object for Add
INSERT INTO HISTORICAL_EVENT (histID, eventName, startDate, description) VALUES (0,?,?,?)
-- create a new relationship row
INSERT INTO EVENT_REGION (histEventID, region) VALUES (?,?)

/*Delete Queries (DELETE FROM... WHERE)*/
-- delete a Zip code
DELETE FROM ZIP_CODE WHERE zipID= ?

