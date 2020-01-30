<template>
    <v-container>
        <h1>
            <v-btn
              class="ma-2"
              outlined color="indigo"
              to="/"
            >
            ホームへ
            </v-btn>
        </h1>

        <v-card>
            <v-card-title>新規サークル登録</v-card-title>
            <v-card-subtitle>新しく登録するサークルの情報を入力してください。</v-card-subtitle>
            <v-divider></v-divider>
            <v-card-text>
                <v-form ref="form" v-model="valid" lazy-validation>
                    <v-row dense>
                        <v-col cols="12" md="7">
                            <v-text-field
                                v-model="name"
                                :rules="[v => !!v || 'サークル名を入力してください']"
                                label="サークル名"
                                required
                            ></v-text-field>
                        </v-col>
                        <v-col cols="12" md="5">
                            <v-select
                                :items="category_list"
                                item-text="text"
                                item-value="value"
                                v-model="category"
                                :rules="[v => !!v || 'カテゴリを選択してください']"
                                label="カテゴリ選択"
                            ></v-select>
                        </v-col>
                        <v-col cols="12">
                            <v-text-field
                                v-model="catchcopy"
                                :rules="[v => !!v || 'キャッチコピーを入力してください']"
                                label="キャッチコピー"
                                required
                            ></v-text-field>
                        </v-col>
                        <v-col cols="12" md="6">
                            <v-text-field
                                v-model="twitter"
                                label="Twitter"
                            />
                        </v-col>
                        <v-col cols="12" md="6">
                            <v-text-field
                                v-model="representative"
                                :rules="[v => !!v || '代表者を入力してください']"
                                label="代表者"
                                required
                            ></v-text-field>
                        </v-col>
                        <v-col cols="12" md="6" lg="3">
                            <v-text-field
                                v-model="male"
                                label="男性人数"
                            />
                        </v-col>
                        <v-col cols="12" md="6" lg="3">
                            <v-text-field
                                v-model="female"
                                label="女性人数"
                            />
                        </v-col>
                        <v-col cols="12" md="6">
                            <v-text-field
                                v-model="activity"
                                :rules="[v => !!v || '活動場所を入力してください']"
                                label="活動場所"
                                required
                            ></v-text-field>
                        </v-col>
                        <v-col cols="12" md="6">
                            <v-text-field
                                v-model="cost"
                                :rules="[v => !!v || '会費を入力してください']"
                                label="会費"
                                required
                            ></v-text-field>
                        </v-col>
                        <v-col cols="12" md="6">
                            <v-text-field
                                v-model="founding"
                                label="創立年"
                            />
                        </v-col>
                        <v-col cols="12">
                            <v-autocomplete
                                v-model="tags"
                                :items="tags_list"
                                chips
                                label="Tags"
                                multiple
                            >
                                <template v-slot:selection="data">
                                    <v-chip
                                        v-bind="data.attrs"
                                        close
                                        @click="data.select"
                                        @click:close="remove(data.item)"
                                    >
                                        {{ data.item }}
                                    </v-chip>
                                </template>
                            </v-autocomplete>
                        </v-col>
                        <v-col cols="12">
                            <v-textarea
								v-model="introduce"
								counter
								outlined
								label="紹介文"
								auto-grow
								required
							>
                            </v-textarea>
                        </v-col>
                    </v-row>
                </v-form>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn text @click="clear()">clear</v-btn>
                <v-btn text @click="submit()">submit</v-btn>
            </v-card-actions>
        </v-card>
    </v-container>
</template>

<script>
import axios from 'axios';
export default {
    data () {
        return {
            valid: true,
            name: '',
            category: '',
            category_list: [
                {
                    text: 'テニス',
                    value: 'tennis',
                },
            ],
            catchcopy: '',
            twitter: '',
            representative: '',
            male: 0,
            female: 0,
            activity: '',
            cost: '',
            founding: 0,
            tags: [],
            tags_list: [
                'ALL早稲田',
                'インカレ',
                '理工',
                '',
            ],
            introduce: '',
        }
    },
    methods: {
        remove: function (item) {
            const index = this.tags.indexOf(item)
            if (index >= 0) this.tags.splice(index, 1)
        },
        submit: function () {
            axios
                .put(this.endpoint(), {
                    Item: {
                        category: this.category,
                        name: this.name,
                        catchcopy: this.catchcopy,
                        twitter: this.twitter,
                        representative: this.representative,
                        male: this.male,
                        female: this.female,
                        activity: this.activity,
                        cost: this.cost,
                        founding: this.founding,
                        tags: this.tags,
                        introduce: this.introduce
                    }
                })
                .then(this.clear())
        },
        clear: function () {
            this.category = '',
            this.name = '',
            this.catchcopy = '',
            this.twitter = '',
            this.representative = '',
            this.male = 0,
            this.female = 0,
            this.activity = '',
            this.cost = '',
            this.founding = 0,
            this.tags = '',
            this.introduce = ''
        },
        endpoint: function () {
            return "https://jze0k0dn7c.execute-api.ap-northeast-1.amazonaws.com/prod/clubs"
        },
    }
}
</script>