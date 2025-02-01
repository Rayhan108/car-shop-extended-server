import express, { Application, Request, Response } from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser';
const app:Application =express()
//parsers
app.use(express.json())
app.use(cookieParser())
app.use(cors({ origin: ['http://localhost:5173'], credentials: true }));

app.get('/', (req:Request, res:Response) => {
  res.send('Car Store Server is Running...')
})

export default app;