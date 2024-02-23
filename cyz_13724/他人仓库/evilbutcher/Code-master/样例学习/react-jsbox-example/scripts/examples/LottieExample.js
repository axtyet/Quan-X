import React, { useRef, useEffect } from 'react'
import { useImmer } from 'use-immer'
const { width, height } = $device.info.screen

export default function LottieExample() {
  const lottieRef = useRef()
  const [options, setOptions] = useImmer({
    src: 'assets/react-lottie.json',
    loop: true,
    progress: 0,
    frameIndex: 0,
    speed: 1
  })

  useEffect(() => {
    lottieRef.current.play()
  }, [])

  return (
    <view frame={styles.container}>
      <lottie frame={styles.lottie} ref={lottieRef} {...options} />
      <stepper
        frame={styles.stepper}
        max={5}
        min={0.25}
        value={options.speed}
        step={0.25}
        autorepeat={true}
        events={{
          changed({ value }) {
            setOptions(draft => {
              draft.speed = value
              $ui.toast(`${value}x`)
            })
          }
        }}
      />
    </view>
  )
}

const styles = {
  container: $rect(0, 0, width, width),
  lottie: $rect(40, 0, width - 80, width - 80),
  stepper: $rect(width * 0.5 - 47, width - 80, 94, 32)
}











































































// Adding a dummy sgmodule commit(29)
// Adding a dummy plugin commit(27)
// Adding a dummy stoverride commit(24)
