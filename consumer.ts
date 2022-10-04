import amqp, {Channel, Connection, Message} from "amqplib/callback_api"

amqp.connect('amqp://localhost', function(error0: Error, connection: Connection) {
  if (error0) {
    throw error0;
  }
  connection.createChannel(function(error1: Error, channel: Channel) {
    if(error1){
        throw error1
    }

    const queue = "MyOwnQUEUE";
    const msg = "Kek lol kek cheburek";

    channel.assertQueue(queue, {durable: false})

    channel.sendToQueue(queue, Buffer.from(msg))
    channel.sendToQueue(queue, Buffer.from(msg + "2"))
    console.log("sended msg", msg)

    // channel.consume(queue, (msg)=>{
    //     const res = msg.content.toString();
    //     console.log(res)
    //     // console.log(msg)
    // }, {
    //     noAck: true
    // })
  });
});
