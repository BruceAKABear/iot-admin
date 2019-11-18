<template>
  <!--登录页面-->
  <div class="micro-checkin-container">
    <div class="checkin-tip">
      <div class="checkin-tip-header">
        <i class="el-icon-message-solid"></i>
        <span>自主开通支付功能重要提示</span>
      </div>
      <div class="checkin-tip-body">
        <span>1.目前对于非蓝牙类设备运营商不能使用自主通达</span>
        <span>2.目前自助通道只支持微信支付</span>
        <span>3.目前自主支付通道支持个人和企业两种类型</span>
        <span>4.如果是个人类型开通，没有分账功能</span>
        <span>5.请务必将信息填写正确</span>
      </div>
    </div>
    <div class="chenckin-info-body">
      <!--小微入住信息-->
      <el-form ref="form" :model="form" :rules="rules" label-width="20%">
        <!--上传身份证正面-->
        <el-form-item prop="img" label="身份证头像面">
          <el-upload
            ref="clearIdCardCopy"
            name="media"
            accept="image/png, image/jpeg"
            :action="uploadImgUrl"
            list-type="picture-card"
            :auto-upload="true"
            :disabled="!canUploadIdCardCopy"
            :on-success="handleIdCardCopyUploadSuccess"
            :before-upload="handleImgSize"
          >
            <i slot="default" class="el-icon-plus"></i>
            <div slot="file" slot-scope="{file}">
              <img class="el-upload-list__item-thumbnail" :src="file.url" alt="">
              <span class="el-upload-list__item-actions">
                <!--预览图片按钮-->
                 <span class="el-upload-list__item-preview" @click="handlePictureCardPreview(file)">
                   <i class="el-icon-zoom-in"></i>
                 </span>
                <!--删除图片按钮-->
                  <span v-if="!canUploadIdCardCopy" class="el-upload-list__item-delete"
                        @click="handleRemoveIdCardCopy(file)">
                    <i class="el-icon-delete"></i>
                  </span>
                </span>
            </div>
            <!--图片提示信息-->
            <div class="tip" slot="tip">只能上传jpg/png文件，且图片大小不超过2Mb</div>
          </el-upload>
        </el-form-item>
        <!--上传身份证反面-->
        <el-form-item prop="idCardNational" label="身份证国徽面">
          <el-upload
            ref="clearIdCardNational"
            name="media"
            accept="image/png, image/jpeg"
            :action="uploadImgUrl"
            list-type="picture-card"
            :auto-upload="true"
            :disabled="!canUploadIdCardNational"
            :on-success="handleIdCardNationalUploadSuccess"
            :before-upload="handleImgSize"
          >
            <i slot="default" class="el-icon-plus"></i>
            <div slot="file" slot-scope="{file}">
              <img class="el-upload-list__item-thumbnail" :src="file.url" alt="">
              <span class="el-upload-list__item-actions">
                  <!--预览图片按钮-->
                 <span class="el-upload-list__item-preview" @click="handlePictureCardPreview(file)">
                   <i class="el-icon-zoom-in"></i>
                 </span>
                  <span v-if="!canUploadIdCardNational" class="el-upload-list__item-delete"
                        @click="handleRemoveIdCardNational(file)">
                    <i class="el-icon-delete"></i>
                  </span>
                </span>
            </div>
            <!--图片提示信息-->
            <div class="tip" slot="tip">只能上传jpg/png文件，且图片大小不超过2Mb</div>
          </el-upload>
        </el-form-item>
        <!--图片预览地址-->
        <el-dialog :visible.sync="imgDialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
        <!--身份证姓名-->
        <el-form-item prop="idCardName" label="姓名">
          <el-input
            placeholder="身份证上姓名"
            v-model="form.idCardName">
          </el-input>
        </el-form-item>
        <!--身份证号-->
        <el-form-item prop="idCardNumber" label="身份证号">
          <el-input
            placeholder="身份证号"
            v-model="form.idCardNumber">
          </el-input>
        </el-form-item>
        <!--身份证有效期-->
        <el-form-item prop="idCardValidTime" label="身份证有效期">

          <div class="id-card-valid-time-inner">
            <div class="id-card-valid-time-inner-opeions">
              <el-radio v-model="radioValue" label="1">短期</el-radio>
              <el-radio v-model="radioValue" label="2">长期</el-radio>
            </div>
            <el-date-picker
              v-model="form.idCardValidTime"
              unlink-panels
              type="daterange"
              range-separator="至"
              start-placeholder="身份证生效日期"
              end-placeholder="身份证失效日期"
              value-format="yyyy-MM-dd"
              @change="shenfenzhengrange"
              v-show="radioValue==='1'"
            >
            </el-date-picker>
            <el-date-picker
              v-model="value2"
              type="date"
              placeholder="身份证生效日期"
              value-format="yyyy-MM-dd"
              @change="longRange"
              v-show="radioValue==='2'"
            >
            </el-date-picker>

          </div>
          <div class="tip">
            <span>注意：身份证有效期必须填写正确</span>
          </div>
        </el-form-item>
        <!--开户银行-->
        <el-form-item prop="accountBank" label="开户银行名称">
          <el-select v-model="form.accountBank" placeholder="请选择开户银行">
            <el-option
              v-for="(item,index) in accountArray"
              :key="index"
              :label="item"
              :value="item">
            </el-option>
          </el-select>
        </el-form-item>
        <!--开户银行区域编码-->
        <el-form-item prop="bankAddressCode" label="开户银行所在区域">
          <el-cascader
            size="large"
            :options="options"
            v-model="form.bankAddressCode"
            @change="handbankAddressCodeChange"
            clearable>
          </el-cascader>
        </el-form-item>
        <!--开户银行的全称，但是17家直联银行不用填写-->
        <!--        <el-form-item prop="bankAddressCode" label="开户银行全称（含支行)" v-if="bankAddressCodeShow">-->
        <!--          <el-input-->
        <!--            placeholder="开户银行全称（含支行)"-->
        <!--            v-model="form.idCardName">-->
        <!--          </el-input>-->
        <!--          <div class="tip">-->
        <!--            <span>-->
        <!--              示例：深圳农村商业银行XXX支行-->
        <!--            </span>-->
        <!--          </div>-->
        <!--        </el-form-item>-->
        <!--银行卡卡号，注意一点有些银行卡是没法开的-->
        <el-form-item prop="accountNumber" label="银行卡号">
          <el-input
            placeholder="银行卡号"
            v-model="form.accountNumber">
          </el-input>
          <div class="tip">
            <span>小微商户开户目前<em>不支持</em>以下前缀的银行卡
              </span>
          </div>
        </el-form-item>
        <!--服务类型-->
        <el-form-item prop="storeName" label="服务类型">
          <el-select v-model="form.accountBank" placeholder="请选服务类型">
            <el-option
              v-for="(item,index) in serviceTypeArray"
              :key="index"
              :label="item"
              :value="item">
            </el-option>
          </el-select>
        </el-form-item>
        <!--服务场地编码-->
        <el-form-item prop="storeAddressCode" label="服务场地">
          <el-cascader
            size="large"
            :options="options"
            v-model="form.storeAddressCode"
            @change="handStoreAddressCodeChange"
            clearable>
          </el-cascader>
        </el-form-item>
        <!--门店外部-->
        <el-form-item prop="storeEntrancePic" label="服务场地入口照片">
          <el-upload
            ref="clearStoreEntrancePic"
            name="media"
            accept="image/png, image/jpeg"
            :action="uploadImgUrl"
            list-type="picture-card"
            :auto-upload="true"
            :disabled="!canUploadStoreEntrancePic"
            :on-success="handleStoreEntrancePicUploadSuccess"
            :before-upload="handleImgSize"
          >
            <i slot="default" class="el-icon-plus"></i>
            <div slot="file" slot-scope="{file}">
              <img class="el-upload-list__item-thumbnail" :src="file.url" alt="">
              <span class="el-upload-list__item-actions">
                <!--预览图片按钮-->
              <span class="el-upload-list__item-preview" @click="handlePictureCardPreview(file)">
                   <i class="el-icon-zoom-in"></i>
              </span>
                  <span v-if="!canUploadStoreEntrancePic" class="el-upload-list__item-delete"
                        @click="handleStoreEntrancePicRemove(file)">
                    <i class="el-icon-delete"></i>
                  </span>
                </span>
            </div>
          </el-upload>
        </el-form-item>
        <el-form-item prop="indoorPic" label="店内环境照片">
          <el-upload
            ref="clearIndoorPic"
            name="media"
            accept="image/png, image/jpeg"
            :action="uploadImgUrl"
            list-type="picture-card"
            :auto-upload="true"
            :disabled="!canUploadIndoorPic"
            :on-success="handleIndoorPicSuccess"
            :before-upload="handleImgSize"
          >
            <i slot="default" class="el-icon-plus"></i>
            <div slot="file" slot-scope="{file}">
              <img class="el-upload-list__item-thumbnail" :src="file.url" alt="">
              <span class="el-upload-list__item-actions">
                   <!--预览图片按钮-->
              <span class="el-upload-list__item-preview" @click="handlePictureCardPreview(file)">
                   <i class="el-icon-zoom-in"></i>
              </span>
                  <span v-if="!disabled" class="el-upload-list__item-delete" @click="handleIndoorPicRemove(file)">
                    <i class="el-icon-delete"></i>
                  </span>
                </span>
            </div>
          </el-upload>
        </el-form-item>
        <el-form-item prop="merchantShortname" label="运营商简称">
          <el-input
            placeholder="运营商简称"
            v-model="form.merchantShortname">
          </el-input>
          <div class="tip">
            <span>示例：京东智能</span>
          </div>
        </el-form-item>
        <el-form-item prop="servicePhone" label="客服电话">
          <el-input
            placeholder="客服电话"
            v-model="form.servicePhone">
          </el-input>
        </el-form-item>
        <el-form-item prop="contactPhone" label="手机号码">
          <el-input
            placeholder="手机号码"
            v-model="form.contactPhone">
          </el-input>
        </el-form-item>
        <el-form-item prop="contactEmail" label="联系邮箱">
          <el-input
            placeholder="联系邮箱"
            v-model="form.contactEmail">
          </el-input>
        </el-form-item>

      </el-form>
    </div>
    <div class="checkin-footer">
      <el-button type="primary" class="form-btn" @click="onSubmit('form')">提交入住申请</el-button>
    </div>
  </div>

</template>

<script>
import { regionData } from 'element-china-area-data'

export default {
  name: 'Login',
  data () {
    // 定义校验器
    // let validImg = (rule, value, callback) => {
    //   console.log(value)
    //   if (value === '') {
    //     callback(new Error('请上传图片'))
    //   } else {
    //     callback()
    //   }
    // }

    // let validatePhone = (rule, value, callback) => {
    //   if (value === '') {
    //     callback(new Error('手机号码必填'))
    //   } else {
    //     if (!(/^1[3456789]\d{9}$/.test(this.form.username))) {
    //       callback(new Error('手机号码格式错误'))
    //     }
    //     callback()
    //   }
    // }
    return {
      uploadImgUrl: 'http://localhost:8888/upload/uploadWeixinImg',
      imgDialogVisible: false,
      dialogImageUrl: '',
      // 身份证长期标识
      radioValue: '1',
      // 省市区数据
      options: regionData,
      // 默认提供的银行
      accountArray: ['工商银行', '交通银行', '招商银行', '民生银行', '中信银行', '浦发银行', '兴业银行', '光大银行', '广发银行',
        '平安银行', '北京银行', '华夏银行', '农业银行', '建设银行', '邮政储蓄银行', '中国银行', '宁波银行'],
      serviceTypeArray: ['共享蓝牙充电线', '共享充电宝', '共享足疗仪', '共享按摩椅', '共享售货柜'],
      form: {
        idCardCopy: null,
        idCardNational: null,
        idCardName: null,
        idCardNumber: null,
        idCardValidTime: null,
        accountBank: null,
        bankAddressCode: null,
        accountNumber: null,
        storeName: null,
        storeAddressCode: null,
        storeEntrancePic: null,
        indoorPic: null,
        merchantShortname: null,
        servicePhone: null,
        contactPhone: null,
        contactEmail: null
      },
      checked: true,
      // 校验规则
      rules:
        {
          img: [
            { required: true, trigger: 'blur' }
          ],
          idCardName: [
            { required: true, trigger: 'blur', message: '名字不能为空' }
          ],
          idCardNumber: [
            { required: true, trigger: 'blur', message: '身份证号必须输入' }
          ],
          idCardValidTime: [
            { required: true, trigger: 'change', message: '身份证有效期必须选择' }
          ],
          accountBank: [
            { required: true, trigger: 'change', message: '开户银行必须选择' }
          ]
        },
      brandInfo: null,
      submitLoading: false,
      errorMsg: '',
      // 定义控制状态变量
      canUploadIdCardCopy: true,
      canUploadIdCardNational: true,
      canUploadStoreEntrancePic: true,
      canUploadIndoorPic: true,
      value2: ''
    }
  },
  methods: {
    // 控制图片大小
    handleImgSize (file) {
      if (file && file.size <= 2097152) {
        return true
      } else {
        this.$message.error('图片大小不符合规则')
        return false
      }
    },
    // 控制图片预览
    handlePictureCardPreview (flie) {
      this.dialogImageUrl = flie.url
      this.imgDialogVisible = true
    },

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
    },
    // 身份证正面上传成功回调
    handleIdCardCopyUploadSuccess (response, file, fileList) {
      if (response.result_code === 'SUCCESS' && response.return_code === 'SUCCESS') {
        // 图片上传成功
        this.form.idCardCopy = response.media_id
        this.canUploadIdCardCopy = false
        this.$message.success('身份证正面上传成功')
      } else {
        this.$message.success('图片上传成功')
      }
    },
    // 身份证国徽面上传成功过回调
    handleIdCardNationalUploadSuccess (response, file, fileList) {
      if (response.result_code === 'SUCCESS' && response.return_code === 'SUCCESS') {
        // 图片上传成功
        this.form.idCardNational = response.media_id
        this.canUploadIdCardNational = false
        this.$message.success('身份证国徽面上传成功')
      } else {
        this.$message.success('图片上传失败，请重新上传')
      }
    },
    // 入口图片上传成功回调
    handleStoreEntrancePicUploadSuccess (response, file, fileList) {
      if (response.result_code === 'SUCCESS' && response.return_code === 'SUCCESS') {
        // 图片上传成功
        this.form.storeEntrancePic = response.media_id
        this.canUploadStoreEntrancePic = false
        this.$message.success('图片上传成功')
      } else {
        this.$message.success('图片上传成功')
      }
    },
    handleIndoorPicSuccess (response, file, fileList) {
      if (response.result_code === 'SUCCESS' && response.return_code === 'SUCCESS') {
        // 图片上传成功
        this.form.indoorPic = response.media_id
        this.canUploadIndoorPic = false
        this.$message.success('图片上传成功')
      } else {
        this.$message.success('图片上传成功')
      }
    },
    // 处理删除身份证正面删除方法
    handleRemoveIdCardCopy (file) {
      console.log(file)
      this.form.idCardCopy = null
      this.canUploadIdCardCopy = true
      this.$refs.clearIdCardCopy.clearFiles()
    },
    // 处理删除身份证反面方法
    handleRemoveIdCardNational (file) {
      this.form.idCardNational = null
      this.canUploadIdCardNational = true
      this.$refs.clearIdCardNational.clearFiles()
    },
    // 处理服务地门口图片删除
    handleStoreEntrancePicRemove (file) {
      this.form.storeEntrancePic = null
      this.canUploadStoreEntrancePic = true
      this.$refs.clearStoreEntrancePic.clearFiles()
    },
    handleIndoorPicRemove (file) {
      this.form.storeEntrancePic = null
      this.canUploadStoreEntrancePic = true
      this.$refs.clearIndoorPic.clearFiles()
    },
    handbankAddressCodeChange (data) {
      console.log(data)
    },
    // 处理门店省市编码改变
    handStoreAddressCodeChange () {
      console.log('门店编码改变')
    },
    // 长期选择时添加长期
    longRange (maxDate) {
      this.form.idCardValidTime = '["' + maxDate + '","长期"' + ']'
    },
    // 短期日期选择
    shenfenzhengrange (maxDate) {
      this.form.idCardValidTime = '["' + maxDate[0] + '","' + maxDate[1] + '"]'
      console.log(maxDate)
    }
  },
  computed: {
    bankAddressCodeShow () {
      return true
    }
  }
}
</script>

<style scoped>
  .micro-checkin-container {
    position: absolute;
    left: 20%;
    width: 1000px;

  }

  .checkin-tip {
    background-color: #ecf8ff;
    padding-top: 10px;
    margin: 20px 0;
  }

  .checkin-tip-body {
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: left;
    margin-top: 20px;

  }

  .chenckin-info-body {

  }

  .login-box {
    width: 800px;
    border: solid 1px;
    border-radius: 4px;
    padding-top: 20px;

  }

  .checkin-footer {
    padding: 0px;
  }

  .form-btn {
    width: 100%;
  }

  .tip {
    padding: 8px 16px;
    background-color: #ecf8ff;
    border-radius: 4px;
    border-left: 5px solid #50bfff;
    margin: 20px 0;
    text-align: left;
  }

</style>
