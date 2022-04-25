import { ValidationErrors } from 'final-form';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { FC, FormEvent, useState } from 'react';
import { Button, Card } from 'react-bootstrap';
import { Form, Field } from 'react-final-form'
import { app, db, storage } from '../../../firebase/firebase-config';
import FileField from '../file-field/file-field';

import './modal.css';

type ModalPropsType = {
  cardModal: boolean
  setCardModal: any
  onSubmitNewCard: (front: string, back: string, description: string, imgURL: string, id?: string) => void
  currentCard: any
  setCurrentCard?: any
}

type ValuesType = {
  front: string
  back: string
  file: File
  description: string
}

const Modal: FC<ModalPropsType> = ({
  cardModal,
  setCardModal,
  onSubmitNewCard,
  currentCard,
  setCurrentCard
}) => {

  const [imgUrl, setImgUrl] = useState<string>(currentCard.imgURL);
  const [progresspercent, setProgresspercent] = useState<number>(0);

  const onFileUpload = (e: any) => {
    console.log(e.target?.files[0])
    const file: File = e.target.files[0]
    const storageRef = ref(storage, `images/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on("state_changed",
      (snapshot) => {
        const progress =
          Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        setProgresspercent(progress);
      },
      (error) => {
        alert(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref)
          .then((downloadURL) => {
            setImgUrl(downloadURL)
          });
      }
    );
  };

  const onSubmit = (values: ValuesType) => {
    if (values.front.length < 1 || values.back.length < 1) return;
    onSubmitNewCard(values.front, values.back, values.description, imgUrl, currentCard.id);
    setCardModal(false);
    setCurrentCard({})
  }

  const validate = (values: ValuesType): ValidationErrors | Promise<ValidationErrors> => {
    return
  }

  return (
    <>
      <div className="overlay" onClick={ () => setCardModal(false) }/>
      <div className='new-card-modal-container'>
        <Form
          onSubmit={onSubmit}
          validate={validate}
          render={({ handleSubmit }) => (
            
            <form className="add-form d-flex" onSubmit={handleSubmit}>
              <i className="fa-solid fa-xmark cross" onClick={ () => {
                setCurrentCard({})
                setCardModal(false)
              }}></i>
              {
                !imgUrl &&
                <div className='outerbar'>
                  <div className='innerbar' style={{ width: `${progresspercent}%` }}>{progresspercent}%</div>
                </div>
              }
              {
                imgUrl &&
                <img src={imgUrl} alt='uploaded file' height={150} width={250} />
              }
              <input 
                type="file"
                onChange={(e) => onFileUpload(e)} 
              />
              <Field 
                component="input"
                className="form-control new-post-label"
                placeholder="Front(required)"
                defaultValue={currentCard.front ? currentCard.front : ''}
                name="front"
                required
              />
              <Field
                component="input"
                className="form-control new-post-label"
                placeholder="Back(required)"
                defaultValue={currentCard.back ? currentCard.back : ''}
                name="back"
                required
              />
              <Field
                component="textarea"
                className="form-control new-post-label"
                placeholder="Description(not required)"
                defaultValue={currentCard.description ? currentCard.description : ''}
                name="description"
              />
              <Button 
                type="submit" 
                variant="danger" 
                style={ { 'margin': '10px' } }
              >
                Save
              </Button>
            </form>
          )}
        />
      </div>
    </>
  );
};

export default Modal;