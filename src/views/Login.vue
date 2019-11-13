<template>
  <!--登录页面-->
  <div class="login-main">
    <div class="login-form">
      <!--登录表单-->
      <el-form ref="form" :model="form">
        <el-form-item>
          <el-input
            placeholder="手机号"
            prefix-icon="el-icon-user"
            v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input
            placeholder="密码"
            prefix-icon="el-icon-lock"
            v-model="form.password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-row>
            <el-col :span="12">
              <el-checkbox v-model="checked">记住账号</el-checkbox>
            </el-col>
            <el-col :span="12">
              <el-link type="info">忘记密码</el-link>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class="form-btn" @click="onSubmit">登录</el-button>
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
    return {
      form: {
        name: '',
        password: ''
      },
      checked: true,
      rules: {
        username: [
          { required: true, message: '请输入账号', trigger: 'submit' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'submit' }
        ]
      },
      brandInfo: null,
      submitLoading: false,
      errorMsg: ''
    }
  },
  methods: {

    onSubmit () {
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
  .login-main {
    width: 100%;
    height: 100%;
  }

  .login-form {
    width: 400px;
    border: solid 1px;
    border-radius: 4px;
    padding: 20px;

  }

  .form-btn {
    width: 100%;
  }
</style>
