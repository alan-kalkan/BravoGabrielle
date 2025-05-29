import Stripe from 'stripe';

const stripe = new Stripe('sk_test_51RTSls4S5ZxhstonEFesKWPsyQjGv4iZi9FnfOjn1khKTrcwj0ePMiTnEvsWh0qQmrmBGsx38yCYvxJipWf5l6gb00hRfZMhjQ');

stripe.products.create({
  name: 'Starter Subscription',
  description: '$12/Month subscription',
}).then(product => {
  stripe.prices.create({
    unit_amount: 1200,
    currency: 'usd',
    recurring: {
      interval: 'month',
    },
    product: product.id,
  }).then(price => {
    console.log('Success! Here is your starter subscription product id: ' + product.id);
    console.log('Success! Here is your starter subscription price id: ' + price.id);
  });
});