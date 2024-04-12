'use client';

//React/Next
import { useEffect, useRef } from "react";
import { Flip } from "gsap/Flip";
import Image from "next/image";

//Animations
import { gsap } from "gsap-trial";
import { SplitText } from "gsap-trial/SplitText";
import { useGSAP } from "@gsap/react";

const sections = [
  {id: 1, section: 'Marketing', description: 'This is a description for the marketing section', gradient: 'bg-gradient-to-tl from-orange-300 to-rose-300'},
  {id: 2, section: 'Professional', description: 'This is a description for the professional section', gradient: 'bg-gradient-to-tl from-amber-200 to-yellow-400'},
  {id: 3, section: 'Hoddy', description: 'This is a description for the hobby section', gradient: 'bg-gradient-to-tl from-emerald-500 to-lime-600'},
]


gsap.registerPlugin(useGSAP, Flip, SplitText);


export default function Home() {

  return (
    <main className='px-5'>
      <div className="relative bg-black min-h-screen overflow-hidden px-5">
        <div className="md:absolute md:bottom-36 md:left-0 w-full flex flex-col justify-center items-center">
          <Name/>
        </div> 
        <div className='md:absolute md:-bottom-56 md:left-0 flex flex-col md:flex-row gap-4 justify-between items-center w-full'>
          {
            sections.map((section) => <SectionCard key={section.id} section={section}/>) 
          }
        </div>
      </div>
    </main>
  );
}

function Name() {
  const tl = useRef();
  const tl2 = useRef();
  const component = useRef(); // a ref for the root-level element; we use selector text for everything else.

  const toggleTimeline = () => {
    console.log(tl.current.reversed());
    tl.current.reversed(!tl.current.reversed());
    tl.current.reversed(false);
   // tl.current.revert();
  };

  useGSAP(() => {
    let split = SplitText.create("#name", {type:"chars"});
    
    tl.current = gsap
      .timeline({
        onComplete: function() { this.time(1).kill();}
      })
      .from(split.chars, { // <- selector text, scoped to this component!
        opacity: 0,
        y: 100,
        ease: "back",
        duration: 1,
        stagger: 0.1
      })
      .to(split.chars[0], { rotation: 360 }, 0)
      .to(split.chars[1], { scaleX: -1 })
      .to(split.chars[3], { scaleX: -1 })
      .to(split.chars[0], { rotation: 380 }).to(split.chars[0], { scaleY: 2, scaleX: 2 }, '<').to(split.chars[0], { y: -185 }, '<')
      .to([split.chars[1], split.chars[2], split.chars[3]], { x: 1000 }, '>')
      .to(split.chars[0], { x: 2000 }, '>')
      .revert()
    

  }, {scope: component}); // <- scopes all selector text inside the context to this component (optional, default is document)
  
  
  useEffect(() => {
    toggleTimeline();
  }, [])

  return(
    <div ref={component}>
      <h1 id='name' className='font-mori tracking-widest font-bold text-9xl sm:text-[14rem] md:text-[17rem] lg:text-[22rem] xl:text-[24rem]'>Nash</h1>
    </div>
  )
}


function SectionCard({section}) {
  return (
    <div className={`group text-black rounded-md h-96 w-full ${section.gradient}`}>
      <h1 className='group-hover:hidden'>{section.section}</h1>
      <p className='hidden group-hover:inline-block'>{section.description}</p>
    </div>
  )
}
