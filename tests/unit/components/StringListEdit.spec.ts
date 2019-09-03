import { expect } from 'chai';
import { shallowMount, createLocalVue, mount } from '@vue/test-utils';
import StringListEdit from '@/components/StringListEdit.vue';
import i18n from 'vue-i18n';
import BootstrapVue from 'bootstrap-vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

const localVue = createLocalVue();

localVue.use(i18n);
localVue.use(BootstrapVue);
localVue.component('font-awesome-icon', FontAwesomeIcon);

describe('StringListEdit.vue', () => {
    it('renders correctly', () => {
        let items = ['a', 'b', 'c', 'd'];
        const description = 'Item';

        const wrapper = shallowMount(StringListEdit, {
            mocks: {
                $t: (msg: string) => msg,
            },
            localVue,
            propsData: {
                value: items,
                itemDescription: description,
            },
        });
        expect(wrapper.findAll('.list-edit-item')).to.have.length(items.length);
    });

    it('can add items', () => {
        let items = ['a', 'b', 'c', 'd'];
        const description = 'Item';

        const wrapper = mount(StringListEdit, {
            mocks: {
                $t: (msg: string) => msg,
            },
            localVue,
            propsData: {
                value: items,
                itemDescription: description,
            },
        });
        let input = wrapper.find('input[type="text"]');
        input.setValue('e');
        let addBtn = wrapper.find('button');
        addBtn.trigger('click');
        expect(items).eql(['a', 'b', 'c', 'd', 'e']);
    });

    it('can remove an item ', () => {
        let items = ['a', 'b', 'c', 'd'];
        const description = 'Item';

        const wrapper = mount(StringListEdit, {
            mocks: {
                $t: (msg: string) => msg,
            },
            localVue,
            propsData: {
                value: items,
                itemDescription: description,
            },
        });
        let input = wrapper.find('input[type="text"]');
        input.setValue('e');
        let addBtn = wrapper.find('button#remove-item-2');
        addBtn.trigger('click');
        expect(items).eql(['a', 'b', 'd']);
    });
});
