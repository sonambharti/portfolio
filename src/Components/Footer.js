import '../Style/Footer.css';

export default function Footer() {
    return (
        <footer className="footer">
            <div className="left">
                <ul>
                    <li><a href="https://linkedin.com/in/sonam-bharti-213127178" target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
                    <li><a href="https://medium.com/@sonam.iitjammu2023" target="_blank" rel="noopener noreferrer">Medium.com</a></li>
                </ul>
            </div>
            <div className="mid">
                <ul>
                    <li><a href="https://leetcode.com/u/2021pcs2040/" target="_blank" rel="noopener noreferrer">LeetCode</a></li>
                    <li><a href="https://www.geeksforgeeks.org/user/sonam_bharti/" target="_blank" rel="noopener noreferrer">GeeksForGeeks</a></li>                    
                </ul>
            </div>
            <div className="right">
                <ul>
                    <li><a href="mailto:sonam.iitjammu2023@gmail.com" target="_blank" rel="noopener noreferrer">Email</a></li>
                    <li><a href="https://github.com/sonambharti" target="_blank" rel="noopener noreferrer">Github</a></li>                    
                </ul>
            </div>
            <p>Copyright @ Crazy Coder❤️</p>
        </footer>
    )
}