import { render, screen } from "@testing-library/react";
import LoginPage from "@/app/(login)/auth/login/page";

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    refresh: jest.fn(),
    back: jest.fn(),
    prefetch: jest.fn(),
  }),
}))

describe('LoginPage', () => {
  it('renders the login form', () => {
    render(<LoginPage />)
    
    
  })
})