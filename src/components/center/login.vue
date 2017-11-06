<template>
    <div style="height:100%;width:100%;">
       <div class="pu_header clearfix">
         <span @click.prevent="goBack"><i class="fa fa-angle-left"></i></span>
         <div class="left">登录</div>
       </div>
       <div class="login_tabWrap">
       <tab :line-width="2" :custom-bar-width="getBarWidth" v-model="index" bar-active-color="#ff943a" active-color="#ff943a">
          <tab-item @on-item-click="onItemClick">账号密码登录</tab-item>
          <tab-item @on-item-click="onItemClick">手机验证码登录</tab-item>
       </tab>
      </div>
       <div class="login_content">
          <div v-show="index == 0" class="login">
              <ul>
                <li>
                  <label>账号</label>
                  <input type="text" name="" placeholder="手机号/邮箱/用户名" v-model="usename">

                </li>
                <li>
                  <label>密码</label>
                  <input type="password" name="" placeholder="请输入6-20位登录密码" v-model="password"> 
                </li>
              </ul>
              <div class="logBt" v-show="usename && password">登录</div>
              <div class="logBt on"  v-show="!usename || !password">登录</div>
          </div>
          <div v-show="index == 1" class="login">
               <ul class="tel_ul">
                <li>
                  <label>手机号码</label>
                  <input type="text" name="" placeholder="请输入手机号" v-model="tel">
                </li>
                <li>
                  <label>手机验证码</label>
                  <input type="text" name="" placeholder="验证码" v-model="code"> 
                  <div @click.prevent="getCode" class="getCode" v-show="!showTime">获取验证码</div>
                  <div  class="getCode" v-show="showTime">( <span>{{time}}</span> )</div>
                </li>
              </ul>
              <div class="logBt" v-show="tel && code">登录</div>
              <div class="logBt on" v-show="!tel || !code">登录</div>
          </div>
          <div class="clearfix forgetBox">
              <div class="right">忘记密码？</div>
          </div>
          <div class="zc">快速注册</div>
       </div>
       <div class="login_buttom">
             <divider>其他登录方式</divider>
             <div class="loginTpy">
               <div class="left">
               <i class="fa fa-qq" aria-hidden="true"></i>
               <p>QQ</p>
               </div>
               <div class="right">
                  <i class="fa fa-weixin" aria-hidden="true"></i>
                 <p>微信</p>
               </div>
             </div>
          </div>
    </div>
</template>

<script type="ecmascript-6">
import { Tab, TabItem } from 'vux'
import { Divider } from 'vux'

    export default {
    name: '',
    data(){
       return {
        index: 0,
        getBarWidth: function (index) {
          if(index == 0){
              return 100 + 'px'
          }else {
            return 110 + 'px'
          }
        },
        showTime:false,
        time:60,
        code:"",
        usename:"",
        password:"",
        tel:"",
        code:""
      }
    },
    created:function(){
      
    },

     mounted:function(){
      var h = document.body.scrollHeight;
      window.onresize = function(){
          var btns = document.querySelector('.login_buttom');
          if(!btns) {
            return
          }
          if (document.body.scrollHeight < h) {
              btns.style.display = "none";      
          }else{
              btns.style.display = "block";
          }
      };
    },

    methods:{
    	goBack(){
        window.history.go(-1)
      },
      onItemClick(index){
       
      },
      getCode(){
        this.showTime = true;
        this.code = "";
        var _this = this;
        var leftTime = setInterval(function(){
             _this.time --;
             if( _this.time == 0){
               clearInterval(leftTime);
               _this.time = 60;
               _this.showTime = false;
             }
        }, 1000);
      }
    },
     components: {
     Tab,
     TabItem,
     Divider
   }
  }
</script>

<style lang="less" scoped>
@rem: 23.45rem;
      .login_tabWrap {
       position:absolute;
       top: 50/@rem;
       left: 0;
       right: 0;
       z-index: 555; 
       border-top:1px solid #fbf9fe; 
       padding-right: 8/@rem;
       background-color: #fff;
       border-bottom: 1px solid #eee;
    }
    .login_content { 
        padding-top: 150/@rem;
        background-color: #fff;
        height: 100%;
        ul{margin-bottom: 30/@rem;};
        .logBt{
           background-color: #ff943a;
           color: #fff;
           border-radius: 8/@rem;
           text-align: center;
           width: 340/@rem;
           margin: 0 auto;
           padding: 10/@rem 0;
        }
        .logBt.on{
           background-color: #cacaca;
        }
        li {
          margin: 0 20/@rem;
          padding: 0 15/@rem;
          border-bottom: 1px solid #eee; 
          position:relative;
          height: 50/@rem;
          line-height: 50/@rem;
           label{color:#3c4041};
          input {
             border:none;
             margin-left:20/@rem;
             color: #999;
             width:230/@rem;
             font-size: 17/@rem;
          }
        }
       .tel_ul {
          label{
             color:#3c4041;
             display: inline-block;
             width: 95/@rem;

          };
          input {
             width:130/@rem;
             margin: 0;
             font-size: 17/@rem;
          }
          .getCode{
            color: #ff943a;
            position: absolute;
            right: 0;
            top: 0/@rem;
            width: 82/@rem;
            text-align: center;
          }
          
       }
       .login {
           margin-bottom: 15/@rem;
       }
     }
    .forgetBox {
      padding-right: 15/@rem;
      font-size: 14/@rem;
      color:#3c4041;
      margin-bottom:20/@rem;
    }
    .zc {
        border: 1px solid #ff943a;
        border-radius: 5px;
        color: #ff943a;
        text-align: center;
        width: 90/@rem;
        margin: 0 auto;
        padding: 6/@rem 0; 
        font-size: 14/@rem;
    }
    .login_buttom {
      position: absolute;
      bottom: 0;
      overflow: hidden;
      height: 120/@rem;
    }
    .loginTpy {
       width: 160/@rem;
       margin: 13/@rem auto 0 auto;
       
       i.fa-weixin {
          color: #47b667;
          font-size: 35/@rem;
           margin-bottom: 6/@rem;
       }
       i.fa-qq {
         color: #97c5ff;
          font-size: 35/@rem;
           margin-bottom: 6/@rem;
       }
    }
  .loginTpy > div{
         text-align: center;
         font-size: 14/@rem;

       }
</style>
