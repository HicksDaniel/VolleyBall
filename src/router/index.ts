import {createWebHistory, createRouter} from "vue-router";

import HomeView from "../pages/HomeView.vue";
import AboutView from "../pages/AboutView.vue";
import TeamView from "../pages/TeamView.vue";

const routes = [
    { path: "/", component: HomeView },
    { path: "/about", component: AboutView },
    { path: "/team/:id", component: TeamView },
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router;