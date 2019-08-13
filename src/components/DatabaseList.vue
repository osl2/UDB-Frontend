<template>
  <div class="container-fluid">
    <b-modal id="modal-showdb" size="xl" ok-only  @change="showDatabase()">
      <DatabaseComponent elementId="db-meta-data" ref="databaseComponent"></DatabaseComponent>
    </b-modal>

    <b-list-group>
      <b-list-group-item
              v-for="database in databases"
              :key="database.id"
              bg-variant="light"
              class="card"
      >
        {{database.name}}

        <b-button class="bg-danger" @click="$emit('deleteDatabase', database)" style="margin-left: 5px;">
          {{$t('buttonText.delete')}}
        </b-button>
        <b-button class="bg-info"  v-b-modal.modal-showdb @click="choosenDB = database">
          {{$t('buttonText.showDatabase')}}
        </b-button>

      </b-list-group-item>
    </b-list-group>
  </div>
</template>

<script lang="ts">
  import {Component, Prop, Vue} from 'vue-property-decorator';
  import Database from "@/dataModel/Database";
  import DatabaseComponent from "@/components/DatabaseComponent.vue";

  @Component({
    components: {DatabaseComponent},
  })
  export default class DatabaseList extends Vue {
    private errorMsg: string = '';
    @Prop() private databases!: Database[];
    private choosenDB!: Database;


    public showDatabase() {
      const dbComponent: DatabaseComponent = this.$refs.databaseComponent as unknown as DatabaseComponent;
      dbComponent.postInit(Promise.resolve(this.choosenDB));
    }


  }

</script>

<style scoped>
  .container-fluid {
    overflow-x: auto;
    display: flex;
    background-color: lightgray;
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
