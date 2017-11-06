<template>
    <div class="checkout" style="height:100%;width:100%">
       <div class="pu_header clearfix">
         <span @click.prevent="goBack"><i class="fa fa-angle-left"></i></span>
         <div class="left">确认订单</div>

       </div>
       <div class="pu_content" v-show="goodsData.length > 0" >
       	  <div class="adressWrap clearfix" v-if="nowAddressData"  @click.prevent="choiceAdds">
       	  	 <div class="left address">
       	  	    <span class="icon-地址"></span>
       	  	 </div>
       	  	 <div class="left info">
       	  	    <h5><span>{{nowAddressData.receiver}}</span> <span>{{nowAddressData.phone}}</span></h5>
       	  	    <p>
                  <span>{{addressInit(nowAddressData.areaId,nowAddressData.cityId,nowAddressData.priovinceId)}}</span>
       	  	      <span>{{nowAddressData.street}}</span>
       	  	    </p>
       	  	 </div>
       	  </div>
          <div class="adressWrap clearfix" v-if="!nowAddressData" @click.prevent="addAddress">
             <div class="left address">
                <span class="icon-地址"></span>
             </div>
             <div class="left set" >
                 请设置
             </div>
          </div>
          <div class="address_border"></div>
       	  <div class="itemWrap">
              <ul class="ul">
              	 <li class="clearfix"  v-for="item in goodsData">
                    <div class="left imgbox" :style="{backgroundImage: 'url('+item.picUrl+')'}"></div>
                    <div class="left info">
                    	<h5>{{item.title}}</h5>
                    	<p>{{item.specification}}</p>
                    	<div><span class="price">¥ {{item.price}}</span></div>
                    	<div class="goodsnum">× <span class="num">{{item.count}}</span></div>
                    </div>
              	 </li>
              </ul>
              <div class="itemInfo">
              	  <ul>
              	  	 <li class="clearfix sent">
              	  	   <span class="left">运费 <span class="price">包邮</span></span>
              	  	   <span class="right"><span>卖家承当运费</span></span>
              	  	 </li>
              	  	<!--  <li class="clearfix">
              	  	   <span class="left">店铺优惠劵</span>
              	  	   <span class="right">可用优惠劵<span>0</span>张</span>
              	  	 </li> -->
              	  	 <li class="clearfix">
              	  	   <div class="playTitle">支付方式 </div>
                       <!-- <p><img src="../../assets/alipay2.png">支付宝
                        <span @click.prevent="choicPay">
                           <icon type="success" class="success" v-show="payTapy"></icon>
                           <icon type="circle" class="circle" v-show="!payTapy"></icon>
                        </span>
                       </p> -->
                       <p><img src="../../assets/Wechat.png" class="wx">微信 
                         <!--  <span @click.prevent="choicPay" class="wxspan">
                             <icon type="success" class="success" v-show="!payTapy"></icon>
                             <icon type="circle" class="circle" v-show="payTapy"></icon>
                          </span> -->
                       </p>
              	  	 </li>
              	  	 <li>
              	  	 	<div>给卖家的留言</div>
              	  	 	 <textarea placeholder="50个字以内" maxlength="100" v-model="msg">
                        </textarea>
              	  	 </li>
              	  </ul>
              	  <div class="clearfix totle">
              	  	  <div class="right">共 
              	  	     <span class="price">{{totnum}}</span> 
              	  	        件商品 <span>合计：<span class="price">{{totpric}}</span> 元
              	  	     </span>
              	  	  </div>
              	  </div>
              </div>
       	  </div>
       	<div class="footBottom clearfix">
       		<div class="left">实付金额：<span class="price">¥ {{totpric}}</span></div>
       		<div class="right accountAtn" @click.prevent="toPay">立即付款</div>
       	</div> 
       </div>
       <div class="popus">
       	  <div class="pu_header clearfix" style="position:absolute" v-if="nowAddressData">
         <span @click.prevent="closepopus"><i class="fa fa-angle-left"></i></span>
         <div class="right" @click.prevnet="addAddress"><i class="fa fa-plus-square-o"></i></div>
         <div class="left">我的地址</div>
       </div>
        <div class="pu_content">
	            <ul >
	            	<li class="clearfix" v-for="(item,index) in addressData" @click.prevnet="choiceAddsItem(index)">
	            		<div class="icon">
	            			<span class="icon-地址"></span>
	            		</div>
	            		<div class="info" :class="{active:index == AddresNow}">
	            			  <h5><span>{{item.receiver}}</span> <span>{{item.phone}}</span></h5>
                        <p>
                          <span>{{addressInit(item.areaId,item.cityId,item.priovinceId)}}</span>
                          <span>{{item.street}}</span>
                        </p>
	            		</div>
	            		<div class="mr" v-show="index == 0">默认</div>
	            	</li>
	            </ul>
	         </div>
       </div>
    </div>
</template>

<script type="ecmascript-6">
import price from '../../../static/js/price.js';
import api from '@/api';
import axios from 'axios';
import { Icon } from 'vux';
import { Value2nameFilter as value2name} from 'vux';
import loacionDate from '../../../static/js/addressdata.js';
import { Indicator } from 'mint-ui';
 export default {
    name: 'checkout',
    data(){
      return {
        adressData:[],
        AddresNow:0,
        goodsData:[],
        nowAddressData:"",
        addressData:"",
        totpric:"",
        totnum:"",
        payTapy:false,
        msg:"",
        cartListIds:"",
        addressId:""
      }
    },

    created:function(){
      Indicator.open('加载中...');
      var storage = window.localStorage;
      var goodsdata = storage.getItem("cartListIds"); 
      var datas = goodsdata.split(",");
     /* console.log("data"+datas);*/
      this.cartListIds = datas;
    	var _this = this;
      
	function Address(){
		    return api.ajax('',
		      "Address/userAddress",{}
		    );
		}
function checkoutOrde(){
      return api.ajax('',
          "Order/checkoutOrder",{"cartListIds":datas}
       );
  }

axios.all([Address(),checkoutOrde()])
    .then(axios.spread(function(dress,orde){
      var data = dress.data.result.datas;
      console.log(orde);
      console.log(dress);
    /*  if(data.length < 1){
           _this.$router.replace({path:"/addressEdite",query:{"type":"checkout"}});
      }*/
      if (data[0]){
         _this.nowAddressData = data[0];
         _this.addressId = data[0].id;
         _this.addressData = data;
      }
     
      console.log(_this.nowAddressData);
          Indicator.close();
      _this.totnum =  orde.data.result.totalCount;
      _this.totpric = orde.data.result.totalPrice;
        _this.goodsData = orde.data.result.cartList[0].detail4AppList;
    }));	 
    },

    methods:{
    	price:price,
    	goBack(){window.history.go(-1);},
    	choiceAdds(){
    		 var d = document.querySelector(".popus");
    		 d.style.left = "0";
    	},
    	closepopus(){
    		var d = document.querySelector(".popus");
    		 d.style.left = "100%";
    	},
    	choiceAddsItem(index){
    		this.AddresNow = index;
    		this.nowAddressData = this.addressData[index];
        this.addressId = this.addressData[index].id;
    		var d = document.querySelector(".popus");
    		d.style.left = "100%";
    	},
      choicPay(){
        this.payTapy = !this.payTapy
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
     },
     toPay(){
       if(!this.addressId){
         alert("您未设置地址");
         return;
       }
        api.ajaxLaoding('',
      "Order/settlement",{"cartListIds":this.cartListIds,"buyerRemark":this.msg,"shipAddressId":this.addressId}
    ).then(res=>{
      var order = res.data.result;
      console.log(order);
    api.ajaxLaoding('',
      "WXPay/authorize",{"outtradeno":order,"returnUrl":'http://www.wayperfect.com/authorize/authorize/#/paySucess?order='+ order}
    ).then(res=>{
      var url = res.data.result;
      window.location = url;
    }).catch(()=>{
      console.log("失败");
    });
      
    }).catch(()=>{
      console.log("失败");
    });
     }
    },

     components: {
      Icon
  }

  }
</script>

<style lang="less" scoped>
@rem: 23.45rem;
    .adressWrap {
    	background-color: #fff;
        padding: 5/@rem 0; 
    	.left.address {
    		width: 35/@rem;
    		line-height: 52/@rem;
    		height: 52/@rem;
    		font-size: 20/@rem;
    		padding-left: 15/@rem;
    	}
    	.left.info{  		
    		padding-left: 5/@rem;
    		padding-top: 8/@rem;
    		padding-bottom: 7/@rem;
    		overflow: hidden;
            text-overflow:ellipsis;
            white-space: nowrap;
            width: 330/@rem;
    	}
      .left.set {
         padding-left: 20/@rem;
        padding-top: 13/@rem;
        height: 100%;
      }
    	.left.info h5 {
    		margin-bottom: 5/@rem;
        font-weight: normal;

    	}
      .left.info h5 span {
         font-weight: normal;
      }
    	.left.info p {
    		overflow: hidden;
            text-overflow:ellipsis;
            white-space: nowrap;
            font-size: 14/@rem;
    	}
    }
    .address_border {
       height: 3px;
       width: 100%;
       background-image:url("../../assets/addressborder.png");
       background-repeat: repeat-x;
    }
    .itemWrap {
    	 background-color: #fff;
    	 padding-top: 8/@rem;
    	 padding-bottom: 8/@rem;
    	
    	 margin-bottom: 8/@rem;
    	 ul.ul {
    	 	 border-bottom: 1px solid #ddd;
    	 	 padding-bottom: 8/@rem;
    	 	li {
    	 		 padding-left: 15/@rem;
    	 		 padding-top: 5/@rem;
    	 		 padding-bottom: 5/@rem;
    	 		 position: relative;
    	 		 .goodsnum {
                    position: absolute;
                    bottom: 10/@rem;
                    right: 15/@rem;
                    color: #545352;
                    .num {
                    	font-size: 14/@rem;
                    }
    	 		 }
    	 	}
    	 }
    	 .left.imgbox {
    	 	width: 100/@rem;
    	 	height: 100/@rem;
            background-repeat: no-repeat;
            background-position: center;
            background-size: cover;
            border: 1px solid #ddd;
    	 }
    	.left.info{
    		padding-left: 15/@rem;
    		padding-top: 5/@rem;
    		
    		width: 245/@rem;
    		h5{
    			 max-height: 38.4/@rem;
		         overflow: hidden;
		         text-overflow:ellipsis;
		         margin-bottom: 4/@rem;
             font-weight: normal;

    		}
    		p{
    			font-size: 14/@rem;
    			margin-bottom: 3/@rem;
    		}
    	} 
    }
    .itemInfo {
    	 padding: 10/@rem 15/@rem 10/@rem 15/@rem;
       li.sent {
        margin-bottom: 15/@rem;
       }
    	 li {
    	 	margin-bottom: 10/@rem;
    	 	.left {color: #6d6d6d;font-size: 15/@rem;}
    	 	.right {font-size: 14/@rem;}
    	 	div{
    	 		margin-bottom: 10/@rem;
    	 		font-size: 15/@rem;
    	 		color: #6d6d6d;
    	 	}
     
         p {
             margin-bottom: 10/@rem;
          
              color: #6d6d6d;
              img { 
             width: 20/@rem;
             height: 20/@rem;
             vertical-align: text-bottom;
             margin-right: 10/@rem;
           
           }
            span {
              margin-left: 15/@rem;
            }
            span.wxspan {
               margin-left: 30/@rem;
            }
        
          }
    	 }
    	.totle {
    		font-size: 14/@rem;
    	} 
    }
    textarea { width: 310/@rem; height: 100/@rem;padding: 10/@rem;border: 1px solid #ddd; color: #545352;display: block;margin-left: 18/@rem;}
    textarea::placeholder{color:#ddd;}
    .footBottom {
    	 height: 53/@rem;
    	 position: fixed;
    	 left: 0;
    	 right: 0;
    	 bottom: 0;
    	 background-color: #fff;
    	 border-top: 1px solid #ddd;
    	 div {
    	 	height: 100%;
    	 }
    	 .right {
    	 	text-align: center;
    	 	background-color: red;
    	 	color: #fff;
            
    	 	font-size: 14/@rem;
    	 	padding: 16/@rem 25/@rem 0 25/@rem;
    	 }
    	 .left {
    	 	padding-top: 16/@rem;
            padding-left: 15/@rem;
    	 }
    }
    .popus {
    	width: 100%;
    	height:100%;
    	position: fixed;
    	top:0;
    	left: 100%;
    	z-index: 600;
    	transition: all 0.3s ease 0s;
    	background-color:#f0f0f0;
    	 li {background-color: #fff; margin-bottom: 8/@rem;position: relative;}
    	.icon{
    		width: 35/@rem;
    		line-height: 52/@rem;
    		height: 52/@rem;
    		font-size: 20/@rem;
    		padding-left: 15/@rem;
    		float: left;
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