## Import libraries for CSV and database processing 
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

##ITERATE THROUGH FILE LIST
csvFileList = open('file-list.txt', 'r')    

csvReader2 = csv.reader(csvFileList, delimiter=",") 

for csvROW in csvReader2:

    fileName = csvROW[1]
    
    ReportDate = csvROW[0]
    
    csvFile = open(fileName, 'r')
    
    csvReader3 = csv.reader(csvFile, delimiter=",")

    ##FIRST PASS CHECKING ALL ELEMENTS EXIST

    ##Index to row being inspected
    rowCount = 1

    ##Error counter for row inspection
    errorCount = 0

    ## Open the data file as read only
    csvDATA = open(fileName, 'r')

    ## Identify the data file as CSV format
    csvREADER = csv.reader(csvDATA, delimiter=',')

    ## Process each row in CSV file
    for csvROW in csvREADER:
        
        try:
            testData = csvROW[elementsInRow]
        except:
            errorCount = errorCount + 1
            print("Missing elements in row " + str(rowCount) + ": " + str(errorCount)) 
        
        #Increment variable
        rowCount = rowCount + 1
        
        
    ## Close the data file
    csvDATA.close()
        
    if errorCount > 0:
        exit()
    else:
        print("All elements present")
        
    ##SECOND PASS: LOAD DATA  
        
    ## Open the data file as read only
    csvDATA = open(fileName, 'r')

    ## Identify the data file as CSV format
    csvREADER = csv.reader(csvDATA, delimiter=',')

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
        
        
        ## Insert columns into table
        dbCURSOR.execute("INSERT INTO covid19DataByCounty (ReportDate, FIPS, County, ProvinceState, CountryRegion, LastUpdate, Lat, Longi, \
            Confirmed, Deaths, Recovered, Active, CombinedKey, IncidenceRate, CaseFatalityRatio) \
            VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)", \
            (ReportDate, FIPS, County, ProvinceState, CountryRegion, LastUpdate, Lat, Longi, Confirmed, \
            Deaths, Recovered, Active, CombinedKey, IncidenceRate, CaseFatalityRatio))
        dbCONNECT.commit()
    
    ## Close the data file
    csvDATA.close()

## Provide record counts and hash totals
dbCURSOR.execute("SELECT ReportDate, COUNT(County) AS countCounty, SUM(Confirmed) AS sumConfirmed, SUM(Deaths) AS sumDeaths, \
SUM(Recovered) AS sumRecovered, SUM(Active) AS sumActive FROM covid19DataByCounty GROUP BY ReportDate")
    
##print("Counties reporting:")
##countCounty, sumConfirmed, sumDeaths, sumRecovered, sumActive = dbCURSOR.fetchall()
totals = dbCURSOR.fetchall()
for x in totals:
    repDa, countCounty, sumConfirmed, sumDeaths, sumRecovered, sumActive = x
    print("Report Date: ")
    print(repDa)
    print("Counties reporting:")
    print(countCounty)
    print("Total confirmed cases:") 
    print(sumConfirmed)
    print("Total deaths:")
    print(sumDeaths)
    print("Total recovered:")
    print(sumRecovered)
    print("Total active:")
    print(sumActive)
