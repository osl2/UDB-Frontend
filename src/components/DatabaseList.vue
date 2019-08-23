<template>
    <div class="container-fluid bg-secondary">
        <b-modal id="modal-showdb" size="xl" ok-only @change="showDatabase()">
            <DatabaseComponent ref="databaseComponent" element-id="db-meta-data-list"></DatabaseComponent>
        </b-modal>

        <b-list-group>
            <b-list-group-item v-for="database in databases" :key="database.id" bg-variant="light">
                {{ database.name }}
                <div class="btn-toolbar float-right">
                    <b-button class="bg-danger mr-3" @click="$emit('deleteDatabase', database)">
                        {{ $t('buttonText.delete') }}
                    </b-button>
                    <b-button v-b-modal.modal-showdb class="bg-info" @click="choosenDB = database">
                        {{ $t('buttonText.showDatabase') }}
                    </b-button>
                </div>
            </b-list-group-item>
        </b-list-group>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import Database from '@/dataModel/Database';
import DatabaseComponent from '@/components/DatabaseComponent.vue';

@Component({
    components: { DatabaseComponent },
})
export default class DatabaseList extends Vue {
    private errorMsg: string = '';
    @Prop() private databases!: Database[];
    private choosenDB!: Database;

    public showDatabase() {
        const dbComponent: DatabaseComponent = (this.$refs.databaseComponent as unknown) as DatabaseComponent;
        dbComponent.postInit(Promise.resolve(this.choosenDB));
    }
}
</script>

<style scoped>
.container-fluid {
    overflow-x: auto;
    display: flex;
}

.card {
    text-align: center;
    min-width: 12rem;
    min-height: 10rem;
    max-width: 12rem;
    max-height: 10rem;
    margin: 10px 20px 10px 10px;
}
</style>
