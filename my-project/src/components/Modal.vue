<template>
    <div>
    <div class="md-modal modal-msg md-modal-transition" v-bind:class="{'md-show':modalShow}">
            <div class="md-modal-inner">
                <div class="md-top">
                <div class="md-title">Login in</div>
                <button class="md-close" @click="closemodal">Close</button>
                </div>
                <div class="md-content">
                <div class="confirm-tips">
                 <!-- 模态框这个地方是可以根据不同的内容而改变   -->
                <slot name="message"></slot><!-- 专门放信息的插槽 -->
                </div>
                <!-- 登录按钮 -->
                <div class="btn-wrap">
                   <!-- 模态框按钮根据不同的内容而改变   -->
                    <slot name="btnGroup"></slot><!-- 专门放按钮的插槽 -->
                </div>
                </div>
            </div>
            </div>
            <!-- 遮罩层 -->
            <div class="md-overlay" v-if="modalShow" @click="closemodal"></div>
    </div>
</template>

<script>
export default {
  props:["modalShow"], //接受从父组件传递过来的值,一旦传递过来子组件里面就不能改变这个值了
  data() {
    return {
      msg:'hello vue',
      modal:"",
      show:""
    };
  },
  methods: {
    closemodal() {
      //触发父组件的close事件
      this.$emit("close");
    }
  }
};
</script>

<style scoped>
</style>
