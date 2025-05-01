import { createApp, h } from "chibivue";

const app = createApp({
    render() {
        return h('div', {}, [
            h('p', { style: 'color: blue; font-weight: bold;' }, ['Hello world.']),
            h('button', {
                onClick() {
                    alert('clicked!')
                }
            },
                ['click me!']),
        ])
    }
})

app.mount('#app')