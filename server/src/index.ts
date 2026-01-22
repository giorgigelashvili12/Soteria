import e from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";
import { fileURLToPath } from "url";

import connectDB from "./config/db.config.js";
import router from "./routes/route.js";

const app = e();
const PORT: number = 33031;

// settings
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(e.static(path.join(__dirname, "../dist")));
app.use(cookieParser());
app.use(e.json());
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:5174",
      "http://localhost:5001",
      "https://soteria-client.onrender.com",
    ],
    credentials: true,
  }),
);

app.use((req, res, next) => {
  console.log(`Incoming Request: ${req.method} ${req.url}`);
  next();
});
// routes
app.use("/api/v1", router);

app.get("(.*)", (req, res) => {
  res.sendFile(path.join(__dirname, "../dist/index.html"));
});

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
  connectDB();
});

export default app;
