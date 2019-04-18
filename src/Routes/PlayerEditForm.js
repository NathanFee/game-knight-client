import React, { Fragment } from 'react'
import { Form, Button } from 'react-bootstrap'

const PlayerForm = (
  { name, score, wins, loses, handleChange, handleSubmit, handleKnighted, edit }
) => (
  <Fragment>

    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="CreateEditForm">
        <Form.Label>Name</Form.Label>
        <Form.Control type="text" value={name} name="name" required onChange={handleChange}/>
      </Form.Group>

      <Form.Group controlId="CreateEditForm">
        <Form.Label>Wins</Form.Label>
        <Form.Control type="integer" value={wins} name="wins" required onChange={handleChange} />
      </Form.Group>

      <Form.Group controlId="CreateEditForm">
        <Form.Label>Loses</Form.Label>
        <Form.Control type="integer" value={loses} name="loses" required onChange={handleChange} />
      </Form.Group>

      <Button variant="primary" type="submit" className="m-1"> Submit </Button>
    </Form>
  </Fragment>
)

export default PlayerForm
