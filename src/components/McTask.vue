<template>
    <div>
    <div>
        {{this.currentSubtask.instruction}}
    </div>

    <div>

        <b-form-group label="Form-checkbox-group stacked checkboxes">
            <b-form-checkbox-group
                    v-model="selected"
                    :options="options"
                    stacked
            ></b-form-checkbox-group>
        </b-form-group>
    </div>

    </div>
</template>

<script lang ="ts">
    import MultipleChoiceTask from '@/datamodel/MultipleChoiceTask.ts'
    import Vue from 'vue';

        export default Vue.extend({
            props: ['currentSubtask'],
            data() {
                return {
                    selected: [],
                    options: [{}], // am anfang leeres object drinnen? an index 0
                };
            },
            methods:{
                setOptions(){
                    for(let index=0; index < this.currentSubtask.answerOptions.length; index++){

                        this.options.push({text: this.currentSubtask.answerOptions[index], value: index})

                    }
                }
            },
            created(): void {
                this.setOptions();
            }

        })
</script>

<style scoped>

</style>
