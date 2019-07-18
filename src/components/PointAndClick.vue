<template>
    <div id="blockDiv" style="height: 800px; width: 70%; float:left">
        <xml id="toolbox" style="display: none">
            <block type="block_alter"></block>
        </xml>
    </div>
</template>

<script lang="ts">
    //let Blockly = require('@/toVue/blockly_compressed.js');
    //require('@/toVue/sql.js');
    //require('@/toVue/msg/js/de.js');
    //require('@/toVue/custom/msg/js/de.js');

    //let demoWorkspace = Blockly.inject('blockDiv', {toolbox: document.getElementById('toolbox')});
    declare var Blockly: any;

    import Vue from 'vue';

    export default Vue.extend({
        mounted() {
            //let blocklyScript = document.createElement('script');
            //blocklyScript.type = 'text/javascript';
            //blocklyScript.setAttribute('src', '@/toVue/blockly_compressed.js');
            //document.head.appendChild(blocklyScript);
            let demoWorkspace = Blockly.inject('blockDiv', {toolbox: document.getElementById('toolbox')});
        }
    })
</script>

<style scoped>

</style>