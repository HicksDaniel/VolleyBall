<script setup lang="ts">
import { useRoute } from "vue-router"
import { ref, watch } from "vue"
import type { components } from "../../api/types"
import JSONFetch from "../utils/helpers/JSONFetch"

type RosterDetail = components['schemas']['RosterDetail']
type RosterDetailResponse = components['schemas']['RosterDetailResponse']

const BASE_URL = 'https://provolleyball.com/api'
const route = useRoute()

const currentTeam = ref<RosterDetail | null>(null)

watch(
    () => route.params.id,
    async (teamId) => {
      if (!teamId) return

      const rosterURL = `${BASE_URL}/teams/${teamId}`
      const resJson = await JSONFetch<RosterDetailResponse>(
          'http://localhost:3000/api/stats?url=' + encodeURIComponent(rosterURL)
      )

      currentTeam.value = resJson.data
    },
    { immediate: true }
)
</script>


<template>
  <h1>Viewing Single Team</h1>

  <div v-if="!currentTeam">Loading…</div>

  <div v-else>
    <!-- Team Header -->
    <h1 @click="console.log(currentTeam)">{{ currentTeam.name }}</h1>

    <!-- Sub-navigation -->
    <nav>
      <RouterLink :to="`/team/${currentTeam.id}/roster/${currentTeam.current_roster_id}`">{{ currentTeam?.roster_header_banner_title}}</RouterLink>
     <br/>
      <RouterLink :to="`/team/${currentTeam.id}/schedule`">{{ currentTeam?.schedule_header_banner_title }}</RouterLink>
     <br/>
      <RouterLink :to="`/team/${currentTeam.id}/stats`">{{currentTeam?.name}} Statistics</RouterLink>
    </nav>

    <!-- Child route renders here -->
    <RouterView />
  </div>
</template>


<style scoped>

</style>