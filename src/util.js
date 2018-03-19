export default{
  install(Vue,options)
  {
    Vue.prototype.getData = function (img_name) {
        // 获取图片在三端上不同的路径
	// e.g. 图片文件名是 test.jpg, 转换得到的图片地址为
	// - H5      : http: //localhost:1337/src/images/test.jpg
	// - Android : local:///test
	// - iOS     : ../images/test.jpg
		let platform = weex.config.env.platform
		let img_path = ''

		if (platform == 'Web') {
			img_path = `http://localhost:1337/src/images/${img_name}`
		} else if (platform == 'android') {
			// android 不需要后缀
			img_name = img_name.substr(0, img_name.lastIndexOf('.'));
			img_path = `local:///${img_name}`
		} else {
			img_path = `../images/${img_name}`
		}

		return img_path
    }
  }
}
