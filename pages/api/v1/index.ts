import express, { Response, Request, NextFunction } from 'express'
import { PrismaClient } from '@prisma/client'

const app = express()
app.use(express.json({ limit: '200mb' }))
app.use(
  express.urlencoded({
    extended: true,
    limit: '200mb',
    parameterLimit: 200000,
  }),
)

app.use(async (_: Request, res: Response, next: NextFunction) => {
  res.setHeader('Cache-Control', 's-max-age=1, stale-while-revalidate')
  next()
})

const apiV1 = app.all('/api/v1')

apiV1.get('/', (_, res) => res.redirect('/')) // redirect after logged in

apiV1.get('/healthz', (_: Request, res: Response) => res.sendStatus(200))

apiV1.get('/test', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const prisma = new PrismaClient()
    const users = await prisma.user.findMany()
    return res.json(users)
  } catch (e) {
    console.error(e)
    next(e)
  }
})

app.use((err: Error, _: Request, res: Response, next: NextFunction) => {
  if (!res.headersSent) {
    // eslint-disable-next-line no-console
    console.error(err.stack)
    res.sendStatus(500)
    next()
  }
})

export default app

export const config = {
  api: {
    externalResolver: true,
    bodyParser: false,
  },
}
