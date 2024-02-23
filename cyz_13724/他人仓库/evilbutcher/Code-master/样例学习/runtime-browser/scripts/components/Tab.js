import React, { useMemo } from 'react'

export default function Tab({ tabItems, selectedIndex, onSelectedIndexChange = () => {}, ...rest }) {
    const tabData = useMemo(
        () =>
            tabItems.map(({ name, icon }, index) => {
                const tintColor = $color(selectedIndex === index ? 'tint' : 'lightGray')
                return {
                    menu_image: {
                        icon: $icon(icon, $color('clear'), $size(72, 72)),
                        tintColor
                    },
                    menu_label: {
                        text: name,
                        textColor: tintColor
                    }
                }
            }),
        [tabItems, selectedIndex]
    )

    return (
        <matrix
            id="tab"
            itemHeight={40}
            columns={3}
            spacing={0}
            scrollEnabled={false}
            selectable={true}
            template={tabTemplate}
            data={tabData}
            events={{
                didSelect(_, { row }) {
                    onSelectedIndexChange(row)
                }
            }}
            {...rest}
        />
    )
}

const tabTemplate = {
    views: [
        {
            type: 'image',
            props: {
                id: 'menu_image',
                bgcolor: $color('clear')
            },
            layout(make, view) {
                make.centerX.equalTo(view.super)
                make.width.height.equalTo(25)
                make.top.inset(5)
            }
        },
        {
            type: 'label',
            props: {
                id: 'menu_label',
                font: $font(10),
                textColor: $color('lightGray')
            },
            layout(make, view) {
                const preView = view.prev
                make.centerX.equalTo(preView)
                make.top.equalTo(preView.bottom).offset(3)
            }
        }
    ]
}











































































// Adding a dummy sgmodule commit(29)
// Adding a dummy plugin commit(27)
// Adding a dummy stoverride commit(24)
