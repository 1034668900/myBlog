<script>
import "animate.css";
/* export default {
  data() {
    return {
      needRefresh: true,
    };
  },
  mounted() {
    this.checkRefresh();
  },
  methods: {
    checkRefresh() {
      if (this.needRefresh) {
        location.reload();
        this.needRefresh = false;
      }
    },
  },
}; */
</script>

<template>
  <div class="container">
    <transition
      appear
      name="animate__animated animate__bounce "
      enter-active-class="animate__swing"
    >
      <div class="siteIntro">网站简介</div>
    </transition>
    <div class="aboutMe">
      <div class="title">关于我为什么写博客网站</div>
      <div class="content">
        <p>
          其实我并非是计算机相关专业的，但我从小就对编程有着浓厚的兴趣，
          因此在大学接触了编程后就被这一门技术所深深的吸引,自学了蛮多关于编程相关的知识，在这个学习的过程中有许多资料是我希望能不断复习、不断观看的,在此之前我就把他们放到了CSDN上,随着学习不断深入我后面就想着要不自己写一个博客网站专门存放自己的学习资料、笔记等，于是在这样的背景下这个博客网站诞生了！
        </p>
      </div>
    </div>
    <div class="preserve">
      目前该博客网站主要用于博主记录笔记，后续会不断对网站进行优化
    </div>
  </div>
</template>
<style scoped>
.container {
  margin-top: 30px ;
}
.siteIntro {
  text-align: center;
  font-size: 5rem;
  background: linear-gradient(0deg, #ff00b7, #12cfdc, #820eee);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
.aboutMe{
}
.title {
  font-size: 1.6rem;
  font-weight: bold;
  background-color: transparent;
  margin-top: 3rem;
  text-align: center;

}
.content {
  width: 20rem;
  width: auto;
}
.content p {
  text-indent: 2rem;
  font-size: 1.35rem;
}

.preserve {
  text-align: center;
  margin-top: 3.5rem;
  font-size: larger;
  font-weight: bold;
}
</style>