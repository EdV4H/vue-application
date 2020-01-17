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
            <v-card-title>新規講義登録</v-card-title>
            <v-card-subtitle>新しく登録する講義の情報を入力してください。</v-card-subtitle>
            <v-divider></v-divider>
            <v-card-text>
                <v-form ref="form" v-model="valid" lazy-validation>
                    <v-row dense>
                        <v-col cols="12" md="6">
                            <v-select
                                :items="department_list"
                                item-text="name"
                                item-value="name"
                                v-model="department"
                                :rules="[v => !!v || '学部を選択してください']"
                                label="学部選択"
                                v-on:change="set_group()"
                            ></v-select>
                        </v-col>
                        <v-col cols="12" md="6">
                            <v-select
                                :items="group_list"
                                v-model="group"
                                :rules="[v => !!v || '科目群を選択してください']"
                                label="科目群選択"
                            ></v-select>
                        </v-col>
                        <v-col cols="12" md="6">
                            <v-text-field
                                v-model="lecture_name"
                                :rules="[v => !!v || '講義名を入力してください']"
                                label="講義名"
                                required
                            ></v-text-field>
                        </v-col>
                        <v-col cols="12" md="6">
                            <v-text-field
                                v-model="teacher"
                                :rules="[v => !!v || '講師名を入力してください']"
                                label="講師名"
                                required
                            ></v-text-field>
                        </v-col>
                        <v-col cols="12" md="6">
                            単位の取りやすさ
                            <v-rating
                                v-model="credit"
                            ></v-rating>
                        </v-col>
                        <v-col cols="12" md="6">
                            講義内容の面白さ
                            <v-rating
                                v-model="content"
                            ></v-rating>
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
                    </v-row>
                </v-form>
            </v-card-text>
            <v-card-actions>
                <v-btn @click="submit()">submit</v-btn>
                <v-btn @click="clear()">clear</v-btn>
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
            lecture_name: '',
            teacher: '',
            department: '',
            department_list: [
                {
                    id: 1,
                    name: '政治経済学部',
                    groups: [
                        '第二外国語',
                    ]
                },
                {
                    id: 2,
                    name: '教育学部',
                    groups: [
                        '第二外国語',
                    ]
                },
                {
                    id: 7,
                    name: '基幹理工学部',
                    groups: [
                        'A1','A2','B1', 'B2', 'C', 'D',
                    ]
                }
            ],
            group: '',
            group_list: [],
            credit: 0,
            content: 0,
            tags: [],
            tags_list: [
                '出席無し',
                '毎回出席',
                '時々出席',
                'レジュメ',
                '教科書',
                '課題無し',
                'テスト無し',
                '中間テスト',
                '期末テスト',
                'プレゼン有り',
            ]
        }
    },
    methods: {
        remove: function (item) {
            const index = this.tags.indexOf(item)
            if (index >= 0) this.tags.splice(index, 1)
        },
        set_group: function () {
            var index = -1
            for (var i=0; i < this.department_list.length; i++) {
                if (this.department_list[i].name == this.department) index = i;
            }
            this.group_list = this.department_list[index].groups
        },
        submit: function () {
            axios
                .put(this.endpoint(), {
                    Item: {
                        department: this.department,
                        group: this.group,
                        lecture_name: this.lecture_name,
                        teacher: this.teacher,
                        credit: this.credit,
                        content: this.content,
                        tags: this.tags
                    }
                })
                .then(this.clear())
        },
        clear: function () {
            this.department = ''
            this.group = ''
            this.group_list = []
            this.lecture_name = ''
            this.teacher = ''
            this.credit = 0
            this.content = 0
            this.tags = []
        },
        endpoint: function () {
            return "https://jze0k0dn7c.execute-api.ap-northeast-1.amazonaws.com/prod/lectures"
        },
    }
}
</script>