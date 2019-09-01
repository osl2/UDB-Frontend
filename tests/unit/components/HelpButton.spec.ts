import { expect, assert } from 'chai';
import { createLocalVue, mount, shallowMount } from '@vue/test-utils';
import HelpButton from '@/components/HelpButton.vue';
import BootstrapVue, { BPopover } from 'bootstrap-vue';

const localVue = createLocalVue();
localVue.use(BootstrapVue);

describe('HelpButton.vue', () => {
    it('renders props helpMsg when pass', () => {
        const helpMsg = 'msg';
        const wrapper = shallowMount(HelpButton, {
            localVue,
            propsData: { helpMsg: helpMsg },
        });
        expect(wrapper.is(HelpButton)).to.equal(true);

        const button = wrapper.find('#popoverHelpMsg');
        expect(button.exists()).to.equal(true);
        expect(button.attributes('id')).to.equal('popoverHelpMsg');
        const tipHolder = wrapper.find(BPopover);
        expect(tipHolder.exists()).to.equal(true);
        /**
         *  The main purpose of the test is to see that another div is created with helpMsg,
         *  but this does not work for the moment. Could be related to
         *  https://gitlab.com/gitlab-org/gitlab-ce/issues/53730
         *  For now we comment the following test, but should pick up later.
         *  We are testing this behaivour with e2e nightwatch test
         *
         */

        /**
        button.trigger('focus');
        localVue.nextTick(() => {
            const divPopover = wrapper.find('div .popover');
            expect(divPopover).to.be.an('object');
            expect(divPopover.text()).to.eqls(helpMsg);
        });
         **/
    });
});
