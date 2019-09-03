import { expect } from 'chai';
import { createLocalVue, mount, shallowMount } from '@vue/test-utils';
import BootstrapVue from 'bootstrap-vue';
import McTask from '@/components/McTask.vue';
import MultipleChoiceTask from '@/dataModel/MultipleChoiceTask';
import MultipleChoiceSolution from '@/dataModel/MultipleChoiceSolution';

const localVue = createLocalVue();
localVue.use(BootstrapVue);

describe('McTask.vue', () => {
    it('displays all the data and check save button', () => {
        const multipleChoiceTask = new MultipleChoiceTask(
            'id',
            new MultipleChoiceSolution([1]),
            'Instruction to check',
            false,
            false,
            ['correct', 'wrong']
        );

        const mcSolutions = new Map<string, MultipleChoiceSolution>();
        mcSolutions.set('id', new MultipleChoiceSolution([1]));
        const wrapper = mount(McTask, {
            localVue,
            propsData: {
                currentSubtask: multipleChoiceTask,
                solutions: mcSolutions,
            },
            mocks: {
                $t: () => {},
            },
        });
        expect(wrapper.is(McTask)).to.equal(true);

        //Instruction is shown correctly
        expect(wrapper.find('div.taskContainer').text()).to.include('Instruction to check');
        //answer option are shown correctly
        expect(wrapper.text()).to.include('correct');
        expect(wrapper.text()).to.include('wrong');
        //because isSolutionVerifiable is false
        expect(wrapper.find('#compareSolutionButtonMC').attributes('style')).to.include('display: none;');
        // verify that the click is emitted
        const saveButton = wrapper.find('#saveMC');
        saveButton.trigger('click');
        expect(wrapper.emitted().save).to.have.length(1);
    });
});
