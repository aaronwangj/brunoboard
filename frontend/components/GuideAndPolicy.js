
export default function GuideAndPolicy(props) {
    return <div className="mb-10 pb-4">
        <div id="policies" className="mb-10">
            <h1 className="font-extrabold text-2xl text-red-800">Usage and Privacy</h1>
            <p>By using Brunoboard, you consent to the policies outlined below:</p><br></br>

            <h2 className="font-extrabold text-lg">Data Collection and Usage</h2>
            <p>Brunoboard collects and stores information limited to what Google provides it upon
            login. This includes but is not limited to
            <ul className="ml-7 my-3" style={{ listStyleType: "disc" }}>
                    <li>Your name (as displayed by Google)</li>
                    <li>Your email address</li>
                    <li>The ID associated with your Google account</li>
                </ul>
        Brunoboard does not share data in any way to an external party. Data usage is reserved to
        the operations of the application as well as improving it.
        </p><br></br>

            <h2 className="font-extrabold text-lg">Proper Conduct</h2>
            <p>We at Brunoboard hope to create an environment in which diverse individuals can collaborate
            and interact in a positive and affirming way. Some behaviors that contribute to creating such an
            environment include
            <ul className="ml-7 my-3" style={{ listStyleType: "disc" }}>
                    <li>Using welcoming and including language</li>
                    <li>Reasonably respecting different viewpoints and experiences</li>
                    <li>Showing empathy towards other community members</li>
                    <li>Gracefully accepting constructive criticism</li>
                </ul>
        Brunoboard will not tolerate harassment of any kind. Examples of such inappropriate behaviors include:
            <ul className="ml-7 my-3" style={{ listStyleType: "disc" }}>
                    <li>Offensive comments related to gender, gender identity and expression, sexual orientation, disability, mental illness, neuro(a)typicality, physical appearance, pregnancy status, veteran status, political affiliation, marital status, body size, age, race, national origin, ethnic origin, nationality, immigration status, language, religion or lack thereof, or other identity marker.</li>
                    <li>Unwelcome comments regarding a person's lifestyle choices and practices, including those related to food, health, parenting, relationships, drugs, and employment.</li>
                    <li>Deliberate misgendering, using inappropriate pronouns, or use of "dead" or rejected names.</li>
                    <li>Unwanted sexual attention.</li>
                    <li>Jokes that resemble the above, even if meant satirically or ironically.</li>
                </ul>
            </p><br></br>

            <h2 className="font-extrabold text-lg">Anonymity</h2>
            <p>While users can post anonymously, this does not mean that users are not
            responsible for the content posted. "Anonymous" means that users browsing
            posts will not know the identity of the poster, but in the case of reports
            regarding extremely offensive or intentionally malicious content, it is at the discretion of the
            moderators to access the identity of the "anonymous" poster and act accordingly. Moderators
        will not try to access the identities of "anonymous" posters otherwise.</p>

        </div>
        <div id="guide" className="mb-10">
            <h1 className="font-extrabold text-2xl text-red-800">A Guide to Brunoboard</h1>
            <p>There is not a fixed, expected way to use this platform. Brunoboard started out as an attempt to connect aspiring entrepreneurs with
            similar ideas and goals. Over the course of its development, it has gradually
            turned into a more open community for all Brown students to share their ideas
            on arbitrary topics. This can be a mild inconvenience in your daily life, a major
            problem that you want solved, or even a crazy idea that you would be too intimidated
            to bring up to the people around you! The overarching aim is simply to bring together ideas
            in hopes of creating an empowering and inspiring environment.</p><br></br>

            <p className="mb-5">Brunoboard provides some functionalities to such goals:
                <ul className="ml-7 my-3" style={{ listStyleType: "disc" }}>
                    <li>Clicking on a user's name will display their personal bio, helping you understand
                     the perspective and background that belong to an idea.
                    </li>
                    <li>Clicking on a post's tags will display posts with similar tags, enabling a more efficient search
                     for relevent ideas.
                    </li>
                    <li>Brunoboard is under constant refinement, more functionalities are to come!</li>
                </ul>
            </p>
            

        </div>
    </div>
}