const Axios = require('axios');

const fs = require('fs');

module.exports = class extends think.Service {

	async getTokenCode() {

		const response = await Axios.get('https://api.weixin.qq.com/cgi-bin/token?grant_type='+ think.config('weixinmini.grant_type') +'&appid='+ think.config('weixinmini.appid') +'&secret='+ think.config('weixinmini.secret'));

		return {
			access_token: response.data.access_token
		};

	}


	async createwxminiQrcode(suppercode) {
		const token = await this.getTokenCode();

		const image = await Axios({
			method:'post',
			url: 'https://api.weixin.qq.com/wxa/getwxacode?access_token=' + token.access_token,
			responseType: 'stream',
			data: { "path": "pages/index/index?id=" + suppercode, "width": 430 }
		})
		.then(function(response) {
			return response.data.pipe(fs.createWriteStream('www/uploads/' + suppercode + '.jpg'));
		});

		return suppercode + '.jpg';

	}

};
