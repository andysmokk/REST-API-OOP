const { connect } = require("mongoose");

const connectDB = async () => {
  const uri = process.env.URI_DB;
  const db = await connect(uri);
  const { host, port, name } = db.connection;
  console.log(
    `Database '${name}' connection successful for port: ${port}, host: ${host}`
      .cyan
  );
};

module.exports = connectDB;
