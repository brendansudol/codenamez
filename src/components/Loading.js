import React from "react"
import { Box, Spinner } from "theme-ui"

export const Loading = React.memo(() => {
  return (
    <Box sx={{ p: 3, textAlign: "center" }}>
      <Spinner size={20} sx={{ color: "text" }} />
    </Box>
  )
})
