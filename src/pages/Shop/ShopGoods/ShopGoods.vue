<template>
  <div>
    <div class="goods">
      <div class="menu-wrapper">
        <ul ref="leftUl">
          <!--current-->
          <li class="menu-item" v-for="(good, index) in goods"
              :key="index" :class="{current: index===currentIndex}" @click="clickItem(index)">
            <span class="text bottom-border-1px">
              <img class="icon" v-if="good.icon" :src="good.icon">
              {{good.name}}
            </span>
          </li>
        </ul>
      </div>
      <div class="foods-wrapper">
        <ul ref="RightUl">
          <li class="food-list-hook" v-for="(good, index) in goods" :key="index">
            <h1 class="title">{{good.name}}</h1>
            <ul>
              <li class="food-item bottom-border-1px" v-for="(food, index) in good.foods" :key="index">
                <div class="icon">
                  <img width="57" height="57" :src="food.icon">
                </div>
                <div class="content">
                  <h2 class="name">{{food.name}}</h2>
                  <p class="desc">{{food.description}}</p>
                  <div class="extra">
                    <span class="count">月售{{food.sellCount}}份</span>
                    <span>好评率{{food.rating}}%</span></div>
                  <div class="price">
                    <span class="now">￥{{food.price}}</span>
                    <span class="old" v-if="food.oldPrice">￥{{food.oldPrice}}</span>
                  </div>
                  <div class="cartcontrol-wrapper">
                    <CartControl :food = "food"/>
                  </div>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>

    </div>
  </div>
</template>

<script>

  import BScroll from 'better-scroll'
  import {mapState} from 'vuex'

  export default {
    data() {
      return {
        scrollY:0, //右侧列表方向滑动得位置
        tops:[]  //右侧所有分类li标签得top值

      }
    },
    mounted() {
      this.$store.dispatch('getShopGoods',() =>{  //更新good数据
        this.$nextTick( () => {
          this._initScroll()
          this._initTops()
        })

    })

    },
    methods:{
      //初始化滚动对象
      _initScroll(){

        this.leftScroll = new BScroll('.menu-wrapper',{
          click:true//由库来分发事件
        })
        this,rightScroll = new BScroll('.foods-wrapper',{
//          probetype:0 即不派发scroll事件
          probeType:1,//非实时 每隔一段时间才分发 只有触碰时才分发
          click:true //由库分发click事件

        })

//        绑定scrool事件监听
        this.rightScroll.on('scroll',({x,y}) =>{
          this.scrollY = MAath.abs(y)
        })

//        绑定滚动结束得监听
        this.rightScroll.on('scrollEnd',({x,y}) => {
          this.scrollY = Math.abs(y)
        })

      },

//      初始化tops

      _initTops (){
        const tops =[]
        let top =0
        tops.push(top)
        const lis = this.$refs.RightUl.getElementsByClassName('food-list-hook')
        Array.prototype.slice.call(lis).forEach( li => {

          top += li.clientHeight
          tops.push(top)
        })

      },
      clikItem (index){
        const y = -this.tops[index]
//        更新scrolly为目标
        this.scroll = -y
//        让右侧列表平滑滚动到目标位置
        this.rightScroll.scrollTo(0,y,500)

      }
    },



    computed: {
      ...mapState(['goods']),

      currentIndex(){
        const {scrollY,tops} = this
//        计算新下标
        const index = tops.findIndex( (top,index) => {
//          scrolly大于或者等于当前top && 小于下一个top
          return scrollY >= top && scrollY < tops[index + 1]
        })
//        如果下表变化了
        if(this.index !== index && this.letScroll){
          this.index = index
//          将index对应得左侧li滚动到最上面
          const li = this.$refs.leftUl.children[index]
          this.leftScroll.scrollToElement(li,300)
        }

        return index
      }
    }




  }

</script>

<style>

</style>
