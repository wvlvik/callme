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
			model = await applysModel.where({user_id: user_id}).field('id, name, tel, image, type, supercode_id').order('id DESC').select();
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

		// 查询用户可生成次数
		let user = await this.model('user').where({username: post.user_id, count: ['>', 0]}).find();
		let addData = {
			create_date: parseInt(new Date().getTime() / 1000)
		};
		let miniImage = '';

		if(!think.isEmpty(user)) {
			addData.supercode_id = superCode;
			let inc = await this.model('user').where({username: post.user_id}).decrement('count', 1);

			// 生成二维码
			const weixinService = this.service('weixin', 'api');
			miniImage = await weixinService.createwxminiQrcode(superCode, post.user_id);
		}
		
		const add =  await this.model('applys').add(Object.assign({}, post, addData));

		
		this.success({codeImage: miniImage});
	}




	async putAction() {
		let id = this.get('id');
		let post = this.post();
		
		const data = Object.assign({}, post, {
			// last_edit_date: parseInt(new Date().getTime() / 1000),
		});
		const update =  await this.model('applys').where({id: id}).update(data);

		this.success(update);
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
