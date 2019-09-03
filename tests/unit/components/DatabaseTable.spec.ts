import { expect } from 'chai';
import { createLocalVue, mount, shallowMount, Wrapper } from '@vue/test-utils';
import i18n from 'vue-i18n';
import BootstrapVue from 'bootstrap-vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import DatabaseTable from '@/components/DatabaseTable.vue';

const localVue = createLocalVue();

localVue.use(i18n);
localVue.use(BootstrapVue);
localVue.component('font-awesome-icon', FontAwesomeIcon);

describe('DatabaseTable.vue', () => {
    it('shows values', () => {
        const tableName = 'tableName';
        const columns = ['column1', 'column2', 'column3', 'column4', 'column5'];
        const wrapper = mount(DatabaseTable, {
            mocks: {
                $t: (msg: string) => msg,
            },
            localVue,
            propsData: {
                tableName,
                columns,
            },
        });
        let cols = wrapper.findAll('li.tableFontSize');
        for (let i = 0; i < cols.length; i++) {
            expect(cols.at(i).text()).to.include(columns[i]);
        }
        expect(wrapper.find('b.tableFontSize').text()).to.include(tableName);
    });
});
