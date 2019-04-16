import React, { Fragment } from 'react'
import { Alert, Form, Button } from 'react-bootstrap'

const PlayerForm = (
  { name, score, wins, loses, message, handleChange, handleSubmit, handleKnighted, edit }
) => (
  <Fragment>
    {message && <Alert variant="danger" dismissible>{message}</Alert>}

    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="CreateEditForm">
        <Form.Label>Name</Form.Label>
        <Form.Control type="text" value={name} name="name" required onChange={handleChange}/>
      </Form.Group>
      {!edit && <Button variant="primary" className="m-1" onClick={handleKnighted}>Knight Player</Button>}

      { edit &&
        <Fragment>
          <Form.Group controlId="CreateEditForm">
            <Form.Label>Score</Form.Label>
            <Form.Control type="text" value={score} name="score" onChange={handleChange} />
          </Form.Group>

          <Form.Group controlId="CreateEditForm">
            <Form.Label>Wins</Form.Label>
            <Form.Control type="integer" value={wins} name="wins" onChange={handleChange} />
          </Form.Group>

          <Form.Group controlId="CreateEditForm">
            <Form.Label>Loses</Form.Label>
            <Form.Control type="integer" value={loses} name="loses" onChange={handleChange} />
          </Form.Group>
        </Fragment>
      }

      <Button variant="primary" type="submit" className="m-1"> Submit </Button>
    </Form>
  </Fragment>
)

export default PlayerForm
