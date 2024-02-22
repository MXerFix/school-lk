import { Check, Download, Paperclip } from "lucide-react"
import React, { ReactNode } from "react"

type FileInputClipType = {
  label?: ReactNode
  downloadLink?: string
  file?: File
  setFile?: (file: File) => void
  accept?: string
  disabled?: boolean
}

const FileInputClip = ({ label, downloadLink, file, setFile, accept="application/pdf, image/jpeg, image/png, image/webp, .doc, .docx", disabled=false }: FileInputClipType) => {
  const id = Math.random().toString(36).substring(2, 15)

  const selectFileHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (setFile && e.target.files) setFile(e.target.files?.[0])
  }

  return (
    <div className='flex items-center justify-start gap-4'>
      <label className="max-2xl:text-base"> {label} </label>
      {downloadLink && (
        <a
          className='flex items-center gap-2 bg-button-file h-8 px-2 rounded-lg'
          href={downloadLink}>
          {" "}
          скачать <Download />{" "}
        </a>
      )}
      <input
        disabled={disabled}
        accept={accept}
        className='hidden'
        onChange={selectFileHandler}
        id={id}
        type='file'
      />
      <label className="bg-button-file p-1 rounded-lg cursor-pointer" htmlFor={id}>
        <span>
          <Paperclip className="w-6 h-6" />
        </span>
      </label>
      {file && file?.name && <Check className='text-success' />}
    </div>
  )
}

export default FileInputClip
