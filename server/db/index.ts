import { Pool } from "pg";

const uri = process.env.PG_URI;
const pool = new Pool({
  connectionString: uri,
});

export default pool;
