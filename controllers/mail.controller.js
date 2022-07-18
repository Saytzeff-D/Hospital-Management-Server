const nodemailer=require('nodemailer')

const transporter = nodemailer.createTransport({
    service: 'gmail',
    port: 465,
    secure: true,
    auth: {
      user:process.env.ADMIN_EMAIL,
      pass:process.env.ADMIN_PASSWORD
    }
  });
  const mailOptions = (id, email)=>{
    const healthId = id
        return {
        from: process.env.ADMIN_EMAIL,
        to: email,
        subject: 'Hospital Management Software: Patient Id Retrieval',
        html: `Dear Patient, Welcome to the Hospital Management Software. We care about your wellbeing and health status. Below is your Patient Id. Do not disclose this to anyone.
        <br>   
        <b>
        Health ID: ${healthId}       
        </b>
        `
        }
};

  let mailFunc = { transporter, mailOptions }
  module.exports = mailFunc