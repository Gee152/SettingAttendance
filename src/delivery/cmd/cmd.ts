import express from 'express'
import http from 'http'
import cors from 'cors'
import bodyParser from 'body-parser'
import swaggerUi from 'swagger-ui-express'
import { swaggerDocument } from '../swagger'
import { Router } from '../router'

class CmdRest {
    private app: express.Application

    constructor() {
        this.app = express()
        this.middleware()
        this.swagger()
        this.router()
    }

    private swagger() {
        this.app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
        this.app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
    }

    private router() {
        new Router(this.app)
    }

    private middleware() {
      this.app.use(cors({
      origin: 'http://localhost:3000',
      credentials: true
    }))

        this.app.use(bodyParser.json({limit: '100mb'}))
        this.app.use(bodyParser.urlencoded({ extended: false }))
    }

    public server(): void {
        const server = http.createServer(this.app)

        server.listen(3333, () => {
            console.log(`app is running... at port 3333`)
            console.log(`Swagger documentation available at http://localhost:3333/docs`)
        })
    }
}

export {
    CmdRest
}
