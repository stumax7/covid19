## Import libraries for URL, CSV and database processing 
import urllib.request as urlget
import csv as csv
import mariadb as mariadb

## CONTSTANT: Number of elements in CSV row
elementsInRow = 13

##Function definition
def floatTest(elementValue):
    try:
        result = float(elementValue)
    except:
        result = float(0.0)
    return result;

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

##FIRST PASS CHECKING ALL ELEMENTS EXIST

##Index to row being inspected
rowCount = 1

##Error counter for row inspection
errorCount = 0

## Open the URL data file as read only
csvURLDATA = open('aug1.txt', 'r')

## Identify the URL data file as CSV format
csvREADER = csv.reader(csvURLDATA, delimiter=',')

## Process each row in CSV file
for csvROW in csvREADER:
    
    try:
        testData = csvROW[elementsInRow]
    except:
        errorCount = errorCount + 1
        print("Missing elements in row " + str(rowCount) + ": " + str(errorCount)) 
    
    #Increment variable
    rowCount = rowCount + 1
    
    
## Close the URL data file
csvURLDATA.close()
    
if errorCount > 0:
    exit()
else:
    print("All elements present")
    
##SECOND PASS: LOAD DATA
    
## Open the URL data file as read only
csvURLDATA = open('aug1.txt', 'r')

## Identify the URL data file as CSV format
csvREADER = csv.reader(csvURLDATA, delimiter=',')

##Reset row count
rowCount = 1

## Process each row in CSV file
for csvROW in csvREADER:
    
    ##Error-check each column
    FIPS = csvROW[0].strip()
    
    County = csvROW[1].strip()
    
    ProvinceState = csvROW[2].strip()
        
    CountryRegion = csvROW[3].strip()
    
    LastUpdate = csvROW[4].strip()
    
    Lat = csvROW[5].strip()
        
    Longi = csvROW[6].strip()
    
    if csvROW[7].isnumeric():
       Confirmed  = csvROW[7]
    else: 
       Confirmed = 0
    
    if csvROW[8].isnumeric():
        Deaths = csvROW[8]
    else:
        Deaths = 0
        
    if csvROW[9].isnumeric():
        Recovered = csvROW[9]
    else:
        Recovered = 0
    
    if csvROW[10].isnumeric():
        Active = csvROW[10]
    else:
        Active = 0
        
    CombinedKey = csvROW[11].strip()
        
    IncidenceRate = floatTest(csvROW[12]);    
    
    CaseFatalityRatio = floatTest(csvROW[13]);
    
    
    ## Insert bank name, routing number and routing-numbers.com URL into rtnDetail table
    dbCURSOR.execute("INSERT INTO covid19DataByCounty (FIPS, County, ProvinceState, CountryRegion, LastUpdate, Lat, Longi, \
        Confirmed, Deaths, Recovered, Active, CombinedKey, IncidenceRate, CaseFatalityRatio) \
        VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)", \
        (FIPS, County, ProvinceState, CountryRegion, LastUpdate, Lat, Longi, Confirmed, \
        Deaths, Recovered, Active, CombinedKey, IncidenceRate, CaseFatalityRatio))
    dbCONNECT.commit()
    
## Close the URL data file
csvURLDATA.close()

