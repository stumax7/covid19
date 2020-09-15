import java.io.Reader;
import java.sql.*;

public class Mariadb {
    // JDBC driver name and database URL

    static final String JDBC_DRIVER = "org.mariadb.jdbc.Driver";
    static final String DB_URL = "jdbc:mariadb://192.168.158.36/covid19";

    //  Database credentials
    static final String USER = "admin";
    static final String PASS = "password";

    public static void main(String[] args) {
        Connection conn = null;
        Statement stmt = null;
        try {
            //STEP 2: Register JDBC driver
            Class.forName("org.mariadb.jdbc.Driver");

            //STEP 3: Open a connection
            System.out.println("Connecting to a selected database...");
            conn = DriverManager.getConnection(
                    "jdbc:mariadb://192.168.158.36/covid19", "admin", "password");
            System.out.println("Connected database successfully...");

            //STEP 4: Execute a query
            System.out.println("Creating table in given database...");
            stmt = conn.createStatement();

            ResultSet result = stmt.executeQuery("SELECT * FROM covid19DataByCounty");

            while(result.next()) {
                int id = result.getInt("Id");
                String reportDate = result.getString("ReportDate");
                String fips = result.getString("FIPS");
                String county = result.getString("County");
                String provinceState = result.getString("ProvinceState");
                String countryRegion = result.getString("CountryRegion");
                String lastUpdate = result.getString("LastUpdate");
                String lat = result.getString("Lat");
                String longi = result.getString("Longi");
                int confirmed = result.getInt("Confirmed");
                int deaths = result.getInt("Deaths");
                int recovered = result.getInt("Recovered");
                int active = result.getInt("Active");
                String combinedKey = result.getString("CombinedKey");
                float incidenceRatio = result.getFloat("IncidenceRate");
                float caseFatalityRatio = result.getFloat("CaseFatalityRatio");

////                System.out.println(id + "\t" + reportDate + "\t" + fips + "\t" + county + "\t" + provinceState + "\t" +
////                        countryRegion + "\t" + lastUpdate + "\t" + lat + "\t" + longi + "\t" + confirmed + "\t" + deaths
////                        + "\t" + recovered + "\t" + active + "\t" + combinedKey + "\t" + incidenceRatio + "\t" + caseFatalityRatio);
            }

            ResultSet result2 = stmt.executeQuery("SELECT ReportDate, ProvinceState, COUNT(ProvinceState) as countProvinceState, SUM(Confirmed) as sumConfirmed FROM covid19DataByCounty WHERE ReportDate BETWEEN '2020-07-01' AND '2020-07-02' GROUP BY ProvinceState");

            while(result2.next()){
                String reportDate = result2.getString("ReportDate");
                String provinceState = result2.getString("ProvinceState");
                int countPS = result2.getInt("countProvinceState");
                int sumConf = result2. getInt("sumConfirmed");

                System.out.println(reportDate + "\t" + provinceState + "\t" + "Counties reporting: " + countPS + "\t" + "Total confirmed cases: " + sumConf);
            }

        } catch (SQLException se) {
            //Handle errors for JDBC
            se.printStackTrace();
        } catch (Exception e) {
            //Handle errors for Class.forName
            e.printStackTrace();
        } finally {
            //finally block used to close resources
            try {
                if (stmt != null) {
                    conn.close();
                }
            } catch (SQLException se) {
            }// do nothing
            try {
                if (conn != null) {
                    conn.close();
                }
            } catch (SQLException se) {
                se.printStackTrace();
            }//end finally try
        }//end try
        System.out.println("Goodbye!");
    }//end main
}//end JDBCExample