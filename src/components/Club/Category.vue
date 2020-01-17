<template>
    <v-container>
        <router-link to="/" tag="b">
            <v-btn class="ma-2" outlined color="indigo">ホームへ</v-btn>
        </router-link>
        <v-row dense>
            <v-col
                v-for="(category, i) in categories"
                :key="i"
                cols="12" sm="6" md="4" lg="3"
            >
                <v-card
                    height="100"
                    :color="category.color"
                    dark
                    hover
                    :to="{ name: 'club_list', params: { category: category.value } }"
                >
                    <v-card-title class="display-1">
                        {{ category.name }}
                        <v-icon x-large>mdi-tennis</v-icon>
                    </v-card-title>
                </v-card>
            </v-col> 
        </v-row>
    </v-container>
</template>

<script>
export default {
    data: () => ({
        categories: [
            {
                color: 'green',
                name: 'テニス',
                value: 'tennis',
            },
        ],
    }),
}
</script>