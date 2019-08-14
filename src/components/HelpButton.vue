<template>
    <div>
        <div class="helpBtnPos">
            <h1>

                <b-button id="popoverHelpMsg" class="helpBtn bg-info btn-lg">?</b-button>
                <b-popover target="popoverHelpMsg"
                           triggers="hover focus"
                           :content="helpmsg">
                </b-popover>
            </h1>
        </div>
    </div>
</template>

<script lang="ts">
    /**
     * Component to add a HelpButton to a View.
     * It appears as a Button with a question mark. On hover over you'll get a popover which shows the {{helpmsg}}.
     * Add HelpButton to your component and insert a
     * <HelpButton helpmsg="'YourHelpMessageHere'"><HelpButton>
     * tag in your template.
     */
    import {Component, Prop, Vue} from 'vue-property-decorator';

    @Component({})
    export default class HelpButton extends Vue {
        @Prop() private helpmsg!: string;
    }
</script>

<style scoped>
    .helpBtnPos {
        position: absolute;
        top: 40px;
        right: 40px;
    }

    .helpBtn {
        border-radius: 25px;

    }

    .cardStyling {
        background-color: #17a2b8;
        color: white;
    }

</style>
