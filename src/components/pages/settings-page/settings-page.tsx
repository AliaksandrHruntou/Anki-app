import { FC, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { FormCheckType } from 'react-bootstrap/esm/FormCheck';
import { useAuth } from '../../contexts/auth-context';
import './settings-page.css';

const SettingsPage: FC = () => {

  const { onSetMode } = useAuth();

  const [mode, setMode] = useState(null);

  const onChangeMode = (mode: any) => {
    setMode(mode);
    console.log(mode);
  };

  return (
    <>
      <div className="main-container">
        <h2>Choose your repetition mode:</h2>
        <Form>
          { ['radio'].map((type: any) => (
            <div key={ `inline-${type}` } className="mb-3">
              <Form.Check
                defaultChecked={ true }
                inline
                label="Front/Back"
                name="group1"
                type={ type }
                id={ `inline-${type}-1` }
                value="Front/Back"
                onChange={ (e) => onChangeMode(e.currentTarget.value) }
              />
              <Form.Check
                inline
                label="Back/Front"
                name="group1"
                type={ type }
                id={ `inline-${type}-2` }
                value="Back/Front"
                onChange={ (e) => onChangeMode(e.currentTarget.value) }
              />
              <Form.Check
                inline
                label="Mix/Random"
                name="group1"
                type={ type }
                id={ `inline-${type}-3` }
                value="Mix/Random"
                onChange={ (e) => onChangeMode(e.currentTarget.value) }
              />
            </div>
          )) }
        </Form>
      </div>
      <div className="button-container">
        <Button variant='danger' className='mx-auto' onClick={ () => onSetMode(mode) }>
          Save
        </Button>
      </div>
    </>
  );
};

export default SettingsPage;
