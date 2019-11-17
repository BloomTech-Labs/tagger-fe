import React, { useReducer, useEffect } from "react";
import { sendMessage } from "../../api";
import { getValidEmails } from "../../utils";

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import ModalHeader from 'react-bootstrap/ModalHeader';
import ModalBody from 'react-bootstrap/ModalBody';
import ModalFooter from 'react-bootstrap/ModalFooter';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

import ReactQuill from "react-quill";
import "../../../node_modules/react-quill/dist/quill.snow.css";
import "./composeMessage.scss";

const Compose = (props) => {
  const [state, setState] = useReducer((state, newState) => (
    {...state, ...newState}
  ));

  const showModal = () => {
    setState({
      displayModal: true
    });
  }

  const closeModal = () => {
    setState({
      displayModal: false
    });
  }

  const handleChange = (value) => {
    setState({ content: value });
  }

  const sendEmail = () => {
    const validTo = getValidEmails(state.to);

    if (
      !validTo.length ||
      state.subject.trim() === "" ||
      state.content === ""
    ) {
      return;
    }

    const headers = {
      To: validTo.join(", "),
      Subject: state.subject
    };

    const validCc = getValidEmails(state.cc);
    if (validCc.length) {
      headers.Cc = validCc.join(", ");
    }

    const validBcc = getValidEmails(state.bcc);
    if (validBcc.length) {
      headers.Bcc = validBcc.join(", ");
    }

    sendMessage({
      headers,
      body: state.content
    }).then(_ => {      
      closeModal();
      resetFields();
    });

    closeModal();
  }

  const resetFields = () => {
    setState({
      to: props.to || "",
      cc: props.cc || "",
      bcc: props.bcc || "",
      subject: props.subject || "",
      content: props.content || ""
    });
  }

  const setField = (field, trimValue = true) => {
    return evt => {
      setState({
        [field]: trimValue ? evt.target.value.trim() : evt.target.value 
      });
    };
  }

  const isInvalid = (field) => {
    const fieldValue = state[field].trim();
    return fieldValue.length > 0 && !getValidEmails(fieldValue).length;
  }

  useEffect(() => {
    setState({
      displayModal: false,
      to: props.to || "",
      cc: props.cc || "",
      bcc: props.bcc || "",
      subject: props.subject || "",
      content: props.content || ""
    })
  }, []);

  return (
    <React.Fragment>
      {
        React.cloneElement(props.children, {
          onClick: showModal
        })
      }
      {state && state.displayModal ? (
          <Modal
            show={state.displayModal}
            className="compose-dialog"
            size="lg"
            onHide={closeModal}
            backdrop="static"
            centered={true}
          >
            <ModalHeader closeButton>
              <Modal.Title>Compose Message</Modal.Title>
            </ModalHeader>
            <ModalBody>
              <div className="message-fields">
                <InputGroup>
                  <InputGroup.Prepend>
                    <InputGroup.Text>To:</InputGroup.Text>
                  </InputGroup.Prepend>
                  <FormControl
                    tabIndex={1}
                    value={state.to}
                    placeholder="comma-separated email list"
                    isInvalid={isInvalid("to")}
                    onChange={setField("to")}
                  />
                </InputGroup>
                <InputGroup>
                  <InputGroup.Prepend>
                    <InputGroup.Text>Cc:</InputGroup.Text>
                  </InputGroup.Prepend>
                  <FormControl
                    tabIndex={2}
                    value={state.cc}
                    placeholder="comma-separated email list"
                    isInvalid={isInvalid("cc")}
                    onChange={setField("cc")}
                  />
                </InputGroup>
                <InputGroup>
                  <InputGroup.Prepend>
                    <InputGroup.Text>Bcc:</InputGroup.Text>
                  </InputGroup.Prepend>
                  <FormControl
                    tabIndex={3}
                    placeholder="comma-separated email list"
                    isInvalid={isInvalid("bcc")}
                    onChange={setField("bcc")}
                  />
                </InputGroup>
                <InputGroup>
                  <InputGroup.Prepend>
                    <InputGroup.Text>Subject:</InputGroup.Text>
                  </InputGroup.Prepend>
                  <FormControl
                    tabIndex={4}
                    placeholder=""
                    value={state.subject}
                    onChange={setField("subject", false)}
                  />
                </InputGroup>
              </div>
              <div className="editor-wrapper">
                <ReactQuill
                  tabIndex={5}
                  value={state.content}
                  onChange={handleChange}
                />
              </div>
            </ModalBody>
            <ModalFooter>
              <Button
                className="mr-auto font-weight-bold"
                size="lg"
                color="primary"
                onClick={sendEmail}
              >
                Send
              </Button>{" "}
              <Button variant="light" onClick={closeModal}>
                <FontAwesomeIcon icon={faTrash} />
              </Button>
            </ModalFooter>
          </Modal>
        ) : null}
    </React.Fragment>
  );
}

export default Compose;
