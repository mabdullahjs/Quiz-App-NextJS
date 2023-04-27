import { getAllData } from '@/config/firebaseMethod';
import React, { useEffect, useState } from 'react'
import { Button, Form } from 'react-bootstrap';

interface Ques {
    question:string;
    option01:string;
    option02:string;
    option03:string;
    rightAnswer:string;
}
function Quiz() {
    //state
    const [data, setData] = useState<[object:Ques] | null>(null);
    const [num, setNum] = useState(0);
    const [answer , setAnswer] = useState("");
    const [totalNo , setTotalNo] = useState(0);

    //get all data using useEffect
    useEffect(() => {
        getAllData('questions')
            .then((res) => {
                setData(res as [object:Ques])
                // console.log(data);

            })
            .catch((err) => {
                setData([])
            })
    }, [])

    //form change functions
    const handleOptionChange = (e) => {
        setAnswer(e.target.value);
      }
    
      const handleSubmit = (e) => {
        e.preventDefault();
        if(answer === data[num].rightAnswer){
            setTotalNo((preVal)=>preVal+1)
            console.log(totalNo);   
            console.log(answer);
        }
        else{
            console.log(answer);
            
        }
      }

    return (
        <div className="container">
            <h1 className='mt-3 text-center'>Quiz</h1>
            <div>
                {data === null ?
                    <h1>Loading...</h1> :
                    (data.length < 1 ?
                        <h1>Data Not Found</h1> :
                        <div>
                            <h2 className='mt-5'>Q:{num+1} {data[num].question}</h2>
                            <div className='mt-5'>
                            <form onSubmit={handleSubmit}>
                                <Form.Check
                                type={'radio'}
                                label={data[num].option01}
                                name='quiz'
                                className='mt-3 h4'
                                value={data[num].option01} checked={answer === data[num].option01} onChange={handleOptionChange}
                            />
                            <Form.Check
                                type={'radio'}
                                label={data[num].option02}
                                name='quiz'
                                className='mt-3 h4'
                                value={data[num].option02} checked={answer === data[num].option02} onChange={handleOptionChange}
                            />
                            <Form.Check
                                type={'radio'}
                                label={data[num].option03}
                                name='quiz'
                                className='mt-3 h4'
                                value={data[num].option03} checked={answer === data[num].option03} onChange={handleOptionChange}
                            />
                            <Button type='submit' className='mt-5' onClick={()=>console.log(answer)
                            }>Submit</Button>
                            </form>
                            </div>
                        </div>
                    )}
            </div>
        </div>
    )
}

export default Quiz