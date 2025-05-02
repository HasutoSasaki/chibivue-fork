import { track, trigger } from './effect'
import { reactive } from './reactive'

export const mutableHandlers: ProxyHandler<object> = {
    get(target: object, key: string | symbol, receiver: object) {
        track(target, key)

        const res = Reflect.get(target, key, receiver)
        // objectの場合はreactiveにしてあげる (これにより、ネストしたオブジェクトもリアクティブにすることができます。)
        if (res !== null && typeof res === 'object') {
            return reactive(res)
        }
        return res
    },

    set(target: object, key: string | symbol, value: any, receiver: object) {
        let oldValue = (target as any)[key]
        Reflect.set(target, key, value, receiver)
        // 値が変わったかどうかをチェックしてあげておく
        if (hasChanged(value, oldValue)) {
            trigger(target, key)
        }
        return true
    }
}

const hasChanged = (value: any, oldValue: any) => !Object.is(value, oldValue)