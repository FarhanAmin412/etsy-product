import React from 'react'
import { Edit } from '@mui/icons-material'
import { EditImageContainer, LightTooltip } from './ProductCard.styles'

const EditPreviewImage = (props) => {
  return (
    <LightTooltip title="Edit Preview Image" placement="right">
    <EditImageContainer component="label">
      <Edit htmlColor="#fff" />
      <input
        accept="image/*"
        type="file"
        hidden
        onChange={props.handlePreviewImage}
      />
    </EditImageContainer>
  </LightTooltip>
  )
}

export default EditPreviewImage