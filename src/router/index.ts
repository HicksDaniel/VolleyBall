import {createWebHistory, createRouter} from "vue-router";

import HomeView from "../pages/HomeView.vue";
import AboutView from "../pages/AboutView.vue";
import TeamView from "../pages/TeamView.vue"
import TeamRosterView from "../pages/TeamRosterView.vue";
import TeamScheduleView from "../pages/TeamScheduleView.vue";
import TeamStatsView from "../pages/TeamStatsView.vue";

const routes = [
    { path: "/", component: HomeView },
    { path: "/about", component: AboutView },
    { path: "/team/:id", component: TeamView,
    children: [

        {
            path: "",
            redirectTo: "team/:id",
        },
        {
            path: "roster/:rosterId",
            component: TeamRosterView,
        },
        {
            path: "schedule",
            component: TeamScheduleView,
        },
        {
            path: "stats",
            component: TeamStatsView,
        }
    ]
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router;