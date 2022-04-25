import { FC } from "react";
import { Form } from "react-bootstrap";

import './file-input.css'

type PropsType = {
  handleDataFromFile: (fileContent: string | ArrayBuffer | null) => void
}

const FileInput: FC<PropsType> = ({ handleDataFromFile }) => {

  const onChange = (e: any) => {
    const file = e.target.files[0];
    console.dir(file)
    const reader: FileReader = new FileReader();
    reader.readAsText(file);
    reader.onload = () => {
      handleDataFromFile(reader.result)
    };
    reader.onerror = () => {
      console.log('file error', reader.error)
    }
  }

  return (
    <>
      <Form.Control
        className="input" 
        type="file" 
        accept=".csv,.txt,.text,text/csv,text/plain" 
        onChange={onChange}
      />
    </>
  )
}

export default FileInput