<script setup lang="ts">
import type {components} from "../../api/types.ts";
import {computed} from "vue";
type Team = components["schemas"]["Team"];
type TeamListResponse = components["schemas"]["TeamListResponse"];

const props = defineProps<{
 team: Team
}>()

const BASE_URL = 'https://provolleyball.com'



function handleTeamClick(team: Team): void {
  console.log(`Team ${team.name} and ${team.id} clicked`)
}

const textColor = computed( () => props.team.text_color ?? '#ffffff')
</script>



<template>
<div
    class="team-card"
    @click="handleTeamClick(props.team)"
    :style="{
      width:'300px',
      color: textColor,
      backgroundColor: props.team.color,
      padding: '2px',
      border:'2px solid black' }"
>
  <h2>{{ props.team.name }}</h2>
  <div>

    <router-link :to="`/team/${props.team.id}`">
    <img

        v-if="props.team.featured_banner_image?.src"
        :src="props.team.featured_banner_image.src"
        :alt="props.team.name"
        style="width:200px"
    />
    </router-link>


      <p>Coach: John Doe</p>

    <p>Founded: 1900</p>
    <p>Home: "Home City Here"</p>

    <br/>
    <a
        :href="BASE_URL + props.team.permalink"
        target="_blank"
        rel="noopener noreferrer"
    >
      MLV Team Page
    </a>

  </div>
</div>
</template>

<style scoped>

</style>