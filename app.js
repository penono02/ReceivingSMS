'use strict';
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));



//Now, create a HTTP POST route to handle the requests
app.post('/', (req, res) =>{
  res.send(req.body);
  console.log(req.body);
    handleParams(req.body, res);
});

// Then define the handlParams function

function handleParams(params, res){
    if(!params.to || !params.msisdn){
      console.log('This is not a valid inbound SMS message!');
    }else{
      console.log('Success');
      let incomingData ={
        messageId: params.messageId,
        from: params.msisdn,
        text: params.text,
        type: params.type,
        timestamp: params['message-timestamp']
      }
      res.send(incomingData);
    }
    res.status(200).end();
}

const server = app.listen(3000, ()=>{

  console.log('Express server listening on port %d in %s mode', server.address().port, app.settings.env);
});
