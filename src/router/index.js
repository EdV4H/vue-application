import Vue from  'vue';
import Router from 'vue-router';
import Home from '@/components/Home';
import List from '@/components/List';
import Group from '@/components/Group';
import Lecture from '@/components/Lecture';
import Card from '@/components/Card';
import Card2 from '@/components/Card2';
import RegisterLecture from '@/components/RegisterLecture';
import LectureContent from '@/components/LectureContent';

import ClubCategory from '@/components/Club/Category';
import ClubList from '@/components/Club/ClubList'
import ClubContent from '@/components/Club/ClubContent'
import RegisterClub from '@/components/Club/RegisterClub'

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
            path: '/:department/group',
            name: 'group',
            component: Group
        },
        {
            path: '/:department/:group/lecture',
            name: 'lecture',
            component: Lecture
        },
        {
            path: '/card',
            name: 'card',
            component: Card
        },
        {
            path: '/:department/:group/card2',
            name: 'card2',
            component: Card2
        },
        {
            path: '/register_lecture',
            name: 'register_lecture',
            component: RegisterLecture
        },
        {
            path: '/:department/:group/:lecture/:lecture_name/lecture_content',
            name: 'lecture_content',
            component: LectureContent
        },
        {
            path: '/club/category',
            name: 'club_category',
            component: ClubCategory
        },
        {
            path: '/club/:category/club_list',
            name: 'club_list',
            component: ClubList
        },
        {
            path: '/club/:category/:id/club_content',
            name: 'club_content',
            component: ClubContent
        },
        {
            path: '/register_club',
            name: 'register_club',
            component: RegisterClub
        },
    ]
});