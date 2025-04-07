"use client"

import ButtonStrong from '../designs/ButtonStrong'
import { useRouter } from 'next/navigation'

export default function RouteButton({id}: {id: number}) {
    const router = useRouter()
    const handleRoute = () => {
        // router.push(`/serach/${category}/${id}`)
    }
  return (
  <ButtonStrong text="제품 보기" onClick={handleRoute}/>
  )
}
