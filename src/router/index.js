import Vue from  'vue';
import Router from 'vue-router';
import Home from '@/components/Home';
import List from '@/components/List';
import Group from '@/components/Group';
import Lecture from '@/components/Lecture';
import Card from '@/components/Card';

Vue.use(Router);

export default new Router ({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home
        },
        {
            path: '/list',
            name: 'list',
            component: List
        },
        {
            path: '/group',
            name: 'group',
            component: Group
        },
        {
            path: '/lecture',
            name: 'lecture',
            component: Lecture
        },
        {
            path: '/card',
            name: 'card',
            component: Card
        }
    ]
});