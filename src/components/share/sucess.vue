<template>
    <div style="width: 100%;height:100%;background:#fff;">
       <div class="head">
           <div class="title" v-if="type == 'appraise'">评价成功~！</div>
           <div class="title" v-if="type == 'pay'">付款成功~！</div>
           <div class="img" v-if="type == 'appraise'"><i class="fa fa-comment-o" aria-hidden="true"></i></div>
           <div class="img" v-if="type == 'pay'"><span class="icon-待付款"></span></div>
            <!-- <div class="img"><i class="fa fa-check" aria-hidden="true"></i></div> -->
           <div class="btWrap clearfix">
              <span class="left" @click.prevent="goOder">查看订单</span>
              <span class="right" @click.prevent="goHome">返回首页</span>
           </div>
       </div>
    </div>
</template>

<script type="ecmascript-6">
    export default {
    name: '',
    data(){
      return {
      	type:"" 
      }
    },
    created:function(){
       this.type = this.$route.query.type;
       console.log(this.type);
    },
    methods:{
    	goOder(){
        this.$router.push({path:"/order/total"});
        var storage = window.localStorage;
        storage.setItem("goback","home"); 
      },
      goHome(){
        this.$router.push({path:"/index"});
      }
    }
  }
</script>

<style lang="less" scoped>
@rem: 23.45rem;
     .head {
         background: orange;
         height: 240/@rem;
     }
     .title {
      
       color: #fff;
       font-size: 18/@rem;
       padding: 20/@rem 0 0/@rem 20/@rem;
     }
     .img {
       color: #fff;
       font-size: 40/@rem;
       text-align: center;
       margin-bottom: 25/@rem;
     }
     .btWrap {
       width: 200/@rem;
       margin: 0 auto;
       span {
          border:1px solid yellow; 
          padding: 5/@rem 10/@rem;
          color: yellow; 
          border-radius: 5/@rem;
          font-size: 14/@rem;
       }

     }
</style>