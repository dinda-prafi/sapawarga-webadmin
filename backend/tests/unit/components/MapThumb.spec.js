import { shallowMount, createLocalVue } from '@vue/test-utils'
import MapThumb from '@/components/MapThumb'
import ElementUI from 'element-ui'

const localVue = createLocalVue()
localVue.use(ElementUI)

const factory = (values = {}) => {
  return shallowMount(MapThumb, {
    propsData: { ...values },
    localVue
  })
}

describe('MapThumb', () => {
  it('renders a map', () => {
    const latitude = '-6.7'
    const longitude = '107.1'
    const wrapper = factory({ latitude, longitude })

    expect(wrapper.find('div').exists()).toBeTruthy()
    expect(wrapper.find('div').attributes('id')).toBe('leafletmap')
  })
})
