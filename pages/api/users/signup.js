import nc from 'next-connect';
import axios from 'axios';
import bcryptjs from 'bcryptjs';
import { config } from '../../../lib/config';
import signToken from '../../../lib/auth';
import client from '../../../lib/sanity';

const handler = nc();

handler.post(async (req, res) => {
  const projectId = config.projectId;
  const dataset = config.dataset;
  const sanityAuthToken = process.env.NEXT_PUBLIC_SANITY_AUTH_TOKEN;

  const createMutations = [
    {
      create: {
        _type: 'user',
        name: req.body.name,
        email: req.body.email,
        password: bcryptjs.hashSync(req.body.password),
        isAdmin: false,
      },
    },
  ];

  const existingUser = await client.fetch(
    `*[_type == 'user' && email == $email][0]`,
    {
      email: req.body.email,
    }
  );

  if (existingUser) {
    res.status(400).send({ message: 'Ooooops! User already exists' });
  }

  const { data } = await axios.post(
    `https://${projectId}.api.sanity.io/v1/data/mutate/${dataset}?returnIds=true`,
    { mutations: createMutations },
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${sanityAuthToken}`,
      },
    }
  );

  const userId = data.results[0].id;

  const user = {
    _id: userId,
    name: req.body.name,
    email: req.body.email,
    isAdmin: false,
  };

  const token = signToken(user);
  res.send({ ...user, token });
});

export default handler;
