import { Link } from 'react-router-dom'
import { useState } from 'react'
import { ImageModal } from '../components/Modal';

export const Homepage = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");

  const openModal = (imageUrl) => {
    setSelectedImage(imageUrl);
    setModalOpen(true);
  };

  return (
    <div className="min-h-screen text-amber-50/80 pt-8">
      <ImageModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        imageUrl={selectedImage}
      />
      <div className="space-y-4">
        <img
          src="bodycontent-2.jpeg"
          alt="Body Content"
          className="w-full h-auto rounded-lg shadow-lg"
          onClick={() => openModal("bodycontent-2.jpeg")}
        />
        <img
          src="bodycontent.jpeg"
          alt="Body Content"
          className="w-full h-auto rounded-lg shadow-lg"
          onClick={() => openModal("bodycontent.jpeg")}
        />
      </div>
    </div>
  )
}
