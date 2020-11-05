<template>
  <div class="login_container">
    <div class="login_box">
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        class="login-ruleForm"
      >
        <el-form-item prop="username">
          <el-input
            prefix-icon="el-icon-user-solid"
            v-model="ruleForm.username"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            prefix-icon="el-icon-s-help"
            type="password"
            v-model="ruleForm.password"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="tologin('ruleForm')"
            >立即创建</el-button
          >
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
export default {
  name: '',
  data() {
    return {
      ruleForm: {
        username: 'admin',
        possword: '123456',
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          {
            min: 3,
            max: 20,
            message: '长度在 3 到 20 个字符',
            trigger: 'blur',
          },
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 3, max: 6, message: '长度在 3 到 6 个字符', trigger: 'blur' },
        ],
      },
    }
  },
  methods: {
    //重置
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    tologin(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (!valid) {
          return
        }
        const { data: res } = await this.$http.post('login', this.ruleForm)
        if (res.meta.status == 400) return this.$message.error('登陆失败')
        this.$message.success('登陆成功')
        // console.log(res);
        window.sessionStorage.setItem('token', res.data.token)
        this.$router.push('/home')
      })
    },
  },
}
</script>
<style lang="less" scoped>
.login_container {
  width: 100vw;
  height: 100vh;
  background-color: #2b4b6b;
  .login_box {
    width: 450px;
    height: 200px;
    background-color: #fff;
    border-radius: 10px;
    position: absolute;
    left: calc(50% - 225px);
    top: calc(50% - 100px);
    .login-ruleForm {
      width: 90%;
      margin: 20px auto;
    }
  }
}
</style>