
(async () => {

    var neo4j = require('neo4j-driver')
  
    const URI = 'neo4j+s://b0362c08.databases.neo4j.io'
    const USER = 'neo4j'
    const PASSWORD = 'EY67C9MSuqJjbU-ZarxV40Eakor7UnuHiNGAKuXlgig'
    let driver
  
    try {
      driver = neo4j.driver(URI,  neo4j.auth.basic(USER, PASSWORD))
      const serverInfo = await driver.getServerInfo()
      console.log('Connection established')
      console.log(serverInfo)
    } catch(err) {
      console.log(`Connection error\n${err}\nCause: ${err.cause}`)
      await driver.close()
      return
    }
  
    // Use the driver to run queries
    
  
    await driver.close()

  })();


export default function Dashboard() {
    return(
        <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
            <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
                <h1 className="text-4xl font-serif font-bold">Dashboard Page</h1>
            </main>
        </div>
    );

}