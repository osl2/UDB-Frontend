<template>
    <div>
        <div class="helpBtnPos">
            <h1>
                <b-button id="popoverHelpMsg" class="helpBtn bg-info btn-lg">?</b-button>
                <b-popover target="popoverHelpMsg" triggers="hover focus" :content="helpMsg"></b-popover>
            </h1>
        </div>
    </div>
</template>

<script lang="ts">
/**
 * Component to add a HelpButton to a View.
 * It appears as a Button with a question mark. On hover over you'll get a popover which shows the {{helpMsg}}.
 * Add HelpButton to your component and insert a
 * <HelpButton helpMsg="'YourHelpMessageHere'"><HelpButton>
 * tag in your template.
 */
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component({})
export default class HelpButton extends Vue {
    @Prop() private helpMsg!: string;
}
</script>

<style scoped>
.helpBtnPos {
    position: absolute;
    top: 40px;
    right: 40px;
    z-index: 99;
}

.helpBtn {
    border-radius: 25px;
}
</style>
