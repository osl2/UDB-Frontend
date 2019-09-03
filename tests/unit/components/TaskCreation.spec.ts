import { expect } from 'chai';
import { createLocalVue, mount, shallowMount } from '@vue/test-utils';
import sinon from 'sinon';
import i18n from 'vue-i18n';
import BootstrapVue from 'bootstrap-vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import TaskCreation from '@/components/TaskCreation.vue';
import Database from '@/dataModel/Database';
import Task from '@/dataModel/Task';

const localVue = createLocalVue();

localVue.use(i18n);
localVue.use(BootstrapVue);
localVue.component('font-awesome-icon', FontAwesomeIcon);

describe('TaskCreation.vue', () => {
    it('can create task', () => {
        const taskname = 'taskname';
        const dbId = '1';

        const wrapper = mount(TaskCreation, {
            mocks: {
                $t: (msg: string) => msg,
            },
            localVue,
            propsData: {
                databases: [
                    new Database(dbId, 'db_1', new Uint8Array(1)),
                    new Database('2', 'db_2', new Uint8Array(1)),
                ],
            },
        });
        let name = wrapper.find('input[type="text"]');
        let dropdownItems = wrapper.findAll('.dropdown-item');
        let addBtn = wrapper.find('button#create-task');
        name.setValue(taskname);
        dropdownItems.at(0).trigger('click');
        addBtn.trigger('click');
        expect(wrapper.emitted().createTask[0][0]).eql(new Task('', taskname, dbId, []));
    });
});
