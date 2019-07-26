<template>
    <div>
        <div>
            <b-form-textarea
                    id="textarea"
                    v-model="query"
                    placeholder="SQL-Statement eingeben"
                    rows="3"
                    max-rows="6"></b-form-textarea>
        </div>
        <div class="btn">
            <b-button @click="$emit('executeQuery', query)">
                {{$t('query.executeButton')}}
            </b-button>
        </div>
        <div class="clear">
        </div>
    </div>
</template>

<script lang="ts">
import {Vue, Component, Prop} from 'vue-property-decorator';

export default class Query extends Vue {
  // Data
  public query: string = '';
  }
</script>

<style scoped>
    .btn {
        float: right;
    }
</style>
