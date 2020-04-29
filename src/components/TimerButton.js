import Tippy from "@tippyjs/react"
import React, { useEffect, useState } from "react"
import { IoIosAlarm as AlarmIcon } from "react-icons/io"
import { Box, Button, Text } from "theme-ui"

export const TimerButton = React.memo(({ timerStarted, onClick }) => {
  const [time, setTime] = useState(undefined)
  const [isPopoverVisible, setIsPopoverVisible] = useState(false)

  useEffect(() => {
    const secs = getRemainingTime(timerStarted)
    setTime(secs)
    if (secs == null) return

    const interval = setInterval(
      () =>
        setTime((prevTime) => {
          const nextTime = prevTime - 1
          if (nextTime === 0) {
            clearInterval(interval)
            setIsPopoverVisible(true)
          }
          return nextTime
        }),
      1000
    )

    return () => clearInterval(interval)
  }, [timerStarted])

  useEffect(() => {
    if (isPopoverVisible) {
      const timer = setTimeout(() => setIsPopoverVisible(false), 1500)
      return () => clearTimeout(timer)
    }
  }, [isPopoverVisible])

  const isRunning = time != null && time > 0

  return (
    <Box>
      <Tippy interactive={true} visible={isPopoverVisible} content="Time’s up!">
        <Button
          variant="outline"
          sx={{ display: "flex", alignItems: "center" }}
          disabled={isRunning}
          onClick={onClick}
        >
          <AlarmIcon size={16} />
          {isRunning && <Text ml={1}>{String(time).padStart(3, "0")}</Text>}
        </Button>
      </Tippy>
    </Box>
  )
})

const TIMER_DURATION_IN_SECS = 100

function getRemainingTime(started) {
  if (started == null || started === 0) return
  const diff = Math.floor((Date.now() - started) / 1000)
  if (diff >= TIMER_DURATION_IN_SECS) return
  return TIMER_DURATION_IN_SECS - diff
}
