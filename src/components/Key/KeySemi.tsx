import { ReactElement, ReactNode, useMemo } from 'react'
import { Button as ShadButton } from '@/components/ui/button'
import { MusicKeyProps, KeySemitonePosition } from '@/Types'
import { useKeyboard } from '@/providers/keyboard-provider'
import { isPressed } from './key-utils'
import { useDevice } from '@/providers/device-provider'

// Display a full sized key
export default function KeySemi({
  position = 'center',
  highlight = false,
  tone,
  onMouseDown,
  onMouseUp,
  onClick,
  className = '',
  style = {},
  children,
}: MusicKeyProps & KeySemitonePosition): ReactElement {
  const width = position === 'center' ? 'w-[70px]' : 'w-[105px]'
  const keyFlexPosition = useMemo(() => {
    if (position === 'center') return 'justify-center'
    if (position === 'left') return 'justify-end'
    return 'justify-start'
  }, [position])

  const styles = {
    normal: {
      bgColor: 'bg-[#D5D1D0]',
      dropShadow: 'shadow-[-7px_-7px_12px_-1px_#fff,7px_7px_12px_#7D7777]',
      border: 'border-white',
      hover: 'hover:bg-[#c4c0be]',
      pressed: 'group-active:shadow-[-3px_-3px_3px_#fff,3px_3px_3px_#7D7777]',
      down: 'shadow-[-3px_-3px_3px_#fff,3px_3px_3px_#7D7777]',
    },
    highlight: {
      bgColor: 'bg-[#D54C2B]',
      dropShadow: 'shadow-[-7px_-7px_12px_-1px_#f55731,7px_7px_12px_#b54125]',
      border: 'border-[#d1725a]',
      hover: 'hover:bg-[#c24527]',
      pressed:
        'group-active:shadow-[-3px_-3px_3px_#f55731,3px_3px_3px_#b54125]',
      down: 'shadow-[-3px_-3px_3px_#f55731,3px_3px_3px_#b54125]',
    },
  }
  const { state } = useDevice()
  const { pressedKeys } = useKeyboard()

  const handleMouseDown = (e: React.MouseEvent<HTMLButtonElement>) => {
    onMouseDown(e, tone)
  }

  const handleMouseUp = (e: React.MouseEvent<HTMLButtonElement>) => {
    onMouseUp(e, tone)
  }

  const selectedColor = highlight ? styles.highlight : styles.normal
  const keyDown = isPressed(pressedKeys, tone.note) ? selectedColor.down : ''

  const display = useMemo(() => {
    if (state.keyDisplay === 'none') return null
    if (state.keyDisplay === 'key') return tone.keyboard
    return tone.note
  }, [state.keyDisplay])

  return (
    <ShadButton
      className={`${className} ${width} group border-2  border-black  p-0 flex h-[70px] rounded-none bg-black`}
      style={style}
      onClick={onClick}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      tabIndex={-1}
    >
      <div
        className={`${selectedColor.hover} ${selectedColor.bgColor} ${keyFlexPosition} overflow-hidden flex items-center p-[12px] h-full w-full rounded-sm`}
      >
        <div
          className={`${selectedColor.bgColor}
          ${selectedColor.dropShadow}
          ${selectedColor.pressed}
          ${selectedColor.border}
          ${keyDown}
          border bg-black rounded-full flex justify-center items-center h-full w-[42px]`}
        >
          {display}
        </div>
      </div>
    </ShadButton>
  )
}
