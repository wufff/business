<template>
    <div>
       <div class="pu_header clearfix">
         <span @click.prevent="goBack"><i class="fa fa-angle-left"></i></span>
         <div class="left">我的购物车</div>
         <div class="right" v-show="isEdite" @click.prevent="isEditeb">
            编辑
         </div>
         <div class="right" v-show="!isEdite" @click.prevent="isEditeb">
            完成
         </div>
       </div>
       <div class="pu_content">
          <ul class="cart_ul">
             <li  v-for="(item,c) in cartList">
              <h4> 
                 <span class="xz" @click.stop="selectStore(c)">
                 <icon type="success" class="success" v-show="item.storeSeclect"></icon>
                 <icon type="circle" class="circle" v-show="!item.storeSeclect"></icon>
                 </span>
                 <span class="icon-商店 store"  @click.stop="goStore(item.detail4AppList[0].storeId)"></span>
                 <span class="shopName"  @click.stop="goStore(item.detail4AppList[0].storeId)">{{item.storeName}}</span>
                 <i class="fa fa-angle-right"  @click.stop="goStore(item.detail4AppList[0].storeId)"></i>
              </h4>
                      <ul>
                        <li class="clearfix" v-for="(item,x) in item.detail4AppList">
                              <div class="left checkWrap">
                                 <div class="checkwrap" @click.stop="selectItem(c,x)">
                                     <icon type="success" class="success" v-show="item.goodsSeclect"></icon>
                                     <icon type="circle" class="circle" v-show="!item.goodsSeclect"></icon>              
                                </div>
                              </div>
                            <div class="left imgWrap">
                                <router-link :to="{path:'/detail',query:{id:item.productId}}">
                                 <img v-lazy="item.picUrl">
                               </router-link>
                            </div>
                            <div class="left info">
                              <router-link :to="{path:'/detail',query:{id:item.productId}}">
                                <h5>{{item.title}}</h5>
                                <p>规格:<span>{{item.specification}}</span></p>
                              <div class="price">¥ <span>{{item.price}}</span></div>
                              </router-link>
                            </div>
                            <div class="numbox">
                              <span class="add"  @click="sub(c,x,item.productId,item.skuId)">-</span>
                              <span class="num_num">{{item.count}}</span>
                              <span  @click="add(c,x,item.productId,item.skuId)">+</span>
                            </div>

                      </li>
                  </ul>
                       
             </li>
             <li v-show="cartList.length < 1"   class="noGoods" v-if="tsk">
                <p style="padding-top:50px;">
                  <span class="icon-购物车二 icon" style="font-size:50px; margin-bottom"></span>
                </p>
                <p style="padding-top:20px;margin-bottom:40px;">您的购物车是空的哦~！</p>
                <span class="btn" style="border:1px solid orange; color:orange;padding:5px 12px;" @click="gohome">
                    逛逛商城
                 </span>
             </li>
          </ul>

         
       </div>
       <div class="bottombar clearfix">
         <span class="left" @click.prevent="selectAlls">
               <icon type="success" class="success" v-show="selectAll"></icon>
               <icon type="circle" class="circle" v-show="!selectAll"></icon> 
         </span>
         <span class="left totbox" >合计: <span class="price" v-show="isEdite" v-if="total">¥ {{ price(total)}}</span></span>
         <span class="right accountAtn" v-show="isEdite" @click.stop="account">结算</span>
         <span class="right accountAtn" v-show="!isEdite" @click.stop="deleteItem">删除</span>
       </div>
       <foot></foot>
    </div>
</template>

<script type="ecmascript-6">
import api from '@/api';
import foot from '@/components/share/foot';
import { Icon } from 'vux';
/*计算总价*/
function computTot(array){
       var list = [];
           for (let i = 0; i < array.length ; i++){
               list.push(...array[i].detail4AppList);
           }
            var accountArray = list.filter( item => {
                        return item.goodsSeclect == true;
                     })

      var tot = 0;
      if(accountArray.length < 1) {
          return 0;
      }else {
            for ( let j = 0 ; j < accountArray.length ; j ++){
                  tot += accountArray[j].price * accountArray[j].count;
           }
        return  tot; 
      }               
}

    export default {
    name: 'cart',
    data(){
      return {
      	title:"",
        isEdite:true,
        cartList:[],
        selectArr:[],
        selectAll:true,
        show1:false,
        total:"",
        tsk:""
      }
    },
    created:function(){
        api.ajaxLaoding('',
      "Cart/getMyCart",{}
    ).then(res=>{
     var data = res.data.result.cartList;
     this.cartList = data;
     this.total =  computTot(this.cartList);
     this.tsk = `<p style="padding-top:50px;">
                <span class="icon-购物车二 icon" style="font-size:50px; margin-bottom"></span>
                </p>
                <p style="padding-top:20px;margin-bottom:40px;">您的购物车是空的哦~！</p>
                <span class="btn" style="border:1px solid orange; color:orange;padding:5px 12px;" @click="gohome">
                    逛逛商城
                 </span>`;
    }).catch(()=>{
      console.log("失败");
    })
    },
    methods:{
        price(value){
           var value=Math.round(parseFloat(value)*100)/100;
           var xsd=value.toString().split(".");
           if(xsd.length==1){
           value=value.toString()+".00";
           return value;
           }
           if(xsd.length>1){
           if(xsd[1].length<2){
            value=value.toString()+"0";
           }
           return value;
           }
       },
    	goBack(){
         window.history.go(-1);
      },
    /*  点编辑按钮*/
      isEditeb(){
        this.isEdite = !this.isEdite;

         if(!this.isEdite) 
          
          {
            this.selectAll = false;
             for ( let i = 0 ; i < this.cartList.length ;i ++)
              {
                  this.cartList[i].storeSeclect = false;
                  for( let j = 0; j < this.cartList[i].detail4AppList.length; j++)
                      {
                       this.cartList[i].detail4AppList[j].goodsSeclect =false;      
                      }   
              }  
          }else{
             this.selectAll = true;
             for ( let i = 0 ; i < this.cartList.length ;i ++)
              {
                  this.cartList[i].storeSeclect = true;
                  for( let j = 0; j < this.cartList[i].detail4AppList.length; j++)
                      {
                       this.cartList[i].detail4AppList[j].goodsSeclect =true;      
                      }   
              }  
             
           }
           this.total =  computTot(this.cartList);
      },
      
       add(c,x,id,sku){
         console.log(sku);
       
         api.ajaxLaoding('',
             "Cart/updateProductNumber",{"num":1,"goodId":id,"skuId":sku}
            ).then(res=>{
            if(res.data.result.Success){
              this.cartList[c].detail4AppList[x].count ++;
              if(this.cartList[c].detail4AppList[x].goodsSeclect){
                  this.total =  computTot(this.cartList);
               }
              if ( this.cartList[c].detail4AppList[x].count == this.cartList[c].detail4AppList[x].storage) {
              alert("超过库存了！")
              this.cartList[c].detail4AppList[x].count = this.cartList[c].detail4AppList[x].storage - 1;
              if(this.cartList[c].detail4AppList[x].goodsSeclect){
                  this.total =  computTot(this.cartList);
               }
             return;
              }
            } ;
            }).catch(()=>{
              console.log("失败");
            })
       },
       sub(c,x,id,sku){
           if(this.cartList[c].detail4AppList[x].count < 2){ return;}
          api.ajaxLaoding('',
              "Cart/updateProductNumber",{"num":-1,"goodId":id,"skuId":sku}
            ).then(res=>{
              console.log(res);
              if(res.data.result.Success){
              this.cartList[c].detail4AppList[x].count --;
              if(this.cartList[c].detail4AppList[x].goodsSeclect){
                  this.total =  computTot(this.cartList);
                  }
              if (this.cartList[c].detail4AppList[x].count == 0){
               this.cartList[c].detail4AppList[x].count = 1;
                if(this.cartList[c].detail4AppList[x].goodsSeclect){
                  this.total =  computTot(this.cartList);
              }
              return;
          }
            } ;
            }).catch(()=>{
              console.log("失败");
            })
       },

       selectStore(i){
          this.cartList[i].storeSeclect = !this.cartList[i].storeSeclect;
          if(this.cartList[i].storeSeclect){
            for( let j = 0; j < this.cartList[i].detail4AppList.length; j++)
              {
                this.cartList[i].detail4AppList[j].goodsSeclect =true;      
                this.total =  computTot(this.cartList);
              }    
           }else {
             this.selectAll = false;
             for( let j = 0; j < this.cartList[i].detail4AppList.length; j++)
              {
                this.cartList[i].detail4AppList[j].goodsSeclect =false;  
                this.total =  computTot(this.cartList);    
              }    
           }
         var isAll = this.cartList.filter( item => {return item.storeSeclect == true;});
         if(isAll.length == this.cartList.length){ this.selectAll = true;}
         if(isAll.length == 0){ this.selectAll = false;}
       },

       selectItem(c,x){
          this.cartList[c].detail4AppList[x].goodsSeclect = !this.cartList[c].detail4AppList[x].goodsSeclect;
          this.total =  computTot(this.cartList);
          var truelength = this.cartList[c].detail4AppList.filter( item => {return item.goodsSeclect == true;});
           if(truelength.length == this.cartList[c].detail4AppList.length)
           { 
            this.cartList[c].storeSeclect = true;
            var isAll = this.cartList.filter( item => {return item.storeSeclect == true;});
            if(isAll.length == this.cartList.length){ this.selectAll = true;}
          }
           if(truelength.length == 0)
           { 
            this.cartList[c].storeSeclect = false;
             var isAll = this.cartList.filter( item => {return item.storeSeclect == false;});
            if(isAll.length == this.cartList.length){ this.selectAll = false;}
           }
           if(!this.cartList[c].detail4AppList[x].goodsSeclect){
              this.selectAll = false;
           }
       },

       selectAlls(){
         this.selectAll = !this.selectAll;
         if(this.selectAll) {
              for ( let i = 0 ; i < this.cartList.length ;i ++)
              {
                  this.cartList[i].storeSeclect = true;
                  for( let j = 0; j < this.cartList[i].detail4AppList.length; j++)
                      {
                       this.cartList[i].detail4AppList[j].goodsSeclect =true;      
                      }   
              }
               this.total =  computTot(this.cartList);
           }else{
              for ( let i = 0 ; i < this.cartList.length ;i ++)
                {
                  this.cartList[i].storeSeclect = false;
                  for( let j = 0; j < this.cartList[i].detail4AppList.length; j++)
                      {
                       this.cartList[i].detail4AppList[j].goodsSeclect =false;      
                      }   
              } 
              this.total = 0;  
           }
         },
         
      deleteItem(){
           var list = [];
           for (let i = 0; i < this.cartList.length ; i++){
               list.push(...this.cartList[i].detail4AppList);
           }
            var deleteArray = list.filter( item => {
                        return item.goodsSeclect == true;
                     }).map( item => {
                        return item.itemId
                    });
           if (deleteArray.length == 0 ){
             alert("未选择任何商品！");
             return;
           };
           var isTrueShop =  this.cartList.filter( item => {
                        return item.storeSeclect == true;
                     })
          if (isTrueShop.length == this.cartList.length){
               var a=confirm("是否清空购物车？");
               if (a) {   
                     api.ajaxLaoding('',
                          "Cart/deteleCart",{"goodIds":deleteArray}
                        ).then(res=>{
                          console.log(res);
                          this.$vux.toast.show({
                             text: '删除成功',
                             type:"text",
                             time:100
                            })
                           this.cartList = [];
                        }).catch(()=>{
                           console.log("失败");
                        }) 
                      }
               else {   return;   }   
           };
          api.ajaxLaoding('',
               "Cart/deteleCart",{"goodIds":deleteArray,"cartId":""}
            ).then(res=>{
              console.log(res);
               var newcartlist = this.cartList.filter( item => {
                        return item.storeSeclect == false;
                     } );

               for(let i= 0; i < newcartlist.length ; i++){
                  newcartlist[i].detail4AppList = newcartlist[i].detail4AppList.filter( item => {
                         return item.goodsSeclect == false;
                     })
               }
               this.cartList = newcartlist;
               this.$vux.toast.show({
                             text: '删除成功',
                             type:"text",
                             time:1000
                });


            }).catch(()=>{
              console.log("失败");
            })
      },
      account(){
           var list = [];
           for (let i = 0; i < this.cartList.length ; i++){
               list.push(...this.cartList[i].detail4AppList);
           }
            var accountArray = list.filter( item => {
                        return item.goodsSeclect == true;
                     }).map( item => {
                        return item.itemId
                    });
            console.log(accountArray);
           if (accountArray.length == 0 ){
             alert("未选择任何商品！");
             return;
           };
           
          
           api.ajaxLaoding('',
              "Order/checkoutOrder",{"cartListIds":accountArray}
            ).then(res=>{
              console.log(res);
               var storage = window.localStorage;
                storage.setItem("cartListIds",accountArray); 
                this.$router.push({path:"/checkout"});
            }).catch(()=>{
              console.log("失败");
            })

          
      },
      goStore(p){
        this.$router.push({ path: '/shophome',query:{ storeId: p }});
      },
      gohome(){
        this.$router.push({ path: '/index'});
      }

    },

    computed:{
  
    totPic(){
       var tot = 0;
       for ( let i = 0 ; i < this.cartList.length ;i ++){
          for (let j = 0 ; j < this.cartList[i].detail4AppList.length ;j ++) {
              /*tot += this.cartList[i].price * this.cartList[i].count;*/
            tot += this.cartList[i].detail4AppList[j].price*this.cartList[i].detail4AppList[j].count
          }   
       }
       return  tot;
    }
   },

     components: {
      foot,
      Icon
  }
  }
</script>

<style lang="less" scoped>
@rem: 23.45rem;
.pu_content {
  padding-bottom: 110/@rem;
}
.cart_content{
   padding-top: 58/@rem;
   padding-bottom: 555/@rem;
}   
.cart_ul{  
   h4 {
      font-weight: normal;
      padding: 8/@rem 0  12/@rem 15/@rem;
      margin-bottom: 14/@rem;
      border-bottom: 1px solid #eee;
      background-color: #fcfcfc;
      height: 43/@rem;
      i.fa {margin-left: 5/@rem;color: #999;}
      .xz {
         display: inline-block;
         width: 38/@rem;
         i{
           position: relative;
           bottom: 3/@rem;
         }
 
      }
      .store {
         font-size: 24/@rem;
         vertical-align: text-bottom;
         color: #999;
      }
      .shopName {
        position: relative;
        top:1/@rem;
        color: #999;
      }
      .success {
            color: red;
            font-size: 21/@rem;
         }
         .circle {
            font-size: 22/@rem;
        }
   }
   li{
   padding:0 0 2/@rem 0;
   margin-bottom: 12/@rem;
   background-color: #fff;
   position: relative;

   .checkWrap {
     width:60/@rem;
     height: 90/@rem;
     padding-top: 12/@rem;
     .checkwrap{
        /* border: 1px solid black;*/
         text-align: center;
         height: 60/@rem;
         line-height:  60/@rem;
         .success {
            color: red;
            font-size: 21/@rem;
         }
         .circle {
            font-size: 22/@rem;
        }
     }
   }
   .imgWrap {
     width: 90/@rem;
     height: 90/@rem;
     border:1px solid #eee;
      background-repeat: no-repeat;
      background-position: center;
      background-size: cover;
      a {
         width: 100%;
         height: 100%;
         img {
           width: 100%;
           height: 100%;
         }
      }
   }
   .info {
     padding-left: 10/@rem;
     padding-top: 5/@rem;
     width: 205/@rem;
   /*  border:1px solid red;*/
     
     h5 {
         height: 38.4/@rem;
         overflow: hidden;
         margin-bottom: 3/@rem;
         font-weight: normal;
         line-height: 19/@rem;

     }

     p {
         font-size: 12/@rem;
         margin-bottom: 3/@rem;
  
     }
   }
   .numbox {
      position: absolute;
      right: 20/@rem;
      bottom: 3/@rem;

      border: 1px solid #999;
      span {
        float: left;
        width: 22/@rem;
        height: 22/@rem;
        text-align: center;
        color: #545352;
      }
      .num_num {
        min-width: 27/@rem;
        display: inline-block;
        width: auto;
       /* line-height: 25/@rem;*/
        padding: 1px 2px 0px 2px;
        height: 18/@rem;
        position: relative;
        line-height: 18/@rem;
        top:2/@rem;
        border-left:1px solid #999;
        border-right:1px solid #999;
      }
   }

  }
 
}
.bottombar {
  position: fixed;
  left:0;
  right: 0;
  bottom: 49/@rem;
  height: 53/@rem;
  line-height: 53/@rem;
  background-color: #fff;
  border-top:1px solid #eee;
  .left {
     min-width: 60px;
     width: auto;
     text-align: center;
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
 
