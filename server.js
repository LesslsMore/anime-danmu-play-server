import express from "express";
import path from "path";
import { createProxyMiddleware } from "http-proxy-middleware";
import history from "connect-history-api-fallback";
import "./loadEnvironment.js";
import { danmuProxy } from "./danmuProxy.js";
import { fileURLToPath } from "url";
import cors from "cors";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 10000;

app.use(cors());
app.use("/api", createProxyMiddleware({
    target: process.env.API_URL,
    changeOrigin: true,
    pathRewrite: { "^/api": "" },
}));

app.use("/proxy", danmuProxy);

app.use(history());

app.use(express.static(path.join(__dirname, "dist")));

// app.get('/*', (req, res) => {
//     res.sendFile(__dirname + '/dist/index.html')
// })

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
