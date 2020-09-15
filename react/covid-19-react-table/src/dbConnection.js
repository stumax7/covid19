const mariadb = require('mariadb');
  const pool = mariadb.createPool({
       host: '192.168.158.36', 
       user:'admin', 
       password: 'password',
       connectionLimit: 5
  });
  async function asyncFunction() {
    let conn;
    try {
      conn = await pool.getConnection();
      const rows = await conn.query("SELECT * FROM covid19DataByCounty");
      console.log('Connected!')
      console.log(rows); 
      
    } catch (err) {
      throw err;
    } finally {
      if (conn) return conn.end();
    }
  }


