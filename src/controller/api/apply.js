const BaseRest = require('../rest.js');
const Supercode = require('./supercode');

module.exports = class extends BaseRest {
	async getAction() {
		const id = this.get('id');
		const supercode_id = this.get('supercode_id');
		const user_id = this.get('user_id');

		const applysModel = this.model('applys');
		let model;

		if(id) {
			model = await applysModel.where({id: id}).find();
		}else if(supercode_id) {
			model = await applysModel.where({supercode_id: supercode_id}).field('id, name, tel, image, type').find();
		}else if(user_id) {
			model = await applysModel.where({user_id: user_id}).field('id, name, tel, image, type').order('id DESC').select();
		}else {
			model = await applysModel.order('id DESC').select();
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
			supercode_id: superCode,
			create_date: parseInt(new Date().getTime() / 1000),
		});
		const add =  await this.model('applys').add(data);

		// 生成二维码
		const weixinService = this.service('weixin', 'api');
		const miniImage = await weixinService.createwxminiQrcode(superCode, post.user_id);

		
		this.success({codeImage: miniImage});
	}

	putAction() {

	}

	deleteAction() {

	}




	// async userCreateCount() {
	// 	const model = await this.model('user').where({user_id: 0}).find();
	// }



	async getUseSuperCode() {
		const model = await this.model('supercode').where({user_id: ''}).find();

		if(think.isEmpty(model)) {
			return false;
		}

		return model.code;
	}
};
