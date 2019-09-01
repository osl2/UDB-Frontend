import { expect } from 'chai';
import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import StartPagePanel from '@/components/StartPagePanel.vue';
import store from '@/store';
import sinon from 'sinon';

const localVue = createLocalVue();
localVue.use(Vuex);

describe('StartPagePanel.vue', () => {
    it('renders props when passed', () => {
        const title = 'title';

        const lsStub = sinon.stub(window.localStorage, 'getItem');
        lsStub.returns("{_id: '', _name: 'test', _password: '', _token: 'dummyToken', _userGroup: 0}");

        const wrapper = shallowMount(StartPagePanel, {
            localVue,
            store,
            propsData: { title },
        });
        lsStub.calledWith('userState');
        expect(wrapper.text()).to.include(title);
    });
});
