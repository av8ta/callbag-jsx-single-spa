import marked from 'marked'
import { state } from 'callbag-state'
import { expr } from 'callbag-common'

const input = state('')
const markdown = expr($ => marked($(input)))

export const Markdown = ({}, renderer) => (
  <div class="flex flex-row space-x-4">
    <textarea
      _state={input}
      placeholder="type some markdown"
      cols="30"
      rows="10"
    />
    <div _content={markdown} />
  </div>
)
