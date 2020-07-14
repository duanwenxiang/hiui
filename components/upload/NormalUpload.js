import React, { useState } from 'react'
import classNames from 'classnames'
import Button from '../button'
import Icon from '../icon'
import FileSelect from './FileSelect'

const NormalUpload = ({
  maxCount,
  content,
  disabled,
  multiple,
  tips,
  showUploadList = true,
  onRemove,
  accept,
  loading,
  onDownload,
  fileList,
  defaultFileList
}) => {
  const [_fileList, updateFileList] = useState(fileList || defaultFileList || [])
  const uploadFiles = (files) => {
    updateFileList(files)
    console.log(files)
  }
  return (
    <div className={`hi-upload`}>
      {/* TODO: 文件大小限制弹窗 */}
      <FileSelect
        onSelect={uploadFiles}
        multiple={multiple}
        disabled={disabled || _fileList.length >= maxCount}
        accept={accept}
      >
        <Button type='primary' disabled={disabled || _fileList.length >= maxCount} loading={loading}>
          {content}
        </Button>
      </FileSelect>
      {tips && <span className='hi-upload__tips'>{tips}</span>}
      {showUploadList && _fileList.length > 0 && (
        <ul className='hi-upload__list'>
          {_fileList.map((file, index) => {
            return (
              <li key={index} className='hi-upload__item' title={file.name}>
                <span className={classNames(`Ficon-${file.fileType}`)} />
                <div className='hi-upload__right-content'>
                  <a
                    target='_blank'
                    href={file.url || null}
                    className={classNames(
                      'hi-upload__filename',
                      file.uploadState === 'error' && 'hi-upload__filename--error'
                    )}
                    title={file.name}
                    onClick={(e) => {
                      if (onDownload) {
                        e.preventDefault()
                        onDownload(file)
                      }
                    }}
                  >
                    {file.name}
                  </a>
                  <span>
                    {onRemove && (
                      <Icon
                        onClick={() => this.deleteFile(file, index)}
                        name={file.uploadState === 'loading' ? 'close' : 'delete'}
                      />
                    )}
                  </span>
                </div>
                {file.uploadState === 'loading' && (
                  <div className='hi-upload__upstatus'>
                    <i className='hi-upload__upstatus-line' style={{ width: file.progressNumber + '%' }} />
                  </div>
                )}
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}

export default NormalUpload