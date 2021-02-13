import Vue from 'vue';
import Router from 'vue-router';
import CustomerList from './views/CustomerList';
import Report from "@/views/Report";
import LoginPage from "@/views/LoginPage";

Vue.use(Router);

export const router = new Router({
    mode: 'history',
    routes: [{
        path: '/',
        component: LoginPage
    },
        {
            path: '/login',
            component: LoginPage
        },
        {
            path: '/musteriler',
            component: CustomerList
        },
        {
            path: '/rapor',
            component: Report
        },
    ]
});

