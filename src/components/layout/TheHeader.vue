<template>
  <header>
      <nav>
           <ul>
               <li>
                   <router-link @click="getCurrentSeason" to="/"> <img src="https://upload.wikimedia.org/wikipedia/commons/3/33/F1.svg" alt=""></router-link>
               </li>
               <li>
                   <select @change="pickSeason()" v-model="selected" name="ok" id="" style="width:200px; height:50px;">
                       <option disabled value="">Select season</option>
                       <option  v-for="season in seasons" :key="season" :value="season">{{season}}</option>
                   </select>
               </li>
           </ul>
           
           
      </nav>
      
  </header>
</template>

<script>
export default {
    data() {
        return {
            seasons: [],
            selected: "2022"
        }
    },
    methods: {
        getCurrentSeason() {
            this.selected = "2022";
            this.pickSeason();
            // this.$router.push({ path: `/standings/${this.selected}`, props: true});
        },
        seasonsCreate() {
            for (var i=2022; i > 1954; i-- ) {
                this.seasons.push(i);
            }
        },
        pickSeason() {
            this.$store.commit('pickSeason',this.selected);
            this.$router.push({ path: `/standings/${this.selected}`, props:true });
        }
    },
    created() {
        this.seasonsCreate();
    }
}
</script>

<style scoped>
 header {
     margin: 20px;
 }
 ul{
     display: flex;
     justify-content: space-between;
     align-items: center;
     padding-right: 2em;
 }

 li{
    justify-content: end;
    list-style: none;
 }

 img {
     height: 150%;
     width: 150%;
 }
</style>