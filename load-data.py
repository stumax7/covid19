## Import libraries for URL, CSV and database processing 
import urllib.request as urlget
import csv as csv
import mariadb as mariadb

## Open the DB Connect File - INI File with rows containing uid, password, db name
dbDETAILS = open('DB-Details.ini', 'r')

## Read uid
dbUSER = dbDETAILS.readline()[9:24].strip()

## Read password
dbPASSWORD = dbDETAILS.readline()[9:24].strip()

## Read database name
dbNAME = dbDETAILS.readline()[9:24].strip()

## Read host name/address
dbHOST = dbDETAILS.readline()[9:24].strip()

## Read database port
dbPORT = int(dbDETAILS.readline()[9:24])

## Open connection to database and obtain cursor
dbCONNECT = mariadb.connect(user = dbUSER, password = dbPASSWORD, database = dbNAME, host = dbHOST, port = dbPORT)
dbCURSOR = dbCONNECT.cursor()

## Open the URL data file as read only
csvURLDATA = open('aug1.txt', 'r')

## Identify the URL data file as CSV format
csvREADER = csv.reader(csvURLDATA, delimiter=',')

## Process each row in CSV file
for csvROW in csvREADER:
    
    FIPS = csvROW[0].isnumeric()
    if FIPS == False:
        FIPS = " "
    
    County = isinstance(csvROW[1], str)
    if County == False:
        County = " "
    
    ProvinceState = isinstance(csvROW[2], str)
    if ProvinceState == False:
        ProvinceState = " "
        
    CountryRegion = isinstance(csvROW[3], str)
    if CountryRegion == False:
        CountryRegion = " "
    
    LastUpdate = isinstance(csvROW[4], str)
    if LastUpdate == False:
        LastUpdate = " "
    
    Lat = csvROW[5].isnumeric()
    if Lat == False:
        Lat = " "
        
    Longi = csvROW[6].isnumeric()
    if Longi == False:
        Longi = " "
    
    Confirmed = csvROW[7].isnumeric()
    if Confirmed == False:
       Confirmed  = " "
    
    Deaths = csvROW[8].isnumeric()
    if Deaths == False:
        Deaths = " "
        
    Recovered = csvROW[9].isnumeric()
    if Recovered == False:
        Recovered = " "
        
    Active = csvROW[10].isnumeric()
    if Active == False:
        Active = " "
        
    CombinedKey = isinstance(csvROW[11], str)
    if CombinedKey == False:
        CombinedKey = " "
        
    IncidenceRate = csvROW[12].isnumeric()
    if IncidenceRate == False:
        IncidenceRate = " "
        
    CaseFatalityRatio = csvROW[13].isnumeric()
    if CaseFatalityRatio == False:
        CaseFatalityRatio = " "
    
    ## Insert bank name, routing number and routing-numbers.com URL into rtnDetail table
    dbCURSOR.execute("INSERT INTO covid19DataByCounty (FIPS, County, ProvinceState, CountryRegion, LastUpdate, Lat, Longi, Confirmed, Deaths, Recovered, Active, CombinedKey, IncidenceRate, CaseFatalityRatio) VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)", (csvROW[0], csvROW[1], csvROW[2], csvROW[3], csvROW[4], csvROW[5], csvROW[6], csvROW[7], csvROW[8], csvROW[9], csvROW[10], csvROW[11], csvROW[12], csvROW[13]))
    dbCONNECT.commit()
    
## Close the URL data file
csvURLDATA.close()
