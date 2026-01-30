<script setup lang="ts">
const {team} = defineProps<{
 team: Team
}>()

export interface Roster {
  id: number
  name: string
  slug: string
  permalink: string

  team_id: number
  season_id: number
  team: Team

  sort: number
  hidden: boolean
  default_layout_view: string

  hide_headshots: boolean
  hide_view_bio_button: boolean
  sort_players_by: 'name' | 'jersey_number'

  timezone: string
  news_types: string[]
  links: unknown[]

  ad_settings: AdSettings | null
  analytics_code: string | null

  // CMS banner fields (pattern-based)
  [key: string]: unknown
}

interface PaginationLinks {
  first: string
  last: string
  prev: string | null
  next: string | null
}

export interface Player {
  id: number

  first_name: string
  last_name: string
  full_name: string
  slug: string
  permalink: string

  hometown: string | null
  birth_date: string | null
  age: number | null

  high_school: string | null
  high_school_graduate_year: number | null
  college: string | null
  college_graduate_year: number | null

  height_feet: number
  height_inches: number
  weight: number | null
  jersey_number: number | null

  gender: string
  gender_label: string

  status: string
  published_at: string

  hero_image_id: number | null
  headshot_image_id: number | null
  beauty_image_id: number | null
  action_headshot_image_id: number | null
}

export interface PlayerRoster {
  id: number
  player_id: number
  roster_id: number

  player: Player

  jersey_number: number | null
  headshot_image_id: number | null

  college: string | null
  height_feet: number
  height_inches: number

  years_in_the_league: number | null
  pro_experience: string | null

  hidden: boolean
  league_category: string | null

  permalink: string
}


export interface Season {
  id: number
  title: string
  sort: number
  start_date: string // ISO 8601
  end_date: string   // ISO 8601
  is_active: boolean
}

export interface Team {
  id: number
  name: string
  slug: string
  permalink: string

  hide_title_section: boolean
  hide_in_dropdown: boolean
  alt_title: string | null

  color: string
  text_color: string | null
  text_hover_color: string | null

  featured_banner_image: Image | null

  current_roster_id: number | null
  current_season_id: number | null

  logo_id: number
  second_logo_id: number | null
  top_video_id: number | null

  timezone: string
  news_types: string[]
  links: unknown[]

  ad_settings: AdSettings | null
  analytics_code: string | null

  // CMS-driven banner fields (pattern-based)
  [key: string]: unknown
}

export interface Image {
  id: number
  src: string
  srcset: string
  alt: string | null
  caption: string | null
}

export interface AdSettings {
  roster_mobile_zone_id: string | null
  roster_desktop_zone_id: string | null
  schedule_mobile_zone_id: string | null
  schedule_desktop_zone_id: string | null
}

function handleTeamClick(teamName: "string", teamId: number): void {
  console.log(`Team ${teamName} and ${teamId} clicked`)
}
</script>

<template>
<div class="team-card" @click="handleTeamClick(team.name, team.id)">
  <h2>{{ team.name }}</h2>
  <div>
    <img
        v-if="team.featured_banner_image?.src"
        :src="team.featured_banner_image.src"
        alt="Team Logo"
    />
    <p>Coach: John Doe</p>
    <p>Founded: 1900</p>
    <p>Home: "Home City Here"</p>

  </div>
</div>
</template>

<style scoped>

</style>