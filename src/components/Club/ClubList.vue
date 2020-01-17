<template>
    <v-container>
        <v-btn 
            class="ma-2" 
            outlined color="indigo" 
            to="/club/category"
        >
            カテゴリー一覧へ
        </v-btn>

        <v-data-iterator
            :items="clubs"
            :search="search"
            loading
            loading-text="サークル情報取得中"
        >
            <template v-slot:header>
            </template>

            <template v-slot:default="props">
                <v-row dense>
                    <v-col
                        v-for="club in props.items"
                        :key="club.index"
                        cols="12" sm="6" md="4" lg="3"
                    >
                        <v-card
                            hover
                            min_width="300"
                        >
                            <v-img
                                class="white--text align-end"
                                height="150px"
                                src="../../assets/thumbnail/circle.jpg"
                            ></v-img>
                            <v-card-title>{{ club.name }}</v-card-title>
                            <v-card-subtitle>{{ club.catchcopy }}</v-card-subtitle>
                            <v-card-actions>
                                <v-chip-group
                                    column
                                    active-class="primary--text"
                                >
                                    <v-chip 
                                        v-for="tag in club.tags"
                                        :key="tag"
                                        small
                                    >
                                        {{ tag }}
                                    </v-chip>
                                </v-chip-group>
                            </v-card-actions>
                        </v-card>
                    </v-col>
                </v-row>
            </template>

            <template v-slot:footer>
            </template>
        </v-data-iterator>
    </v-container>
</template>

<script>
import axios from 'axios';
export default {
    data() {
        return {
            search: '',
            filter: {},
            clubs: [],
        }
    },
    methods: {
        valueToString: function(value) {
            if(value === 'tennis') return "テニス"
            else return value
        },
        endpoint: function() {
            return "https://jze0k0dn7c.execute-api.ap-northeast-1.amazonaws.com/prod/clubs"
            //return "http://dummy.restapiexample.com/api/v1/employees"
        },
    },
    mounted: function () {
        axios
            .get(this.endpoint())
            .then(res => {
                // this.lectures = res.data.Items;
                this.clubs = res.data.Items
                    .filter(x => x.category === this.valueToString(this.$route.params.category))
            });
    },
}
</script>