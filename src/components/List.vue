<template>
    <v-container>
        <router-link to="/" tag="b">
            <v-btn class="ma-2" outlined color="indigo">ホームへ</v-btn>
        </router-link>
        <v-row dense>
            <v-col
                v-for="(department, i) in departments"
                :key="i"
                cols="12" sm="6" md="4" lg="3"
            >
                <v-card
                    height="100"
                    :color="department.color"
                    dark
                    hover
                    :to="{ name: 'group', params: { department: department.value } }"
                >
                    <v-card-title
                        class="headline"
                        v-text="department.nameJ"
                    ></v-card-title>

                    <v-card-subtitle v-text="department.name"></v-card-subtitle>
                </v-card>
            </v-col> 
        </v-row>
    </v-container>
</template>

<script>
export default {
    data: () => ({
        departments: [
            {
                color: 'red',
                nameJ: '政治経済学部',
                name: 'School of Political science and Economics',
                value: 'pse',
            },
            {
                color: 'pink',
                nameJ: '教育学部',
                name: 'School of Education',
                value: 'edu',
            },
            {
                color: 'orange',
                nameJ: '基幹理工学部',
                name: 'School of Fundamental Science and Engineering',
                value: 'fse',
            },
            {
                color: 'blue',
                nameJ: '先進理工学部',
                name: 'School of Advanced Science and Engineering',
                value: 'ase',
            },
            {
                color: 'green',
                nameJ: '創造理工学部',
                name: 'School of Creative Science and Engineering',
                value: 'cse',
            },
        ],
    }),
}
</script>