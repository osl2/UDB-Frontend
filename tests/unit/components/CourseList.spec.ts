import { createLocalVue, mount } from '@vue/test-utils';
import CourseList from '@/components/CourseList.vue';
import BootstrapVue from 'bootstrap-vue';
import Vuex from 'vuex';
import Course from '@/dataModel/Course';
import i18n from 'vue-i18n';
import { expect } from 'chai';

const localVue = createLocalVue();
localVue.use(Vuex);
localVue.use(i18n);
localVue.use(BootstrapVue);

describe('CourseList.vue', () => {
    it('should show course if there is one', () => {
        const courseName = 'TITLE';
        const course = new Course('1', courseName, 'DESCRIPTION', 'ALIAS', []);
        const wrapper = mount(CourseList, {
            localVue,
            propsData: {
                courses: [course] as Course[],
            },
            mocks: {
                $t: () => {},
            },
        });
        expect(wrapper.find('h4.card-title').text()).to.include(courseName);
    });

    it('emits removeCourse when selected', () => {
        const course = new Course('1123', 'COURSENAME', 'DESCRIPTION', 'ALIAS', []);
        const wrapper = mount(CourseList, {
            localVue,
            propsData: {
                courses: [course] as Course[],
            },
            mocks: {
                $t: () => {},
            },
        });
        const removeButton = wrapper.find('button');
        removeButton.trigger('click');
        //Event was in fact fired
        expect(wrapper.emitted().removeCourse).to.have.length(1);
        // Event fired and returned payload
        expect(wrapper.emitted().removeCourse[0][0]).to.eql(course);
    });

    it('emits loadCourse when selected', () => {
        const course = new Course('1123', 'COURSENAME', 'DESCRIPTION', 'ALIAS', []);
        const wrapper = mount(CourseList, {
            localVue,
            propsData: {
                courses: [course] as Course[],
            },
            mocks: {
                $t: () => {},
            },
        });
        const loadButton = wrapper.find('button.bg-info');
        loadButton.trigger('click');
        //Event was in fact fired
        expect(wrapper.emitted().loadCourse).to.have.length(1);
        // Event fired and returned payload
        expect(wrapper.emitted().loadCourse[0][0]).to.eql(course);
    });

    it('emits addCourse when selected', () => {
        const wrapper = mount(CourseList, {
            localVue,
            mocks: {
                $t: () => {},
            },
        });

        //Fill form with name and description
        const nameInput = wrapper.find('input[type="text"]');
        nameInput.setValue('NEWNAME');
        const descInput = wrapper.find('input[type="text"]:nth-of-type(2)');
        descInput.setValue('NEWDESCRIPTION');
        const button = wrapper.findAll('button.bg-info');
        button.trigger('click');

        //Event was in fact fired
        expect(wrapper.emitted().addCourse).to.have.length(1);
        // Event fired and returned payload
        expect(wrapper.emitted().addCourse[0][0]).to.eql('NEWNAME');
        expect(wrapper.emitted().addCourse[0][1]).to.eql('NEWDESCRIPTION');
    });
});
