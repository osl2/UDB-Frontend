<template>
    <div id="blocklyDiv" style="height: 600px; width: 100%; float:left">
    </div>
</template>

<script lang="ts">
    declare var Blockly: any;

    import Vue from 'vue';

    export default Vue.extend({
        data: () => ({
            workspace: null,
            code: null
        }),
        mounted() {
            this.initBlockly();
        },
        methods: {
            initBlockly() {
                let toolbox = require('@/assets/blockly/toolbox.xml'); //Vielleicht hier verschiedene Versionen haben
                //remove metadata from loaded toolbox
                let cleantoolbox = toolbox.substring(28).toString();
                //decode base64
                let decodedtoolbox = atob(cleantoolbox);
                this.workspace = Blockly.inject(
                    //this.$refs.blocklyDiv,
                    'blocklyDiv',
                    {
                        toolbox: decodedtoolbox,
                        path: 'static/js/blockly/',
                        collapse : false,
                        comments : false,
                        disable : false,
                        maxBlocks : Infinity,
                        trashcan : true,
                        horizontalLayout : false,
                        toolboxPosition : 'start',
                        css : true,
                        media : 'static/js/blockly/media/',
                        rtl : false,
                        scrollbars : false,
                        sounds : true,
                        oneBasedIndex : true
                    }
                );
                this.workspace.addChangeListener(this.updateCode);
            },
            updateCode() {
                this.code = Blockly.SQL.workspaceToCode(this.workspace);
            }
        }
    })
</script>

<style scoped>

</style>