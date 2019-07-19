<template>
        <div class="card mb-4 box-shadow">
            <div class="card-body">
                <h5 class="card-title">{{ title }}</h5>
                <ul class="list-unstyled mt-3 mb-4">
                    {{ description }}
                </ul>
                <div class="card-footer">
                    <router-link tag="button" class="btn btn-lg btn-block btn-primary" to="path">{{buttonName}}
                    </router-link>
                </div>
            </div>
        </div>
</template>

<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator';

  @Component
  export default class StartPagePanel extends Vue {
    public name: string = 'start-page-panel';

    public data() {
      return {
        title: 'dummy',
        description: 'dummy',
        buttonName: 'dummy',
        path: '/dummy',
      };
    }
  }
</script>

<style scoped lang="scss">
    .bottom-btn {
        position: absolute;
        alignment: center;
        bottom: 17px;
    }

</style>
