<template>
    <v-container>
        <h1>
            <v-btn
              class="ma-2"
              outlined color="indigo"
              :to="{ name: 'card2', params: { department: $route.params.department, group: $route.params.group } }"
            >
                講義一覧へ
            </v-btn>
        </h1>

        <v-card>
            <v-card-title class="headline">{{ lecture.lecture_name }}</v-card-title>
            <v-card-subtitle>
                <div>{{ lecture.teacher }}</div>
                <div>{{ lecture.department }}/{{ lecture.group }}群</div>
            </v-card-subtitle>
            <v-card-text>
                <v-chip-group
                    column
                    active-class="primary--text"
                >
                    <v-chip 
                        v-for="tag in lecture.tags"
                        :key="tag"
                        small
                    >
                        {{ tag }}
                    </v-chip>
                </v-chip-group>
                <v-divider></v-divider> 
            </v-card-text>
            <v-card-subtitle>レビュー</v-card-subtitle>
            <Review
                :lecture_name="$route.params.lecture_name"
                :teacher="lecture.teacher"
            ></Review>
            <v-card-text
                v-for="review in reviews"
                :key="review.index"
            >
                <v-list-item three-line>
                    <!-- <v-avatar color="grey" class="mr-4"></v-avatar> -->
                    <v-list-item-content>
                        <v-list-item-title class="title">{{ review.contributor }}</v-list-item-title>
                        <v-list-item-subtitle>{{ review.department }}</v-list-item-subtitle>
                        <v-row justify="start" dense>
                            <v-col cols="auto">
                                <span class="text--lighten-2 caption mr-2">単位</span>
                            </v-col>
                            <v-col cols="auto">
                                <v-rating
                                        :value="review.credit"
                                        color="amber"
                                        dense
                                        half-increments
                                        readonly
                                        size="14"
                                ></v-rating>
                            </v-col>
                            <v-col cols="auto">    
                                <span class="text--lighten-2 caption mr-2">内容</span>
                            </v-col>
                            <v-col>
                                <v-rating
                                        :value="review.content"
                                        color="amber"
                                        dense
                                        half-increments
                                        readonly
                                        size="14"
                                ></v-rating>
                            </v-col>
                        </v-row>    
                    </v-list-item-content>
                    <v-list-item-action>
                        <v-row dense align-content="end">
                            <v-col aria-flowto="end">
                                <v-btn text icon color="" @click="like(review.id)">
                                    <v-icon>mdi-thumb-up</v-icon>
                                </v-btn>
                            </v-col>
                            <v-col align-self="center">   
                                <span class="text--lighten-2 caption mr-2">{{ review.like }}</span>
                            </v-col>
                        </v-row>
                    </v-list-item-action>
                </v-list-item>
                <v-list-item>{{ review.paragraph }}</v-list-item>
            </v-card-text>
        </v-card>
    </v-container>
</template>

<script>
import axios from 'axios';
import Review from './Review';

export default {
    components: {Review},
    data () {
        return {
            lectures: [],
            lecture: this.$route.params.lecture,
            reviews: [],
        }
    },
    methods: {
        valueToString: function(value) {
            if(value === 'pse') return "政治経済学部"
            if(value === 'edu') return "教育学部"
            if(value === 'fse') return "基幹理工学部"

            if(value === 'eng') return "英語"
            if(value === 'second') return "第二外国語"
            if(value === 'common') return "共通科目"

            else return value
        },
        like: function (value) {
            this.reviews[this.getIndex(value, this.reviews, 'id')].like++;
        },
        getIndex: function (value, arr, prop) {
            for (var i=0; i<arr.length; i++) if(arr[i][prop] === value) return i;
            return -1;
        },
        endpoint: function() {
            return "https://jze0k0dn7c.execute-api.ap-northeast-1.amazonaws.com/prod/lectures"
        },
    },
    mounted: function () {
        axios
            .get(this.endpoint())
            .then(res => {
                this.lectures = res.data.Items
                    .filter(x => x.department === this.valueToString(this.$route.params.department))
                    .filter(x => x.group === this.valueToString(this.$route.params.group))
                    .filter(x => x.lecture_name === this.$route.params.lecture_name);
                this.lecture = this.lectures[0];
            });
        axios
            .get("https://jze0k0dn7c.execute-api.ap-northeast-1.amazonaws.com/prod/reviews")
            .then(res => {
                this.reviews = res.data.Items
                    .filter(x => x.lecture === this.valueToString(this.$route.params.lecture_name));
            });
    }
}
</script>