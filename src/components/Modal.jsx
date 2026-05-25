import { createPortal } from 'react-dom';
import { MdClose } from 'react-icons/md';

export const ImageModal = ({ isOpen, onClose, imageUrl }) => {
    const handleModalClick = (e) => {
        e.stopPropagation();
    };

    if (!isOpen) return null;

    return createPortal(
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
            onClick={onClose}>
            <div className="rounded-lg relative shadow-lg bg-white/10 p-6 max-w-6xl w-full mx-4"
                onClick={handleModalClick}>
                <div className="flex justify-end">
                    <button
                        onClick={onClose}
                        className="bg-red-600 text-2xl p-1.5 rounded-full text-white hover:bg-red-700 transition duration-300 z-50 absolute top-0 right-0 m-1"
                        aria-label="Close">
                        <MdClose />
                    </button>
                </div>
                <img
                    src={imageUrl}
                    alt="Body Content"
                    className="w-full h-auto rounded-lg shadow-lg"
                />
            </div>
        </div>,
        document.body
    );
}