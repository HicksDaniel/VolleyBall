const MLV_TEAMS = [
  { id: 2, name: "Atlanta Vibe" },
  { id: 3, name: "Columbus Fury" },
  { id: 4, name: "Grand Rapids Rise" },
  { id: 5, name: "Omaha Supernovas" },
  { id: 6, name: "Orlando Valkyries" },
  { id: 8, name: "San Diego Mojo" },
  { id: 9, name: "Vegas Thrill" },
  { id: 10, name: "Kansas City" },
  { id: 11, name: "Indy Ignite" },
  { id: 12, name: "Dallas Pulse" },
  { id: 13, name: "Team Shondell" },
  { id: 14, name: "Team Collier" },
  { id: 14, name: "Minnesota" },
  { id: 48, name: "NorCal" },
]



<script setup lang="ts">
import { ref, toRaw } from 'vue'
import TeamCards from "./TeamCards.vue";
import type {components} from "../../api/types.ts";
import JSONFetch from "../utils/helpers/JSONFetch.ts";

const API_BASE_URL = "https://provolleyball.com/api"
const TEAMS_ENDPOINT = "/teams"


type Roster = components["schemas"]["Roster"];
type RosterListResponse = components["schemas"]["RosterListResponse"];

type Team = components["schemas"]["Team"];
type TeamListResponse = components["schemas"]["TeamListResponse"];

const teamData = ref<Team[]> ([])
const selectedTeam = ref("")

const handleTeamFetch = async (url : string) : Promise<void> => {
  try {
    const resJson = await JSONFetch<TeamListResponse>('http://localhost:3000/api/stats?url=' + encodeURIComponent(url))
     teamData.value = resJson.data
  } catch (err) {
    console.error('Error fetching data:', err)
  }
}


defineProps<{ msg: string }>()

const count = ref(0)
</script>

<template>
  <h1>{{ msg }}</h1>

  <div class="card">
    <button type="button" @click="count++">count is {{ count }}</button>
    <p>
      Edit
      <code>components/HelloWorld.vue</code> to test HMR
    </p>

    <button @click="handleTeamFetch(API_BASE_URL + TEAMS_ENDPOINT)" type="button">Fetch All Teams</button>
  </div>

  <div v-if="testData && testData.data">
    <div style="border: 2px solid black" v-for="item in testData.data" :key="item.id">
    v-if selectedTeam: {{ selectedTeam === item.seasonId }}
      <TeamCards :team="item" />


<img :src="item.featured_banner_image.src" alt="Team Image" width="200" />

      <br/>
    </div>
  </div>


  <p>
    Learn more about IDE Support for Vue in the
    <a
      href="https://vuejs.org/guide/scaling-up/tooling.html#ide-support"
      target="_blank"
      >Vue Docs Scaling up Guide</a
    >.
  </p>
  <p class="read-the-docs">Click on the Vite and Vue logos to learn more</p>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
