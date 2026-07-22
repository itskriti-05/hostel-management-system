const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config();

const dns = require("dns");
dns.setServers(["1.1.1.1", "8.8.8.8"]);

connectDB();

const app = express();


app.use(cors({ origin: "*", credentials: true }));
app.use(express.json());

// Routes (we'll add these one by one)
app.use("/api/auth", require("./routes/auth"));
app.use("/api/student", require("./routes/student"));
app.use("/api/preference",require("./routes/preference"));
app.use("/api/complaint", require("./routes/complaint"));
app.use("/api/feedback", require("./routes/feedback"));
app.use("/api/menu", require("./routes/menu"));
app.use("/api/warden/notifications", require("./routes/notification"));
app.use("/api/warden", require("./routes/warden"));
app.use("/api/email", require("./routes/email"));
app.use("/api/matching", require("./routes/matching"));

app.get("/", (req, res) => res.send("HostelEzz API running"));

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));