import { ReactElement, useMemo, useEffect, useState } from 'react'
import KeyFull from './KeyFull'
import KeySemi from './KeySemi'
import { MusicKeyProps } from '@/Types'

type KeyProps = MusicKeyProps & {
  type?: 'fullTone' | 'semiTone'
  position?: 'left' | 'center' | 'right' // only required for semi-tone keys
}

// Display a keyboard key
export default function Key(props: KeyProps): ReactElement {
  if (props.type === 'fullTone') {
    return (
      <KeyFull
        highlight={props.highlight}
        tone={props.tone}
        onClick={props.onClick}
        onMouseDown={props.onMouseDown}
        onMouseUp={props.onMouseUp}
        className={props.className}
        style={props.style}
      >
        {props.children}
      </KeyFull>
    )
  }

  return (
    <KeySemi
      highlight={props.highlight}
      position={props.position}
      tone={props.tone}
      onClick={props.onClick}
      onMouseDown={props.onMouseDown}
      onMouseUp={props.onMouseUp}
      className={props.className}
      style={props.style}
    >
      {props.children}
    </KeySemi>
  )
}
