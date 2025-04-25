module.exports = (io) =>{
    io.on('connection', (socket) => {
        console.log('Conectado:', socket.id);
        socket.on('chat message', (data) => {
            console.log(`${data.senderId} → ${data.receiverId}: ${data.text}`);
            //db.registerChat(data.senderId,data.receiverId,data.text)
            io.emit('chat message', data);
        });
        socket.on('disconnect', () => {
            console.log('Desconectado:', socket.id);
        });
    });
}