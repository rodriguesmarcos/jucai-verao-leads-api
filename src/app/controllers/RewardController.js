import Reward from '../schemas/Reward';

class RewardController {
  async store(req, res) {
    const { name, qty } = req.body;

    const reward = await Reward.create({
      name,
      qty,
    });

    return res.json(reward);
  }
}

export default new RewardController();
