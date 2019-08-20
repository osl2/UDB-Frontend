import {expect} from 'chai';
import {shallowMount, createLocalVue} from '@vue/test-utils';
import Vuex from 'vuex';
import StartPagePanel from '@/components/StartPagePanel.vue';
import store from '@/store/index.ts';
import sinon from "sinon";

const localVue = createLocalVue();
localVue.use(Vuex);

describe('StartPagePanel.vue', () => {


    it('renders props when passed', () => {
        const title = 'title';

        // clean commented code later - but first ensure the not working cases
        // mocking does not work
        // sinon.mock(Storage.prototype).expects('getItem').withArgs('userState')
        //     .returns({_id: '', _name: 'test', _passowrd: '', _token: "dummyToken", _userGroup: UserGroup.Teacher});
        const lsStub = sinon.stub(window.localStorage, 'getItem');
        lsStub.returns("{_id: '', _name: 'test', _password: '', _token: 'dummyToken', _userGroup: 0}");
        // const sinonSpy = sinon.spyCall(localStorage, 'getItem')
        // .returnValue ={_id: '', _name: 'test', _passowrd: '', _token: "dummyToken", _userGroup: UserGroup.Teacher};
        // sinon.spyCall(localStorage,'getItem').calledWith('userState')
        // localStorageMock.expects('getItem').withArgs('userState')
        //     .returns({_id: '', _name: 'test', _passowrd: '', _token: "dummyToken", _userGroup: UserGroup.Teacher});
        const wrapper = shallowMount(StartPagePanel, {
            localVue,
            store,
            propsData: {title},

        });
        lsStub.calledWith('userState');
        expect(wrapper.text()).to.include(title);
    });
});
