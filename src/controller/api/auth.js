const Base = require('../base.js');
const rp = require('request-promise');

module.exports = class extends Base {
  async loginByWeixinAction() {
    const code = this.post('code');
    const fullUserInfo = this.post('userInfo');

    console.log(fullUserInfo)

    const userInfo = fullUserInfo.userInfo;
    const clientIp = ''; // 暂时不记录 ip

    // 获取openid
    const options = {
      method: 'GET',
      url: 'https://api.weixin.qq.com/sns/jscode2session',
      qs: {
        grant_type: 'authorization_code',
        js_code: code,
        secret: think.config('weixinmini.secret'),
        appid: think.config('weixinmini.appid')
      }
    };

    let sessionData = await rp(options);
    sessionData = JSON.parse(sessionData);
    if (!sessionData.openid) {
      return this.fail('登录失败1');
    }

    // 验证用户信息完整性
    const crypto = require('crypto');
    const sha1 = crypto.createHash('sha1').update(fullUserInfo.rawData + sessionData.session_key).digest('hex');
    if (fullUserInfo.signature !== sha1) {
      return this.fail('登录失败2');
    }

    // 解释用户数据
    const WeixinSerivce = this.service('weixin', 'api');
    const weixinUserInfo = await WeixinSerivce.decryptUserInfoData(sessionData.session_key, fullUserInfo.encryptedData, fullUserInfo.iv);
    if (think.isEmpty(weixinUserInfo)) {
      return this.fail('登录失败3');
    }

    // 根据openid查找用户是否已经注册
    let userId = await this.model('user').where({ weixin_openid: sessionData.openid }).getField('id', true);
    if (think.isEmpty(userId)) {
      // 注册
      userId = await this.model('user').add({
        username: 'wx_' + think.uuid(6),
        password: sessionData.openid,
        create_date: parseInt(new Date().getTime() / 1000),
        register_ip: clientIp,
        last_login_time: parseInt(new Date().getTime() / 1000),
        last_login_ip: clientIp,
        tel: '',
        count: 5,
        weixin_openid: sessionData.openid,
        avatar: userInfo.avatarUrl || '',
        gender: userInfo.gender || 1,
        nickname: userInfo.nickName
      });
    }

    sessionData.user_id = userId;

    // 查询用户信息
    const newUserInfo = await this.model('user').field(['id', 'username', 'nickname', 'gender', 'avatar', 'user_vip']).where({ id: userId }).find();

    // 更新登录信息
    userId = await this.model('user').where({ id: userId }).update({
      last_login_time: parseInt(new Date().getTime() / 1000),
      last_login_ip: clientIp,
      avatar: userInfo.avatarUrl || '',
      nickname: userInfo.nickName
    });

    const TokenSerivce = this.service('token', 'api');
    const sessionKey = await TokenSerivce.create(sessionData);

    if (think.isEmpty(newUserInfo) || think.isEmpty(sessionKey)) {
      return this.fail('登录失败4');
    }

    return this.success({ token: sessionKey, userInfo: newUserInfo });
  }



  async deleteUserAction() {
    let id = this.get('id');

    if(id) {
      let del = await this.model('user').where({id: id}).delete();

      return this.success('用户删除成功');
    }

    return this.fail('用户删除失败');
  }


  // 通过username获取用户信息
  async getUserAction() {
    let user_id = this.get('user_id');

    if(user_id) {
      let user = await this.model('user').where({username: user_id}).field('nickname, avatar, gender, user_vip').find();

      return this.success(user);
    }

    return this.fail('获取失败');
  }



  async iamVipAction() {
    let id = this.get('id');

    if(id) {
      let vip = await this.model('user').where({id: id}).update({user_vip: 1});

      return this.success('VIP增加成功');
    }

    return this.fail('VIP增加失败');
  }



  async countIncrementAction() {
    let id = this.get('id');
    let num = this.get('num');

    if(id) {
      let inc = await this.model('user').where({ id: id, count: ['<', 100] }).increment('count', num ? num : 1);

      return this.success('增加联系件成功');
    }

    return this.fail('增加联系件失败');
  }



  async countDecrementAction() {
    let id = this.get('id');
    let count = await this.model('user').where({ id: id }).field('count').find();

    if(id) {
      let inc = await this.model('user').where({ id: id, count: ['>', 0] }).decrement('count', 1);

      return this.success('减少联系件成功');
    }

    return this.fail('减少联系件失败');
  }



  async allCountAction() {
    let id = this.get('id');

    if(id) {
      let count = await this.model('user').where({ id: id }).field('count').find();

      return this.success(count);
    }

    return this.fail();
  }



  async logoutAction() {
    return this.success();
  }
};
