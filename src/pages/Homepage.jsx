import { Link } from 'react-router-dom'

export const Homepage = () => {
  return (
    <div className="min-h-screen text-amber-50/80 pt-8">
      <div className="space-y-4">
        <img
          src="bodycontent-2.jpeg"
          alt="Body Content"
          className="w-full h-auto rounded-lg shadow-lg"
        />
        <img
          src="bodycontent.jpeg"
          alt="Body Content"
          className="w-full h-auto rounded-lg shadow-lg"
        />
      </div>
    </div>
  )
}
