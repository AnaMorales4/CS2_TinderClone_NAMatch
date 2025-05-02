const ChatMessage = require('../models/ChatMessage');

module.exports = (io) => {
    io.on('connection', (socket) => {
        console.log('Conectado:', socket.id);
        socket.on('load history', async ({ senderId, receiverId }) => {
            try {
                const history = await ChatMessage.find({
                    $or: [
                        { senderId,   receiverId },
                        { senderId: receiverId, receiverId: senderId }
                    ]
                })
                    .sort({ timestamp: 1 })
                    .populate('senderId', 'name')
                    .populate('receiverId', 'name');

                socket.emit('history', history);
            } catch (err) {
                console.error('Error al cargar historial:', err);
            }
        });
        socket.on('join', (userId) => {
            socket.join(userId);
            console.log(`🟢 Usuario ${userId} se une a su sala`);
        });

        socket.on('chat message', async (data) => {
            const { senderId, receiverId, text } = data;
            console.log(`${senderId} → ${receiverId}: ${text}`);

            try {
                const saved = await ChatMessage.create({ senderId, receiverId, text });

                const populated = await ChatMessage.findById(saved._id)
                    .populate('senderId', 'name')
                    .populate('receiverId', 'name');

                [senderId, receiverId].forEach(id => {
                    io.to(id).emit('chat message', populated);
                });
            } catch (err) {
                console.error('Error al guardar o emitir mensaje:', err);
            }
        });

        socket.on('disconnect', () => {
            console.log('Desconectado:', socket.id);
        });
    });
};
