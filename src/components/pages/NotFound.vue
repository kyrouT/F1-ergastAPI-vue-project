<template>
  <ul style="display:flex; width:25%; justify-content:space-between; ">
                <li><img @click="goBack" style="height:100px; weight:100px; background:rgb(49, 48, 48)" src="https://icons.iconarchive.com/icons/praveen/minimal-outline/256/back-2-icon.png" alt=""></li>
                <li><img @click="goForth" style="transform:rotate(180deg); height:100px; weight:100px; background:rgb(49, 48, 48)" src="https://icons.iconarchive.com/icons/praveen/minimal-outline/256/back-2-icon.png" alt=""></li>
  </ul>
  <h2>The page you are looking for doesn't exist</h2>
  <div style="width:100%;height:0;padding-bottom:30%; display:flex;  items-align:center; justify-content:center; "><iframe src="https://giphy.com/embed/pzhGrWB5oEYGxKTShD" width="50%" height="50%" style="position:absolute" frameBorder="0"  ></iframe></div>
  <h2>Error</h2>
  <h2>404</h2>
</template>

<script>
export default {
methods: {
  goBack(){
            this.$router.go(-1);
        },
        goForth(){
            this.$router.go(1);
        }
}
}
</script>

<style>

</style>