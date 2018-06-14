const crypto = require('crypto');
const md5 = require('md5');
const Axios = require('axios');
const fs = require('fs');

module.exports = class extends think.Service {

	/**
	* 解析微信登录用户数据
	* @param sessionKey
	* @param encryptedData
	* @param iv
	* @returns {Promise.<string>}
	*/
	async decryptUserInfoData(sessionKey, encryptedData, iv) {
		// base64 decode
		const _sessionKey = Buffer.from(sessionKey, 'base64');
		encryptedData = Buffer.from(encryptedData, 'base64');
		iv = Buffer.from(iv, 'base64');
		let decoded = '';
		try {
			// 解密
			const decipher = crypto.createDecipheriv('aes-128-cbc', _sessionKey, iv);
			// 设置自动 padding 为 true，删除填充补位
			decipher.setAutoPadding(true);
			decoded = decipher.update(encryptedData, 'binary', 'utf8');
			decoded += decipher.final('utf8');

			decoded = JSON.parse(decoded);
		} catch (err) {
			return '';
		}

		if (decoded.watermark.appid !== think.config('weixin.appid')) {
			return '';
		}

		return decoded;
	}


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
