import copy from 'clipboard-copy'
import toast from 'react-hot-toast'

const CopyToClipboard = ({ text, children }) => {

    const handleCopyClick = async () => {
        try {
            await copy(text)
            toast.success('Copied to Clipboard')
        } catch (error) {
            console.error('Failed to copy text to clipboard', error)
        }
    }

    return <div className="copyToClipboard" onClick={handleCopyClick}>{children}</div>
}

export default CopyToClipboard;
