<template>
  <!--登录页面-->
  <div class="login-main">
    <div class="login-form">123</div>
    <div class="login-footer"></div>
  </div>

</template>

<script>
export default {
  name: 'Longin',
  data () {
    return {
      inlineForm: {
        username: '',
        password: '',
        checked: true
      },
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
    background-image: url("");
  }
</style>
