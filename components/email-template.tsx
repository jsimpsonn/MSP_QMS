import { Resend } from 'resend';
import { useState } from 'react';

const EmailTemplate = () => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const resend = new Resend('re_KwyUgPWc_C7ZjfdUBLRS8WYuYWM8FqM2L');

  const sendEmail = () => {
    setLoading(true);
    resend.emails.send({
      from: 'onboarding@resend.dev',
      to: 'jsimpson@mssteelpro.com',
      subject: 'Hello World',
      html: '<p>Congrats on sending your <strong>first email</strong>!</p>'
    }).then(() => {
      setMessage('Email sent successfully!');
      setLoading(false);
    }).catch(error => {
      setMessage('Failed to send email.');
      setLoading(false);
    });
  };

  return (
    <div>
      <button onClick={sendEmail} disabled={loading}>
        {loading ? 'Sending...' : 'Send Email'}
      </button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default EmailTemplate;