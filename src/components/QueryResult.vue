<template>
    <div>
        <table class="table">
            <thead>
                <tr>
                    <th v-for="(column, columnindex) in columns" :key="columnindex" scope="col" class="tablepadding">
                        {{ column }}
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(row, rowindex) in rows" :key="rowindex">
                    <td v-for="(value, valueindex) in row" :key="valueindex" class="tablepadding">{{ value }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script lang="ts">
import { Prop, Vue } from 'vue-property-decorator';
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
