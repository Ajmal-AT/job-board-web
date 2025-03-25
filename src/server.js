const express = require("express");
const cors = require("cors");
const { createProxyMiddleware } = require("http-proxy-middleware");

const app = express();
app.use(cors());

// Proxy middleware
app.use(
  "/api",
  createProxyMiddleware({
    target: "https://job-board-app-production.up.railway.app",
    changeOrigin: true,
    pathRewrite: {
      "^/api": "",
    },
  })
);

app.listen(5000, () => {
  console.log("Proxy server running on port 5000");
});
