<template>
    <v-container>
        <v-row dense>
          <v-col cols="6">
            <v-card
              class="mx-auto"
            >
              <v-img
                class="white--text align-end"
                height="250px"
                src="../assets/thumbnail/lecture.jpg"
              ></v-img>

              <v-card-subtitle class="pb-0">Lectures</v-card-subtitle>

              <v-card-title>講義一覧</v-card-title>

              <v-card-actions>
                <v-btn
                  color="orange"
                  text
                  to="/list"
                >
                  探す
                </v-btn>

                <v-btn
                  color="orange"
                  text
                >
                  登録する
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
          <v-col cols="6">
            <v-card
              class="mx-auto"
            >
              <v-img
                class="white--text align-end"
                height="250px"
                src="../assets/thumbnail/circle.jpg"
              ></v-img>

              <v-card-subtitle class="pb-0">Clubs</v-card-subtitle>

              <v-card-title>サークル一覧</v-card-title>

              <v-card-actions>
                <v-btn
                  color="orange"
                  text
                >
                  探す
                </v-btn>

                <v-btn
                  color="orange"
                  text
                >
                  登録する
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
    </v-container>
</template>