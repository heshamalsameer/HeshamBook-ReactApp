import { ImageList, ImageListItem, Typography } from '@mui/material'
import React from 'react'

const Photos = () => {
  return (
    <div>
      <Typography variant="h6" fontWeight={100} mt={2} mb={2}>
          Latest Photos
        </Typography>
        <ImageList cols={3} rowHeight={100}>
          <ImageListItem>
            <img
              src="https://pic.i7lm.com/wp-content/uploads/2020/02/9-26-390x220.jpg"
              alt="...."
            />
          </ImageListItem>
          <ImageListItem>
            <img
              src="https://pic.i7lm.com/wp-content/uploads/2020/04/%D8%AE%D8%AE%D8%AE%D8%AE-390x220.jpg"
              alt="...."
            />
          </ImageListItem>
          <ImageListItem>
            <img
              src="https://pic.i7lm.com/wp-content/uploads/2020/03/16-14-390x220.jpg"
              alt="...."
            />
          </ImageListItem>
        </ImageList>
    </div>
  )
}

export default Photos
