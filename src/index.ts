import { Kafka } from 'kafkajs';

const kafka = new Kafka({
    clientId: 'my-app',
    brokers: ['localhost:9092'],
})

const producer = kafka.producer();
const consumer = kafka.consumer({ groupId: 'my-app3' });

const run = async()=> {
    await producer.connect();
    await producer.send({
        topic: 'quickstart-events',
        messages: [{
            value: 'Hello, World!',
        }]
    })

    await consumer.connect();
    await consumer.subscribe({
        topic: 'quickstart-events', fromBeginning: true
    })

    await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
            console.log({
                partition,
                offset: message.offset,
                value: message.value.toString(),
            })
        },

    })
}

run().catch(console.error);
