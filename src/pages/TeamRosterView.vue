<script setup lang="ts">


import {ref, watch} from "vue";
import JSONFetch from "../utils/helpers/JSONFetch.ts";
import type {components} from "../../api/types.ts";
import {useRoute} from "vue-router";
import TeamCards from "../components/TeamCards.vue";
import PlayerCards from "../components/PlayerCards.vue";

const BASE_URL = "https://provolleyball.com/api"
type RosterDetail = components['schemas']['RosterDetail']
type RosterDetailResponse = components['schemas']['RosterDetailResponse']
type PlayerRosterDetailResponse = components['schemas']['PlayerRosterDetailResponse']
type PlayerRoster = components['schemas']['PlayerRoster']


const teamRoster = ref<RosterDetail[]>([])
const playerRoster = ref<PlayerRoster[]>([])

const route = useRoute()

watch(
    () => route.params.rosterId,
    async (rosterId) => {
      if (!rosterId) return

      const teamRosterURL = `${BASE_URL}/rosters/${rosterId}`
      const teamRes = await JSONFetch<RosterDetailResponse>(
          'http://localhost:3000/api/stats?url=' + encodeURIComponent(teamRosterURL)
      )

      const playerRosterURL = `${BASE_URL}/rosters/${rosterId}/player-rosters/?include[1]=player.headshotImage`
      const playerRes = await JSONFetch<PlayerRosterDetailResponse>(
          'http://localhost:3000/api/stats?url=' + encodeURIComponent(playerRosterURL)
      )
      teamRoster.value = teamRes.data
      playerRoster.value = playerRes.data
    },
    { immediate: true }
)
</script>

<template>
<div
v-if = "playerRoster.length > 0 ">
  VIEW TEAM ROSTER HERE
  <div :style="{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)',width: '700px'}">




  <PlayerCards
      v-for="players in playerRoster"
      :key="`${players?.id}-${players?.name}`"
      :player="players.player"
  />

</div>
</div>

</template>

<style scoped>

</style>