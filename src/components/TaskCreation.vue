<template>
    <div>
        <b-input-group>
            <b-input-group-prepend>
                <b-input-group-text>Name</b-input-group-text>
            </b-input-group-prepend>

            <b-form-input v-model="task.name"></b-form-input>

            <b-input-group-append>
                <b-dropdown :text="databaseName">
                    <b-dropdown-item v-for="database in databases" :key="database.id" @click="select(database)">
                        {{ database.name }}
                    </b-dropdown-item>
                </b-dropdown>
                <b-button variant="info" @click="createTask()">
                    <font-awesome-icon icon="plus"></font-awesome-icon>
                    {{ $t('teacherWorksheet.new') }}
                </b-button>
            </b-input-group-append>
        </b-input-group>
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import Task from '@/dataModel/Task';
import Database from '@/dataModel/Database';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

library.add(faPlus);

export class DatabaseOption {
    public name: string;
    public id: string;

    constructor(name: string, id: string) {
        this.name = name;
        this.id = id;
    }
}

@Component
export default class TaskCreation extends Vue {
    @Prop() private databases: Database[] = [];

    private task: Task = new Task('', '', '', []);
    private databaseName = 'Datenbank wählen';

    public created() {}

    public select(db: Database) {
        if (db === undefined) {
            return;
        }
        this.databaseName = db.name;
        this.task.databaseId = db.id;
    }

    public createTask() {
        if (this.task.databaseId === '') {
            alert('Bitte wählen Sie eine Datenbank aus');
            return;
        }
        this.$emit('createTask', this.task);
        this.task = new Task('', '', '', []);
    }
}
</script>

<style scoped></style>
