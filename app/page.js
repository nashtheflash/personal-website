'use client';

const sections = [
  {id: 1, section: 'Marketing', description: 'This is a description for the marketing section', gradient: 'bg-gradient-to-tl from-orange-300 to-rose-300'},
  {id: 2, section: 'Professional', description: 'This is a description for the professional section', gradient: 'bg-gradient-to-tl from-amber-200 to-yellow-400'},
  {id: 3, section: 'Hoddy', description: 'This is a description for the hobby section', gradient: 'bg-gradient-to-tl from-emerald-500 to-lime-600'},
]

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
  return(
    <div>
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
