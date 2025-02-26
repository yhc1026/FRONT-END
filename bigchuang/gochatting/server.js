const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8080 });

// 存储所有连接的客户端
const clients = new Set();

wss.on('connection', (ws) => {
    clients.add(ws);

    // 处理客户端发送的消息
    ws.on('message', (message) => {
        // 将消息广播给所有其他客户端
        clients.forEach((client) => {
            if (client!== ws && client.readyState === WebSocket.OPEN) {
                client.send(message);
            }
        });
    });

    // 处理客户端断开连接
    ws.on('close', () => {
        clients.delete(ws);
    });
});

console.log('信令服务器已启动，监听端口 8080');