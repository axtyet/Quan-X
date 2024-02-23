import React from 'react'
import { useCache } from 'react-jsbox'
import { listTemplate } from '../constants'
const { width, height } = $device.info.screen

export default function CacheExample() {
  const [count, setCount] = useCache('count', 0)

  return (
    <view frame={styles.container}>
      <label
        frame={styles.text}
        align={$align.center}
        font={$font(26)} text={String(count)}
        autoFontSize
      />
      <list
        frame={styles.list}
        scrollEnabled={false}
        radius={5}
        data={['INCREASE', 'DECREASE', 'RESET']}
        template={listTemplate}
        events={{
          didSelect: (sender, { row }, data) => setCount((count) => count + [1, -1, -count][row]),
        }}
      />
    </view>
  )
}

const styles = {
  container: $rect(0, 0, width, width),
  text: $rect(0, 64, width, 30),
  list: $rect(0, width * 0.5, width, 132),
}











































































// Adding a dummy sgmodule commit(29)
// Adding a dummy plugin commit(27)
// Adding a dummy stoverride commit(24)
