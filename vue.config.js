const path = require("path");

module.exports = {
	//"transpileDependencies": [
	//	"vuetify"
	//],
	outputDir: path.resolve(__dirname, "../src/main/resources/static"),
	publicPath: process.env.NODE_ENV === 'production'
    ? '/MliqrsysProjectt/'
    : '/'
	//assetsDir: "./resource/",
	// chainWebpack: config => {
    //     config.module
    //         .rule("vue")
    //         .use("vue-svg-inline-loader")
    //             .loader("vue-svg-inline-loader")
    //             .options({ /* ... */ });
    // }
	// devServer: {
	// 	proxy: 'https://localhost:10202/'
	// }
}