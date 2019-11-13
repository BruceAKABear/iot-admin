<template>
  <!--登录页面-->
  <div class="login-main">
    <div class="login-form">
      <!--登录表单-->
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="用户名">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="form.password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">立即创建</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="login-footer"></div>
  </div>

</template>

<script>
export default {
  name: 'Longin',
  data () {
    return {
      form: {
        name: '',
        password: ''

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
  }
</style>
