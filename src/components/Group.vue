<template>
    <v-container>
        <router-link :to="{ name: 'list' }" tag="b">
            <v-btn class="ma-2" outlined color="indigo">学部一覧へ</v-btn>
        </router-link>
        <router-link :to="{ name: 'card' }" tag="b">
            <v-btn class="ma-2" outlined color="indigo">カード一覧へ</v-btn>
        </router-link>
        <v-row dense>
            <v-col
                v-for="(group, i) in getGroup($route.params.department)"
                :key="i"
                cols="12" sm="6" md="4" lg="3"
            >
                <router-link :to="{ name: 'lecture', params: { group: group.value, department: $route.params.department } }" tag="b">
                    <v-card
                        height="90"
                        :color="group.color"
                        dark
                        hover
                    >
                        <v-card-title
                            class="headline"
                            v-text="group.name"
                        ></v-card-title>

                        <v-card-subtitle v-text="group.description"></v-card-subtitle>
                    </v-card>
                </router-link>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
export default {
    data: () => ({
        pse: [
            {
                color: 'red',
                name: '英語',
                description: '',
                value: 'eng',
            },
            {
                color: 'orange',
                name: '第二外国語',
                description: '',
                value: 'second',
            },
        ],
        edu: [
            {
                color: 'orange',
                name: '共通科目',
                description: '',
                value: 'common',
            },
            {
                color: 'red',
                name: '英語',
                description: '',
                value: 'eng',
            },
            {
                color: 'pink',
                name: '第二外国語',
                description: '',
                value: 'second',
            },
        ],
        fse: [
            {
                color: 'red',
                name: 'A1群',
                description: '複合領域',
                value: 'A1',
            },
            {
                color: 'orange',
                name: 'A2群',
                description: '外国語：英語',
                value: 'A2',
            },
            {
                color: 'purple',
                name: 'A2群',
                description: '外国語：第二外国語',
                value: 'A3',
            },
            {
                color: 'blue',
                name: 'B1群',
                description: '数学',
                value: 'B1',
            },
        ],
    }),
    methods: {
        getGroup: function (value) {
            if (value==='pse') return this.pse
            if (value==='edu') return this.edu
            if (value==='fse') return this.fse
        }
    },
}
</script>