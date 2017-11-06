<template>
     <div class="goods_hot">
            <divider v-show="hotData">{{params.title}}</divider>
           <div class="forat" 
              v-infinite-scroll="loadMore"
              infinite-scroll-disabled="loading"
               infinite-scroll-distance="10">
              <!--  <div class="itemWrap" v-for="item in hotData">
                  <router-link :to ="{ path: '/detail',query:{ id: item.id }}">
                   <div class="goodImgwarp">
                         <div class="goodImg" :style="{backgroundImage: 'url('+item.pic+')'}">
                            
                         </div>
                    </div>
                    <p class="name">
                      {{item.title}}
                   </p>
                   <div class="priceWarp clearfix">
                      <span class="price">¥ {{item.price}}</span>
                      <span class="sales">已售：{{item.salesCount}}</span>
                   </div>
                </router-link>
               </div> -->
             
                <div class="clearfix">
                      <div class="itemWrap" v-for="(item,index) in hotData">
                         <div style="position:relative;">
                           <router-link :to ="{ path: '/detail',query:{ id: item.id }}">
                             <div class="goodImgwarp">
                                   <div class="goodImg" :style="{backgroundImage: 'url('+item.pic+')'}" v-show="item.pic">
                                  </div>
                                   <div class="goodImg noImg" v-show="!item.pic">
                                        唯品</br>
                                        科技
                                   </div>
                              </div>
                              <p class="name">
                                {{item.title}}
                             </p>
                             <div class="priceWarp">
                                <span class="price">¥ {{item.price}}</span>
                                <span class="sell">已售：{{item.salesCount}}</span>
                             </div>
                          </router-link>
                        </div>
                    </div>           
                </div>
               









           </div>
           <div class="spinnerWap" v-show="!isBottom" v-if="hotData">
                    <spinner type="spiral" size="20px"></spinner><span class="jz">努力加载中...</span>
           </div>
     </div>
   
</template>

<script type="ecmascript-6">
import { Divider } from 'vux';
import api from '@/api';
import { Spinner } from 'vux';
    export default {
    name: '',
    props:['params'],
    data(){
      return {
      	title:"",
      	hotData:"",
      	isBottom:false,
      	loading:false,
      	scroll:false,
      	page:1
      }
    },

    created:function(){
  api.ajaxLaodingN('',
     this.params.action,{"pageIndex":this.page,"pageSize":6,"storeId":this.params.storeId}
    ).then(res=>{
    	 console.log(res);
       this.hotData = res.data.result.data;
       this.scroll = true;
       this.page ++;
     if(!res.data.result.hasNext){
            this.isBottom = true;
            this.scroll = false ;
         }
    }).catch(()=>{
      console.log("失败");
    })
    },

    methods:{
    	loadMore(){
	        if(this.scroll == false){
	           return;
	          };
	       console.log("进入更多");
	       this.loading = true; 
           api.ajax('',
			      this.params.action,{"pageIndex":this.page,"pageSize":6,"storeId":this.params.storeId}
			    ).then(res=>{
			    	console.log(res);
			     var data = res.data.result.data;
			       this.page ++;
			       this.hotData.push(...data);
			       this.loading = false;
			    if(!res.data.result.hasNext){
				     this.isBottom = true;
				     this.scroll = false ;
				   }
			    }).catch(()=>{
			      console.log("失败");
			    })
    	}
    },

    components: {
        Divider,
        Spinner
    }
  }
</script>

<style lang="less" scoped>
@rem: 23.45rem;
     /*.goods_hot {
       background-color: #fff;
       padding: 8/@rem 0;
       .wrap {
          padding: 0 8/@rem;
       }
       .itemWrap {
         width: 50%;
         float: left;
         padding: 8/@rem;
         .goodImgwarp {
          padding: 5/@rem ;
          border: 1px solid #d0d0d0;
          margin-bottom:5/@rem;
           .goodImg {
            height: 160/@rem;
            background-repeat: no-repeat;
            background-position: center;
            background-size: cover;
         }

         }
       .name {
         font-size: 13/@rem;
         height: 35/@rem;
         text-overflow:ellipsis;
         overflow: hidden;
         margin-bottom: 5/@rem;
       }  
       }
      .priceWarp {
         font-size: 15/@rem;
         position: relative;
         .sales {
           position: absolute;
          font-size: 12/@rem;
          right: 0;
         
         }
      }
    }*/



.forat {
       
       padding: 0 2/@rem 3/@rem 2/@rem;
      
       .itemWrap {
         width: 50%;
         float: left;
         padding: 2/@rem;
         position: relative;
          .gedang {
              width: 100%;
              height: 100%;
              position: absolute;
              background-color: rgba(0, 0, 0, 0.1);
              top:0;
              left:0;
              z-index: 3;
           }
       
         a {
           display: block;
           padding-bottom: 10/@rem;
           background-color: #fff;
           position: relative;
            

         }
         .goodImgwarp {
          padding: 2/@rem ;
         /* border: 1px solid #d0d0d0;*/
          margin-bottom:2/@rem;
           background-color: #fff;
           .goodImg {
            height: 160/@rem;
            background-repeat: no-repeat;
            background-position: center;
            background-size: cover;  
            /*background-image:url("../../assets/pic.png");*/
            background-color: #eee;
            margin-bottom: 5/@rem;
            
         }
           .goodImg.noImg{
             text-align: center;
             font-size: 32/@rem;
             padding-top: 30/@rem;
             font-weight: bold;
             color: #fff;
             text-shadow:2px 2px 4px #fff;
           }
         }
       .name {
          font-size: 14/@rem;
          height: 35/@rem;
          display: -webkit-box;
          -webkit-box-orient: vertical;
         -webkit-line-clamp: 2;
          overflow: hidden;
         padding: 0 5/@rem;
         margin-bottom: 5/@rem;
         color: #545352;
         line-height: 18/@rem;
         font-weight: 600;
       }  
       .xzBox {
         position: absolute;
         right: 20/@rem;
         top: 10/@rem;
         width: 30/@rem;
         color: red;
       }
       }
      .priceWarp {
          position: relative;
         font-size: 16/@rem;
         width: 100%;
          padding: 0 5/@rem;
         .sell {
          font-size: 13/@rem;
          position: absolute;
          right: 5/@rem;
          top:0
         }
      }
    }














    .spinnerWap {
    margin: 0 auto;
    text-align:  center;
    background-color: #eee;
    padding: 0 3/@rem;
    color: #fff;
    height: 35/@rem;
    padding-top: 7/@rem;
    .jz{
      margin-left: 10/@rem;
      color: #999;
    }
 }
 .spinnerWap  {
   color: #fff;
 }
</style>