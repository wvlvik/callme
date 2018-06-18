module.exports = class extends think.Logic {
  indexAction() {

  }

  async postAction() {

  	let post = this.post();
  	let errorCode = '内容为空';

  	if(think.isEmpty(post.name) || think.isEmpty(post.tel)) {
  		return this.fail(errorCode);
  	}

  }


};
