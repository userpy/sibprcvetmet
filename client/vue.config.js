module.exports = {
  "transpileDependencies": [
    "vuetify"
  ],
  devServer: {
    proxy: {
      '^/api': {
        target: 'http://server:3000',
        changeOrigin: true
      }
    }
  }
}