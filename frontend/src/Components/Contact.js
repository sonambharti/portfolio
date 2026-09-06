import { useState } from 'react';
import '../Style/Contact.css';

export default function Contact() {
    const [email, setEmail] = useState('');
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [feedback, setFeedback] = useState({ type: "", message: "" });

    function handleSubmit(e) {
        e.preventDefault();
    
        if (!email || !subject || !message){
            setFeedback({ type: "error", message: "All fields are required!" });
            return;
        } 
        setLoading(true);
        setFeedback({ type: "", message: "" });

        // fetch(`https://portfolio-ehid.onrender.com/send-email`, {
        fetch(`https://nodemail-backend.onrender.com/send-email`, {
        // fetch(`http://localhost:5000/send-email`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, subject, message }),
        })
        .then(response => {
            if (!response.ok) {
                setFeedback({ type: "error", message: "Message couldn't be sent. Please try again." });
                throw new Error('Failed to send email');
            }
            return response.text();
        })
        .then(() => {
            setFeedback({ type: "success", message: "Message sent. I'll get back to you soon." });
            setEmail("");
            setSubject("");
            setMessage("");
        })
        .catch((error) => {
            console.error('Error:', error);
            setFeedback({ type: "error", message: "Message couldn't be sent. Please try again." });
        })
        .finally(() => setLoading(false));
    }

    return (
        <div className="contact-me container">
            <h1 className="section-heading">Get in Touch</h1>
            <div className='feedback-container'>
                {feedback.message && (
                    <div
                    className={`feedback ${feedback.type === "success" ? "success" : "error"}`}
                    >
                    {feedback.message}
                    </div>
                )}
            </div>
            <form className="contact-me-form" onSubmit={handleSubmit}>

                <span>
                    <label htmlFor='email-id'>Email</label>
                    <input className='email' id='email-id' type='text'
                    placeholder='you@example.com'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    />
                </span>

                <span>
                    <label htmlFor='subject-id'>Subject</label>
                    <input className='subject' id='subject-id' type='text'
                    placeholder='What is this about?'
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    />
                </span>

                <span>
                    <label htmlFor='message-id'>Message</label>
                    <textarea className='message' id='message-id'
                    placeholder='Tell me a bit about the project or opportunity.'
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    />
                </span>
                <button type="submit" disabled={loading}>{loading ? 'Sending…' : 'Send Message'}</button>
            </form>
        </div>
    );
}