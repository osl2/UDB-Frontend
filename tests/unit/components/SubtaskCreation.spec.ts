import { expect } from 'chai';
import { createLocalVue, mount } from '@vue/test-utils';
import SubtaskCreation from '@/components/SubtaskCreation.vue';
import i18n from 'vue-i18n';
import BootstrapVue from 'bootstrap-vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import SqlTask from '@/dataModel/SqlTask';
import SqlSolution from '@/dataModel/SqlSolution';
import AllowedSqlStatements from '@/dataModel/AllowedSqlStatements';
import MultipleChoiceTask from '@/dataModel/MultipleChoiceTask';
import MultipleChoiceSolution from '@/dataModel/MultipleChoiceSolution';
import PlainTextTask from '@/dataModel/PlainTextTask';
import PlainTextSolution from '@/dataModel/PlainTextSolution';
import InstructionTask from '@/dataModel/InstructionTask';

const localVue = createLocalVue();

localVue.use(i18n);
localVue.use(BootstrapVue);
localVue.component('font-awesome-icon', FontAwesomeIcon);

describe('SubtaskCreation.vue', () => {
    it('can create sqltask', () => {
        const wrapper = mount(SubtaskCreation, {
            mocks: {
                $t: (msg: string) => msg,
            },
            localVue,
        });

        let addBtn = wrapper.find('button#create-sql');
        addBtn.trigger('click');
        expect(wrapper.emitted().createSubtask[0][0]).eql(
            new SqlTask(
                '',
                new SqlSolution('', [], [[]]),
                '',
                false,
                true,
                false,
                false,
                AllowedSqlStatements.NoRestriction
            )
        );
    });
    it('can create mctask', () => {
        const wrapper = mount(SubtaskCreation, {
            mocks: {
                $t: (msg: string) => msg,
            },
            localVue,
        });

        let addBtn = wrapper.find('button#create-mc');
        addBtn.trigger('click');
        expect(wrapper.emitted().createSubtask[0][0]).eql(
            new MultipleChoiceTask('', new MultipleChoiceSolution([]), '', false, false, [])
        );
    });
    it('can create texttask', () => {
        const wrapper = mount(SubtaskCreation, {
            mocks: {
                $t: (msg: string) => msg,
            },
            localVue,
        });

        let addBtn = wrapper.find('button#create-text');
        addBtn.trigger('click');
        expect(wrapper.emitted().createSubtask[0][0]).eql(
            new PlainTextTask('', new PlainTextSolution(''), '', false, false)
        );
    });
    it('can create instructiontask', () => {
        const wrapper = mount(SubtaskCreation, {
            mocks: {
                $t: (msg: string) => msg,
            },
            localVue,
        });

        let addBtn = wrapper.find('button#create-instruction');
        addBtn.trigger('click');
        expect(wrapper.emitted().createSubtask[0][0]).eql(new InstructionTask('', ''));
    });
});
