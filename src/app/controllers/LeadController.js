import * as Yup from 'yup';

import Queue from '../../lib/Queue';
import RewardMail from '../jobs/RewardMail';

import Lead from '../schemas/Lead';
import Reward from '../schemas/Reward';

class LeadController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string()
        .required('Nome é obrigatório')
        .min(3, 'Nome muito curto'),
      email: Yup.string()
        .email('Digite um email válido')
        .required('Email é obrigatório'),
      phone: Yup.string()
        .matches(/(\(\d{2}\)\s)?(\d{4,5}\-\d{4})/, 'Telefone inválido')
        .min(14, 'Telefone inválido')
        .max(15, 'Telefone inválido')
        .required('Telefone é obrigatório'),
    });
    const isValid = await schema.isValid(req.body);

    if (!isValid) {
      schema
        .validate(req.body)
        .catch(err => res.status(400).json({ error: err.message }));
    }

    const { email, phone } = req.body;

    const emailExists = await Lead.findOne({ email });

    if (emailExists) {
      return res.status(400).json({ error: 'Email já cadastrado' });
    }

    const phoneExists = await Lead.findOne({ phone });

    if (phoneExists) {
      return res.status(400).json({ error: 'Telefone já cadastrado' });
    }

    const { name } = req.body;

    const lead = await Lead.create({
      name,
      email,
      phone,
    });

    const count = await Reward.countDocuments({
      $expr: { $lt: ['$given', '$qty'] },
    });

    //
    // if (!count) {
    //   return res.status(400).json({ error: 'Acabaram os prémios' });
    // }

    if (count) {
      const random = Math.floor(Math.random() * count);
      const reward = await Reward.findOne(
        {
          $expr: { $lt: ['$given', '$qty'] },
        },
        null,
        { skip: random }
      );

      reward.given += 1;
      await reward.save();

      lead.reward = {
        reward_id: reward.id,
        name: reward.name,
      };
      await lead.save();
    }

    await Queue.add(RewardMail.key, { lead });

    return res.json(lead);
  }
}

export default new LeadController();
