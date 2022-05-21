import { getAccessToken, handleAuth } from '@auth0/nextjs-auth0'
import express, { Response, Request, NextFunction } from 'express'

const app = express()
app.use(express.json({ limit: '200mb' }))
app.use(
  express.urlencoded({
    extended: true,
    limit: '200mb',
    parameterLimit: 200000,
  }),
)

app.use(async (req: Request, res: Response, next: NextFunction) => {
  res.setHeader('Cache-Control', 's-max-age=1, stale-while-revalidate')
  next()
})

app.get('/api/healthz', (_: Request, res: Response) => res.sendStatus(200))

app.get('/api/v1/test', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { accessToken } = await getAccessToken(req, res, {
      scopes: process.env.AUTH0_SCOPE!.split(' '),
    })
    res.status(200).send(accessToken)
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
