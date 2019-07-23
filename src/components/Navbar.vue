<template>
    <div>
        <b-navbar toggleable="lg" type="dark" variant="info">
            <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
            <b-collapse id="nav-collapse" is-nav>
                <b-navbar-nav>
                    <b-nav-item-dropdown :text="$t('sidebar.courseDropdown')">
                        <b-dropdown-item> Test </b-dropdown-item>
                    </b-nav-item-dropdown>
                </b-navbar-nav>
                <b-navbar-nav>
                    <b-nav-item-dropdown :text="$t('sidebar.databaseDropdown')">
                    </b-nav-item-dropdown>
                </b-navbar-nav>
                <b-navbar-nav class="ml-auto">
                    <b-nav-item-dropdown right>
                        <template slot="button-content">{{$t('sidebar.profileDropdown')}}</template>
                        <b-dropdown-item href="#">{{$t('sidebar.settings')}}</b-dropdown-item>
                        <b-dropdown-item href="#">{{$t('sidebar.logout')}}</b-dropdown-item>
                    </b-nav-item-dropdown>
                </b-navbar-nav>
            </b-collapse>
        </b-navbar>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend( {
});
</script>

<style scoped>

</style>