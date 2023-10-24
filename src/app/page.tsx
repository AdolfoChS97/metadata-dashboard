'use client'
import Navbar from "@/app/components/Navbar"
import { useRouter } from 'next/router'
import Connections from "./layouts/Connections"
import { usePathname } from "next/navigation"

export default function Home() {

  const path = usePathname()

  let contentComponent = null

  console.log(path);

  switch (path) {
    case '/connections':
      contentComponent = <Connections />
      break;
  
    default:
      break;
  }

  return (
    <main>
      <Navbar />
      {contentComponent}
    </main>
  )
}
