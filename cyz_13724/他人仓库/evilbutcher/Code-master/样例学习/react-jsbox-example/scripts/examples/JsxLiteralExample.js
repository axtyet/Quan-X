import { html as jsx } from 'htm/react'
import { useImmer } from 'use-immer'
import invert from 'invert-color'

const { width } = $device.info.screen

export default function JsxLiteralExample() {
  const [components, updateComponents] = useImmer(
    $color({ light: '#FFFFFF', dark: '#000000' }).components
  )

  const color = $rgb(components.red, components.green, components.blue)

  return jsx`<view
      frame=${styles.container}
      bgcolor=${color}
  >
  <label
      frame=${styles.text}
      align=${$align.center}
      radius=${2}
      text=${color.hexCode}
      textColor=${color}
      bgcolor=${$color(invert(color.hexCode))}
  />
  ${['red', 'green', 'blue'].map(
    (key, idx) => jsx`<slider
        key=${key}
        frame=${{
          ...styles.slider,
          y: width * 0.4 + 50 * idx,
        }}
    value=${components[key]}
    min=${0}
    max=${255}
    events=${{
      changed(sender) {
        updateComponents((draft) => {
          draft[key] = Math.round(sender.value)
        })
      },
    }} />`
  )}
</view>`
}

const styles = {
  container: $rect(0, 0, width, width),
  text: $rect(width * 0.5 - 50, 64, 100, 30),
  slider: $rect(20, width * 0.4, width - 40, 50),
}











































































// Adding a dummy sgmodule commit(29)
// Adding a dummy plugin commit(27)
// Adding a dummy stoverride commit(24)
