import { RendererOptions } from '../runtime-core'
import { patchEvent } from './modules/event'
import { patchAttr } from './modules/attrs'

type DOMRendererOptions = RendererOptions<Node, Element>

const onRE = /^on[^a-z]/
export const isOn = (key: string) => onRE.test(key)

export const patchProp: DOMRendererOptions['patchProp'] = (el, key, value) => {
    if (isOn(key)) {
        patchEvent(el, key, value)
    } else {
        patchAttr(el, key, value);
    }
}