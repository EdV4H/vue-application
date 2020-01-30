<template>
    <v-container>
        <router-link to="/" tag="b">
            <v-btn class="ma-2" outlined color="indigo">ホームへ</v-btn>
        </router-link>
        <v-subheader>Sports</v-subheader>
        <v-row dense>
            <v-col
                v-for="(category, i) in categories"
                :key="i"
                cols="12" sm="6" md="4" lg="3" xl="2"
            >
                <v-card
                    height="100"
                    :color="category.color"
                    dark
                    hover
                    :to="{ name: 'club_list', params: { category: category.value } }"
                >
                    <v-card-title class="headline">
                        {{ category.name }}
                    </v-card-title>
                    <v-card-subtitle>{{ category.value }}</v-card-subtitle>
                </v-card>
            </v-col> 
        </v-row>
    </v-container>
</template>

<script>
export default {
    data () {
        return {
            categories: [
                {   
                    color: 'amber',
                    name: 'すべて',
                    value: 'all',   
                },
                {
                    color: 'green',
                    name: 'テニス',
                    value: 'tennis',
                },
                {
                    color: 'indigo',
                    name: 'フットサル/サッカー',
                    value: 'football',
                },
                {
                    color: 'blue lighten-3',
                    name: 'スキー/スノボ',
                    value: 'ski',
                },
                {
                    color: 'orange',
                    name: 'バスケットボール',
                    value: 'basketball',
                },
                {
                    color: 'red',
                    name: '野球',
                    value: 'baseball',
                },
            ],
        }
    },
}
</script>