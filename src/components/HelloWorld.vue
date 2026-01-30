<script setup lang="ts">
import { ref } from 'vue'
import TeamCards from './TeamCards.vue'
import type { components } from '../../api/types'
import JSONFetch from '../utils/helpers/JSONFetch'



type Team = components['schemas']['Team']
type TeamListResponse = components['schemas']['TeamListResponse']


const API_BASE_URL = 'https://provolleyball.com/api'
const TEAMS_ENDPOINT = '/teams'

const teamData = ref<Team[]>([])

async function fetchCardData(url: string) {
  const resJson = await JSONFetch<TeamListResponse>(
      'http://localhost:3000/api/stats?url=' + encodeURIComponent(url)
  )
console.log("test")
  teamData.value = resJson.data // confirm shape!
  console.log('teamData after set:', teamData.value)
}
</script>

<template>
  <button @click="fetchCardData(API_BASE_URL + TEAMS_ENDPOINT)">
    Fetch All Teams
  </button>

  <div v-if="teamData.length > 0">
    <div :style="{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)',width: '700px'}">



    <TeamCards
        v-for="item in teamData"
        :key="`${item.id}-${item.name}`"
        :team="item"
    />

    </div>
  </div>
</template>
