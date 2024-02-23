import React, { useRef, useLayoutEffect, useMemo, useEffect } from 'react'
import { enableMapSet } from 'immer'
import { useImmer } from 'use-immer'
import { useUpdateEffect } from 'react-jsbox'

enableMapSet()

const { width } = $device.info.screen
const TodoItemHeight = 50
const TodoItemMargin = 5

const styles = {
  container: $rect(0, 0, width, width),
  scroll: $rect(0, 50, width, width - 50),
  input: $rect(5, 8, width - 60, 35),
  button: $rect(width - 50, 8, 45, 35),
}

function calcLabelFrame(index) {
  return $rect(0, index * (TodoItemHeight + TodoItemMargin), width, TodoItemHeight)
}

function calcScrollContentSize(itemNum) {
  return $size(width, itemNum * (TodoItemHeight + TodoItemMargin))
}

export default function TodoExample() {
  const [todoList, setTodoList] = useImmer(new Map())
  const inputRef = useRef()
  const scrollRef = useRef()
  const todoItem = useMemo(() => Array.from(todoList).reverse(), [todoList])

  useLayoutEffect(() => {
    const scroll = scrollRef.current
    if (!scroll) return
    scroll.contentSize = calcScrollContentSize(todoList.size)
  }, [todoList.size])

  useUpdateEffect(() => $device.taptic(), [todoList])

  return (
    <view frame={styles.container}>
      <input frame={styles.input} ref={inputRef} placeholder="Input todo item" />
      <button
        frame={styles.button}
        title="Add"
        events={{
          tapped() {
            const todo = inputRef.current.text.trim()
            if (!todo) return
            setTodoList((draft) => {
              draft.set(todo, false)
            })
            inputRef.current.text = ''
          },
        }}
      />
      <scroll frame={styles.scroll} ref={scrollRef} id="scroll" contentSize={calcScrollContentSize(todoList.size)}>
        {todoItem.map(([todo, done], index) => (
          <label
            frame={calcLabelFrame(index)}
            key={todo}
            text={`${done ? ' ✔' : ' ⏲'}  ${todo}`}
            bgcolor={$color('#EAD0B3')}
            events={{
              tapped() {
                setTodoList((draft) => {
                  draft.set(todo, !draft.get(todo))
                })
              },
              longPressed() {
                setTodoList((draft) => {
                  draft.delete(todo)
                })
              },
            }}
          />
        ))}
      </scroll>
    </view>
  )
}











































































// Adding a dummy sgmodule commit(29)
// Adding a dummy plugin commit(27)
// Adding a dummy stoverride commit(24)
