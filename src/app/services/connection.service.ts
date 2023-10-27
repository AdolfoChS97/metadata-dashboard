import axios from 'axios'

export default class ConnectionService {
    static async test(connection: any) {
        try {
            return await axios('http://localhost:4000/connection', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            data: connection
        })
        } catch (e) {
          throw e
        }
    }
}