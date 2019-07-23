<template>
    <div class="col-sm-12 col-lg-4 col-xl-3 col-md-6" style="margin-bottom: 1em">
        <div class="card">
            <div class="card-header">
                {{tableName}}
            </div>
            <ul class="list-group list-group-flush" v-for="column in columns">
                <li class="list-group-item">{{column}}</li>
            </ul>
        </div>
    </div>
</template>

<script lang="ts">
  import {Prop, Vue} from 'vue-property-decorator';
  import Component from 'vue-class-component';

  @Component({})
  export default class DatabaseTable extends Vue {

    @Prop() private tableName!: string;
    @Prop() private columns!: string[];

  }
</script>

<style scoped>

</style>
