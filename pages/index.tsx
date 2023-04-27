import { sendData } from '@/config/firebaseMethod';
import { useRouter } from 'next/router';
import React, { useState } from 'react'
import { FloatingLabel, Button } from 'react-bootstrap'
import Form from 'react-bootstrap/Form';
import Swal from 'sweetalert2';

function index() {
  //state
  const [question, setQuestion] = useState("");
  const [option01 , setOption01] = useState("");
  const [option02 , setOption02] = useState("");
  const [option03 , setOption03] = useState("");
  const [rightAnswer , setRightAnswer] = useState("");

  //navigate route
  const router = useRouter();

  //send question function
  const sendQuestion =  () => {
    const obj: { 
      question: string;
      option01:string;
      option02:string;
      option03:string;
      rightAnswer:string;
     } = {
      question,
      option01,
      option02,
      option03,
      rightAnswer
    }
    sendData(obj , "questions")
    .then(()=>{
      Swal.fire(
        '',
        'Question Added Succesfully!',
        'success'
      )
      setOption01("");
      setOption02("");
      setOption03("");
      setRightAnswer("");
      setQuestion("");
    })
    .catch((err)=>{
      console.log(err);
      
    })
  }
  return (
    <div className='container mt-5'>
      <h1>Add Questions</h1>
      <div className='mt-5'>
        <FloatingLabel controlId="floatingTextarea2" label="Questions">
          <Form.Control
            as="textarea"
            style={{ height: '100px' }}
            onChange={(e) => setQuestion(e.target.value)}
            value={question}
          />
        </FloatingLabel>
      </div>
      <div className="mt-3">
      <FloatingLabel
        controlId="floatingTextarea"
        label="Option-01"
        className="mb-3"
      >
        <Form.Control as="textarea" placeholder="Leave a comment here" onChange={(e)=>setOption01(e.target.value)} value={option01}/>
      </FloatingLabel>
      </div>
      <div className="mt-3">
      <FloatingLabel
        controlId="floatingTextarea"
        label="Option-02"
        className="mb-3"
      >
        <Form.Control as="textarea" placeholder="Leave a comment here" onChange={(e)=>setOption02(e.target.value)} value={option02}/>
      </FloatingLabel>
      </div>
      <div className="mt-3">
      <FloatingLabel
        controlId="floatingTextarea"
        label="Option-03"
        className="mb-3"
      >
        <Form.Control as="textarea" placeholder="Leave a comment here" onChange={(e)=>setOption03(e.target.value)} value={option03}/>
      </FloatingLabel>
      </div>
      <div className="mt-3">
      <FloatingLabel
        controlId="floatingTextarea"
        label="Correct Answer"
        className="mb-3"
      >
        <Form.Control as="textarea" placeholder="Leave a comment here" onChange={(e)=>setRightAnswer(e.target.value)} value={rightAnswer}/>
      </FloatingLabel>
      </div>
      <div className='mt-5'>
        <Button className='m-2' onClick={sendQuestion} variant="primary">Add Question</Button>
        <Button className='m-2' onClick={()=>router.push({pathname:'allquestion'})} variant="primary">All Question</Button>
      </div>
    </div>
  )
}

export default index