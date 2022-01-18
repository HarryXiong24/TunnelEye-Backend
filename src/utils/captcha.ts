import captcha from 'svg-captcha';

export const createCaptcha = () => {
  return captcha.create({
    size: 4,
    ignoreChars: '0o1iIl',
    noise: 3,
    color: true,
    background: '#fff',
    fontSize: 60,
  });
};

export default createCaptcha;
