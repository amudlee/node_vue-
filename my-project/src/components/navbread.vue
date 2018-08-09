
<template>
        <div class="nav-breadcrumb-wrap">
        <div class="container">
          <el-breadcrumb separator=">" class="nav-breadcrumb">
             <el-breadcrumb-item v-for=" (item,index) in levellist" :key="item.path" v-if="item.name">
              <span v-if='item.redirect==="noredirect"||index==levellist.length-1' class="no-redirect">{{item.name}}</span>
              <router-link  v-else :to="item.redirect||item.path">{{item.name}}</router-link>
             </el-breadcrumb-item>           
        </el-breadcrumb>
        </div>
      </div>
</template>
<script>
// 基于elementui写的动态面包屑
    export default {
        props:['routeval'],
        data(){
            return {
                levellist:[]
            }
        },
        created(){
            this.breadcrumb(this.routeval)
        },
        watch:{
            $route(){
               this.breadcrumb(this.routeval) 
            }
        },
        methods:{
           breadcrumb(rname){
               let matched=this.$route.matched.filter(item=>item.name);
               const first=matched[0]; 
            if(first && first.name !=='首页'){//$route.name当前路由名称  ；$route.redirectedFrom重定向来源的路由的名字
             matched =[{ path: '/', meta: { title:'首页' },name:'首页'}].concat(matched)};
                Object.assign(this.levellist,matched);          
           }
       }
    }
</script>
