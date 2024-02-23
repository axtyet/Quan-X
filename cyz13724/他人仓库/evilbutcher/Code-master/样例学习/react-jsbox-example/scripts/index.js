import React from 'react'
import ReactJSBox from 'react-jsbox'
import ExampleView from './components/ExampleView'
import CodeView from './components/CodeView'
import ExampleComps from './examples'

const { width, height } = $device.info.screen

const createContainers = (containerNames) =>
  containerNames.map((name) => ({
    title: name,
    rows: [
      {
        type: 'view',
        props: {
          id: name,
        },
        layout: $layout.fill,
      },
    ],
  }))

$app.keyboardToolbarEnabled = true
$ui.render({
  props: {
    title: 'ReactJSBox Example',
    debugging: true,
  },
  views: [
    {
      type: 'list',
      props: {
        rowHeight: width,
        data: createContainers(Object.keys(ExampleComps)),
      },
      layout(make, view) {
        make.edges.equalTo(view.super.safeArea)
      },
    },
  ],
})

// Create React elements and render them:
for (const [CompName, Comp] of Object.entries(ExampleComps)) {
  ReactJSBox.render(
    <ExampleView demo={<Comp />} code={<CodeView content={$file.read(`scripts/examples/${CompName}.js`).string} />} />,
    $(CompName)
  )
}











































































// Adding a dummy sgmodule commit(29)
// Adding a dummy plugin commit(27)
// Adding a dummy stoverride commit(24)
