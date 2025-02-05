import '../Style/Education.css';
// import Navbar from './Navbar';
const {educationData} = require('../data/EducationData.js');


function Degree({education, isLeft}){
    return (
        <div className='degree'>
            <span>
                <h2 id="deg">{education.Degree}</h2>
                <p id="spec" style={{'fontStyle': 'italic'}}>{education.Specialization}</p>
                <h3 id="marks">{education.MarksFormat === 'CGPA' ? education.Marks + '/10' : education.Marks}</h3>
            </span>
            <h2>{education.College}</h2>
            <h3>{education.PassingYear}</h3>
            <p>{education.Location}</p>
            
        </div>
    )
}
export default function Education (){
    return (
        <div className="education">
            <h1>Qualifications</h1>
            <div className="edu">
                {
                    educationData.map((education, indx) => (
                        <Degree education={education} key={indx} />
                    ))
                }
            </div>
        </div>
    )
}