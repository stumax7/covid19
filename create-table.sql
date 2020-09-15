/*##########################################################################################*/
/*#                                                                                        #*/
/*#                                                                                        #*/
/*#  Sets database, drops prior version of table, creates current version of table         #*/
/*#                                                                                        #*/
/*#                                                                                        #*/
/*##########################################################################################*/

/*Change to Covid-19 database*/
USE covid19;

/*Drop existing tables if exists*/
DROP TABLE covid19DataByCounty;

/*Recreate table*/
CREATE TABLE covid19DataByCounty (
	Id 					INT 			NOT NULL 	AUTO_INCREMENT 		PRIMARY KEY,
	ReportDate 			VARCHAR(200) 	NOT NULL,
	FIPS 				VARCHAR(20), 
	County 				VARCHAR(200), 
	ProvinceState 		VARCHAR(200), 
	CountryRegion 		VARCHAR(200), 
	LastUpdate 			VARCHAR(200), 
	Lat 				VARCHAR(200), 
	Longi 				VARCHAR(200), 
	Confirmed 			INT,
	Deaths 				INT, 
	Recovered 			INT,
	Active 				INT, 
	CombinedKey 		VARCHAR(200), 
	IncidenceRate 		FLOAT, 
	CaseFatalityRatio 	FLOAT
	);
	