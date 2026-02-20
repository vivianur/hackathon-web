import { render } from '@testing-library/react'
import type { ReactElement } from 'react'
import { BrowserRouter } from 'react-router-dom'

const AllProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <BrowserRouter>
      {children}
    </BrowserRouter>
  )
}

export const renderWithProviders = (ui: ReactElement) => {
  return render(ui, {
    wrapper: AllProviders,
  })
}