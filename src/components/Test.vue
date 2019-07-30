<template>
    <div>
        <h3>
            HALLO DAS SWITCHEN FUNKTIONIERT
        </h3>
        <div>
            {{apitest}}
            {{errmsg}}
        </div>
    </div>
</template>

<script lang="ts">
import {Vue, Component, Prop} from 'vue-property-decorator';
import {GetDatabaseRequest} from "@/api/DefaultApi";

export default class Test extends Vue {
  // Data
  public apitest: object = {};
  public request: GetDatabaseRequest = {databaseId: '12445'};
  public test2: object = {};
  public errmsg: string = '';


  public mounted() {
        this.$store.getters.api.getDatabases()
            .then((response: {}) => (this.apitest = response));
        this.$store.getters.api.getDatabase(this.request).then((response: {}) => (this.test2 = response))
          .catch((error: any) => (this.errmsg = error.message));
        }
    }
</script>



<style scoped>

</style>
