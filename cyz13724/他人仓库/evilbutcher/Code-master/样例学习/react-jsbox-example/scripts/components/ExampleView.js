import React, { memo, useState } from 'react'
import { codeIcon } from '../constants'
const { width } = $device.info.screen

const ExampleView = ({ demo, code }) => {
  const [showCode, setShowCode] = useState(false)

  return (
    <>
      {showCode ? code : demo}
      <button
        frame={$rect(width - 50, width - 40, 40, 35)}
        image={codeIcon}
        bgcolor={$color('clear')}
        events={{
          tapped() {
            setShowCode((x) => !x)
            $device.taptic()
          },
        }}
      />
    </>
  )
}

export default memo(ExampleView)











































































// Adding a dummy sgmodule commit(29)
// Adding a dummy plugin commit(27)
// Adding a dummy stoverride commit(24)
