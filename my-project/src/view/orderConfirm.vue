<template>
    <div>
      <commonheader></commonheader>
      <navbread :routeval='rname'></navbread>
      <div class="container">
        <div class="checkout-order">
          <div class="page-title-normal">
            <h2 class="page-title-h2"><span>check out</span></h2>
          </div>
          <!-- process step -->
          <div class="check-step">
            <ul>
              <li class="cur"><span>Confirm</span> address</li>
              <li class="cur"><span>View your</span> order</li>
              <li><span>Make</span> payment</li>
              <li><span>Order</span> confirmation</li>
            </ul>
          </div>

          <!-- order list -->
          <div class="page-title-normal checkout-title">
            <h2><span>Order content</span></h2>
          </div>
          <div class="item-list-wrap confirm-item-list-wrap">
            <div class="cart-item order-item">
              <div class="cart-item-head">
                <ul>
                  <li>Order contents</li>
                  <li>Price</li>
                  <li>Quantity</li>
                  <li>Subtotal</li>
                </ul>
              </div>
              <ul class="cart-item-list"  v-for="(item,index) in proList" :key="index">
                <li>
                  <div class="cart-tab-1">
                    <div class="cart-item-pic">
                      <img :src="'/static/'+item.productImage" alt="">
                    </div>
                    <div class="cart-item-title">
                      <div class="item-name">{{item.productName}}</div>

                    </div>
                  </div>
                  <div class="cart-tab-2">
                    <div class="item-price">{{item.salePrice | currency("￥",2)}}</div>
                  </div>
                  <div class="cart-tab-3">
                    <div class="item-quantity">
                      <div class="select-self">
                        <div class="select-self-area">
                          <span class="select-ipt">x{{item.productNum}}</span>
                        </div>
                      </div>
                      <div class="item-stock item-stock-no">In Stock</div>
                    </div>
                  </div>
                  <div class="cart-tab-4">
                    <div class="item-price-total">{{(item.salePrice*item.productNum)| currency("￥",2)}}</div>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          <!-- Price count -->
          <div class="price-count-wrap">
            <div class="price-count">
              <ul>
                <li>
                  <span>原价:</span>
                  <span>{{ subTotal | currency("￥",2)}}</span>
                </li>
                <li>
                  <span>邮费:</span>
                  <span>{{shipping | currency("￥",2) }}</span>
                </li>
                <li>
                  <span>优惠:</span>
                  <span>{{discount | currency("￥",2)}}</span>
                </li>
                <li>
                  <span>税:</span>
                  <span>{{tax | currency("￥",2)}}</span>
                </li>
                <li class="order-total-price">
                  <span>订单总额:</span>
                  <span>{{orderTotal | currency("￥",2)}}</span>
                </li>
              </ul>
            </div>
          </div>

          <div class="order-foot-wrap">
            <div class="prev-btn-wrap">
              <button class="btn btn--m">Previous</button>
            </div>
            <div class="next-btn-wrap">
              <button class="btn btn--m btn--red" @click="payment">去支付</button>
            </div>
          </div>
        </div>
      </div>
    </div>  
      
</template>

<script>
    import commonheader from "@/components/header.vue";
    import navbread from "@/components/navbread.vue";
    import {getCartList} from "@/api/index.js";
    import {payment} from "@/api/index.js";
    import {currency} from "@/util/currency.js"
    export default {
        data () {
          return {
            rname:'oderConfirm',
            orderid:null,
            proList:[],
            shipping:10,
            discount:50.57,

          }
        },
        computed: {
          subTotal(){
            var totalsub=0
            this.proList.forEach((v)=>{
              totalsub += v.salePrice*v.productNum
            })
            return totalsub
          },
          tax(){
            return this.subTotal*0.07
          },
          orderTotal(){
            return this.subTotal+this.shipping-this.discount+this.tax

          }
        },
        //钩子函数，vue已经定义好的方法，会自动调用
        created () {//对应的vue实例化后的init过程，绑定data和method等
          // this.orderid=this.$route.query.addressId
        },
        mounted(){//真实dom
         this.init()

        },
        components: {
          commonheader,
          navbread,
        },
        methods: {
          init(){
             getCartList().then(res=>{
                if(res.data.status==0){
                    res.data.result.forEach(element => {
                      if(element.checked=='1')this.proList.push(element)
                    });
                 }else{
                    this.$message({
                          showClose: true,
                          message: res.data.msg,
                          type: "error",
                          duration: 3000
                        });
            }
          })
          },
          payment(){
            var addressId=this.$route.query.addressId
            payment({
              "addressId": addressId,
              "orderTotal":this.orderTotal
            }).then(res=>{
              if(res.data.status==0){
                    this.$router.push({
                      path:'/orderSuccess?orderId='+res.data.result.orderId
                    })
                 }else{
                    this.$message({
                          showClose: true,
                          message: res.data.msg,
                          type: "error",
                          duration: 3000
                        });
            }
            })
          }

        }
    }
</script>

<style scoped>

</style>