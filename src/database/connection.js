import sql from "mssql"

const dbSettings = {
  user: "sqlserver",
  password: "5052005",
  server: "34.123.162.100",
  database: "PROYECTO",
  options: {
    encrypt: false,
    trustServerCertificate: true,
  }
}

export const getConnection = async () => {
  try {
    const pool = await sql.connect(dbSettings);
    return pool;
  } catch (error) {
    console.error(error);
  }
};


