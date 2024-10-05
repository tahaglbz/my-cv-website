import { Button } from "@/components/ui/button";
import { FiDownload } from "react-icons/fi";
import Social from "@/components/Social";

const Home = () => {
  return (
    <section className="h-full">
      <div className="container mx-auto h-full">
        <div className="flex flex-col xl:flex-row items-center justify-between xl:pt-8 xl:pb-24">
          {/* text */}
          <div className="text-center xl:text-left">
            <span className="text-xl">Software Engineer</span>
            <h1 className="h1">Hello I&apos;m <br />
              <span>Taha Gülbaz</span></h1>
            <p className="max-w-[500px] mb-9 text-white/80">I am a 3rd year software engineering student. I am working on areas such as mobile application development, backend development and data science. I develop projects for competitions such as Teknofest and TÜBİTAK. </p>
            {/* btn and socials */}
            <div className="flex flex-col xl:flex-row items-center gap-8">
              <Button variant="outline" size="lg" className="uppercase flex items-center gap-2">
                <span>Download CV</span>
                <FiDownload className="text-xl" />
              </Button>
              <div className="mb-8 xl:mb-0"><Social/></div>
            </div>
          </div>
          {/* photo */}
          <div>photo</div>

        </div>
      </div> 
    </section>
  )
}

export default Home
