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
                    <el-input placeholder="请输入内容" v-model="sousuo" class="input-with-select">
                        <el-button slot="append" icon="el-icon-search"></el-button>
                    </el-input>
                </el-col>
                <el-col :span="2">
                    <el-button type="primary">添加</el-button>
                </el-col>
            </el-row>
            <el-row>
                <el-table
                    :data="users"
                    border
                    style="width: 100%;margin-top:20px"
                    stripe
                    >
                    <el-table-column type="index">
                    </el-table-column>
                    <el-table-column
                        prop="username"
                        label="姓名"
                    >
                    </el-table-column>
                    <el-table-column
                        prop="email"
                        label="邮箱"
                    >
                    </el-table-column>
                    <el-table-column
                        prop="mobile"
                        label="电话">
                    </el-table-column>
                    <el-table-column
                        prop="role_name"
                        label="角色">
                    </el-table-column>
                    <el-table-column
                        prop="mg_state"
                        label="状态">
                        <template slot-scope="scope">
                            <!-- {{scope.row.mg_state}} -->
                            <el-switch v-model="scope.row.mg_state" @change="userStateChange(scope.row)"></el-switch>
                        </template>
                    </el-table-column>
                    <el-table-column
                        label="操作"
                        width="300">
                        <template slot-scope="scope">
                                <el-button type="primary" size="mini" icon="el-icon-edit">修改</el-button>
                                <el-button type="primary" size="mini" icon="el-icon-share">分配权限</el-button>
                                <el-button type="primary" size="mini" icon="el-icon-delete">删除</el-button>
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
                        style="margin-top:20px;">
                    </el-pagination>
            </el-row>
        </el-card>

    </div>
</template>
<script>
import Breadcrumba from './../../components/Breadcrumb'
export default {
    name:'user',
    components:{Breadcrumba},
    data(){
        return{
            sousuo:'',
            userList:{
                query:'',
                pagenum:1,
                pagesize:2,
            },
            users:[],
            total:0,
        }
    },
    created(){
        this.getuserList();
    },
    methods:{
       async getuserList(){
            const { data : res } = await this.$http.get('users', { params : this.userList })
            if(res.meta.status != 200) return this.$message.error('获取用户列表失败！')
            this.users = res.data.users;
            this.total = res.data.total;
            console.log(this.users);
        },
        handleSizeChange(val) {
            this.userList.pagesize = val;
             this.getuserList();
            // console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
            this.userList.pagenum = val;
             this.getuserList();
            // console.log(`当前页: ${val}`);
        },
        async userStateChange(val){
            // console.log(val);
          const {data : res} = await this.$http.put(`/users/${val.id}/state/${val.mg_state}`)
        //   console.log(res);
            if(res.meta.status != 200) {
                val.mg_state = !val.mg_state
                return this.$message.error('用户状态更新失败！')
            }
            // this.$message.success('用户状态更新失败！')
        }

    },

    
}
</script>
<style lang="less" scoped>
.box-card{
    margin-top: 20px;
.el-table .warning-row {
    background: oldlace;
  }

  .el-table .success-row {
    background: #f0f9eb;
  }
}
</style>