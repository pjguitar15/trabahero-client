import React from 'react'

interface ModalProps {
  title: string
  message: string
  icon: React.ReactNode
  buttonText: string
  canExit: boolean
  onProceed: () => void
  onClose?: () => void // 🔹 Added optional onClose prop
}

const Modal: React.FC<ModalProps> = ({
  title,
  message,
  icon,
  buttonText,
  canExit,
  onProceed,
  onClose, // ✅ Added closing function
}) => {
  const handleProceed = () => {
    onProceed()
    if (canExit && onClose) {
      onClose() // ✅ Close modal after proceeding
    }
  }

  return (
    <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-75'>
      <div className='bg-white p-6 rounded-lg shadow-lg text-center max-w-[500px]'>
        <div className='h-10 w-10 text-green-500 mx-auto mb-4'>{icon}</div>
        <h2 className='text-2xl font-bold'>{title}</h2>
        <p className='text-slate-700'>{message}</p>
        <button
          onClick={handleProceed}
          className='mt-4 px-4 py-2 bg-green-500 text-white rounded'
        >
          {buttonText}
        </button>
        {canExit && onClose && (
          <button onClick={onClose} className='mt-2 px-4 py-2 text-gray-500'>
            Close
          </button>
        )}
      </div>
    </div>
  )
}


export default Modal
