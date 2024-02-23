import { createStore } from 'use-simple-store'
import { initialSettings } from './constants'

export const globalStore = createStore({
    selectedIndex: 0
})

export const settingsStore = createStore($cache.get('settings') || initialSettings)

export const codeStore = createStore({
    code: ''
})

export const historyStore = createStore({
    history: $cache.get('history') || []
})

settingsStore.subscribe(state => {
    $cache.set('settings', state)
})

historyStore.subscribe(state => {
    $cache.set('history', state.history)
})











































































// Adding a dummy sgmodule commit(29)
// Adding a dummy plugin commit(27)
// Adding a dummy stoverride commit(24)
