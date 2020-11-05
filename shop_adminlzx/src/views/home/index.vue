<template>
  <div>
    <el-button type="inof" @click="loginout">推出</el-button>
  </div>
</template>
<script>
export default {
  name: 'home',
  data() {
    return {}
  },
  methods: {
    loginout() {
      window.sessionStorage.clear('token')
      this.$router.push('/login')
    },
  },
}
</script>