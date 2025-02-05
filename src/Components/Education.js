import '../Style/Education.css';
// import Navbar from './Navbar';
const {educationData} = require('../data/EducationData.js');


function Degree({education, isLeft}){
    return (
        <div className='degree'>
            <span>
                <h2 className='deg' id="deg-id">{education.Degree}</h2>
                <p id="spec" style={{'fontStyle': 'italic'}}>{education.Specialization}</p>
                <h3 className='deg-marks' id="marks">{education.MarksFormat === 'CGPA' ? education.Marks + '/10' : education.Marks}</h3>
            </span>
            <h2 className='deg'>{education.College}</h2>
            <h3 className='deg-marks'>{education.PassingYear}</h3>
            <p>{education.Location}</p>
            
        </div>
    )
}
export default function Education (){
    return (
        <div className="education">
            <h1 className='head'>Qualifications</h1>
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