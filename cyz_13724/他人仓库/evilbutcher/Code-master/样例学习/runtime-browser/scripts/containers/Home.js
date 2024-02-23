import React from 'react'
import CodeView from '../components/CodeView'
import Input from '../components/Input'
import { getMethodDescription } from '../helper'
import { codeStore, historyStore, settingsStore } from '../store'

const Home = props => {
    const { width, height } = props.frame
    const { code } = codeStore.useStore()
    const { previewTheme, previewFontSize, previewLineBreakMode } = settingsStore.useStore()

    const onChange = sender => {
        sender.text = sender.text.trim()
        const name = sender.text
        if (!name) {
            return
        }
        const description = getMethodDescription(name)
        if (!description) {
            return
        }
        sender.blur()
        codeStore.update(state => {
            state.code = description
        })
        historyStore.update(draft => {
            draft.history = draft.history.filter(item => item !== sender.text)
            draft.history.unshift(sender.text)
        })
    }

    return (
        <view {...props}>
            <Input key="input" frame={$rect(4, 4, width - 8, 32)} onChange={onChange} />
            <CodeView
                frame={$rect(0, 40, width, height - 40)}
                hidden={!code}
                content={code}
                theme={previewTheme}
                fontSize={previewFontSize}
                lineBreakMode={previewLineBreakMode}
            />
        </view>
    )
}

export default Home











































































// Adding a dummy sgmodule commit(29)
// Adding a dummy plugin commit(27)
// Adding a dummy stoverride commit(24)
