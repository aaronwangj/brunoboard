import { useState } from 'react'
import firebase from '../firebase/firebase-config'

export default function EditUserInfo(props) {
    const user = props.user
    // const [biography, setBiography] = useState("")
    // const [interests, setInterests] = useState([])

    function MajorsDropDownList(props) {
        const [concentrationCount, setConcentrationCount] = useState(1)
        const handleButtonClick = e => {
            e.preventDefault()

            setConcentrationCount(cnt => cnt + 1)
        }

        return <div>
            {Array(concentrationCount).fill()
                .map((_, i) => <div key={i}><select className="w-1/2 mb-2 concentration-dropdown focus:outline-none border-b-4 
                                                border-gray-400 focus:border-green-600" tabIndex="-1">
                <option value="">Select a (Prospective) Concentration</option> 
                <option value="AFRI-AB">Africana Studies - AB</option> 
                <option value="AMST-AB">American Studies - AB</option> 
                <option value="ANTH-AB-ANTA">Anthropology - AB (Anthropological Archaeology)</option> 
                <option value="ANTH-AB-ANTB">Anthropology - AB (Biological Anthropology)</option> 
                <option value="ANTH-AB-ANTG">Anthropology - AB (General Anthropology)</option> 
                <option value="ANTH-AB-LANT">Anthropology - AB (Linguistic Anthropology)</option> 
                <option value="ANTH-AB-ANTM">Anthropology - AB (Medical Anthropology)</option> 
                <option value="ANTH-AB-ANTS">Anthropology - AB (Socio-cultural Anthropology)</option> 
                <option value="APMA-AB">Applied Mathematics - AB</option> 
                <option value="APMA-SCB">Applied Mathematics - SCB</option> 
                <option value="APMB-SCB">Applied Mathematics-Biology - SCB</option> 
                <option value="APMC-SCB">Applied Mathematics-Computer Science - SCB</option> 
                <option value="APME-AB-ADEC">Applied Mathematics-Economics - AB (Advanced Economics)</option> 
                <option value="APME-AB-MAFI">Applied Mathematics-Economics - AB (Mathematical Finance)</option> 
                <option value="APME-SCB-ADEC">Applied Mathematics-Economics - SCB (Advanced Economics)</option> 
                <option value="APME-SCB-MAFI">Applied Mathematics-Economics - SCB (Mathematical Finance)</option> 
                <option value="ARAN-AB">Archaeology &amp; Ancient World - AB</option> 
                <option value="ARCT-AB">Architecture - AB</option> 
                <option value="ASTR-AB">Astronomy - AB</option> 
                <option value="BDS-AB">Behavioral Decision Sciences - AB</option> 
                <option value="BCHM-SCB">Biochemistry &amp; Molecular Biology - SCB</option> 
                <option value="BIOL-AB">Biology - AB</option> 
                <option value="BIOL-SCB">Biology - SCB</option> 
                <option value="ENBI-SCB">Biomedical Engineering - SCB</option> 
                <option value="BIOP-SCB">Biophysics - SCB</option> 
                <option value="BEO-AB-BUSE">Business, Entrepreneurship and Organizations - AB (Business Economics)</option> 
                <option value="BEO-AB-ETCM">Business, Entrepreneurship and Organizations - AB (Entrepreneurship &amp; Tech Mgmt)</option> 
                <option value="BEO-AB-ORGS">Business, Entrepreneurship and Organizations - AB (Organizational Studies)</option> 
                <option value="CHPH-SCB">Chemical Physics - SCB</option> 
                <option value="CHEM-AB">Chemistry - AB</option> 
                <option value="CHEM-SCB">Chemistry - SCB</option> 
                <option value="CHEM-SCB-CHBI">Chemistry - SCB (Chemical Biology)</option> 
                <option value="CHEM-SCB-MATL">Chemistry - SCB (Materials)</option> 
                <option value="CLAS-AB">Classics - AB</option> 
                <option value="CLAS-AB-GKLN">Classics - AB (Greek and Latin)</option> 
                <option value="CLAS-AB-GRSA">Classics - AB (Greek and Sanskrit)</option> 
                <option value="CLAS-AB-GRKK">Classics - AB (Greek)</option> 
                <option value="CLAS-AB-LTSA">Classics - AB (Latin and Sanskrit)</option> 
                <option value="CLAS-AB-LTIN">Classics - AB (Latin)</option> 
                <option value="CLAS-AB-SANS">Classics - AB (Sanskrit)</option> 
                <option value="CLAS-AB-SACL">Classics - AB (South Asian Classics)</option> 
                <option value="COGN-AB">Cognitive Neuroscience - AB</option> 
                <option value="COGN-SCB">Cognitive Neuroscience - SCB</option> 
                <option value="COGS-AB">Cognitive Science - AB</option> 
                <option value="COGS-SCB">Cognitive Science - SCB</option> 
                <option value="COLT-AB-LTRN">Comparative Literature - AB (Literary Translation)</option> 
                <option value="COLT-AB-LITC">Comparative Literature - AB (Literature in Three Languages)</option> 
                <option value="COLT-AB-LITB">Comparative Literature - AB (Literature in Two Languages)</option> 
                <option value="CSBI-AB">Computational Biology - AB</option> 
                <option value="CSBI-SCB">Computational Biology - SCB</option> 
                <option value="COMP-AB">Computer Science - AB</option> 
                <option value="COMP-SCB">Computer Science - SCB</option> 
                <option value="CSEC-AB">Computer Science-Economics - AB</option> 
                <option value="CSEC-SCB">Computer Science-Economics - SCB</option> 
                <option value="CTMP-AB-HUMN">Contemplative Studies - AB (Humanities)</option> 
                <option value="CTMP-AB-SCI">Contemplative Studies - AB (Sciences)</option> 
                <option value="DEVL-AB">Development Studies - AB</option> 
                <option value="EMOW-AB">Early Modern World - AB</option> 
                <option value="EAST-AB">East Asian Studies - AB</option> 
                <option value="ECON-AB">Economics - AB</option> 
                <option value="ECON-AB-BSEC">Economics - AB (Business Economics)</option> 
                <option value="EDUC-AB">Education Studies - AB</option> 
                <option value="EGYA-AB-ASYR">Egyptology &amp; Assyriology - AB (Assyriology)</option> 
                <option value="EGYA-AB-EGYT">Egyptology &amp; Assyriology - AB (Egyptology)</option> 
                <option value="ENGN-AB">Engineering - AB</option> 
                <option value="ENGN-SCB-CHE">Engineering - SCB (Chemical)</option> 
                <option value="ENGN-SCB-CMPT">Engineering - SCB (Computer)</option> 
                <option value="ENGN-SCB-ELCT">Engineering - SCB (Electrical)</option> 
                <option value="ENGN-SCB-ENVR">Engineering - SCB (Environmental)</option> 
                <option value="ENGN-SCB-MATL">Engineering - SCB (Materials)</option> 
                <option value="ENGN-SCB-MECH">Engineering - SCB (Mechanical)</option> 
                <option value="ENPH-SCB">Engineering and Physics - SCB</option> 
                <option value="ENGL-AB">English - AB</option> 
                <option value="EVSC-SCB">Environmental Science - SCB</option> 
                <option value="EVST-AB">Environmental Studies - AB</option> 
                <option value="ETHS-AB">Ethnic Studies - AB</option> 
                <option value="FFS-AB">French &amp; Francophone Studies - AB</option> 
                <option value="GNSS-AB">Gender &amp; Sexuality Studies - AB</option> 
                <option value="GEOL-AB">Geological Sciences - AB</option> 
                <option value="GEOL-SCB">Geological Sciences - SCB</option> 
                <option value="GEOB-AB">Geology - Biology - AB</option> 
                <option value="GEOB-SCB">Geology - Biology - SCB</option> 
                <option value="GEOC-AB">Geology - Chemistry - AB</option> 
                <option value="GEOC-SCB">Geology - Chemistry - SCB</option> 
                <option value="GEOP-AB">Geology - Physics/Mathematics - AB</option> 
                <option value="GEOP-SCB">Geology - Physics/Mathematics - SCB</option> 
                <option value="GMST-AB">German Studies - AB</option> 
                <option value="HHBI-AB">Health and Human Biology - AB</option> 
                <option value="HSLC-AB">Hispanic Literatures and Cultures - AB</option> 
                <option value="HIST-AB">History - AB</option> 
                <option value="HIAA-AB">History of Art and Architecture - AB</option> 
                <option value="HIAA-AB-ARCH">History of Art and Architecture - AB (Architectural Studies)</option> 
                <option value="INTL-AB-PECS">International Relations - AB (Political Economy and Society)</option> 
                <option value="INTL-AB-SSOC">International Relations - AB (Security and Society)</option> 
                <option value="IAPA-AB-DEV">International and Public Affairs - AB (Development)</option> 
                <option value="IAPA-AB-POL">International and Public Affairs - AB (Policy and Governance)</option> 
                <option value="IAPA-AB-SEC">International and Public Affairs - AB (Security)</option> 
                <option value="ITAL-AB">Italian Studies - AB</option> 
                <option value="JUDS-AB">Judaic Studies - AB</option> 
                <option value="LACS-AB">Latin American &amp; Caribbean Studies - AB</option> 
                <option value="LING-AB">Linguistics - AB</option> 
                <option value="LING-SCB">Linguistics - SCB</option> 
                <option value="LITA-AB">Literary Arts - AB</option> 
                <option value="MATH-AB">Mathematics - AB</option> 
                <option value="MATH-SCB">Mathematics - SCB</option> 
                <option value="MACS-SCB">Mathematics-Computer Science - SCB</option> 
                <option value="MTEC-AB">Mathematics-Economics - AB</option> 
                <option value="MDVC-AB">Medieval Cultures - AB </option> 
                <option value="MDVC-AB-ANTQ">Medieval Cultures - AB (Late Antique Cultures)</option> 
                <option value="MIDE-AB">Middle Eastern Studies - AB</option> 
                <option value="MCMD-AB-PRAC">Modern Culture and Media - AB (Practice based)</option> 
                <option value="MCMD-AB-THEO">Modern Culture and Media - AB (Theory based)</option> 
                <option value="MUSC-AB">Music - AB</option> 
                <option value="NEUR-SCB">Neuroscience - SCB</option> 
                <option value="PHIL-AB">Philosophy - AB</option> 
                <option value="PHYS-AB">Physics - AB</option> 
                <option value="PHYS-AB-MAPH">Physics - AB (Mathematical)</option> 
                <option value="PHYS-SCB">Physics - SCB</option> 
                <option value="PHYS-SCB-ASPH">Physics - SCB (Astrophysics)</option> 
                <option value="PHYS-SCB-BIPH">Physics - SCB (Biological)</option> 
                <option value="PHYS-SCB-MAPH">Physics - SCB (Mathematical)</option> 
                <option value="PHPH-AB">Physics and Philosophy - AB</option> 
                <option value="POLS-AB">Political Science - AB</option> 
                <option value="POBR-AB">Portuguese and Brazilian Studies - AB</option> 
                <option value="PSYC-AB">Psychology - AB</option> 
                <option value="PSYC-SCB">Psychology - SCB</option> 
                <option value="PUBH-AB">Public Health - AB</option> 
                <option value="PLCY-AB">Public Policy - AB</option> 
                <option value="RELS-AB">Religious Studies - AB</option> 
                <option value="STS-AB">Science, Technology, and Society - AB</option> 
                <option value="SLAV-AB">Slavic Studies - AB</option> 
                <option value="SAR-SCB">Social Analysis and Research - SCB</option> 
                <option value="SOC-AB">Sociology - AB</option> 
                <option value="SOC-AB-ORGA">Sociology - AB (Organizational Studies)</option> 
                <option value="SAST-AB">South Asian Studies - AB</option> 
                <option value="STAT-SCB">Statistics - SCB</option> 
                <option value="TAPS-AB-DANC">Theatre Arts &amp; Performance Studies - AB (Dance)</option> 
                <option value="TAPS-AB-PERF">Theatre Arts &amp; Performance Studies - AB (Performance Studies)</option> 
                <option value="TAPS-AB-THTA">Theatre Arts &amp; Performance Studies - AB (Theatre Arts)</option> 
                <option value="URBN-AB">Urban Studies - AB</option> 
                <option value="VISA-AB">Visual Arts - AB</option> 
            </select></div>)}
            <button className="text-sm text-gray-400 hover:text-md hover:text-gray-600" onClick={handleButtonClick}>+ Add a concentration</button>
        </div> 
            
    }
    
    const HorizontalDivider = () => {
        return <div className="my-5"></div>
    }

    const handleUserSubmit = e => {
        e.preventDefault()
        const dropDowns = Array.from(document.getElementsByClassName("concentration-dropdown"))
        console.log(dropDowns.map(e => e.value))
        if (!dropDowns.every(dropDown => dropDown.value !== "")) {
            alert("Please don't leave any concentration select fields blank!")
            return
        }

        const biography = document.getElementById("change-biography-input").value
        const selectedMajors = [...document.getElementsByClassName("concentration-dropdown")].map(e => e.options[e.selectedIndex].innerHTML)
        firebase.firestore().collection("testing-users").doc(user.uid).set(
            {
                name: user.displayName,
                biography: biography,
                // interests: [],
                majors: selectedMajors,
            }
        )
        .then(() => {
            console.log("New user documented in firestore.")
            // props.setIsFirstTimer(false)
            props.setDoneEditInfo(true)
        })
    }

    const BioTextarea = props => {
        return <textarea 
                id="change-biography-input"
                // onChange={e => props.setBiography(e.target.value)}
                className="w-1/2 focus:outline-none focus:border-green-600 focus:bg-gray-100 transition-colors
                                p-2 border-b-4 border-gray-400" placeholder="A short biography for yourself!"></textarea>
    }
    
    return <div>
        <form>
            {/* <input 
                onChange={setNa}
                className="w-1/2 focus:outline-none focus:border-green-600 focus:bg-gray-100 transition-colors
                            p-2 border-b-4 border-gray-400" placeholder="Your preferred name"></input><br></br> */}
            <HorizontalDivider />
            {/* drop down form for majors? */}
            <MajorsDropDownList key={0}/>
            {/* selection of interests */}
            <HorizontalDivider />
            <BioTextarea key={0} /><br></br>
            <HorizontalDivider />
            <button onClick={handleUserSubmit} className="w-auto p-2 bg-red-300 hover:bg-red-400 mt-2
                            transition-colors rounded-md text-sm font-semibold 
                            cursor-pointer">Submit</button>
        </form>
    </div>
}