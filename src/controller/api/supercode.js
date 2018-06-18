const Base = require('../base.js');

module.exports = class extends Base {

	async indexAction() {
		const model = await this.model('supercode').select();

    	return this.success(model);
	}

	// 统计可用二维码生成码
	async countAction() {
		const model = await this.model('supercode').where({user_id: ''}).count();

    	return this.success(model);
	}

	// 生成二维码
	async createwxaqrcodeAction() {
		const weixinService = this.service('weixin', 'api');
		const miniImage = await weixinService.createwxminiQrcode(this.get('id'));

		return this.success(miniImage);
	}

	// 添加二维码生成码
	async addAction() {
		const model = await this.model('supercode');
		const codes = [];

		let i = this.get('num') || 10;
		let dateValues = parseInt(new Date().getTime() / 1000);
		
		while(i) {
			i--;
			codes.push({
				code: think.md5(`callme_${parseInt(Math.random() * 99999 + 99999)}_salex_${dateValues}`),
				create_date: dateValues
			});
		}
		let addDatas = await model.addMany(codes);

		return this.success('添加成功!');
	}

	// 删除全部
	async deleteAllAction() {
		const model = await this.model('supercode').delete();
		return this.success('删除成功!');
	}

};
