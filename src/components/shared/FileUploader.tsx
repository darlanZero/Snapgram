import {useCallback, useState} from 'react'
import { useDropzone, FileWithPath } from 'react-dropzone'
import { Button } from '../ui/button'

type FileUploaderProps = {
    fieldChange: (FILES: File[]) => void,
    mediaUrl: string,
}

const FileUploader = ({fieldChange, mediaUrl}: FileUploaderProps) => {

    const [file, setFile] = useState<File[]>([])
    const [FileUrl, setFileUrl] = useState(mediaUrl)

    const onDrop = useCallback(
        (acceptedFiles: FileWithPath[]) => {
            setFile(acceptedFiles)
            fieldChange(acceptedFiles)
            setFileUrl(URL.createObjectURL(acceptedFiles[0]))
        }, [file]
    )
      
    const {getRootProps, getInputProps} = useDropzone({
        onDrop,
        accept: {
           'image/*': ['.png', '.jpeg', '.jpg', '.svg', '.gif', '.mp4']
        }
    })

  return (
    <div {...getRootProps()} className='flex flex-center flex-col bg-dark-3 rounded-xl cursor-pointer'>
    <input {...getInputProps()} className='cursor-pointer' />
        {
            FileUrl ?(
                <>
                    <div className='flex flex-1 justify-center w-full p-5 lg:p-10'>
                        <img 
                            src={FileUrl}
                            alt="image" 
                            className='file_uploader-img'
                        />
                    </div>

                    <p className='file_uploader-label'>Click or drag photo to replace</p>
                </>
            ): (
               <div className='file_uploader-box'>
                <img 
                    src="/assets/icons/file-upload.svg" 
                    alt="file-Upload" 
                    width={96}
                    height={77}
                />

                <h3 className='base-medium text-light-2 mb-2 mt-6'>Drag Photo here</h3>
                <p className='text-light-4 small-regular mb-6'>SVG, PNG, JPG</p>

                <Button className='shad-button_dark_4'>
                    Select from computer
                </Button>
               </div>
            )

        }
    </div>
  )
}

export default FileUploader