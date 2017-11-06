<template>
    <div class="address">
       <div class="pu_header clearfix" >
         <span @click.prevent="closepopus"><i class="fa fa-angle-left"></i></span>
         <div class="left">我的地址</div>
         <div class="right" @click.prevnet="addAddress"><i class="fa fa-plus-square-o"></i></div>
       </div>
        <div class="pu_content">
              <ul >
                <li class="clearfix" v-for="(item,index) in adressData" @click.prevnet="choiceAddsItem(index)">
                  <div class="icon">
                    <span class="icon-地址"></span>
                  </div>
                  <div class="info">
                     <h5><span>{{item.receiver}}</span> <span>{{item.phone}}</span></h5>
                      <p><span>{{addressInit(item.priovinceId,item.cityId,item.areaId)}}</span> 
                         <span>{{item.street}}</span>
                      </p>
                  </div>
                  <div class="mr" v-show="index == 0">默认</div>
                  <span class="icon_rihgt"><i class="fa fa-angle-right"></i></span>
                </li>
              </ul>
           </div>
    </div>
</template>

<script type="ecmascript-6">
import api from '@/api';
import loacionDate from '../../../static/js/addressdata.js';
import { Value2nameFilter as value2name } from 'vux';
    export default {
    name: '',
    data(){
      return {
        adressData:[],
      }
    },
    created:function(){
       api.ajaxLaoding('',
      "Address/userAddress",{}
    ).then(res=>{
       var data = res.data.result.datas;
      this.adressData = data;
    }).catch(()=>{
      console.log("失败");
    });
    },

    methods:{
      closepopus(){
        window.history.go(-1);
      },
      choiceAddsItem(index){
        var data = this.adressData[index];
        data = JSON.stringify(data);
         var storage = window.localStorage;
           storage.setItem("addressEdite",data); 
           this.$router.push({path:"/addressEdite"});
      },
     addAddress(){
        var storage = window.localStorage;
        storage.setItem("addressEdite",""); 
        this.$router.push({path:"/addressEdite"});
     },
     addressInit(a,b,c) {
         var arry = [];
         arry.push(a);
         arry.push(b);
         arry.push(c);
         var str = value2name(arry, loacionDate);
         return str;
     }
    },

 
  }
</script>

<style lang="less" scoped>
@rem: 23.45rem;
  
 .address {
       li {background-color: #fff; margin-bottom: 8/@rem;position: relative;}
      .icon{
        width: 35/@rem;
        line-height: 52/@rem;
        height: 52/@rem;
        font-size: 20/@rem;
        padding-left: 15/@rem;
        float: left;
      }
      .icon_rihgt {
        position: absolute;
        font-size: 17/@rem;
        display: block;
        width: 10/@rem;
        right:10/@rem;
        height: 28/@rem;
        margin-top: -13/@rem;
        top:50%;
      }
        .info{      
        padding-left: 5/@rem;
        padding-top: 8/@rem;
        padding-bottom: 7/@rem;
            width: 330/@rem;
            float: left;    
      }
      .info.active{
        color: #f4c230;
      }
      .info.active h5 {
        color: #f4c230;
      }
      .info h5 {
        margin-bottom: 5/@rem;
        font-weight: normal;
      }
      .info p {
            font-size: 14/@rem;
      }
      .mr {
        position: absolute; 
        right: 20/@rem;top:8/@rem;
        font-size: 14/@rem;
        transform:rotate(10deg);
        color: red;
      }
    } 
</style>