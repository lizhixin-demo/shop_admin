<template>
  <div>
    <Breadcrumba></Breadcrumba>

    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>用户列表</span>
      </div>
      <!-- <div v-for="o in 4" :key="o" class="text item">
                {{'列表内容 ' + o }}
            </div> -->
      <el-row :gutter="20">
        <el-col :span="10">
          <el-input
            placeholder="请输入内容"
            clearable
            v-model="userList.query"
            class="input-with-select"
            @clear="getuserList"
          >
            <el-button
              slot="append"
              icon="el-icon-search"
              @click="getuserList"
            ></el-button>
          </el-input>
        </el-col>
        <el-col :span="2">
          <el-button type="primary" @click="dialogVisible = true"
            >添加</el-button
          >
        </el-col>
      </el-row>
      <el-row>
        <el-table
          :data="users"
          border
          style="width: 100%; margin-top: 20px"
          stripe
        >
          <el-table-column type="index"> </el-table-column>
          <el-table-column prop="username" label="姓名"> </el-table-column>
          <el-table-column prop="email" label="邮箱"> </el-table-column>
          <el-table-column prop="mobile" label="电话"> </el-table-column>
          <el-table-column prop="role_name" label="角色"> </el-table-column>
          <el-table-column prop="mg_state" label="状态">
            <template slot-scope="scope">
              <!-- {{scope.row.mg_state}} -->
              <el-switch
                v-model="scope.row.mg_state"
                @change="userStateChange(scope.row)"
              ></el-switch>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="300">
            <template slot-scope="scope">
              <el-button type="primary" @click="showEditDialog(scope.row.id)" size="mini" icon="el-icon-edit"
                >修改</el-button
              >
              <el-button type="primary" size="mini" icon="el-icon-share"
                >分配权限</el-button
              >
              <el-button type="primary" @click="removeUserId(scope.row.id)" size="mini" icon="el-icon-delete"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="userList.pagenum"
          :page-sizes="[2, 4, 6, 8]"
          :page-size="userList.pagesize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
          style="margin-top: 20px"
        >
        </el-pagination>
      </el-row>
    </el-card>
    <!-- 添加用户弹窗 -->
    <el-dialog
      title="添加用户"
      :visible.sync="dialogVisible"
      width="50%"
      @close="closedialog"
    >

      <el-form
        :model="addUserform"
        label-width="80px"
        ref="UserRules"
        :rules="UserRules"
      >
        <el-form-item label="用户名称" prop="username">
          <el-input v-model="addUserform.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="addUserform.password"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="addUserform.email"></el-input>
        </el-form-item>
        <el-form-item label="手机" prop="mobile">
          <el-input v-model="addUserform.mobile"></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addUser">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 编辑用户弹窗 -->
    <el-dialog
      title="修改用户信息"
      :visible.sync="editDialogVisible"
      width="50%"
      @close="closedialogEdit">
        <el-form
        :model="editFome"
        label-width="80px"
        ref="editFomeRules"
        :rules="UserRules">
        <el-form-item label="用户名" prop="username" >
          <el-input v-model="editFome.username" disabled></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="editFome.email"></el-input>
        </el-form-item>
        <el-form-item label="手机" prop="mobile">
          <el-input v-model="editFome.mobile"></el-input>
        </el-form-item>
      </el-form>

  <span slot="footer" class="dialog-footer">
    <el-button @click="editDialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="editDialogBox">确 定</el-button>
  </span>
</el-dialog>
  </div>
</template>
<script>
import Breadcrumba from './../../components/Breadcrumb'
export default {
  name: 'user',
  components: { Breadcrumba },

  data() {
    var changeElail = (rule, value, cd) => {
      const redWEmali = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/

      if (redWEmali.test(value)) {
        return cd()
      }
      cd(new Error('请输入合法邮箱'))
    }

    var moblieElail = (rule, value, cd) => {
      const moblieElail = /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/

      if (moblieElail.test(value)) {
        return cd()
      }
      cd(new Error('请输入合法手机号'))
    }

    return {
      userList: {
        query: '',
        pagenum: 1,
        pagesize: 2,
      },
      addUserform: {
        username: '',
        password: '',
        email: '',
        mobile: '',
      },
      UserRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          {
            min: 3,
            max: 10,
            message: '请正确输入用户名(3-10个字符)',
            trigger: 'blur',
          },
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          {
            min: 3,
            max: 10,
            message: '请正确输入密码(3-10个字符)',
            trigger: 'blur',
          },
        ],
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          {
            min: 3,
            max: 20,
            message: '请正确输入邮箱(3-20个字符)',
            trigger: 'blur',
          },
          { validator: changeElail, trigger: 'blur' },
        ],
        mobile: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          {
            min: 3,
            max: 11,
            message: '请正确输入手机号(3-11个字符)',
            trigger: 'blur',
          },
          { validator: moblieElail, trigger: 'blur' },
        ],
      },
      users: [],
      total: 0,
      dialogVisible: false,
      editDialogVisible: false,
      editFome:{
          username:'',
          email:'',
          mobile:''
      },
    }
  },
  created() {
    this.getuserList()
  },
  methods: {
    async getuserList() {
      const { data: res } = await this.$http.get('users', {
        params: this.userList,
      })
      if (res.meta.status != 200)
        return this.$message.error('获取用户列表失败！')
      this.users = res.data.users
      this.total = res.data.total
      // console.log(this.users)
    },
    handleSizeChange(val) {
      this.userList.pagesize = val
      this.getuserList()
      // console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.userList.pagenum = val
      this.getuserList()
      // console.log(`当前页: ${val}`);
    },
    // 修改用户状态
    async userStateChange(val) {
      const { data: res } = await this.$http.put(
        `/users/${val.id}/state/${val.mg_state}`
      )
      if (res.meta.status != 200) {
        val.mg_state = !val.mg_state
        return this.$message.error('用户状态更新失败！')
      }
      // this.$message.success('用户状态更新失败！')
    },
    closedialog() {
      this.$refs.UserRules.resetFields()
    },
    // 新增用户
    addUser() {
      this.$refs.UserRules.validate(async (valid) => {
        if (!valid) return false;
          const { data: res } = await this.$http.post('users', this.addUserform)
          if (res.meta.status !== 201) return this.$message.error('添加用户失败！')
          this.$message.success('添加用户成功！')
        
        this.dialogVisible = false;
        this.getuserList();

      })
    },
    // 修改用户信息
    async showEditDialog(id){
      const {data:res} = await this.$http.get('users/'+id);
      if(res.meta.status !== 200) return this.$message.error('查询用户信息失败');
      this.editDialogVisible = true;
      this.editFome = res.data;
      console.log(id);
    },
    closedialogEdit(){
      this.$refs.editFomeRules.resetFields();
    },
    editDialogBox(){
       this.$refs.editFomeRules.validate(async valid =>{
          if(!valid) return;
          const {data:res}  = await this.$http.put('users/' + this.editFome.id,this.editFome);
          if(res.meta.status !== 200) return this.$message.error('修改失败！')
       })
      this.editDialogVisible = false;
       this.getuserList();
       this.$message.success('修改成功！')

    },
    //删除用户
    async removeUserId(id){
     const result = await this.$confirm(
        '此操作将永久删除该用户, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }
        // 用err 来接受错误的字段返回
      ).catch(err => err)
     // console.log(result);
     if(result == 'confirm'){
       const {data : res} = await this.$http.delete('users/' + id)
      console.log(res);
    if(res.meta.status == 200){
         return this.$message.success('删除成功！')
       }else{
         return this.$message.error('删除失败！')
       }
     }else{
       return        this.$message({
            type: 'info',
            message: '已取消删除'
          });   
      }
    }
  },
}
</script>
<style lang="less" scoped>
.box-card {
  margin-top: 20px;
  .el-table .warning-row {
    background: oldlace;
  }

  .el-table .success-row {
    background: #f0f9eb;
  }
}
</style>