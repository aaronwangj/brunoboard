import Navbar from '../components/navbar'

export default function about() {
    return <div className="h-screen w-screen">
    <Navbar isLanding={false} />
    <div id="about-wrapper" className="h-full w-full flex flex-col justify-center">
        <div className="block px-5 m-auto max-w-lg">
            <h1 className='font-bold text-3xl'>About</h1>
            <p className="font-semibold">The spectrum of problems that every individual encounters is bound to differ due to 
                different backgrounds and experiences, and the way in which we look at problems differs 
                as well. When different perspectives come together, one can get a better picture of the 
                world and the problems that exist in this world. Brunoboard was made for this purpose. 
                It is a casual platform for people to share their ideas, problems, concerns, complaints, 
                no matter big or small. All are welcome. 
            </p>
        </div>
    </div>
</div>
}