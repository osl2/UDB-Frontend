import { expect } from 'chai';
import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import store from '@/store';
import DatabaseComponent from '@/components/DatabaseComponent.vue';

const localVue = createLocalVue();
localVue.use(Vuex);

describe('DatabaseComponent.vue', () => {
    it('renders correctly', () => {
        const elementId = 'test-id';
        const showExportImport = true;
        const loadSandboxLocalStorageDb = true;

        const wrapper = shallowMount(DatabaseComponent, {
            mocks: {
                $t: (msg: string) => msg,
            },
            localVue,
            store,
            propsData: {
                elementId,
                showExportImport,
                loadSandboxLocalStorageDb,
            },
        });
        expect(wrapper.contains('#' + elementId)).eq(true);
        expect(wrapper.contains('#export-import')).eq(showExportImport);
    });

    it('should ', () => {});
});
