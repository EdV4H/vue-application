<template>
    <v-container>
        <v-btn 
            class="ma-2" 
            outlined color="indigo" 
            :to="{ name: 'group', params: { department: $route.params.department } }"
        >
            学部一覧へ
        </v-btn>
        <v-text-field
            v-model="search"
            clearable
            flat
            outlined
            dense
            hide-details
            prepend-inner-icon="search"
            label="Search"
        ></v-text-field>

        <v-row v-if="loading==true" justify="center">
            <v-progress-circular
                indeterminate
                color="grey"
                :size="150"
            ></v-progress-circular>
        </v-row>

        <v-row dense>
            <v-col
                v-for="lecture in displayLists"
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
                                    disabled
                                >
                                    {{ tag }}
                                </v-chip>
                            </v-chip-group>
                        </v-list-item>
                    </v-list>
                    
                </v-card>
            </v-col>
        </v-row>
        
        <div class ="text-center">
            <v-pagination
                v-model="page"
                :length="length"
                :total-visible="7"
                @input = "pageChange"
            ></v-pagination>
        </div>
    </v-container>
</template>

<script>
import axios from 'axios';
export default {
    data () {
        return {
            loading: true,
            page: 1,
            length: 0,
            displayLists: [],
            pageSize: 16,
            search: '',
            lectures: [],
            keys: [
                'Name',
                'Teacher',
                'Credit',
                'Content'
            ],
        }
    },
    methods: {
        request: function () {
            axios
                .get(this.endpoint())
                .then(res => {
                this.lectures = res.data.Items;
                });
        },
        endpoint: function() {
            return "https://9r8zwtxy15.execute-api.us-east-2.amazonaws.com/prod/lectures"
            //return "http://dummy.restapiexample.com/api/v1/employees"
        },
        pageChange: function(pageNumber) {
            this.displayLists = this.lectures.slice(this.pageSize*(pageNumber-1), this.pageSize*(pageNumber));
        },
    },
    mounted: function() {  
        axios
            .get(this.endpoint())
            .then(res => {
                // this.lectures = res.data.Items;
                this.lectures = res.data.Items.filter(x => x.department === this.$route.params.department).filter(x => x.group === this.$route.params.group);
                //this.search = this.$route.params.department;
                this.loading = false;
                this.length = Math.ceil(this.lectures.length/this.pageSize);
                this.displayLists = this.lectures.slice(this.pageSize*(this.page-1), this.pageSize*(this.page));
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
                this.length = Math.ceil(this.lectures.length/this.pageSize);
                this.displayLists = this.lectures.slice(this.pageSize*(this.page-1), this.pageSize*(this.page));
            })
            // .finally(function () {
            //     this.length = Math.ceil(this.lectures.length/this.pageSize);
            //     this.displayLists = this.lectures.slice(this.pageSize*(this.page-1), this.pageSize*(this.page));
            // });
    },
}
</script>