import type { ComponentType } from 'react'

export interface SlideProps {
  className?: string
}

export interface TabConfig {
  id: string
  label: string
  slides: ComponentType<SlideProps>[]
}
