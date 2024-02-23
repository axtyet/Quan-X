import React, { useState } from 'react'
import { UIViewAnimationOptionCurveEaseInOut, UIViewAnimationOptionAllowUserInteraction } from '../constants'
const { width } = $device.info.screen

const theme = {
  light: {
    backgroundColor: '#F4F4F4',
    moonShadowOffset: 0
  },
  dark: {
    backgroundColor: '#222222',
    moonShadowOffset: 100
  }
}

export default function CacheExample() {
  const [mode, setMode] = useState('light')
  const viewProps = theme[mode]

  return (
    <view frame={styles.container}
      bgcolor={$color(viewProps.backgroundColor)}
      animate={{
        duration: 0.4,
        delay: 0.2,
        options: UIViewAnimationOptionCurveEaseInOut | UIViewAnimationOptionAllowUserInteraction,
        completion() {
          $device.taptic()
        }
      }}
    >
      <view
        id="sun"
        frame={styles.sun}
        radius={80}
        bgcolor={$color('#FF7')}
        borderWidth={8}
        borderColor={$color('#777')}
        events={{
          tapped() {
            setMode(x => x === 'light' ? 'dark' : 'light')
          }
        }}
      >
        <view
          id="moon-shadow"
          radius={80}
          frame={{ x: 160 - viewProps.moonShadowOffset, y: 0, width: 160, height: 160 }}
          bgcolor={$color('#000')}
          animate={{
            duration: 0.4,
            options: UIViewAnimationOptionAllowUserInteraction
          }}
        />
      </view>
    </view>
  )
}

const styles = {
  container: $rect(0, 0, width, width),
  sun: $rect(width * 0.5 - 80, width * 0.5 - 80, 160, 160)
}











































































// Adding a dummy sgmodule commit(29)
// Adding a dummy plugin commit(27)
// Adding a dummy stoverride commit(24)
