<template>
    <div class="list-edit">
        <b-input-group>
            <b-input-group-prepend>
                <b-input-group-text>{{ itemDescription }}</b-input-group-text>
            </b-input-group-prepend>
            <b-input id="item-name" v-model="newItem"></b-input>
            <b-input-group-append>
                <b-button id="btn-add-item" @click="addItem">
                    <font-awesome-icon icon="plus"></font-awesome-icon>
                    {{ $t('subtaskCreation.addAnswer') }}
                </b-button>
            </b-input-group-append>
        </b-input-group>
        <div v-if="items.length === 0" class="list-edit-item">
            Keine Einträge
        </div>
        <div v-for="(item, index) in items" :key="index" class="list-edit-item">
            <span>{{ item }}</span>
            <b-button
                :id="'remove-item-' + index"
                variant="outline-danger"
                class="btn-sm float-right"
                @click="removeItem(index)"
            >
                <font-awesome-icon icon="minus-circle"></font-awesome-icon>
            </b-button>
        </div>
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faMinusCircle, faPlus } from '@fortawesome/free-solid-svg-icons';

library.add(faMinusCircle, faPlus);

@Component
export default class StringListEdit extends Vue {
    @Prop() private value!: string[];
    @Prop() private itemDescription!: string;

    private items: string[] = [];
    private newItem: string = '';

    public created() {
        this.items = this.value;
    }

    public addItem() {
        if (this.newItem === '') {
            return;
        }
        this.items.push(this.newItem);
        this.newItem = '';
        this.$emit('input', this.items);
    }

    public removeItem(index: number) {
        this.items.splice(index, 1);
        this.$emit('input', this.items);
    }
}
</script>

<style scoped>
.list-edit {
    display: flex;
    flex-wrap: wrap;
}
.list-edit-item {
    padding: 6px 12px;
    margin: 0.5em 0.5em;
    background-color: #e9ecef;
    display: inline;
    flex-grow: 1;
    flex-basis: 40%;
}
</style>
