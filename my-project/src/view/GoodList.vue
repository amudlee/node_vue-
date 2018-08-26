<template>
    <div >    
        <commonheader></commonheader>
        <navbread :routeval='rname'></navbread>    
      <div class="accessory-result-page accessory-page">
        <div class="container">
          <div class="filter-nav">
            <span class="sortby">Sort by:</span>
            <a href="javascript:void(0)" class="default cur">Default</a>
            <a href="javascript:void(0)" class="price" @click='changesort()'>Price <svg class="icon icon-arrow-short"><use xlink:href="#icon-arrow-short"></use></svg></a>
            <a href="javascript:void(0)" class="filterby stopPop" @click="priceshow()">Filter by</a>
          </div>
          <div class="accessory-result">
            <!-- filter -->
            <div class="filter stopPop" id="filter" :class="{'filterby-show':filterby}">
              <dl class="filter-price">
                <dt>Price:</dt>
                <dd><a href="javascript:void(0)" @click="changeclass('all')" :class="{'cur':priceclass=='all'}">All</a></dd>
                <dd v-for="(item,index) in pricearea" :key="index" >
                  <a href="javascript:void(0)"  @click="changeclass(index)" :class="{'cur':priceclass == index}">{{item.startprice}}~{{item.endprice}}</a>
                </dd>
              </dl>
            </div>

            <!-- search result accessories list -->
            <div class="accessory-list-wrap">
              <div class="accessory-list col-4">
                <ul>
                  <li v-for="(item,index) in productinfo" :key="index">
                    <div class="pic">
                      <a href="#"><img :src="item.productImage" alt=""></a>
                     <!-- 如果这个地方用v-lazy懒加载的方式来加载图片的话，这个地方做排序后的数据请求回来图片不会重新加载 -->
                    </div>
                    <div class="main">
                      <div class="name">{{item.productName}}</div>
                      <div class="price">{{item.salePrice}}</div>
                      <div class="btn-area">
                        <a href="javascript:;" class="btn btn--m">加入购物车</a>
                      </div>
                    </div>
                  </li>
                </ul>
                <div v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="10" class="loadmore">
                    {{loadtext}}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    <div class="md-overlay" v-show="filtermask" @click="closeprice()"></div>
    <commonfooter></commonfooter>
    </div>
</template>

<script>
import commonheader from "@/components/header.vue"
import navbread from "@/components/navbread.vue"
import commonfooter from "@/components/footer.vue"
import {getgoods} from "@/api/index.js"
    export default{
        data(){
            return {
                rname:'goodlist',
                productinfo:[],
                pricearea:[{"startprice":0,"endprice":100},{"startprice":100,"endprice":500},{"startprice":500,"endprice":1000},{"startprice":1000,"endprice":2000}],
                priceclass:'all',
                filterby:false,
                filtermask:false,
                sortrule:true,//店家price判断是增序还是倒序
                pagesize:4,
                sort:1,
                page:1,
                busy:true,//默认的流式加载是为禁用的
                loadtext:''

            }
        }, 
        created(){
          this.getgoodsList();
        },
        mounted(){
          console.log(this.productinfo,33)
        },
        methods:{
         changeclass(price){
           console.log(price)
           this.priceclass=price
         },
         priceshow(){
           this.filterby=true
           this.filtermask=true
         },
         closeprice(){
           this.filterby=false 
           this.filtermask=false 
         },
         changesort(){
           this.sortrule=!this.sortrule
           this.sort=(this.sortrule?1:-1)
           this.page=1
           this.getgoodsList();
         }, 
          getgoodsList(flag){
            var param={
              page:this.page,
              pagesize:this.pagesize,
              sort:this.sort
            }
           getgoods(param).then(res=>{
             if(res.data.status==0){
               if(flag){//如果flag为true的话说明这个地方是滚动加载
                  this.productinfo=this.productinfo.concat(res.data.result.list)
          //  Object.assign(this.productinfo,res.data.result.list);这个地方assign的方法在vuel里面给数组赋值，只能使用指定的方法去
          //去赋值，是不能利用索引赋值的
                  if(res.data.result.count==0){
                        this.busy=true//当滚动到加载最后一页再请求的时候，就禁止滚动条请求
                         this.loadtext="已经到底了"
                  }else{
                    this.busy=false//当没有滚动到最后一页的时候我们还是要去使用滚动请求
                   
                  }
               }else{
                  this.productinfo=res.data.result.list;
                  this.busy=false
                   this.loadtext="加载中......"
               }
        
             }
             
         })
        },
        loadMore(){         
            this.busy=true;//因为如果不默认禁止加载的话，滚动条一滚动就会触发无数个请求。所以默认为true禁用加载。给一个定时器。让其触发一定时间后再触发滚动加载
            setTimeout(()=>{
               this.page++;//一滚动滚动条我们就要触发插件让这个页面进行加载，出入参数
              this.getgoodsList(true);
            },500)//因为一滚动就会触发
        }
            
        }
        ,components: {
            commonheader,
            navbread,
            commonfooter
  }
    }
</script>
<style>
  .loadmore {
    height:100px;
    line-height:100px;
    text-align:center
  }
</style>