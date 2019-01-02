module.exports = {
  devServer: {
    proxy: "http://127.0.0.1:3002"
  },
  css: {
    loaderOptions: {
      // pass Less.js Options to less-loader
      less: {
        // http://lesscss.org/usage/#less-options-strict-units `Global Variables`
        // `primary` is global variables fields name
        globalVars: {}
      }
    }
  }
}
