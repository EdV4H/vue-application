<template>
	<v-dialog v-model="dialog" persistent max-width="600px">
		<template v-slot:activator="{ on }">
			<v-btn
				class="ma-2"
				outlined color="indigo"
				v-on="on"
			>
				レビューを書く
			</v-btn>
		</template>
		<v-card>
            <v-card-title>レビュー登録</v-card-title>
            <v-card-subtitle>授業の感想を入力してください。</v-card-subtitle>
            <v-divider></v-divider>
            <v-card-text>
                <v-form ref="form" v-model="valid" lazy-validation>
                    <v-row>
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
                            <v-textarea
								v-model="paragraph"
								counter
								outlined
								label="感想"
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
                <v-btn text @click="dialog = false">Close</v-btn>
                <v-btn text @click="submit()">Submit</v-btn>
            </v-card-actions>
        </v-card>
	</v-dialog>
</template>

<script>
import axios from 'axios';

export default {
	props: ['lecture_name', 'teacher'],
	data () {
		return {
			valid: true,
			dialog: false,
			credit: 0,
			content: 0,
			paragraph: '',
		}
	},
	methods: {
		submit: function () {
			axios
				.put(this.endpoint(), {
					Item: {
						lecture_name: this.lecture_name,
						contributor: 'Guest Student',
						department: '基幹理工学部',
						teacher: this.teacher,
						like: 0,
						credit: this.credit,
						content: this.content,
						paragraph: this.paragraph
					}
				})
				.then(this.dialog = false)
		},
		endpoint: function () {
			return "https://jze0k0dn7c.execute-api.ap-northeast-1.amazonaws.com/prod/reviews"
		},
	},
}
</script>
