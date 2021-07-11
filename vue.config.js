module.exports = {
  chainWebpack: config => {
    config
      .plugin('html')
      .tap(args => {
        args[0].title= 'Farmaplus Kementerian Kesehatan'
        return args
      })
  },
  transpileDependencies: [
    'vuetify'
  ]
}
