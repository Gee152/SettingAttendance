import express from 'express'
import http from 'http'
import bodyParser from 'body-parser'
import { Router } from '../router'

class CmdRest {
    private app: express.Application

    constructor() {
        this.app = express()
        this.middleware()
        this.router()
    }

    private router() {
        new Router(this.app)
    }

    private middleware() {
        this.app.use(bodyParser.json({limit: '100mb'}))
        this.app.use(bodyParser.urlencoded({ extended: false }))
    }

    public server(): void {
        const server = http.createServer(this.app)

        server.listen(3333, () => {
            console.log(`app is running... at port 3333`)
        })
    }
}

export {
    CmdRest
}
