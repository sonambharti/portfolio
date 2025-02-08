import { useState } from 'react';
import '../Style/Contact.css';
// const edot = require('dotenv').config({path: 'frontend/.env'});

export default function Contact() {
    const [email, setEmail] = useState('');
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');

    function handleSubmit(e) {
        e.preventDefault();
    
        if (!email || !subject || !message) return;
    
        fetch(`http://localhost:5000/send-email`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, subject, message }),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to send email');
            }
            return response.text();
        })
        .then(data => {
            console.log('Success:', data);
            alert('Email sent successfully!'); // Show success alert
            setEmail("");
            setSubject("");
            setMessage("");
        })
        .catch((error) => {
            console.error('Error:', error);
            alert('Failed to send email. Please try again.'); // Show error alert
        });
    }

    return (
        <div className='contact-me'>
            <h1 className='contact-head'>Get in Touch</h1>
            <form className="contact-me-form" onSubmit={handleSubmit}>
                <span>
                    <label htmlFor='email-id'>Email</label>
                    <input className='email' id='email-id' type='text' 
                    placeholder='Enter your Email id' 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    />
                </span>

                <span>
                    <label htmlFor='subject-id'>Email Subject</label>
                    <input className='subject' id='subject-id' type='text'  
                    placeholder='Enter your subject' 
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    />
                </span>

                <span>
                    <label htmlFor='message-id'>Message</label>
                    <textarea className='message' id='message-id'
                    placeholder='Enter your message' 
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    />
                </span>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}