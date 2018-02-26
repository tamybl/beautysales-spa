const express = require('express');
const ejs = require('ejs');
const paypal = require('paypal-rest-sdk');

paypal.configure({
  'mode': 'sandbox', //sandbox or live
  'client_id': 'Ac0oF6C7xLBiLkrE2aYARnWdZQ5PYQ7LtUDaF-RA4esR1pudQMFqniT_sMAtx1TWjEj58jY99xpxaprv',
  'client_secret': 'ECYvDBVSS4Z3YLc5wWrNiHvNrQCdx2lm7lCLNPV4FqitMsuzPS0skQzDMJ5dofIfKGUZtZBmCwj3C-oh'
});

const app = express();

app.set('view engine', 'ejs');

app.get('/', (req, res) => res.render('index'));

app.post('/pay', (req, res) => {
  const create_payment_json = {
    "intent": "sale",
    "payer": {
        "payment_method": "paypal"
    },
    "redirect_urls": {
        "return_url": "http://localhost:3000/success",
        "cancel_url": "http://localhost:3000/cancel"
    },
    "transactions": [{
        "item_list": {
            "items": [{
                "name": "Red Sox Hat",
                "sku": "001",
                "price": "25.00",
                "currency": "USD",
                "quantity": 1
            }]
        },
        "amount": {
            "currency": "USD",
            "total": "25.00"
        },
        "description": "Hat for the best team ever"
    }]
  };

  paypal.payment.create(create_payment_json, function ( error, payment) {
    if (error) {
      throw error;
    }
    else {
      console.log('Crerate  Payment Response');
      console.log(payment);
      res.send('test');

    }
  })

});

app.listen(3000, () => console.log ('Server Started'));