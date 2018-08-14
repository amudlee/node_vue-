<template>
    <div>    
        <commonheader></commonheader>
        <navbread :routeval='rname'></navbread>    
      <div class="accessory-result-page accessory-page">
        <div class="container">
          <div class="filter-nav">
            <span class="sortby">Sort by:</span>
            <a href="javascript:void(0)" class="default cur">Default</a>
            <a href="javascript:void(0)" class="price">Price <svg class="icon icon-arrow-short"><use xlink:href="#icon-arrow-short"></use></svg></a>
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
                      <a href="#"><img v-lazy="item.productImage" alt=""></a>
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

            }
        },
        created(){
           getgoods().then(res=>{
             this.productinfo=res.data.result.list
          //  Object.assign(this.productinfo,res.data.result.list);
         })
        
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
         }
            
        }
        ,components: {
            commonheader,
            navbread,
            commonfooter
  }
    }
</script>
