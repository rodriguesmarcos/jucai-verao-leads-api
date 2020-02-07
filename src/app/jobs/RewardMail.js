import Mail from '../../lib/Mail';

class RewardMail {
  get key() {
    return 'RewardMail';
  }

  mailData(type) {
    return mailData[type];
  }

  async handle({ data }) {
    const { name, email, reward } = data.lead;
    const mailType = reward ? 'success' : 'fail';

    const mailData = {
      fail: {
        subject: 'Você não ganhou um prêmio.',
        template: 'reward-fail',
      },
      success: {
        subject: 'Você ganhou um prêmio.',
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
