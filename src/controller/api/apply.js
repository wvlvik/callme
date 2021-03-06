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
			model = await applysModel.where({supercode_id: supercode_id}).find();
		}else if(user_id) {
			model = await applysModel.where({user_id: user_id}).order('id DESC').select();
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

		
		this.success({id: add, codeImage: miniImage});
	}




	async putAction() {
		let id = this.get('id');
		let post = this.post();
		
		const data = Object.assign({}, post, {
			// last_edit_date: parseInt(new Date().getTime() / 1000),
		});
		const update =  await this.model('applys').where({id: id}).update(data);
		const miniImage =  await this.model('applys').where({id: id}).field('supercode_id').find();

		this.success({id: id, codeImage: miniImage.supercode_id + '.jpg'});
	}




	async deleteAction() {
		let id = this.post('id');

		const supercode = await this.model('applys').where({id: id}).field('supercode_id', 'user_id').find();
		const deletes =  await this.model('applys').where({id: id}).delete();
		const increment =  await this.model('user').where({username: supercode.user_id, count: ['<', 100]}).increment('count', 1);

		const removeUser_id = await this.model('supercode').where({code: supercode.supercode_id}).update({user_id: ''});

		return this.success('删除成功!');
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
