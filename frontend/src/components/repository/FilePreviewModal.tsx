import type { RepositoryFile } from '../../types/repository'
import "./FilePreviewModal.css"

type Props = {
  isOpen: boolean
  content: string
  isLoading: boolean
  file: RepositoryFile | null
  onClose: () => void
}

export function FilePreviewModal({
    isOpen,
    file,
    content,
    isLoading,
    onClose,
}: Props) {
    if (!isOpen || !file) return null

    return (
        <div className="file-preview-modal__overlay" onClick={onClose}>
            <div className='file-preview-modal' onClick={(e) => e.stopPropagation()}>
                <div className='file-preview-modal__header'>
                    <div>
                        <h3 className='file-preview-modal__title'>File preview</h3>
                        <p className='file-preview-modal__path'>{file.path}</p>
                    </div>

                    <button type="button" className='file-preview-modal__close' onClick={onClose} aria-label='Close preview'>
                        ✕
                    </button>
                </div>

                <div className='file-preview-modal__body'>
                    {isLoading ? (
                        <div className='loading-box'>Loading file preview...</div>
                    ) : (
                        <pre className='file-preview-modal__content'>
                            <code>{content || "This file is empty or cannot be previewed."}</code>
                        </pre>
                    )}
                </div>
            </div>
        </div>
    )
}
