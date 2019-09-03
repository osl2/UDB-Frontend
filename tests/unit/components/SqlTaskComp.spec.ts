import { expect } from 'chai';
import { createLocalVue, mount } from '@vue/test-utils';
import BootstrapVue from 'bootstrap-vue';
import SqlTask from '@/dataModel/SqlTask';
import SqlSolution from '@/dataModel/SqlSolution';
import AllowedSqlStatements from '@/dataModel/AllowedSqlStatements';
import QueryResult from '@/dataModel/QueryResult';
import SqlTaskComp from '@/components/SqlTaskComp.vue';
import store from '@/store';
import { i18n } from '@/main';
import Vuex from 'vuex';
import VueI18n from 'vue-i18n';

const localVue = createLocalVue();
localVue.use(BootstrapVue);
localVue.use(Vuex);
localVue.use(VueI18n);
localVue.use(BootstrapVue);

describe('SqlTaskComp.vue', () => {
    it('displays all the data and check save button', () => {
        const sqlTask = new SqlTask(
            'id',
            new SqlSolution('Select * from sometable', [], [[]]),
            'Instruction to check',
            false,
            false,
            false,
            false,
            AllowedSqlStatements.SelectStatements
        );

        const sqlSolutions = new Map<string, SqlSolution>();
        sqlSolutions.set('id', new SqlSolution('Select * from sometable', [], [[]]));
        const queryResult: QueryResult = {
            query: 'Select * from sometable',
            result: {
                status: 0,
                message: 'ok',
                columns: [],
                values: [[]],
            },
        };
        const wrapper = mount(SqlTaskComp, {
            localVue,
            store,
            propsData: {
                currentSubtask: sqlTask,
                solutions: sqlSolutions,
                queryResult: queryResult,
                gotFirstQueryExecuted: true,
                lastQueryExecuted: 'Select * from sometable',
            },
            i18n,
            mocks: {
                $t: () => {},
            },
        });
        expect(wrapper.is(SqlTaskComp)).to.equal(true);

        //Instruction is shown correctly
        expect(wrapper.find('div.taskContainer').text()).to.include('Instruction to check');
        //last executed query shown correctly
        expect(wrapper.text()).to.include('Select * from sometable');
        //because queryExecuted is false
        expect(wrapper.find('#compareSolutionButtonSQL').exists()).to.equal(false);
        // because isPointAndClickAllowed is false
        expect(wrapper.find('div.taskSwitchButton').exists()).to.equal(false);
        // verify that the click is emitted
        const saveButton = wrapper.find('#saveExecutedQueryButtonSQL');
        saveButton.trigger('click');
        expect(wrapper.emitted().save).to.have.length(1);
        //verify that only toolbox for select is allowed
        expect(wrapper.vm.allowedSqlToolbox).to.equal('toolbox_query.xml');
    });
});
