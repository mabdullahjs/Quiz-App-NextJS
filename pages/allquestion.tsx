import { deleteDocument, getAllData } from '@/config/firebaseMethod'
import React, { useEffect, useState } from 'react'
import { Button, ListGroup } from 'react-bootstrap';

function Allquestion() {
  //state
  const [data, setData] = useState<[] | null>(null);


  //get all data using useEffect
  useEffect(() => {
    getAllData('questions')
      .then((res) => {
        setData(res)

      })
      .catch((err) => {
        setData([])
      })
  }, [data])

  //delete todo function
  const deleteTodo = (item: string) => {
    deleteDocument(item, "questions")
      .then((res) => {
        // console.log(res);
      })
      .catch((err) => {
        console.log(err);
      })
  }
  return (
    <div className="container">
      <h1 className='mt-5'>All Questions</h1>
      <div className='mt-5'>
        {/* {data?data.map((item:{question:string; documentId:string})=>{
        return <Card key={item.documentId} body>{item.question}</Card>
      }):<h1>Loading...</h1>} */}
        <div className="list container mt-5 pt-5">
          <ListGroup>
            {data === null ?
              <h1>Loading...</h1> :
              (data.length < 1 ?
                <h1>Data Not Found</h1> :
                data.map((item: { question: string; documentId: string })=>{
                  return <ListGroup.Item
                  as="li" key={item.documentId}
                  className="d-flex justify-content-between align-items-start"
                >
                  <div className="ms-2 me-auto">
                    {item.question}
                  </div>
                  <Button onClick={() => deleteTodo(item.documentId)} className='m-2' variant="danger">Delete</Button>
                </ListGroup.Item>
                })
              )}

          </ListGroup>
        </div>
      </div>
    </div>
  )
}

export default Allquestion