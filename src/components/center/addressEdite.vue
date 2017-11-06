<template>
    <div >
     <div class="pu_header clearfix" >
         <span @click.prevent="closepopus"><i class="fa fa-angle-left"></i></span>
         <div class="left" v-if="type">编辑地址</div>
         <div v-if="!type" class="left">添加地址</div>
         <div class="right" @click.prevnet="dateAddress" v-if="type">删除</div>
    </div>
       <div class="pu_content">
       	  <div class="inputWrap">
             <div class="item clearfix">
             	 <div class="left">收货人姓名:</div>
             	 <div class="right"><input type="text" name="" placeholder="请输入收货人姓名"  v-model="name"></div>
             </div>
             <div class="item clearfix" >
             	 <div class="left">收货人电话:</div>
             	 <div class="right"><input type="text" name="" placeholder="请输入收货人电话" v-model="phone"></div>
             </div>
             <group label-width="7em" label-align="left">
			      <x-address :title="title2" 
			      v-model="addressVule" 
			      raw-value :list="addressData" 
			      value-text-align="left"
                  placeholder="请选择地址"
			      ></x-address>
			 </group>
			  <div class="item clearfix tareBox" style="border-top:1px solid #eee;">
             	 <div class="left">详细地址:</div>
             	 <div class="right"> 
             	   
             	    <textarea placeholder="请输入详细地址" maxlength="100" v-model="distail">
                    </textarea>
                 </div>
             </div>
             <div class="item clearfix" style="border-bottom:none; ">
             	 <div class="left">是否设为默认:</div>
             	 <div class="left" style="padding-left:20px;" @click="isMr"> 
             	   <icon type="success" class="success" v-show="mr"></icon>
                   <icon type="circle" class="circle" v-show="!mr"></icon> 
                 </div>
             </div>
       	  </div>
       	  <div class="btbox">
             	 <div class="bt comBt" @click.prevnet="sure" v-if="type" >保存修改</div>
             	 <div class="bt comBt" @click.prevnet="add" v-if="!type" 
                    v-show ="name && phone && addressVule.length != 0 && distail"
             	 >保存地址</div>
             	 <div class="bt no"  v-if="!type" v-show ="!name || !phone || addressVule.length == 0 || !distail ">保存地址</div>
          </div>
       </div>
       <!--  <x-address style="display:none;" title="title" v-model="addressVule" :list="addressData" placeholder="请选择地址" :show.sync="showAddress"></x-address> -->
    </div>
</template>

<script type="ecmascript-6">
import loacionDate from '../../../static/js/addressdata.js';
import { XAddress , Group , Value2nameFilter as value2name} from 'vux';
import { XSwitch } from 'vux';
import { Icon } from 'vux';
import api from '@/api';
    export default {
    name: '',
    data(){
      return {
        name:"",
      	phone:"",
      	detailAdress:'',
      	addressVule:[],
      	addressData:loacionDate,
        showAddress:false,
        title2:"地址:",
        title:"设为默认",
        mr:false,
        distail:"",
        id:"",
        type:true
      }
    },
    created:function(){
        var storage = window.localStorage;
        var  str = storage.getItem("addressEdite");
        if(str){

        	this.type = true;
        	var obj = JSON.parse(str);

        	this.name = obj.receiver;
	        this.phone = obj.phone;
	        this.distail = obj.street;
	        this.mr = obj.mr;
            this.addressVule.push(obj.priovinceId);
            this.addressVule.push(obj.cityId);
	        this.addressVule.push(obj.areaId);
            this.addressVule = value2name(this.addressVule, loacionDate).split(" ");
	        this.id = obj.id;
            console.log(this.addressVule);
        }else {
        	this.type = false;
        }
        

    },
    methods:{
    	closepopus(){
    		 window.history.go(-1);
    	},
    	dateAddress(){
          api.ajaxLaoding('',
		    "Address/deleteAddress",{"id":this.id}
		    ).then(res=>{
		      this.$vux.toast.show({
		      	  type:"text",
		      	  text:'删除成功', 
                  time:500
		       })
		      window.history.go(-1);
		    }).catch(()=>{
		      console.log("失败");
           });
    	},
    	showbox(){
        this.showAddress = true;
      },
       getName (value) {
          return value2name(value, loacionDate);
     },
      isMr(){
         this.mr = ! this.mr;
     },
     /*保存地址*/
     sure(){
     	 /*var str = value2name(this.addressVule, loacionDate);
         var array = str.split(" ");*/
     	api.ajaxLaoding('',
		      "Address/updateAddress",
		      {"id":this.id,"receiver":this.name,"phone":this.phone,"areaId":this.addressVule[2],"street":this.distail,"isdefault":this.mr}
		    ).then(res=>{
		    	console.log(res);
		      this.$vux.toast.show({
		      	  type:"text",
		      	  text:'修改成功', 
                  time:500
		       })
		      window.history.go(-1);
		    }).catch(()=>{
		      console.log("失败");
           });
     },
     add(){
     	/* var str = value2name(this.addressVule, loacionDate);
         var array = str.split(" ");
         console.log(array)*/
  
     	api.ajaxLaoding('',
		     "Address/addAddress",
		      {"receiver":this.name,"phone":this.phone,"areaId":this.addressVule[2],"street":this.distail,"isdefault":this.mr}
		    ).then(res=>{
		    	console.log(res);
		      this.$vux.toast.show({
		      	  type:"text",
		      	  text:'添加成功', 
                  time:500
		       })
              if(this.$route.query.type == "checkout") {
                 this.$router.replace({path:"/checkout"});
                 return;
              }
		      window.history.go(-1);
		    }).catch(()=>{
		      console.log("失败");
           });
     }
    },
       
     components: {
     XSwitch,	
     XAddress,
     Group,
     Icon
  }

  }
</script>

<style lang="less" scoped>
@rem: 23.45rem;
    .inputWrap {
    	border:1px solid #eee;
    	padding-left: 15/@rem;
    	background-color: #fff;
    	.item.tareBox {
    		height: 75/@rem;
            margin-top: 2/@rem;
    	}
        .item.tareBox .left{
            padding-top: 15/@rem;
        }
        .item.tareBox .right{
            padding-top: 0px;
            textarea {
                height: 53/@rem;
            }
        }
    	.item {
    		height: 35/@rem;
    		border-bottom:1px solid #eee;
    		overflow: hidden;
            height: 60/@rem;
            padding-top: 10/@rem;
    		.left{
    			 width: 100/@rem;
    			 padding-top: 9/@rem;
                 /*color: #545352;*/
    			 
    		}
    		.right {
    			width: 250/@rem;
    			padding-top: 11/@rem;
    			padding-right: 15/@rem;
    			font-size: 14/@rem;
    			height: 100%;
             
    			input, textarea {
    				outline: none;
    				border:none;
    				width: 100%;
    				font-size: 16/@rem;
    				color: #999;
    			}
    			

    		}
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