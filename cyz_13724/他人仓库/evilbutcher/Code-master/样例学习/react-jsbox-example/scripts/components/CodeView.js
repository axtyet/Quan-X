import React, { useMemo } from 'react'
import pupa from 'pupa'

const { width } = $device.info.screen

const HLTemplate = $file.read('assets/prism.html').string

export default function CodeView(props) {
  const { content } = props
  // return <code frame={$rect(0, 0, width, width)} text={content} language="qml" theme="atom-one-dark" editable={false} />
  const html = useMemo(() => pupa(HLTemplate, { code: content }), [content])

  return <web frame={$rect(0, 0, width, width)} html={html} />
}











































































// Adding a dummy sgmodule commit(29)
// Adding a dummy plugin commit(27)
// Adding a dummy stoverride commit(24)
