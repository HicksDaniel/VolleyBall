<script setup lang="ts">



const props = defineProps<{
  player: Player
}>()

</script>

<template>
  <div
      class="team-card"

      :style="{
      width:'300px',
      padding: '2px',

      border:'2px solid black' }"
  >
    <div
    :style="{

      width:'95%',
      display:'flex',

      alignItems:'center',
    }">
      <h3>{{ props.player.full_name }}</h3>
      <h4
      :style="{

      }"
      >{{props.player.jersey_number}}</h4>
    </div>

    <img alt="no image found" :src="props.player.headshot_image.src"
         style="width:200px"/>
    <div>




    </div>
  </div>

</template>

<style scoped>

</style>