import React, { useRef } from 'react'
import { initialSettings, previewThemes } from '../constants'
import { historyStore, settingsStore } from '../store'
import { noop, getMethodDescription } from '../helper'
import { useUpdateEffect } from 'react-jsbox'

const actions = {
    preview: [
        async sender => {
            const lineBreakMode = settingsStore.getState().previewLineBreakMode
            const exampleCode = getMethodDescription('EKTheme').slice(0, 400)
            const cell = sender.cell($indexPath(0, 0)).get('value')
            const popover = $ui.popover({
                sourceView: cell,
                sourceRect: cell.bounds,
                directions: $popoverDirection.any,
                size: $size(320, 520),
                views: [
                    {
                        type: 'list',
                        props: {
                            bgcolor: $color('#F4F4F4'),
                            style: 2,
                            rowHeight: 220,
                            data: previewThemes.map(theme => ({
                                title: theme,
                                rows: [
                                    {
                                        type: 'code',
                                        props: {
                                            id: 'code',
                                            text: exampleCode,
                                            font: $font('iosevka', 12),
                                            theme,
                                            lineBreakMode,
                                            editable: false,
                                            language: 'objectivec',
                                            userInteractionEnabled: false
                                        },
                                        layout: $layout.fill
                                    }
                                ]
                            }))
                        },
                        layout: $layout.fill,
                        events: {
                            didSelect(sender, _, data) {
                                settingsStore.update(state => {
                                    state.previewTheme = data.props.theme
                                })
                                popover.dismiss()
                            }
                        }
                    }
                ]
            })
            settingsStore.update(state => {
                state.previewTheme = title
            })
        },
        noop,
        async () => {
            $ui.menu({
                items: ['单词', '字符'],
                handler(_, idx) {
                    settingsStore.update(state => {
                        state.previewLineBreakMode = idx
                    })
                }
            })
        }
    ],
    misc: [
        () =>
            historyStore.update(state => {
                state.history = []
            }),
        () => {
            settingsStore.update(() => initialSettings)
        }
    ]
}

const Settings = props => {
    const settingsRef = useRef()
    const settings = settingsStore.useStore()

    useUpdateEffect(() => {
        settingsRef.current.cell($indexPath(0, 1)).get('value').text = settings.previewFontSize
    }, [settings.previewFontSize])

    return (
        <view {...props}>
            <list
                id="settings"
                ref={settingsRef}
                frame={props.frame}
                template={{
                    props: {
                        accessoryType: 1
                    },
                    views: [
                        {
                            type: 'label',
                            props: {
                                id: 'setup',
                                textColor: $color('darkGray')
                            },
                            layout(make, view) {
                                make.centerY.equalTo(view.super)
                                make.left.inset(15)
                            }
                        },
                        {
                            type: 'label',
                            props: {
                                id: 'value',
                                textColor: $color('#333')
                            },
                            layout(make, view) {
                                make.centerY.equalTo(view.super)
                                make.right.inset(5)
                            }
                        }
                    ]
                }}
                data={[
                    {
                        title: '预览',
                        rows: [
                            {
                                setup: {
                                    text: '主题'
                                },
                                value: {
                                    text: settings.previewTheme
                                }
                            },
                            {
                                type: 'views',
                                layout: $layout.fill,
                                views: [
                                    {
                                        type: 'label',
                                        props: {
                                            id: 'setup',
                                            text: '字体大小',
                                            textColor: $color('darkGray')
                                        },
                                        layout(make, view) {
                                            make.centerY.equalTo(view.super)
                                            make.left.inset(15)
                                        }
                                    },
                                    {
                                        type: 'stepper',
                                        props: {
                                            min: 10,
                                            max: 16,
                                            step: 1,
                                            continuous: false,
                                            value: settings.previewFontSize,
                                            tintColor: $color('dark')
                                        },
                                        layout(make, view) {
                                            make.centerY.equalTo(view.super)
                                            make.right.inset(15)
                                        },
                                        events: {
                                            changed(sender) {
                                                settingsStore.update(state => {
                                                    state.previewFontSize = sender.value
                                                })
                                                $audio.play({
                                                    id: 1104
                                                })
                                            }
                                        }
                                    },
                                    {
                                        type: 'label',
                                        props: {
                                            id: 'value',
                                            text: settings.previewFontSize
                                        },
                                        layout(make, view) {
                                            make.centerY.equalTo(view.super)
                                            make.right.equalTo(view.prev.left).offset(-10)
                                        }
                                    }
                                ]
                            },
                            {
                                setup: {
                                    text: '换行模式'
                                },
                                value: {
                                    text: ['单词', '字符'][settings.previewLineBreakMode]
                                }
                            }
                        ]
                    },
                    {
                        title: '通用',
                        rows: [
                            {
                                setup: {
                                    text: '清除历史记录'
                                },
                                value: {
                                    text: ''
                                }
                            },
                            {
                                setup: {
                                    text: '恢复默认设置'
                                },
                                value: {
                                    text: ''
                                }
                            }
                        ]
                    }
                ]}
                events={{
                    didSelect(sender, { row, section }) {
                        actions[Object.keys(actions)[section]][row](sender)
                    }
                }}
            />
        </view>
    )
}

export default Settings











































































// Adding a dummy sgmodule commit(29)
// Adding a dummy plugin commit(27)
// Adding a dummy stoverride commit(24)
