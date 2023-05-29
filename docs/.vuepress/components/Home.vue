<script>
import "animate.css";
</script>
<template>
  <div>
    <transition
      appear
      name="animate__animated animate__bounce "
      enter-active-class="animate__rubberBand"
    >
      <h1 class="title">Welcome to my blog site !</h1>
    </transition>
    <transition
      appear
      name="animate__animated animate__bounce"
      enter-active-class="animate__pulse"
    >
      <div><HomeButton></HomeButton></div>
    </transition>
  </div>
</template>

<style scoped>
.title {
  font-size: 70px;
  background: linear-gradient(60deg, #64e8, #a18cd1, #8fc6fd, #8a64eb);
  -webkit-background-clip: text;
  color: transparent;
  text-align: center;
}
</style>