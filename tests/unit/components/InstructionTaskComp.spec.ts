import { expect } from 'chai';
import { createLocalVue, shallowMount } from '@vue/test-utils';
import InstructionTaskComp from '@/components/InstructionTaskComp.vue';
import InstructionTask from '@/dataModel/InstructionTask';

const localVue = createLocalVue();

describe('InstrctionTaskComp.vue', () => {
    it('displays the instruction', () => {
        const instructionTask = new InstructionTask('id', 'Instruction to check');
        const wrapper = shallowMount(InstructionTaskComp, {
            localVue,
            propsData: { currentSubtask: instructionTask },
            mocks: {
                $t: () => {},
            },
        });
        expect(wrapper.is(InstructionTaskComp)).to.equal(true);

        expect(wrapper.text()).to.include('Instruction to check');
    });
});
