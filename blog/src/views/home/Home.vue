<template>
  <div>
    <!--banner-->
    <div class="home-banner">
      <div class="banner-container">
        <h1 class="blog-title animated zoomIn">
          个人博客
        </h1>
        <!-- 一言 -->
        <div class="blog-intro">
          {{ obj.output }} <span class="typed-cursor">|</span>
        </div>
        <!-- 联系方式 -->
        <div class="blog-contact">
          <a
            class="iconfont iconqq"
            target="_blank"
            href="http://wpa.qq.com/msgrd?v=3&uin=2039063712&site=qq&menu=yes"
          />
          <a
            target="_blank"
            href="https://github.com/X1192176811"
            class="ml-5 mr-5 iconfont icongithub"
          />
        </div>
      </div>
      <!-- 向下滚动 -->
      <div class="scroll-down" @click="scrollDown">
        <v-icon color="#fff" class="scroll-down-effects">
          mdi-chevron-down
        </v-icon>
      </div>
    </div>


  </div>


</template>
<script>
import EasyTyper from "easy-typer-js";

export default {
  created() {
    this.init();
  },
  data: function () {
    return {
      obj: {
        output: "",
        isEnd: false,
        speed: 300,
        singleBack: false,
        sleep: 0,
        type: "rollback",
        backSpeed: 40,
        sentencePause: true
      }
    }
  },
  methods: {
    init() {
      // 一言Api进行打字机循环输出效果
      fetch("https://v1.hitokoto.cn?c=d")
        .then(res => {
          return res.json();
        })
        .then(({hitokoto}) => {
          this.initTyped(hitokoto);
        });
    },
    initTyped(input, fn, hooks) {
      const obj = this.obj;
      // eslint-disable-next-line no-unused-vars
      const typed = new EasyTyper(obj, input, fn, hooks);
    },
    scrollDown() {
      window.scrollTo({
        behavior: "smooth",
        top: document.documentElement.clientHeight
      });
    },
  },

  mounted() {

  }

}
</script>
<style lang="stylus">
.typed-cursor
  opacity: 1
  animation: blink 0.7s infinite
</style>


<style scoped>
.home-banner {
  position: absolute;
  top: -60px;
  left: 0;
  right: 0;
  height: 100vh;
  background: #49b1f5 url("https://wjh-myblog.oss-cn-chengdu.aliyuncs.com/img/大鱼海棠.jpg") no-repeat fixed center center;
  text-align: center;
  color: #fff !important;
  animation: header-effect 1s;
}

.banner-container {
  margin-top: 43vh;
  line-height: 1.5;
  color: #eee;
}

.blog-contact a {
  color: #fff !important;
}

@media (min-width: 760px) {
  .blog-title {
    font-size: 2.5rem;
  }

  .blog-intro {
    font-size: 1.5rem;
  }

  .blog-contact {
    display: none;
  }
}

@media (max-width: 759px) {
  .blog-contact {
    font-size: 1.25rem;
    line-height: 2;
  }
}

.scroll-down {
  cursor: pointer;
  position: absolute;
  bottom: 0;
  width: 100%;
}

.scroll-down i {
  font-size: 2rem;
}

.scroll-down-effects {
  color: #eee !important;
  text-align: center;
  text-shadow: 0.1rem 0.1rem 0.2rem rgba(0, 0, 0, 0.15);
  line-height: 1.5;
  display: inline-block;
  text-rendering: auto;
  -webkit-font-smoothing: antialiased;
  animation: scroll-down-effect 1.5s infinite;
}

@keyframes scroll-down-effect {
  0% {
    top: 0;
    opacity: 0.4;
    filter: alpha(opacity=40);
  }
  50% {
    top: -16px;
    opacity: 1;
    filter: none;
  }
  100% {
    top: 0;
    opacity: 0.4;
    filter: alpha(opacity=40);
  }
}
</style>
