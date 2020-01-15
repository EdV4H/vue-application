import Vue from  'vue';
import Router from 'vue-router';
import Home from '@/components/Home';
import List from '@/components/List';
import Group from '@/components/Group';
import Lecture from '@/components/Lecture';
import Card from '@/components/Card';
import Card2 from '@/components/Card2';
import RegisterLecture from '@/components/RegisterLecture'
import LectureContent from '@/components/LectureContent'

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
        },
        {
            path: '/card2',
            name: 'card2',
            component: Card2
        },
        {
            path: '/register_lecture',
            name: 'register_lecture',
            component: RegisterLecture
        },
        {
            path: '/lecture_content',
            name: 'lecture_content',
            component: LectureContent
        }
    ]
});