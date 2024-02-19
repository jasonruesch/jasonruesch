export function Contact() {
  const emailRecipient = 'Jason Ruesch <jason.ruesch@me.com>';

  const handleSendEmail = () => {
    window.location.href = `mailto:${emailRecipient}`;
  };

  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-4">
      <h1 className="gradient-heading">
        <div className="flex items-center justify-center">
          <span className="heading-lg">Connect</span>
        </div>
        <div className="flex items-center justify-center">
          with&nbsp;
          <span className="heading-lg">Me</span>
        </div>
      </h1>
      <p className="max-w-lg text-center sm:max-w-screen-sm">
        Feel free to connect with me to discuss all things frontend development,
        share recommendations for must-watch shows, or exchange thoughts on the
        latest gaming adventures. Let's explore the digital world together!
      </p>
      <button type="button" className="btn-primary" onClick={handleSendEmail}>
        Send me an email
      </button>
    </div>
  );
}

export default Contact;
