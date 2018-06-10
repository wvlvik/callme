const Base = require('../base.js');

module.exports = class extends Base {

	indexAction() {
		this.success();
	}

	async createwxaqrcodeAction() {
		const weixinService = this.service('weixin', 'api');
		const miniImage = await weixinService.createwxminiQrcode(this.get('id'));

		return this.success(miniImage);
	}

};
