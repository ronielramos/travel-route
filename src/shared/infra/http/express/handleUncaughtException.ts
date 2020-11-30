import { Server } from 'http'

/**
 * Provide a graceful shutdown
 * @param server ther server what will be closed
 */
export default function handleUncaughtException (server: Server): void {
  const terminate = () => setTimeout(() => process.exit(), 3000)

  server.close()

  terminate()
}
