<template>
    <div>
        <div id="blocklyDiv" style="height: 600px; width: 100%; float:left"></div>
        <div class="btn mt-2">
            <b-button @click="$emit('executeQuery', code)">
                {{ $t('query.executeButton') }}
            </b-button>
        </div>
        <div class="clear"></div>
    </div>
</template>

<script lang="ts">
declare var Blockly: any;

import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class PointAndClick extends Vue {
    @Prop() private allowedSqlToolbox!: string;
    private workspace: any = Blockly;
    private code: string = '';
    private basedir?: string = process.env.BASE_URL;

    mounted() {
        this.initBlockly();
    }

    private initBlockly() {
        const toolbox = require('@/assets/blockly/' + this.allowedSqlToolbox);
        // remove metadata from loaded toolbox
        const cleantoolbox = toolbox.substring(28).toString();
        // decode base64
        const decodedtoolbox = atob(cleantoolbox);
        this.workspace = Blockly.inject(
            // this.$refs.blocklyDiv,
            'blocklyDiv',
            {
                toolbox: decodedtoolbox,
                path: this.basedir + 'static/blockly/',
                collapse: false,
                comments: false,
                disable: false,
                maxBlocks: Infinity,
                trashcan: true,
                horizontalLayout: false,
                toolboxPosition: 'start',
                css: true,
                media: this.basedir + 'static/blockly/media/',
                rtl: false,
                scrollbars: true,
                sounds: true,
                oneBasedIndex: true,
            }
        );
        this.workspace.addChangeListener(this.updateCode);
    }

    updateCode() {
        this.code = Blockly.SQL.workspaceToCode(this.workspace);
    }
}
</script>

<style scoped>
.btn {
    float: right;
}
</style>
