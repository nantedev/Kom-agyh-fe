import { useEffect } from 'react'
import { toast } from 'sonner'

import HomePage from '@/components/pages/Home/HomePage'

// Page temporaire de l'étape 0, supprimée à l'étape 3 (le vrai toast vient de la navigation).
export default function ConnectedPreviewPage() {
  useEffect(() => {
    toast.success('Bienvenue Marc, ton compte est créé.', { id: 'preview' })
  }, [])

  return <HomePage userName="Marc" />
}
