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
		const _this = this;

		// 查询是否已经生成
		const sc = await this.model('supercode').where({code: suppercode}).find();

		if(!sc.user_id) {
			const image = await Axios({
				method: 'post',
				url: 'https://api.weixin.qq.com/wxa/getwxacode?access_token=' + token.access_token,
				responseType: 'stream',
				data: { "path": "pages/index/index?id=" + suppercode, "width": 430 }
			})
			.then(function(response) {
				// 更新数据
				const update =  _this.model('supercode').where({id: sc.id}).update({user_id: 11});
				console.log('---------------add---------------');

				return response.data.pipe(fs.createWriteStream('www/uploads/code/' + suppercode + '.jpg'));
			});
		}
		

		return suppercode + '.jpg';
	}

};
