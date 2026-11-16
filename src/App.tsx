import { BrowserRouter, Route, Routes } from 'react-router'

import ConnectedPreviewPage from '@/components/pages/Home/ConnectedPreviewPage'
import HomePage from '@/components/pages/Home/HomePage'
import SignInPage from '@/components/pages/SignIn/SignInPage'
import SignUpPage from '@/components/pages/SignUp/SignUpPage'
import { Toaster } from '@/components/ui/sonner'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/connected" element={<ConnectedPreviewPage />} />
      </Routes>
      <Toaster position="top-right" offset={{ top: 100, right: 24 }} />
    </BrowserRouter>
  )
}
