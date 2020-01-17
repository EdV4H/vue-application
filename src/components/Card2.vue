<template>
    <v-container>
        <v-btn 
            class="ma-2" 
            outlined color="indigo" 
            :to="{ name: 'group', params: { department: $route.params.department } }"
        >
            科目群一覧へ
        </v-btn>
        <v-data-iterator
            :items="lectures"
            :search="search"
            :sort-by="sortBy.sort"
            :sort-desc="sortBy.desc"
            loading
            loading-text="講義情報取得中..."
        >
            <template v-slot:header>
                <v-row>
                    <v-col cols="12" md="7">
                        <v-text-field
                            v-model="search"
                            cleav-model="search"
                            clearable
                            flat
                            outlined
                            dense
                            hide-details
                            prepend-inner-icon="search"
                            label="Search"
                        ></v-text-field>
                    </v-col>
                    <v-col cols="12" md="5">
                        <v-select
                                v-model="sortBy"
                                flat
                                outlined
                                dense
                                hide-details
                                :items="keys"
                                :item-value="value"
                                :item-text="text"
                                prepend-inner-icon="search"
                                label="Sort by"
                        ></v-select>
                    </v-col>
                </v-row>
            </template>

            <template v-slot:default="props">
                <v-row dense>
                    <v-col
                        v-for="lecture in props.items"
                        :key="lecture.index"
                        cols="12" sm="6" md="6" lg="4"
                    >
                        <v-card
                            hover
                            min-width="300"
                            :to="{ name: 'lecture_content', params: { department: $route.params.department, group: $route.params.group, lecture: lecture } }"
                        >
                            <v-card-title class="subheading font-weight-bold">{{ lecture.lecture_name }}</v-card-title>
                            <v-card-subtitle>{{ lecture.teacher }}</v-card-subtitle>
                            <v-divider></v-divider>
                            <v-list dense>
                                <v-list-item>
                                    <span class="text--lighten-2 caption mr-2">単位</span>
                                    <v-list-item-content>
                                        <v-rating
                                                :value="lecture.credit"
                                                color="amber"
                                                dense
                                                half-increments
                                                readonly
                                                size="14"
                                        ></v-rating>
                                    </v-list-item-content>
                                    <span class="text--lighten-2 caption mr-2">内容</span>
                                    <v-list-item-content>
                                        <v-rating
                                                :value="lecture.content"
                                                color="amber"
                                                dense
                                                half-increments
                                                readonly
                                                size="14"
                                        ></v-rating>
                                    </v-list-item-content>
                                </v-list-item>
                                <v-list-item>
                                    <v-chip-group
                                        column
                                        active-class="primary--text"
                                    >
                                        <v-chip 
                                            v-for="tag in lecture.tags"
                                            :key="tag"
                                            x-small
                                        >
                                            {{ tag }}
                                        </v-chip>
                                    </v-chip-group>
                                </v-list-item>
                            </v-list>
                            
                        </v-card>
                    </v-col>
                </v-row>
            </template>

            <template v-slot:footer>
                <!-- <v-pagination
                    v-model="page"
                    :length="length"
                    :total-visible="7"
                    @input = "pageChange"
                ></v-pagination> -->
            </template>
        </v-data-iterator>
    </v-container>
</template>

<script>
import axios from 'axios'
export default {
    data() {
        return {
            search: '',
            filter: {},
            //page: 1,
            //itemsPerPage: 1,
            //itemsPerPageArray: [1, 4, 8, 16],
            //length: 0,
            sortBy: { sort: 'lecture_name', desc: true },
            lectures: [],
            keys: [
                //{
                //     values: { value: 'lecture_name', desc: false },
                //     text: '講義名昇順'
                // },
                // {
                //     values: { value: 'lecture_name', desc: true },
                //     text: '講義名降順'
                // },
                // {
                //     values: { value: 'teacher', desc: false },
                //     text: '講師名昇順'
                // },
                // {
                //     values: { value: 'teacher', desc: true },
                //     text: '講師名降順'
                // },
                {
                    value: { sort: 'credit', desc: false },
                    text: '楽単度昇順',
                },
                {
                    value: { sort: 'credit', desc: true },
                    text: '楽単度降順',
                },
                {
                    value: { sort: 'content', desc: false },
                    text: '内容度昇順',
                },
                {
                    value: { sort: 'content', desc: true },
                    text: '内容度降順',
                },
            ],
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
        endpoint: function() {
            return "https://jze0k0dn7c.execute-api.ap-northeast-1.amazonaws.com/prod/lectures"
            //return "http://dummy.restapiexample.com/api/v1/employees"
        },
    },
    mounted: function () {
        axios
            .get(this.endpoint())
            .then(res => {
                // this.lectures = res.data.Items;
                this.lectures = res.data.Items
                    .filter(x => x.department === this.valueToString(this.$route.params.department))
                    .filter(x => x.group === this.valueToString(this.$route.params.group));
                this.length = Math.ceil(this.lectures.length / this.itemsPerPage);
            })
            .catch(function () {
                this.lectures = new Array(99).fill().map((v,i)=> {
                    return {
                        id: i,
                        //color: "#" + Math.floor(Math.random() * 16777215).toString(16),
                        color: "blue",
                        lecture_name: 'Sample Lecture' + (i+1),
                        teacher: 'Sample Teacher' + (i+1),
                        credit: Math.random() * 6,
                        content: Math.random() * 6,
                        tags: ['出席あり', 'レジュメ', '試験あり', 'プレゼンあり', '期末レポ',],
                    };
                });
            });
    },
}
</script>