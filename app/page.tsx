import type { Metadata } from 'next'
import Home from '../src/modules/Home.tsx'
 
export const metadata: Metadata = {
  title: 'TOTS Map',
}
 
export default function Main() {
  return (
    <Home />
  )
}