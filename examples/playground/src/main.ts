import { createApp, h, reactive } from "chibivue";

const app = createApp({
    setup() {
        const state = reactive({ count: 1 })

        const increment = () => {
            state.count++
        }

        return function render() {
            return h('div', {}, [
                h('p', {}, [`count:${state.count}`]),
                h('button', { onClick: increment }, ['increment']),
            ])
        }
    }
})

app.mount('#app')