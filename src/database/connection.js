import sql from "mssql"

const dbSettings = {
  user: "admin",
  password: "root",
  server: "localhost",
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


