<template>
    <div>
        <div id="blocklyDiv" style="height: 600px; width: 100%; float:left">
        </div>
        <div class="btn">
            <b-button @click="$emit('executeQuery', code)">
                {{$t('query.executeButton')}}
            </b-button>
        </div>
        <div class="clear">
        </div>
    </div>
</template>

<script lang="ts">
declare var Blockly: any;

import Vue from 'vue';

export default Vue.extend({
  data: () => ({
    workspace: Blockly,
    code: null,
  }),
  mounted() {
    this.initBlockly();
  },
  methods: {
    initBlockly() {
      const toolbox = require('@/assets/blockly/toolbox.xml'); // Vielleicht hier verschiedene Versionen haben
      // remove metadata from loaded toolbox
      const cleantoolbox = toolbox.substring(28).toString();
      // decode base64
      const decodedtoolbox = atob(cleantoolbox);
      this.workspace = Blockly.inject(
        // this.$refs.blocklyDiv,
        'blocklyDiv',
        {
          toolbox: decodedtoolbox,
          path: 'static/js/blockly/',
          collapse: false,
          comments: false,
          disable: false,
          maxBlocks: Infinity,
          trashcan: true,
          horizontalLayout: false,
          toolboxPosition: 'start',
          css: true,
          media: 'static/js/blockly/media/',
          rtl: false,
          scrollbars: false,
          sounds: true,
          oneBasedIndex: true,
        },
      );
      this.workspace.addChangeListener(this.updateCode);


    },
    updateCode() {
      this.code = Blockly.SQL.workspaceToCode(this.workspace);
    },
  },
});
</script>

<style scoped>
    .btn {
        float: right;
    }
</style>
