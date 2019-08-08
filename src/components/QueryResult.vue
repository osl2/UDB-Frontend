<template>
    <div>
        <table class="table">
            <thead>
            <tr>
                <th scope="col" v-for="column in columns" class="tablepadding">{{column}}</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="row in rows">
                <td v-for="value in row" class="tablepadding">{{value}}</td>
            </tr>

            </tbody>
        </table>
    </div>
</template>

<script lang="ts">

import {Prop, Vue} from 'vue-property-decorator';
import Component from 'vue-class-component';

@Component({})
export default class DatabaseTable extends Vue {

    @Prop() private columns!: string[];
    @Prop() private rows!: any[][];

}
</script>

<style scoped>

.table {
    border: 1px lightgray solid;
    border-radius: 3px;
}
    .tablepadding {
        padding: 1px 0px 1px 6px;
    }

</style>
