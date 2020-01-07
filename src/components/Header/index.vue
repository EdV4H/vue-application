<template>
    <v-app-bar app>
        <router-link to="/" tag="b">
            <v-toolbar-title class="headline text-uppercase">
            <span>MileStone</span>
            <span class="font-weight-light">Express</span>
            </v-toolbar-title>
        </router-link>
        <v-spacer></v-spacer>
        <template v-if="$vuetify.breakpoint.xs">
            <v-menu
                transition="slide-y-transition"
                bottom
                >
                <template v-slot:activator="{ on }">
                    <v-btn
                        v-on="on"
                        icon
                    >
                        <v-icon>mdi-dots-vertical</v-icon>
                    </v-btn>
                </template>
                <v-list>
                    <v-list-item @click="() => {}">
                        <v-list-item-title>新規登録</v-list-item-title>
                    </v-list-item>
                    <v-list-item @click="() => {}">
                        <v-list-item-title>ログイン</v-list-item-title>
                    </v-list-item>
                </v-list>
            </v-menu>
        </template>
        <template v-else>
            <Signup></Signup>
            <Login></Login>
        </template>
    </v-app-bar>
</template>

<script>
import Signup from './Signup';
import Login from './Login';
export default {
    components: { Signup, Login }
}
</script>