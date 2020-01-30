<template>
    <v-container>
        <v-btn 
            class="ma-2" 
            outlined color="indigo" 
            :to="{ name: 'club_list', params: { category: $route.params.category }}"
        >
            サークル一覧へ
        </v-btn>
        <v-row dense>
            <v-col cols="12" sm="4" md="4" lg="5">
                <v-card>
                    <v-list-item three-line>
                        <v-list-item-content>
                            <div class="overline mb-4">Header</div>
                            <v-list-item-title class="headline">{{ club.name }}</v-list-item-title>
                            <v-list-item-subtitle>{{ club.catchcopy }}</v-list-item-subtitle>
                        </v-list-item-content>
                    </v-list-item>
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
                    <v-img
                        class="white--text align-end"
                        contain
                        src="../../assets/thumbnail/circle.jpg"
                    ></v-img>
                </v-card>
            </v-col>
            <v-col cols="12" sm="8" md="8" lg="7">
                <v-row>
                    <v-col cols="12">
                        <v-card>
                            <v-list-item two-line>
                                <v-list-item-content>
                                    <div class="overline mb-4">Introduce</div>
                                    <v-list-item-title>サークル紹介</v-list-item-title>
                                </v-list-item-content>
                            </v-list-item>
                            <v-card-text>
                                {{ club.introduce }}
                            </v-card-text>
                        </v-card>
                    </v-col>
                    <v-col cols="12" lg="6" xl="4">
                        <v-card class="v-card-frame" :href="twitter_url">
                            <v-row dense>
                                <v-col cols="4">
                                    <v-card
                                        class="v-card-icon pa-6"
                                        max-width="90"
                                        max-height="90"
                                        elevation="5"
                                        color="blue"
                                        dark
                                    >
                                        <v-icon size="40">mdi-twitter</v-icon>
                                    </v-card>
                                </v-col>
                                <v-col>
                                    <v-list-item two-line class="text-right">
                                        <v-list-item-content>
                                            <div class="overline mb-2">Twitter</div>
                                            <v-list-item-title>@{{ club.twitter }}</v-list-item-title>
                                        </v-list-item-content>
                                    </v-list-item>
                                </v-col>
                            </v-row>
                            <v-divider></v-divider>
                        </v-card>
                    </v-col>
                    <v-col cols="12" lg="6" xl="4">
                        <v-card class="v-card-frame">
                            <v-row dense>
                                <v-col cols="4">
                                    <v-card
                                        class="v-card-icon pa-6"
                                        max-width="90"
                                        max-height="90"
                                        elevation="5"
                                        color="red"
                                        dark
                                    >
                                        <v-icon size="40">mdi-account</v-icon>
                                    </v-card>
                                </v-col>
                                <v-col>
                                    <v-list-item two-line class="text-right">
                                        <v-list-item-content>
                                            <div class="overline mb-2">Representative</div>
                                            <v-list-item-title>{{ club.representative }}</v-list-item-title>
                                        </v-list-item-content>
                                    </v-list-item>
                                </v-col>
                            </v-row>
                            <v-divider></v-divider>
                        </v-card>
                    </v-col>
                    <v-col cols="12" lg="6" xl="4">
                        <v-card class="v-card-frame">
                            <v-row dense>
                                <v-col cols="4">
                                    <v-card
                                        class="v-card-icon pa-6"
                                        max-width="90"
                                        max-height="90"
                                        elevation="5"
                                        color="orange"
                                        dark
                                    >
                                        <v-icon size="40">mdi-face</v-icon>
                                    </v-card>
                                </v-col>
                                <v-col>
                                    <v-list-item two-line class="text-right">
                                        <v-list-item-content>
                                            <div class="overline mb-2">Member</div>
                                            <v-list-item-title>
                                                <v-icon small color="blue">mdi-gender-male</v-icon>
                                                {{ club.male }}
                                                <v-icon small color="pink">mdi-gender-female</v-icon>
                                                {{ club.female }}
                                            </v-list-item-title>
                                        </v-list-item-content>
                                    </v-list-item>
                                </v-col>
                            </v-row>
                            <v-divider></v-divider>
                        </v-card>
                    </v-col>
                    <v-col cols="12" lg="6" xl="4">
                        <v-card class="v-card-frame">
                            <v-row dense>
                                <v-col cols="4">
                                    <v-card
                                        class="v-card-icon pa-6"
                                        max-width="90"
                                        max-height="90"
                                        elevation="5"
                                        color="purple"
                                        dark
                                    >
                                        <v-icon size="40">mdi-calendar-range</v-icon>
                                    </v-card>
                                </v-col>
                                <v-col>
                                    <v-list-item two-line class="text-right">
                                        <v-list-item-content>
                                            <div class="overline mb-2">Activity</div>
                                            <v-list-item-title>{{ club.activity }}</v-list-item-title>
                                        </v-list-item-content>
                                    </v-list-item>
                                </v-col>
                            </v-row>
                            <v-divider></v-divider>
                        </v-card>
                    </v-col>
                    <v-col cols="12" lg="6" xl="4">
                        <v-card class="v-card-frame">
                            <v-row dense>
                                <v-col cols="4">
                                    <v-card
                                        class="v-card-icon pa-6"
                                        max-width="90"
                                        max-height="90"
                                        elevation="5"
                                        color="amber"
                                        dark
                                    >
                                        <v-icon size="40">mdi-currency-usd</v-icon>
                                    </v-card>
                                </v-col>
                                <v-col>
                                    <v-list-item two-line class="text-right">
                                        <v-list-item-content>
                                            <div class="overline mb-2">Cost</div>
                                            <v-list-item-title >{{ club.cost }}</v-list-item-title>
                                        </v-list-item-content>
                                    </v-list-item>
                                </v-col>
                            </v-row>
                            <v-divider></v-divider>
                        </v-card>
                    </v-col>
                    <v-col cols="12" lg="6" xl="4">
                        <v-card class="v-card-frame">
                            <v-row dense>
                                <v-col cols="4">
                                    <v-card
                                        class="v-card-icon pa-6"
                                        max-width="90"
                                        max-height="90"
                                        elevation="5"
                                        color="brown"
                                        dark
                                    >
                                        <v-icon size="40">mdi-history</v-icon>
                                    </v-card>
                                </v-col>
                                <v-col>
                                    <v-list-item two-line class="text-right">
                                        <v-list-item-content>
                                            <div class="overline mb-2">Founding</div>
                                            <v-list-item-title >{{ club.founding }}年</v-list-item-title>
                                        </v-list-item-content>
                                    </v-list-item>
                                </v-col>
                            </v-row>
                            <v-divider></v-divider>
                        </v-card>
                    </v-col>
                </v-row>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import axios from 'axios';
export default {
    data() {
        return {
            clubs: [],
            club: {},
            twitter_url: '',
        }
    },
    methods: {
        endpoint: function() {
            return "https://jze0k0dn7c.execute-api.ap-northeast-1.amazonaws.com/prod/clubs"
        },
    },
    mounted: function () {
        axios
            .get(this.endpoint())
            .then(res => {
                // this.lectures = res.data.Items;
                this.clubs = res.data.Items
                    .filter(x => x.id === this.$route.params.id);
                this.club = this.clubs[0];
                this.twitter_url = 'https://twitter.com/' + this.club.twitter;
            });
    },
}
</script>

<style>
    .v-card-frame {
        top: 24px;
        position: relative;
    }
    .v-card-icon {
        top: -20px;
        left: 10px;
        position: relative;
    }
</style>