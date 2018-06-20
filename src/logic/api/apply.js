module.exports = class extends think.Logic {
  indexAction() {

  }

  async postAction() {

  	let post = this.post();
  	let errorCode = '内容未填写完整';

  	if(post.type == 2) {
  		text = post.custom_word;
  	}else if(post.type == 3) {
  		text = post.custom_text;
  	}else {
  		text = post.name;
  	}

  	if(think.isEmpty(text) || think.isEmpty(post.tel)) {
  		return this.fail(errorCode);
  	}

  }


};
