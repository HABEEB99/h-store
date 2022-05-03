export default {
  name: 'paymentResult',
  title: 'Payment Result',
  type: 'object',
  fields: [
    { name: 'paymentStatus', title: 'Payment Status', type: 'boolean' },
    { name: 'paymentId', title: 'Payment Id', type: 'string' },
    { name: 'payerEmail', title: 'Payer Email', type: 'string' },
  ],
};
