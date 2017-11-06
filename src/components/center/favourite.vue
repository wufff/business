<template>
    <div>
        <div class="pu_header clearfix" >
         <span @click.prevent="goback"><i class="fa fa-angle-left"></i></span>
         <div class="left" >我的收藏</div>
         <div class="right" @click.prevnet="toEdite" v-show="!edit">管理</div>
         <div class="right" @click.prevnet="toEdite" v-show="edit">完成</div>
         </div>
           <div class="pu_content">
                <div class="forat">
                     <div class="clearfix">
                      <div class="itemWrap" v-for="(item,index) in lidata">
                         <div style="position:relative;">
                          <div class="gedang" @click.prevnet = "choiceThis(index)" v-show="edit">
                              <icon type="success" class="success xzBox" v-show="item.goodsSeclect"></icon>
                              <icon type="circle" class="circle xzBox"  v-show="!item.goodsSeclect"></icon>
                         </div>  
                           <router-link :to ="{ path: '/detail',query:{ id: item.itemId }}">
                             <div class="goodImgwarp">
                                   <div class="goodImg" :style="{backgroundImage: 'url('+item.imgUrl+')'}">
                                     
                                   </div>
                              </div>
                              <p class="name">
                                {{item.title}}
                             </p>
                             <div class="priceWarp">
                                <span class="price">¥ {{item.price}}</span>
                                <!-- <span class="sell">已售：{{item.saleNum}}</span> -->
                             </div>
                          </router-link>
                        </div>
                    </div>           
                </div>
            </div>   
         </div>
     <div class="bottombar clearfix" v-show="edit">
         <span class="left" @click.prevent="selectAlls">
               <span class="table">
                   <icon type="success" class="success" v-show="selectAll"></icon>
                   <icon type="circle" class="circle" v-show="!selectAll"></icon> 
               </span>
               全选
         </span>

         <span class="right accountAtn"  @click.stop="deleteItem">删除</span>
       </div>
    </div>
</template>

<script type="ecmascript-6">
import { Icon } from 'vux';
import api from '@/api';
    export default {
    name: '',
    data(){
      return {
      	title:"",
        isThis:false,
        selectAll:false,
        edit:false,
        lidata:[]

      }
    },
    created:function(){
       api.ajaxLaoding('',
         "Goods/collectionProductList",{}
        ).then(res=>{
          console.log(res);
          this.lidata = res.data.result;
          
        }).catch(()=>{
          console.log("失败");
        });
    },
    methods:{
      goback(){
         window.history.go(-1);
      },
      choiceThis(index){
        this.lidata[index].goodsSeclect = !this.lidata[index].goodsSeclect;
      },
      deleteItem(){
         var datas = this.lidata.filter(
               item => {
                  return item.goodsSeclect == true;
              }).map( item => {
                        return item.itemId
            });
      api.ajaxLaoding('',
         "Goods/cancelCollectionProduct",{"goodIds":datas}
        ).then(res=>{
          console.log(res);
          if(res.data.result.Message == "取消关注成功！"){
                this.lidata =  this.lidata.filter(item => {
                  return item.goodsSeclect == false;
                });
                this.$vux.toast.show({
                          text: '删除成功',
                          type:"text",
                          time:1000
                     });
                }else {
                      this.$vux.toast.show({
                          text: '删除失败请检查网路',
                          type:"text",
                          time:1000
                     });
        }
        }).catch(()=>{
          console.log("失败");
        });
      },
      selectAlls(){
        this.selectAll = !this.selectAll;
        if(this.selectAll){
          for (let i = 0; i < this.lidata.length ; i++){
              this.lidata[i].goodsSeclect = true;
          }
        }else {
           for (let i = 0; i < this.lidata.length ; i++){
              this.lidata[i].goodsSeclect = false;
          }
        }
      },
      toEdite(){
        this.edit = ! this.edit;
        if(this.edit){
           for (let i = 0; i < this.lidata.length ; i++){
              this.lidata[i].goodsSeclect = false;
          }
        }
      }
    	
    },
    components: {
     Icon
  }
  }
</script>

<style lang="less" scoped>
@rem: 23.45rem;
    .pu_content {
       padding-top: 50/@rem;
    }
    .forat {
       
       padding: 0 5/@rem 8/@rem 5/@rem;
      
       .itemWrap {
         width: 50%;
         float: left;
         padding: 4/@rem;
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
           padding-bottom: 5/@rem;
           background-color: #fff;
           position: relative;
            

         }
         .goodImgwarp {
          padding: 5/@rem ;
         /* border: 1px solid #d0d0d0;*/
          margin-bottom:5/@rem;
           background-color: #fff;
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
         padding: 0 5/@rem;
         margin-bottom: 5/@rem;

       }  
       .xzBox {
         position: absolute;
         right: 20/@rem;
         top: 10/@rem;
         width: 30/@rem;
        
       }
       }
      .priceWarp {
          position: relative;
         font-size: 15/@rem;
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
.bottombar {
  position: fixed;
  left:0;
  right: 0;
  bottom: 0;
  z-index: 900;
  height: 53/@rem;
  line-height: 53/@rem;
  background-color: #fff;
  border-top:1px solid #eee;
  .left {
     min-width: 60px;
     width: auto;
     text-align: center;
   .table{
     display: inline-block;
     width: 40/@rem;
     margin-left: 5/@rem;
   }
     .success {
            color: red;
            font-size: 21/@rem;
         }
         .circle {
            font-size: 22/@rem;
        }
  }
  .totbox {
     line-height: 56/@rem;
  }
  .right {
     width:120/@rem;
     background-color: red;
     color: #fff;
     text-align: center;
     height: 53/@rem;
  }
}
</style>