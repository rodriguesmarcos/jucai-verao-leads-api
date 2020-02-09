import Mail from '../../lib/Mail';

class RewardMail {
  get key() {
    return 'RewardMail';
  }

  async handle({ data }) {
    const { name, email, reward } = data.lead;
    const mailType = reward ? 'success' : 'fail';

    const mailData = {
      fail: {
        subject: `Que pena ${name}! Os brindes acabaram :(`,
        template: 'reward-fail',
      },
      success: {
        subject: `Parabéns ${name}, você ganhou um brinde`,
        template: 'reward-success',
      },
    };

    await Mail.sendMail({
      to: `${name} <${email}>`,
      subject: mailData[mailType].subject,
      template: mailData[mailType].template,
      context: {
        name,
        reward,
      },
    });
  }
}

export default new RewardMail();
