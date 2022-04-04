<template>
    <div class="home">
        <ul class="togglelist" @click="request">
            <li class="standingsTitle"><h2> {{toggleTag}} Championship {{currentSeason}}</h2></li>
            <li @click="toggleDriver" class="toggle">Get {{toggle}} Standings</li>
        </ul>
    </div>
    <div  v-if="currentDrivers" class="main">
        <section>
            <ul>
                <li class="standingsWrap">
                    <ul class="standings">
                        <li @click="sortingDrivers('position',0)">Position<img :class="descendingD(0)" src="https://cdn-icons-png.flaticon.com/512/32/32065.png" style="height:10px; weight:10px;"></li>
                        <li @click="sortingDrivers('givenName',1)">Name<img :class="descendingD(1)" src="https://cdn-icons-png.flaticon.com/512/32/32065.png" style="height:10px; weight:10px;"></li>
                        <li @click="sortingDrivers('constructor',2)">Constructor<img :class="descendingD(2)" src="https://cdn-icons-png.flaticon.com/512/32/32065.png" style="height:10px; weight:10px;"></li>
                        <li @click="sortingDrivers('points',3)">Points<img :class="descendingD(3)" src="https://cdn-icons-png.flaticon.com/512/32/32065.png" style="height:10px; weight:10px;"></li>
                        <li @click="sortingDrivers('wins',4)">Wins<img :class="descendingD(4)" src="https://cdn-icons-png.flaticon.com/512/32/32065.png" style="height:10px; weight:10px;"></li> 
                    </ul>
                </li>    
                <li @click="driverDetails(driver.driverId)" class="standingsWrap" v-for="driver in drivers" :key="driver.position">
                    <ul class="standings">
                        <li>{{driver.position}}</li>
                        <li>{{driver.givenName}} {{driver.familyName}}</li>
                        <li>{{driver.constructor}}</li>
                        <li>{{driver.points}}</li>
                        <li>{{driver.wins}}</li> 
                    </ul>
                </li>
            </ul>
           
        </section>
        <section  class="filterSection">
            <h4  v-if="currentDrivers" @click="filterConstr = !filterConstr">Constructors</h4>
            <ul v-if="filterConstr" class="filterWrap">
                <li class="filter" @change="this.drivers = this.allDrivers">
                    <label for="All">All </label>
                    <input type="checkbox">
                </li>
                <li  class="filter" v-for="team in constructors" :key="team.name">
                    <label :for="team">{{team.name}}</label> <br>
                    <input @change="filter()" v-model="filteredConstructors" type="checkbox" :value="team.name">
                </li>
            </ul>
           

            
        </section>
    </div>
    <div v-else class="main">
         <ul>
                <li class="standingsWrap">
                    <ul class="standings">
                        <li  @click="sortingConstructors('position',0)">Position <img :class="descendingC(0)" src="https://cdn-icons-png.flaticon.com/512/32/32065.png" style="height:10px; weight:10px;"></li>
                        <li  @click="sortingConstructors('name',1)">Name<img :class="descendingC(1)" src="https://cdn-icons-png.flaticon.com/512/32/32065.png" style="height:10px; weight:10px;"></li>
                        <li  @click="sortingConstructors('nationality',2)">Nationality<img :class="descendingC(2)" src="https://cdn-icons-png.flaticon.com/512/32/32065.png" style="height:10px; weight:10px;"></li>
                        <li  @click="sortingConstructors('points',3)">Points<img :class="descendingC(3)" src="https://cdn-icons-png.flaticon.com/512/32/32065.png" style="height:10px; weight:10px;"></li>
                        <li  @click="sortingConstructors('wins',4)">Wins<img :class="descendingC(4)" src="https://cdn-icons-png.flaticon.com/512/32/32065.png" style="height:10px; weight:10px;"></li> 
                    </ul>
                </li>
                <li @click="constructorDetails(constructor.id)" class="standingsWrap" v-for="constructor in constructors" :key="constructor.position">
                    <ul class="standings">
                        <li>{{constructor.position}}</li>
                        <li>{{constructor.name}}</li>
                        <li>{{constructor.nationality}}</li>
                        <li>{{constructor.points}}</li>
                        <li>{{constructor.wins}}</li> 
                    </ul>
                </li>
            </ul>
            <section class="filterSection"> 
                 <h4  @click="filterNationality = !filterNationality">Nationality</h4>
            <ul v-if="filterNationality" class="filterWrap">
                <li class="filter" @change="this.constructors = this.allConstructors">
                    <label for="All">All </label>
                    <input type="checkbox">
                </li>
                <li @change="filterNat()" class="filter" v-for="nat in nationalities" :key="nat">
                    <label :for="nat">{{nat}}</label> <br>
                    <input v-model="filteredNationalities" type="checkbox" :value="nat">
                </li>
            </ul>
            </section>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            filteredNat:[],
            nationalities: [],
            driverId: [],
            filterNationality: true,
            filterConstr: true,
            drivers: [],
            allDrivers: [],
            constructors: [],
            allConstructors: [],
            toggle: "Constructor",
            toggleTag: "Driver",
            currentDrivers: true,
            filtered:[],
            singleFiltered:[],
            filteredConstructors:[],
            filteredNationalities:[],
            sortDrivers:[{by:"position",asc:true},{by:"givenName",asc:true},{by:"familyName",asc:true},{by:"constructor",asc:true},{by:"wins",asc:true},{by:"points",asc:true}],
            sortConstructors:[{by:"position", active:true},{by:"name",asc:true},{by:"nationality",asc:true},{by:"wins",asc:true},{by:"points",asc:true}]
            }
    },
    methods: {
        goBack(){
            this.$router.go(-1);
        },
        goForth(){
            this.$router.go(1);
        },
        constructorDetails(id){
            console.log(this.constructors,"okokook");
            console.log(id);
            this.$router.push({path: `/standings/${this.currentSeason}/constructors/${id}`, props: true});
        },
        driverDetails(id){
            console.log(id);
            this.$router.push({ path: `/standings/${this.currentSeason}/drivers/${id}`, props: true});

        },
        descendingC(order){
            return {
                descending: this.sortConstructors[order].asc
            }
        },
        descendingD(order){
            return {
                descending: this.sortDrivers[order].asc
            }
        },
        sortingDrivers(property,order){
            let actual = property;
            if (actual == "givenName" || actual == "constructor" || actual == "familyName"){
                if (this.sortDrivers[order].asc){
                    this.drivers.sort((a, b) => (a[actual] > b[actual]) ? 1 : -1);
                } else{
                    this.drivers.sort((a, b) => (a[actual] < b[actual]) ? 1 : -1);
                }
                
            } else {
                if(this.sortDrivers[order].asc) {
                    this.drivers.sort((a, b) => (a[actual] - b[actual]));
                } else{
                   this.drivers.sort((a, b) => (b[actual] - a[actual])); 
                }
                
            }
            this.sortDrivers[order].asc = !this.sortDrivers[order].asc;
            
        },
        sortingConstructors(property,order){
            let actual = property;
            if (actual == "name" || actual == "nationality"){
                if (this.sortConstructors[order].asc){
                    this.constructors.sort((a, b) => (a[actual] > b[actual]) ? 1 : -1);
                } else{
                    this.constructors.sort((a, b) => (a[actual] < b[actual]) ? 1 : -1);
                }
                
            } else {
                if(this.sortConstructors[order].asc) {
                    this.constructors.sort((a, b) => (a[actual] - b[actual]));
                } else{
                   this.constructors.sort((a, b) => (b[actual] - a[actual])); 
                }
                
            }
            this.sortConstructors[order].asc = !this.sortConstructors[order].asc;
            
        },
        filter() {
            this.filtered = [];
            console.log(this.filteredConstructors   );
            if (this.filteredConstructors.length == 0 || this.filteredConstructors.includes("All")){
                this.drivers = this.allDrivers;
            }else {
                this.filteredConstructors.forEach(constructor => {
                this.allDrivers.forEach(driver =>{
                    if (driver.constructor == constructor){
                        this.filtered.push(driver)
                    }
                })
                  
            })  
             this.drivers = this.filtered; 
            }
        },
        filterNat() {
            // console.log(this.allConstructors);
            // console.log(this.constructors);
            // console.log(this.filteredNationalities);
            this.filteredNat = [];
            console.log(this.filteredNationalities,this.allConstructors);
            if (this.filteredNationalities.length == 0 || this.filteredNationalities.includes("All")){
                this.constructors = this.allConstructors;
            } else {
                this.filteredNationalities.forEach(nat => {
                    this.allConstructors.forEach(constr => {
                        if (nat == constr.nationality) {
                            this.filteredNat.push(constr);
                            // console.log(nat);
                        }
                    })
                })
                this.constructors = this.filteredNat;
            }
        },
        toggleDriver() {
            if (this.toggle == "Driver") {
                this.toggle = "Constructor";
                this.currentDrivers = true; 
                this.toggleTag = "Driver";
            } else {
                this.toggle = "Driver";
                this.currentDrivers = false
                this.toggleTag = "Constructor";
            }     
        },
        getStandings(toggle,season) {
            this.nationalities = [];
            // console.log(`http://ergast.com/api/f1/${season}/${toggle}Standings.json`);
            axios
            .get(`http://ergast.com/api/f1/${season}/DriverStandings.json`)
            .then((response) => {
                     this.allDrivers = [];
                     this.drivers = [];
                    //  console.log(response.data.MRData.StandingsTable.StandingsLists[0].DriverStandings);
                     const drivers = response.data.MRData.StandingsTable.StandingsLists[0].DriverStandings;
                     drivers.forEach(driver => {
                         var currentDriver = { position: "", givenName: "",familyName:"", constructor: "", points: "", wins:"" };
                         currentDriver.position = driver.position;
                         currentDriver.givenName = driver.Driver.givenName;
                         currentDriver.familyName = driver.Driver.familyName;
                         currentDriver.constructor = driver.Constructors[0].name;
                         currentDriver.points = driver.points;
                         currentDriver.wins = driver.wins;
                         this.allDrivers.push(currentDriver);
                         this.$store.commit("setDrivers",currentDriver.givenName + " " + currentDriver.familyName);
                        //  console.log(currentDriver);
                     });
                         this.drivers = this.allDrivers;
                         
                        //  console.log(this.$store.getters.driversStore, "here is what we have");

                         axios
                        .get(`http://ergast.com/api/f1/${season}/drivers.json`)
                        .then((response) => {
                                const drivers = response.data.MRData.DriverTable.Drivers;
                                console.log(drivers);
                                this.drivers.forEach(driver => {
                                    drivers.forEach(id => {
                                        if (driver.familyName == id.familyName) {
                                            driver.driverId = id.driverId;
                                        }
                                    });
                                    // driver[driver.position].driverId = drivers[driver.position].driverId;
                                })
                                this.sortDrivers[2].asc = 1;
                                //  this.sortingDrivers("position",0);
                                // console.log(this.allDrivers, "worked");
                                    
                        })
                        .catch(error => {
                            console.log(error.response,"wrong"); 
                        })
            // this.drivers = this.allDrivers;
                           
            })
            .catch(error => {
                console.log(error.response,"wrong"); 
            })
           
           axios
           .get(`http://ergast.com/api/f1/${season}/ConstructorStandings.json`)
            .then((response) => {
                this.allConstructors = [];
                     this.constructors = [];
                     console.log(response.data.MRData.StandingsTable.StandingsLists[0].ConstructorStandings);
                     const constructors = response.data.MRData.StandingsTable.StandingsLists[0].ConstructorStandings;
                     constructors.forEach(constructor => {
                         var currentConstructor = { position: "", name: "", nationality: "", points: "", wins:"", id: "" };
                         currentConstructor.position = constructor.position;
                         currentConstructor.name = constructor.Constructor.name;
                         currentConstructor.nationality = constructor.Constructor.nationality;
                         currentConstructor.points = constructor.points;
                         currentConstructor.wins = constructor.wins;
                         currentConstructor.id = constructor.Constructor.constructorId;
                         if (!this.nationalities.includes(currentConstructor.nationality)) {
                             this.nationalities.push(currentConstructor.nationality);
                         }
                         this.allConstructors.push(currentConstructor);
                         
                         
                     });
                     console.log("nationa",this.nationalities);
                     this.constructors = this.allConstructors;
                    //  console.log(this.constructors);
            })
            .catch(error => {
                console.log(error.response,"wrong"); 
            }); 
            


            
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
        this.getStandings("Driver",this.currentSeason);
        this.$watch(
      () => this.$route.params,
      (toParams, previousParams) => {
        console.log(toParams, previousParams);
        this.getStandings("Driver",toParams);
      }
    )
    }
}
</script>

<style scoped>
body{
    width: 100%;
}
.main{
    display: flex;
}
ul {
    list-style: none;
}
.togglelist{
     display: flex;
     padding: 1em;
     justify-content: space-between;
     align-items: center;
 }

 .toggle{
    list-style: none;
    background: #131313;
    border: 2px solid rgba(255, 255, 255, 0.705);
    padding: 1em 1em;
    margin: 1em;
    color: rgba(255, 255, 255, 0.705);
    font-size: 1.3em;
    font-weight: bold;
 }
 .toggle:hover {
     background: rgba(212, 0, 0, 0.205);
 }

 .home {
    background: #131313;
 }

 .standings {
   display: flex;
   list-style: none;
   border: 0 solid black;
   border-width: 1px 1px 0 0;
   padding:.5em;
 }
.standingsWrap{
    border: 0 solid black;
    border-width: 0 0 1px 1px;
    background: rgb(49, 48, 48);
}
 .standings li {
     margin: 0.2em 2em;
     width: 10em;
     text-align: start;
     color: white;
     cursor: pointer;
 }

 .standings:hover {
     background: rgba(255, 255, 255, 0.705);    
;
 }
 .standingsTitle{
    color: rgba(255, 255, 255, 0.705);
    font-size: 1.3em;
 }
 .filterSection {
     margin: 100 px;
     border: 1px solid black;
     
 }
 .filterWrap{
    margin: 10px;
    border: 0 solid black;
    border-width: 0 0 1px 1px;
    background: rgb(94, 93, 93);
    padding-inline-start: 0px
 }
 .filter{
    border: 0 solid black;
   border-width: 1px 1px 0 0;
   padding:.2em;
   color: white;
 }
 .descending{
     transform: rotate(180deg);
 }
</style>