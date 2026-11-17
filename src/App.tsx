import { QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter, Route, Routes } from 'react-router'

import HomePage from '@/components/pages/Home/HomePage'
import SignInPage from '@/components/pages/SignIn/SignInPage'
import SignUpPage from '@/components/pages/SignUp/SignUpPage'
import { Toaster } from '@/components/ui/sonner'
import { queryClient } from '@/lib/queryClient'

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/signin" element={<SignInPage />} />
        </Routes>
        <Toaster position="top-right" offset={{ top: 100, right: 24 }} />
      </BrowserRouter>
    </QueryClientProvider>
  )
}
