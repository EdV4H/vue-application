<template>
    <v-container>
        <v-btn 
            class="ma-2"
            outlined color="indigo"
            :to="{ name: 'list' }"
        >
            学部一覧へ
        </v-btn>
        <!-- <v-btn 
            class="ma-2"
            outlined color="indigo"
            :to="{ name: 'card2', params: { department: $route.params.department } }"    
        >
            カード一覧へ
        </v-btn> -->
        <v-row dense>
            <v-col
                v-for="(group, i) in getGroup($route.params.department)"
                :key="i"
                cols="12" sm="6" md="4" lg="3"
            >
                <v-card
                    height="90"
                    :color="group.color"
                    dark
                    hover
                    :to="{ name: 'card2', params: { group: group.value, department: $route.params.department } }"
                >
                    <v-card-title
                        class="headline"
                    >{{ group.name }}群</v-card-title>

                    <v-card-subtitle v-text="group.description"></v-card-subtitle>
                </v-card>
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
                name: 'A1',
                description: '複合領域',
                value: 'A1',
            },
            {
                color: 'orange',
                name: 'A2',
                description: '外国語：英語',
                value: 'A2',
            },
            {
                color: 'purple',
                name: 'A2',
                description: '外国語：第二外国語',
                value: 'A3',
            },
            {
                color: 'blue',
                name: 'B1',
                description: '数学',
                value: 'B1',
            },
        ],
    }),
    methods: {
        getGroup: function (value) {
            // if (value==='政治経済学部') return this.pse
            // if (value==='教育学部') return this.edu
            // if (value==='基幹理工学部') return this.fse
            if (value==='pse') return this.pse
            if (value==='edu') return this.edu
            if (value==='fse') return this.fse
        }
    },
}
</script>