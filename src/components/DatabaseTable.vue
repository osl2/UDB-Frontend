<template>
    <div class="col-sm-12 col-lg-4 col-xl-3 col-md-6" style="margin-bottom: 1em">
        <div class="card">
            <div class="card-header">
                <b class="tableFontSize">{{ tableName }}</b>
            </div>
            <ul v-for="(column, index) in columns" :key="index" class="list-group list-group-flush">
                <li class="list-group-item py-0 tableFontSize">{{ column }}</li>
            </ul>
        </div>
    </div>
</template>

<script lang="ts">
import { Prop, Vue } from 'vue-property-decorator';
import Component from 'vue-class-component';

@Component({})
export default class DatabaseTable extends Vue {
    @Prop() private tableName!: string;
    @Prop() private columns!: string[];
}
</script>

<style scoped>
.tableFontSize {
    font-size: small;
}
</style>
