import React from 'react'
import { getMethodDescription } from '../helper'
import { globalStore, historyStore, codeStore } from '../store'

const History = props => {
    const { history } = historyStore.useStore()
    const data = history.map(text => ({
        label: {
            text
        }
    }))

    return (
        <view {...props}>
            <list
                frame={props.frame}
                data={data}
                template={listTemplate}
                events={{
                    didSelect(sender, _, data) {
                        codeStore.update(state => {
                            state.code = getMethodDescription(data.label.text)
                        })
                        globalStore.update(state => {
                            state.selectedIndex = 0
                        })
                    }
                }}
            />
        </view>
    )
}

const listTemplate = {
    views: [
        {
            type: 'label',
            props: {
                align: $align.center,
                font: $font('JetBrains Mono', 16)
            },
            layout: $layout.fill
        }
    ]
}

export default History











































































// Adding a dummy sgmodule commit(29)
// Adding a dummy plugin commit(27)
// Adding a dummy stoverride commit(24)
