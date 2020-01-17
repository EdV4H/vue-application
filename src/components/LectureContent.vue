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
            <v-spacer></v-spacer>
            <v-btn
              class="ma-2"
              outlined color="indigo"
              :to="{ name: 'card2', params: { department: $route.params.department, group: $route.params.group } }"
            >
                レビューを書く
            </v-btn>
            <v-card-text
                v-for="review in reviews"
                :key="review.index"
            >
                <v-list-item three-line>
                    <!-- <v-avatar color="grey" class="mr-4"></v-avatar> -->
                    <v-list-item-content>
                        <v-list-item-titile class="title">{{ review.name }}</v-list-item-titile>
                        <v-list-item-subtitle>{{ review.department }}</v-list-item-subtitle>
                        <v-row justify="start" dense>
                            <v-col cols="auto">
                                <span class="text--lighten-2 caption mr-2">単位</span>
                            </v-col>
                            <v-col cols="auto">
                                <v-rating
                                        :value="lecture.credit"
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
                                        :value="lecture.content"
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
                <v-list-item>{{ review.text }}</v-list-item>
            </v-card-text>
        </v-card>
    </v-container>
</template>

<script>
// import axios from 'axios';
export default {
    data () {
        return {
            lecture: this.$route.params.lecture,
            reviews: [
                {
                    id: 1,
                    name: 'サンプル太郎',
                    department: '基幹理工学部情報理工学科',
                    year: '2020',
                    like: 70,
                    credit: 3,
                    content: 3,
                    text: '基本的に親指二本でプレイ出来て、音ゲー初心者が入りやすい作りになっていて良いです。 曲や譜面のセンスも良く、難しい譜面をノーミスでクリアした時は無茶苦茶気持ちいいです。 ストーリーや世界観も良くて、なんかもう褒めるところしかありません。 あえて上げるとしたら指でノーツが隠れてしまうことがあるところかな？ これもまぁ覚えれば良いだけだし... とにかく、音ゲーに興味のある方なら買って損はしないので是非プレイしましょう！'
                },
                {
                    id: 2,
                    name: 'サンプル次郎',
                    department: '基幹理工学部情報通信学科',
                    year: '2020',
                    like: 100,
                    credit: 3,
                    content: 3,
                    text: 'とても素晴らしいゲームだと思います。洗練されたデザイン・判定ラインが動くという斬新なシステム、個人的に“とても面白い”と感じました。オープニングも美しく、それでいてシックな魅了されるものでした。オープニング曲はアップテンポからの、しっとりとした曲調、その後の上がりように歓喜しました。グラフィックも繊細で美しい、洒落た、見ていて飽きないものです。チュートリアルもセンスのいい、楽しめるものでした。“一つの作業”などではなく、世界観に入り込めるものです。ノーツもお洒落でいて見やすいもので、そこも引き込まれる要因の一つだとです。世界観もスタイリッシュで近未来的、きらびやかでいて、どこか仄暗いものを感じさせます。どストライクでした!“判定ラインが動く”という斬新なシステムを起用しながらも、初心者にも遊びやすく創られていて、上手くなればなる程“次の難易度に”“今度はノーミスを”とやり込みたくなるゲームです。'
                },
            ]
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
    // mounted: function () {
    //     axios
    //         .get(this.endpoint())
    //         .then(res => {
    //             // this.lectures = res.data.Items;
    //             this.lecture = res.data.Items
    //                 .filter(x => x.department === this.valueToString(this.$route.params.department))
    //                 .filter(x => x.group === this.valueToString(this.$route.params.group))
    //                 .filter(x => x.lecture_name === this.$route.params.lecture);
    //         });
    // }
}
</script>