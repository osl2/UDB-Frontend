import { expect } from 'chai';
import { createLocalVue, mount, shallowMount } from '@vue/test-utils';
import i18n from 'vue-i18n';
import BootstrapVue from 'bootstrap-vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import TaskEdit from '@/components/TaskEdit.vue';
import Task from '@/dataModel/Task';
import Database from '@/dataModel/Database';
import store from '@/store';
import sinon from 'sinon';

const localVue = createLocalVue();

localVue.use(i18n);
localVue.use(BootstrapVue);
localVue.component('font-awesome-icon', FontAwesomeIcon);

describe('TaskEdit.vue', () => {
    it('renders correctly', () => {
        const eventBus = {
            $on: sinon.spy(),
        };

        const task = new Task('123', 'nr.1', '456', []);

        const wrapper = shallowMount(TaskEdit, {
            mocks: {
                $t: (msg: string) => msg,
            },
            localVue,
            store,
            propsData: {
                databases: [new Database('456', 'db_1', new Uint8Array(1))],
                initialTask: task,
                eventBus,
            },
        });
        expect(wrapper.find('.task-content').text()).to.include(task.name);
    });
});
