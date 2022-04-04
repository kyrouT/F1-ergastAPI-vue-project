<template>
    <div class="home">
        <ul class="details"> 
            <li><img :src="image" alt="" style="height:200px; weight:200px;"></li>
            <ul>
                <li> <h1>><a :href="details.url">{{details.familyName + " " + details.givenName}}</a></h1></li>
                <li><h2>Constructor: {{details.constructor}}</h2> </li>
                <li> <h3>Birth Date: {{details.dateOfBirth}}</h3> </li>
                <li> <h3>Nationality: {{details.nationality}}</h3> </li>
            </ul>
        </ul>
        <ul style="display:flex; width:25%;  ">
                <li @click="goBack"><img  style="height:100px; weight:100px; background:rgb(49, 48, 48)" src="https://icons.iconarchive.com/icons/praveen/minimal-outline/256/back-2-icon.png" alt=""></li>
                <li @click="goForth"><img style="transform:rotate(180deg); height:100px; weight:100px; background:rgb(49, 48, 48)" src="https://icons.iconarchive.com/icons/praveen/minimal-outline/256/back-2-icon.png" alt=""></li>
        </ul>
        <select @change="pickDriver()" v-model="selected" name="ok" style="width:200px; height:50px;">
                       <option  disabled value="" selected>Select Driver</option>
                       <option  v-for="driver in seasonDrivers" :key="driver" :value="driver">{{driver}}</option>
        </select>
    </div>
                 
    <div class="resultsWrap">
        <ul class="results">
                     <li @click="sortingResults(0)">Circuit<img :class="descendingD(0)" src="https://cdn-icons-png.flaticon.com/512/32/32065.png" style="height:10px; weight:10px;"></li>
                     <li @click="sortingResults(1)">Position<img :class="descendingD(1)" src="https://cdn-icons-png.flaticon.com/512/32/32065.png" style="height:10px; weight:10px;"></li>
                     <li @click="sortingResults(2)">Laps<img :class="descendingD(2)" src="https://cdn-icons-png.flaticon.com/512/32/32065.png" style="height:10px; weight:10px;"></li>
                     <li @click="sortingResults(3)">Status<img :class="descendingD(3)" src="https://cdn-icons-png.flaticon.com/512/32/32065.png" style="height:10px; weight:10px;"></li>
                     <li @click="sortingResults(4)">Points<img :class="descendingD(4)" src="https://cdn-icons-png.flaticon.com/512/32/32065.png" style="height:10px; weight:10px;"></li> 
        </ul>  
        <ul class="results" v-for="result in results" :key="result.circuit">
            <li>{{result.circuit}}</li>
            <li>{{result.position}}</li>
            <li>{{result.laps}}</li>
            <li>{{result.status}}</li>
            <li>{{result.points}}</li>
        </ul>
    </div>
</template>

<script>
import axios from 'axios';

export default {


    data() {
        return {
            ok: this.$route.params.driver,
            details: [],
            results: [],
            image: "",
            title: "",
            sortResults:[{by:"circuit",asc:true},{by:"position",asc:true},{by:"laps",asc:true},{by:"status",asc:true},{by:"points",asc:true}],
            seasonDrivers: [],
            selected: "Pick a driver"
        }
    },
    methods: {
        goBack(){
            this.$router.go(-1);
        },
        goForth(){
            this.$router.go(1);
        },
        pickDriver() {
            this.ok = this.selected;
            this.$router.push({ path: `/standings/${this.currentSeason}/drivers/${this.selected}`, props: true});
        },
        sortingResults(order){
            let actual =this.sortResults[order].by;
            console.log("sort");
            if (actual == "circuit" || actual == "status"){
                if (this.sortResults[order].asc){
                    this.results.sort((a, b) => (a[actual] > b[actual]) ? 1 : -1);
                } else{
                    this.results.sort((a, b) => (a[actual] < b[actual]) ? 1 : -1);
                }
                
            } else {
                if(this.sortResults[order].asc) {
                    this.results.sort((a, b) => (a[actual] - b[actual]));
                } else{
                   this.results.sort((a, b) => (b[actual] - a[actual])); 
                }
                
            }
            this.sortResults[order].asc = !this.sortResults[order].asc;
            
        },
        descendingD(order){
            return {
                descending: this.sortResults[order].asc
            }
        },
           getDetails() {
               axios
                .get(`http://ergast.com/api/f1/${this.currentSeason}/drivers/${this.ok}.json`)
                .then((response) => {
                     const details = response.data.MRData.DriverTable.Drivers[0];
                     this.details = details;
                     let title = details.url.split("/");
                     this.title = title[title.length -1];
                      console.log(this.results);
                      axios
                        .get(`https://en.wikipedia.org/w/api.php?action=query&format=json&formatversion=2&prop=pageimages|pageterms&piprop=original&titles=${this.title}`)
                        .then((response) => {
                            this.image = response.data.query.pages[0].original.source;
                            console.log(response.data.query.pages[0].original.source);
                            console.log(this.details.url);
                            
                        })
                        .catch(error => {
                        console.log(error.response,"wrong"); 
                        })
                    //  console.log(this.details);
                     
                        // driver[driver.position].driverId = drivers[driver.position].driverId;
                })
                .catch(error => {
                console.log(error.response,"wrong"); 
                })

                axios
                .get(`http://ergast.com/api/f1/${this.currentSeason}/drivers/${this.ok}/results.json`)
                .then((response) => {
                    const results = response.data.MRData.RaceTable.Races;
                    this.details.constructor = results[0].Results[0].Constructor.name;
                    console.log(results);
                     results.forEach( result => {
                         console.log("ok");
                         var currentResult = { circuit: "", position: "",laps:"", status: "", points: ""};
                         currentResult.circuit = result.raceName;
                         currentResult.position = result.Results[0].position;
                         currentResult.laps = result.Results[0].laps;
                         currentResult.status = result.Results[0].status;
                         currentResult.points = result.Results[0].points;
                         this.results.push(currentResult);
                         
                        
                     })
                })
                .catch(error => {
                console.log(error.response,"wrong"); 
                })

                axios
                    .get(`http://ergast.com/api/f1/${this.currentSeason}/drivers.json`)
                    .then((response) => {
                            const drivers = response.data.MRData.DriverTable.Drivers;
                            console.log(drivers);
                            drivers.forEach( driver => {
                                this.seasonDrivers.push(driver.familyName + " " + driver.givenName);
                            })
                            console.log(this.seasonDrivers);  
                    })
                    .catch(error => {
                        console.log(error.response,"wrong"); 
                    })

                
            }          
    },
    computed: {
        currentSeason() {
            return this.$store.getters.seasonPicked;
        },
        driversStore() {
            return this.$store.getters.drivers;
        }
    },
     watch: {
        currentSeason(newCurrentSeason) {
            console.log(this.currentSeason);
            this.getStandings(this.toggle, newCurrentSeason);
            
        }
    },
    created() {
        this.getDetails()
    }  
    
 
}
</script>

<style scoped>
    ul {
        list-style: none;
    }
    select {
        margin: 5em;
    }
    .home {
    background: #131313;
    display: flex;
    align-items: center;
    width: 100%;
    }
    .details {
        display: flex;
        width: 100%;
        padding-inline-start: 0px;
    }   
    .results {
   display: flex;
   list-style: none;
   border: 0 solid black;
   border-width: 1px 1px 0 0;
   padding:.5em;
   
 }
.resultsWrap{
    border: 0 solid black;
    border-width: 0 0 1px 1px;
    background: rgb(49, 48, 48);
    padding: 0;
    margin: 0;
}
 .results li {
     margin: 0.2em 2em;
     width: 10em;
     text-align: start;
     color: white;
 }
.results:hover{
   background: rgb(95, 94, 94);
   cursor: pointer;
}

 .resultsTitle{
    color: rgba(255, 255, 255, 0.705);
    font-size: 1.3em;
 }
 .descending{
     transform: rotate(180deg);
 }
 img:hover {
     cursor: pointer;
 }
</style>