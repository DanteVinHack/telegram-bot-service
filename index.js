// Imports
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const Routers = require('./routes/index');
const fileUpload = require('express-fileupload');

const mongoose = require('mongoose');
const Setting = require('./models/Setting');
const Order = require('./models/Order');

// Telegram bot
const startBot = require('./telegram-bot');

// Create Server
const { createServer } = require('http');

const PORT = process.env.PORT ?? 4000;

const WebSocketServer = require('websocket').server;

const app = express();

app.use(express.json());
app.use(fileUpload());
app.use(morgan('dev'));
app.use(cors({ origin: 'http://localhost:3000' }));

// Connection all routers
const connectionRouters = (routers) => {
  routers.forEach(router => app.use(`/${router.name}`, router.router))
}

const serverStart = async () => {
  try {
    // Connection dependencies
    connectionRouters(Routers)

    // Connection mongoose
    await mongoose.connect('mongodb://localhost:27017/telegram-bot')
    console.log('Database connected...')
    
    // Get settings
    const settings = await Setting.findOne();

    // Start Bot
    if (settings?.token) {
      await startBot(settings.token, settings.startText, settings.startImage);
    }

    const httpServer = createServer(app);

    // Start Server
    httpServer.listen(PORT, () => console.log(`Server started on port: ${PORT}`));

    // WebSocket
    const wss = new WebSocketServer({ httpServer })

    wss.on('request', request => {
      const connection = request.accept(null , request.origin);
    
      connection.on('open', () => {
        console.log('Server connection')
      })

      connection.on('message', async ({ utf8Data: data }) => {

        if (data === 'orders') {
          const orders = JSON.stringify(await Order.find())
          
          setInterval(async () => {
            const newOrders = JSON.stringify(await Order.find())

            if (newOrders !== orders) {
              connection.send(newOrders)
            }
          }, 3000)

        }

      })

      connection.on('close', () => {
        console.log('Server closed')
      })
    
    })

  } catch (error) {
    console.log(error.message)
  }
}

serverStart()
