<template>
    <div>
        <div class="pu_header clearfix" >
             <span @click.prevent="goBlack"><i class="fa fa-angle-left"></i></span>
             <div class="left">编辑个人资料</div>
        </div>
        <div class="pu_content">
                  <ul class="myEdite">
                    <li class="clearfix" @click.prevent="Shoot">
                       <label>头像</label>
                       <div class="right">
                          <img :src="headImg">
                         <!--  <img src="../../assets/man.jpg"> -->
                          <i class="fa fa-angle-right"></i>
                       </div>
                    </li>
                    <li class="clearfix" @click.prevent="ShootThis">
                       <label>昵称</label>
                       <div class="right">
                          <span><input type="text" name="" v-model="name" class="input" placeholder="未设置"></span>
                       </div>
                    </li>
                     <li class="clearfix sexli">
                        <group>
                           <popup-radio title="性别" :options="options" v-model="sexVule" :placeholder="placeholder"></popup-radio>
                      </group>
                       <span class="postion"><i class="fa fa-angle-right"></i></span>
                    </li>
                  </ul>
                  <div class="btbox">
                     <div class="bt comBt" @click.prevent="sure">保存修改</div>
                  </div>
          </div>
    </div>
 
</template>
<script type="ecmascript-6" src="../../static/js/mui.min.js"></script>
<script type="ecmascript-6">
import { Group, PopupRadio } from 'vux';
import api from '@/api';
import wx from '@/awx';
    export default {
    name: '',
    data(){
      return {
      	title:"",
        headImg:"",
        name:"",
        options: ["男","女"],
        sexVule:"",
        placeholder:"未设置",
        showShoot:false,
      }
    },
    
    created:function(){
          api.ajaxLaoding('',
         "CustomerCenter/getCustomerInfo",{}
        ).then(res=>{
          console.log(res);
          this.name = res.data.result.model.nickname;
          this.headImg = res.data.result.model.avater;
           if(this.sexVule){
           this.placeholder = ""; 
         }
        }).catch(()=>{
          console.log("失败");
        });
    },
        
    mounted:function(){
      
    },

    watch:{
       sexVule:function(){
          this.placeholder = "";
       } 
    },

    methods:{
    	goBlack(){
         window.history.go(-1);
      },

      Shoot(){ 
        wx.uploadImg().then(res=>{
          console.log("返回成功");
          if(res.data.result.success == true){
              this.headImg = res.data.result.filePath;
          }else{
              alert("上失败请检查网路");
          }
        }
       ).catch(()=>{alert("出错");});     
      },

      ShootThis(){
        const _this = this;
        this.$vux.confirm.show({
          // 组件除show外的属性
          showInput:true,
          placeholder:"输入您想要的昵称",
          onCancel () {
          
          },
          onConfirm (value) {
            console.log(value);
            if(value){
               _this.name = value;
            }
          },

        })
      },
       sure (){
       api.ajaxLaoding('',
         "CustomerCenter/UpdateCustomerInfo",{"nickName":this.name}
        ).then(res=>{
          if(res.data.result){
              this.$vux.toast.show({
              type:"text",
              text:'修改成功', 
              time:500
              })
            window.history.go(-1);
          }else{
             this.$vux.toast.show({
              type:"text",
              text:'修改失败请检查网路', 
              time:500
              })
          }
        }).catch(()=>{
          console.log("失败");
        });
      }
    },

   components: 
   {
    Group,
    PopupRadio
  },

  }
</script>

<style lang="less" scoped>

@rem: 23.45rem;
   .myEdite {
    li {
      padding: 0 15/@rem;
      height: 80/@rem;
      line-height: 80/@rem;
      margin-bottom: 2/@rem;
      background-color: #fff;
      position: relative;
      img {
        width: 40/@rem;
        height: 40/@rem;
        border-radius: 100%;
        display: inline-block;
        vertical-align: middle;
      }
      i {
        font-size: 20/@rem;
        margin-left: 10/@rem;
      }
     .input {
        outline: none;
        border: none;
        width: 160/@rem;
        text-align: right;
        font-size: 16/@rem;
     }
    }
    .sexli {
      padding-top: 20/@rem;
      p{
        padding: 0;
      }
    }
    .postion {
      position: absolute;
      right: 15/@rem;;
      bottom: 0;
    }
   }
  .btbox {
         background-color: #fff;
         padding: 20/@rem 0;
         .bt {
          border: 1px solid red;
          width: 110/@rem;
          margin: 0 auto;
          color: red;
          text-align: center;
          padding: 8/@rem 0;
         }
         .bt.no{
          color: #eee;
          border: 1px solid #eee;
         }
      }
</style>