const BaseRest = require('../rest.js');
const Supercode = require('./supercode');

module.exports = class extends BaseRest {
	async getAction() {
		const id = this.get('id');
		const supercode_id = this.get('supercode_id');
		const applysModel = this.model('applys');
		let model;

		if(id) {
			model = await applysModel.where({id: id}).find();
		}else if(supercode_id) {
			model = await applysModel.where({supercode_id: supercode_id}).field('id, tel, image, type').find();
		}else {
			model = await applysModel.select();
		}

		this.success(model);
	}

	async postAction() {
		const post = this.post();
		const superCode = await this.getUseSuperCode();

		if(!superCode) {
			return this.fail('缺少supercode码');
		}
		
		const data = Object.assign({}, post, {
			user_id: 121,
			supercode_id: superCode,
			create_date: parseInt(new Date().getTime() / 1000),
		});
		const add =  await this.model('applys').add(data);

		// 生成二维码
		const weixinService = this.service('weixin', 'api');
		const miniImage = await weixinService.createwxminiQrcode(superCode);


		
		this.success({codeImage: miniImage});
	}

	putAction() {

	}

	deleteAction() {

	}



	async getUseSuperCode() {
		const model = await this.model('supercode').where({user_id: 0}).find();

		if(think.isEmpty(model)) {
			return false;
		}

		return model.code;
	}
};
