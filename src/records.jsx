import { state } from 'callbag-state'
import { List } from 'callbag-jsx'

const records = state([])
const add = () => records.set(records.get().concat(new Date()))
const clear = () => records.set([])

function Record({ record }, renderer) {
  const remove = () =>
    records.set(records.get().filter(r => r !== record.get()))

  return (
    <div>
      {record} <button onclick={remove}>X</button>
    </div>
  )
}

export function Records({}, renderer) {
  return (
    <>
      <button class="btn btn-primary" onclick={add}>
        Add Record
      </button>
      <button class="btn btn-warning" onclick={clear}>
        Clear Records
      </button>
      <List of={records} each={record => <Record record={record} />} />
    </>
  )
}
