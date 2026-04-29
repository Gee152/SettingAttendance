import "reflect-metadata"
import { CmdRest } from "./delivery/cmd/cmd"

class Cmd {
    private CMD_REST = 'rest'

    main() {
        this.initDev()
        //this.init()
    }
    
    async checkEnvVar(): Promise<boolean> {
        const CMD = process.env.CMD
        const DATABASE_APP_POSTGRESQL_URI = await ('DATABASE_APP_POSTGRESQL_URI')
    
        if (!CMD) {
          console.log("var CMD not defined")
          return false
        }
    
        if (!DATABASE_APP_POSTGRESQL_URI) {
          console.log('var DATABASE_APP_POSTGRESQL_URI not defined')
          return false
        } else {
          process.env['DATABASE_APP_POSTGRESQL_URI'] = DATABASE_APP_POSTGRESQL_URI
        }

        return true
        
      }
    
      initDev(): void {
        const { DB_USERNAME, DB_PASSWORD, DB_HOST, DB_PORT, DB_DATABASE } = process.env
        process.env['DATABASE_APP_POSTGRESQL_URI'] = `postgres://${DB_USERNAME || 'postgres'}:${DB_PASSWORD || 'postgres'}@${DB_HOST || 'localhost'}:${DB_PORT || '5432'}/${DB_DATABASE || 'messaging_app'}`
            
        new CmdRest().server()
      }


      /* async init(): Promise<void> {
        if (await this.checkEnvVar()) {
          const CMD = process.env.CMD
    
          if (CMD === this.CMD_REST) {
            new CmdRest().server()
          }
        }
      } */
}

new Cmd().main()

export {
    Cmd
  }