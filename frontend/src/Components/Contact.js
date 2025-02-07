import { useState } from 'react';
import '../Style/Contact.css';


export default function Contact() {
    const [email, setEmail] = useState('');
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');

    function handleCLick(){

    }

    function handleSubmit(e){
        e.preventDefault();

        if (!email || !subject || !message) return;

        setEmail("");
        setSubject("");
        setMessage("");

    }
    return (
        <div className='contact-me'>
            <h1 className='contact-head'>Get in Touch</h1>
            <form className="contact-me-form" onSubmit={handleSubmit}>
                <span>
                    <label for='email-id'>Email</label>
                    <input className='email' id='email-id' type='text' 
                    placeholder='Enter your Email id' 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    />
                </span>

                <span>
                    <label for='subject-id'>Email Subject</label>
                    <input className='subject' id='subject-id' type='text'  
                    placeholder='Enter your subject' 
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    />
                </span>

                <span>
                    <label for='message-id'>Message</label>
                    <textarea className='message' id='message-id'
                    placeholder='Enter your message' 
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    />
                </span>
                <button onClick={handleCLick}>Submit</button>
            </form>
        </div>
    )
}