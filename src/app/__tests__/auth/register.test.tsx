import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import RegisterPage from "@/app/(login)/auth/register/page";

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}))

jest.mock('axios', () => ({
  post: jest.fn(),
}))

import axios from 'axios'

describe('RegisterPage', () => {
  it('renders all inputs', () => {
    render(<RegisterPage />) 
    
    expect(screen.getByRole('button', { name: /Register/i })).toBeInTheDocument()
  })

  
})