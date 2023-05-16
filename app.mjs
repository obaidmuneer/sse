import express from 'express'
const app = express()

const PORT = process.env.PORT || 8081

app.get('/', (req, res) => {

    res.writeHead(200, {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache, no-transform',
        'Connection': 'keep-alive',
    })
    const sendData = async (data) => {
        res.write(`data:${JSON.stringify(data)}\n\n`)
    }

    const inter = setInterval(() => {
        const data = { msg: new Date }
        console.log(data);
        sendData(data)
    }, 1000)

    setTimeout(() => {
        clearInterval(inter)
        sendData('[DONE]');
        res.end();
    }, 5000);

})

app.listen(PORT, () => console.log(`SERVER is listening on ${PORT}`));