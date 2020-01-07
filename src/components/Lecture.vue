<template>
    <v-container>
        <h1>
            <v-btn
              class="ma-2"
              outlined color="indigo"
              :to="{ name: 'group', params: { department: $route.params.department } }"
            >
            学部一覧へ
            </v-btn>
        </h1>

        <!-- <v-list flat>
            <v-subheader>講義一覧</v-subheader>
            <v-list-item-group v-model="item" color="primary">
                <v-list-item v-for="list in displayLists" :key="list.index">
                    <v-list-item-content>
                        <v-list-item-title>{{ list.title + " " + list.rate }}</v-list-item-title>
                        <v-list-item-subtitle>{{ list.rate }}</v-list-item-subtitle>
                    </v-list-item-content>
                </v-list-item>
            </v-list-item-group>
            <div class ="text-center">
                <v-pagination
                    v-model="page"
                    :length="length"
                    :total-visible="7"
                    @input = "pageChange"
                ></v-pagination>
            </div>
        </v-list> -->

        <v-card>
            <v-card-title>
                講義一覧
                <v-spacer></v-spacer>
                <v-text-field
                    v-model="search"
                    append-icon="search"
                    label="Search"
                    single-line
                    hide-details
                ></v-text-field>
            </v-card-title>

            <v-data-table
                :headers="headers"
                :items="lectures"
                :search="search"
            >
            </v-data-table>
        </v-card>
    </v-container>
</template>

<script>
//   export default {
//     data () {
//       return {
//         page: 1,
//         length: 0,
//         lists: [],
//         displayLists: [],
//         pageSize: 15,
//       }
//     },
//     methods: {
//         pageChange: function(pageNumber) {
//             this.displayLists = this.lists.slice(this.pageSize*(pageNumber-1), this.pageSize*(pageNumber));
//         },
//     },
//     mounted: function() {
//         this.lists = new Array(99).fill().map((v,i)=> {
//             return { id : i, title : 'SampleLecture' + (i+1), rate : 0 };
//         });
//         this.length = Math.ceil(this.lists.length/this.pageSize);
//         this.displayLists = this.lists.slice(this.pageSize*(this.page-1), this.pageSize*(this.page));
//     },
//   }
  export default {
    data () {
      return {
        search: '',
        headers: [
          {
            text: '講義名',
            align: 'left',
            // sortable: false,
            value: 'name',
          },
          { text: '講師名', value: 'teacher' },
          { text: '楽単度', value: 'credit' },
          { text: '内容', value: 'content' },
          { text: '出席', value: 'attendance' },
        ],
        lectures: [
          {
            name: 'Communication Strategies',
            teacher: 'ウィリアムズ・デイビット',
            credit: 3.0,
            content: 3.0,
            attendance: '毎回',
          },
          {
            name: 'Academic Lecture Comprehension',
            teacher: '福田哲也',
            credit: 3.0,
            content: 3.0,
            attendance: '毎回',
          },
        ],
      }
    },
    mathods: {
        getColor (credit) {
            if (credit >= 4.0) return 'green'
            else if (credit >= 2.5) return 'orange'
            else return 'red'
        },
    },
  }
</script>