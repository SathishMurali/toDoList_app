import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { InputGroup } from 'react-bootstrap'
import Form from 'react-bootstrap/Form'

const CredentialsWrapper = ({cp1, cp2, icon, type, placeholder, onChange, cp3, cp4, lastIcon, value}) => {
    return (
        <InputGroup className={cp1}>
            <InputGroup.Text className={cp2}><FontAwesomeIcon icon={icon} /></InputGroup.Text>
            <Form.Control type={type} placeholder={placeholder} onChange={onChange} className={cp3} value={value} />
        </InputGroup>
    )
}

export default CredentialsWrapper