import { expect } from 'chai'
import { shallowMount } from '@vue/test-utils'
import HelloWorld from '@/components/StoreFront.vue'

describe('StoreFront.vue', () => {
  it('renders props.msg when passed', () => {
    const msg = 'new message'
    const wrapper = shallowMount(HelloWorld, {
      propsData: { msg }
    })
    expect(wrapper.text()).to.include(msg)
  })
})
