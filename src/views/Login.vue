<template>
  <!--登录页面-->
  <div class="login-container">
    <div class="login-box">
      <div>
        <img src="https://pay.weixin.qq.com/public/apply_sign_mobile/showQrcode?merchantId=113948217&sign=672aef9bf1b83517be58bbbe2212583b" alt="">
      </div>
      <!--登录表单-->
      <el-form ref="form" :model="form" :rules="rules">
        <el-form-item prop="username">
          <el-input
            placeholder="手机号"
            prefix-icon="el-icon-user"
            v-model="form.username">
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            placeholder="密码"
            prefix-icon="el-icon-lock"
            type="password"
            v-model="form.password">
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-row>
            <el-col :span="12" align="left">
              <el-checkbox v-model="checked">记住账号</el-checkbox>
            </el-col>
            <el-col :span="12" align="right">
              <el-link type="info">忘记密码</el-link>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class="form-btn" @click="onSubmit('form')">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="login-footer"></div>
  </div>

</template>

<script>
export default {
  name: 'Login',
  data () {
    let validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('密码必填'))
      } else {
        if (this.form.password.length < 6) {
          callback(new Error('密码长度小于6位'))
        }
        callback()
      }
    }
    let validatePhone = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('手机号码必填'))
      } else {
        if (!(/^1[3456789]\d{9}$/.test(this.form.username))) {
          callback(new Error('手机号码格式错误'))
        }
        callback()
      }
    }
    return {
      form: {
        username: '',
        password: ''
      },
      checked: true,
      // 校验规则
      rules: {
        username: [
          { validator: validatePhone, trigger: 'blur' }
        ],
        password: [
          { validator: validatePass, trigger: 'blur' }
        ]
      },
      brandInfo: null,
      submitLoading: false,
      errorMsg: ''
    }
  },
  methods: {
    // 登录方法
    onSubmit (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!')
        } else {
          return false
        }
      })
      console.log(this.form)
      console.log(this.checked)
    },

    doSubmit (formName) {
    },
    setSubmitBtnState (isLoading) {
      var submitLoading = this.submitLoading
      submitLoading = isLoading
      this.$set(this.$data, 'submitLoading', submitLoading)
    },
    doLogin (param) {
    },
    /**
       * 查询运营商的品牌信息
       * @param mctId
       */
    loadBrandInfo (mctId) {
    }
  }
}
</script>

<style scoped>
  .login-container {
    height: 100%;
  }

  .login-box {
    width: 400px;
    border: solid 1px;
    border-radius: 4px;
    padding: 20px;
    position: absolute;
    left: 60%;
    top: 20%

  }

  .form-btn {
    width: 100%;
  }
</style>
