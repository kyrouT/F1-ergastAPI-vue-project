<template>
    <div class="home">
        <ul class="details"> 
            <li><img :src="image" alt="" style="height:200px; weight:200px;"></li>
            <ul >
                <li><h2>Constructor: <a :href="details.url">{{details.constructor}}</a>  </h2> </li>
                <li> <h3>Nationality: {{details.nationality}}</h3> </li>
            </ul>
            <ul style="display:flex; width:25%; justify-content:space-between; ">
                <li><img @click="goBack" style="height:100px; weight:100px; background:rgb(49, 48, 48)" src="https://icons.iconarchive.com/icons/praveen/minimal-outline/256/back-2-icon.png" alt=""></li>
                <li><img @click="goForth" style="transform:rotate(180deg); height:100px; weight:100px; background:rgb(49, 48, 48)" src="https://icons.iconarchive.com/icons/praveen/minimal-outline/256/back-2-icon.png" alt=""></li>
            </ul>
           <select style="width:200px; height:50px;">
                       <option  disabled value="" selected>Select Driver</option>
            </select>
        </ul>
        <!-- <select @change="pickDriver()" v-model="selected" name="ok" style="width:200px; height:50px;">
                       <option  disabled value="">Select Driver</option>
                       <option  v-for="driver in seasonDrivers" :key="driver" :value="driver">{{driver}}</option>
        </select> -->
    </div>
                 
    <div class="resultsWrap">
        <ul class="results">
                     <li @click="sortingResults(0)" style="margin-right:6em;">Circuit<img :class="descendingD(0)" src="https://cdn-icons-png.flaticon.com/512/32/32065.png" style="height:10px; weight:10px;"></li>
                     <li @click="sortingResults(1)">Position<img :class="descendingD(1)" src="https://cdn-icons-png.flaticon.com/512/32/32065.png" style="height:10px; weight:10px;"></li>
                     <li @click="sortingResults(5)">Driver<img :class="descendingD(1)" src="https://cdn-icons-png.flaticon.com/512/32/32065.png" style="height:10px; weight:10px;"></li>
                     <li @click="sortingResults(2)">Laps<img :class="descendingD(2)" src="https://cdn-icons-png.flaticon.com/512/32/32065.png" style="height:10px; weight:10px;"></li>
                     <li @click="sortingResults(3)">Status<img :class="descendingD(3)" src="https://cdn-icons-png.flaticon.com/512/32/32065.png" style="height:10px; weight:10px;"></li>
                     <li @click="sortingResults(4)">Points<img :class="descendingD(4)" src="https://cdn-icons-png.flaticon.com/512/32/32065.png" style="height:10px; weight:10px;"></li> 
        </ul>  
        <ul class="results" v-for="result in results" :key="result.circuit">
            <li>{{result.circuit}}</li>
            <li>
                <ul class="seperate">
                    <li>{{result.position[0]}}</li>
                    <li>{{result.position[1]}}</li>
                </ul>
            </li>
            <li>
                <ul class="seperate">
                    <li>{{result.driver[0]}}</li>
                    <li>{{result.driver[1]}}</li>
                </ul>
            </li>
            <li>
                <ul class="seperate">
                    <li>{{result.laps[0]}}</li>
                    <li>{{result.laps[1]}}</li>
                </ul>
            </li>
            <li>
                <ul class="seperate">
                    <li>{{result.status[0]}}</li>
                    <li>{{result.status[1]}}</li>
                </ul>
            </li>
            <li>
                <ul class="seperate">
                    <li>{{result.points[0]}}</li>
                    <li>{{result.points[1]}}</li>
                </ul>
            </li>
            
        </ul>
    </div>
    {{ok}}
</template>

<script>
import axios from 'axios';

export default {


    data() {
        return {
            details:[],
            ok: this.$route.params.constructor,
            results:[],
            image: "",
            title: "",
            sortResults:[{by:"circuit",asc:true},{by:"position",asc:true},{by:"laps",asc:true},{by:"status",asc:true},{by:"points",asc:true}, {by:"driver",asc:true}],
            // seasonDrivers: [],
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
            this.$router.push({ path: `/standings/${this.selected}`, props: true});
        },
        sortingResults(order){
            let actual =this.sortResults[order].by;
            console.log(this.results);
            if (actual == "circuit" || actual == "status" || actual == "driver"){
                if (this.sortResults[order].asc){
                    this.results.sort((a, b) => (a[actual][0] > b[actual][0]) ? 1 : -1);
                } else{
                    this.results.sort((a, b) => (a[actual][0] < b[actual][0]) ? 1 : -1);
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
                .get(`http://ergast.com/api/f1/${this.currentSeason}/constructors/${this.ok}.json`)
                .then((response) => {
                    const rwer = response.data.MRData;
                    console.log(rwer);
                     const details = response.data.MRData.ConstructorTable.Constructors[0];
                     this.details = details;
                     console.log(details);
                })
                .catch(error => {
                console.log(error.response,"wrong"); 
                })

                axios
                .get(`http://ergast.com/api/f1/${this.currentSeason}/constructors/${this.ok}/results.json`)
                .then((response) => {
                    // console.log(response);
                    const results = response.data.MRData.RaceTable.Races;
                    this.details.constructor = results[0].Results[0].Constructor.name;
                    console.log(results);
                     results.forEach( result => {
                        //  console.log("ok");
                         
                         var currentResult = { circuit: "", position: [],driver:[],laps:[], status: [], points: []};
                         currentResult.circuit = result.raceName;
                         result.Results.forEach((driver,index) => {
                            //  console.log(driver.position,index);
                            currentResult.position[index] = driver.position;
                            currentResult.driver[index]= driver.Driver.familyName;
                            currentResult.laps[index] = driver.laps;
                            currentResult.status[index] =  driver.status;
                            currentResult.points[index] = driver.points;
                            
                         })
                         this.results.push(currentResult);
                    })
                    console.log(this.results);
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
            console.log(this.$route.path);
            console.log(this.currentSeason);
            this.getDetails(this.toggle, newCurrentSeason);
            
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
        justify-content: space-between;
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
 .seperate li {
     border-bottom: 1px black solid;
     text-align: start;
 }
</style>