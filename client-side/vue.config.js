const { defineConfig } = require("@vue/cli-service");

module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    port: 8080,
    proxy: {
      "^/api": {
        changeOrigin: true,
        target: "https://comboard-service.onrender.com",
      },
    },
  },
});
