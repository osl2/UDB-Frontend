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
                                         v-b-modal.modal-showdb-navbar
                                         @click="choosenDB = database">
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
        <b-modal id="modal-showdb-navbar" size="xl" ok-only  @change="showDatabase()">
            <DatabaseComponent elementId="db-meta-data-navbar" ref="databaseComponent"></DatabaseComponent>
        </b-modal>
    </div>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator';
import Database from "@/dataModel/Database";
import DatabaseComponent from "@/components/DatabaseComponent.vue";
import Course from "@/dataModel/Course";

@Component({
    components: {DatabaseComponent},
})
export default class NavBar extends Vue {
    private errorMsg: string = '';
    @Prop() private databases!: Database[];
    @Prop() private courses!: Course[];
    private choosenDB!: Database;


    public showDatabase() {
        const dbComponent: DatabaseComponent = this.$refs.databaseComponent as unknown as DatabaseComponent;
        dbComponent.postInit(Promise.resolve(this.choosenDB));
    }


}
</script>

<style scoped>

</style>
