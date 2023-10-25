import { ArrowLeftIcon } from '@heroicons/react/outline'
import { useRouter } from 'next/navigation'

const GoBackArrow = () => {
  const router = useRouter()

  const goBack = () => {
    router.back()
  }

  return (
    <div className="cursor-pointer flex items-center space-x-2 text-blue-500 mt-5 ml-4" onClick={goBack}>
      <ArrowLeftIcon className="w-6 h-6" />
    </div>
  )
}

export default GoBackArrow