<template>
    <div>
        <b-navbar toggleable="lg" type="dark" variant="info">
            <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
            <b-collapse id="nav-collapse" is-nav>

                <b-navbar-nav>
                    <b-nav-item-dropdown :text="$t('navbar.courseDropdown')">
                        <b-dropdown-item v-for="course in courses"
                                         :key="course.id"
                                         @click="$emit('loadCourse', course)">
                            {{course.name}}
                        </b-dropdown-item>
                    </b-nav-item-dropdown>
                </b-navbar-nav>

                <b-navbar-nav>
                    <b-nav-item-dropdown :text="$t('navbar.databaseDropdown')">
                        <b-dropdown-item v-for="database in databases"
                                         :key="database.id"
                                         @click="$emit('showDatabase', database)">
                            {{database.name}}
                        </b-dropdown-item>
                    </b-nav-item-dropdown>
                </b-navbar-nav>

                <b-navbar-nav class="ml-auto">
                    <b-nav-item-dropdown right>
                        <template slot="button-content">{{$t('navbar.profileDropdown')}}</template>
                       <!-- TODO: Implement settings view
                       <b-dropdown-item href="#">{{$t('navbar.settings')}}</b-dropdown-item> -->
                        <b-dropdown-item href="#"
                                         @click="$emit('logoutTeacher')"
                        >{{$t('navbar.logout')}}</b-dropdown-item>
                    </b-nav-item-dropdown>
                </b-navbar-nav>

            </b-collapse>
        </b-navbar>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend( {
  props: ['courses', 'databases'],
});
</script>

<style scoped>

</style>
