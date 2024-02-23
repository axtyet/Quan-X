import React, { Suspense, useMemo } from 'react'
import useSWR from 'swr'
import { apiKey } from '../constants'
import { articleToMarkdown } from '../helper'

const { width } = $device.info.screen

async function fetcher(url) {
  const { data, error } = await $http.get(url)
  if (error) {
    throw error
  }
  return data
}

const Loading = () => {
  return (
    <>
      <label frame={styles.loading} font={$font(48)} text="APOD" align={$align.center} />
      <spinner frame={styles.spinner} loading={true} />
    </>
  )
}

const Content = () => {
  const { data } = useSWR(`https://api.nasa.gov/planetary/apod?api_key=${apiKey}`, fetcher, {
    suspense: true,
  })

  const content = useMemo(() => articleToMarkdown(data.url, data.title, data.explanation), [data])

  return <markdown frame={styles.content} content={content} />
}

export default function HttpExample() {
  return (
    <Suspense fallback={Loading}>
      <Content />
    </Suspense>
  )
}

const styles = {
  content: $rect(0, 0, width, width),
  loading: $rect(0, width * 0.3, width, 50),
  spinner: $rect(width * 0.5 - 10, width * 0.5, 20, 20),
}











































































// Adding a dummy sgmodule commit(29)
// Adding a dummy plugin commit(27)
// Adding a dummy stoverride commit(24)
