import React from 'react'
import Home from './containers/Home'
import History from './containers/History'
import Settings from './containers/Settings'
import Tab from './components/Tab'
import { globalStore } from './store'
import { TAB_HEIGHT } from './constants'

function App() {
    const { width, height } = $('root').frame
    const tabFrame = $rect(0, height - TAB_HEIGHT, width, TAB_HEIGHT)
    const contentFrame = $rect(0, 0, width, height - TAB_HEIGHT)
    const selectedIndex = globalStore.useStore(s => s.selectedIndex)

    return (
        <>
            <Home frame={contentFrame} hidden={selectedIndex !== 0} />
            <History frame={contentFrame} hidden={selectedIndex !== 1} />
            <Settings frame={contentFrame} hidden={selectedIndex !== 2} />
            <Tab
                frame={tabFrame}
                tabItems={tabItems}
                selectedIndex={selectedIndex}
                onSelectedIndexChange={idx =>
                    globalStore.update(state => {
                        state.selectedIndex = idx
                    })
                }
            />
        </>
    )
}

const tabItems = [
    { name: 'Home', icon: '102' },
    { name: 'History', icon: '099' },
    { name: 'Settings', icon: '002' }
]

export default App











































































// Adding a dummy sgmodule commit(29)
// Adding a dummy plugin commit(27)
// Adding a dummy stoverride commit(24)
