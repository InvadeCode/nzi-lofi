import React, { useState, useEffect } from 'react';

const styleSheet = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;700&display=swap');

  body, html {
    margin: 0;
    padding: 0;
    width: 100vw;
    overflow-x: hidden;
    background-color: #fafafa;
    font-family: 'Inter', sans-serif;
  }

  .font-mono {
    font-family: 'JetBrains Mono', monospace;
  }

  .bg-dot-pattern {
    background-image: radial-gradient(#d4d4d4 1px, transparent 1px);
    background-size: 24px 24px;
  }
  
  .bg-dot-pattern-dark {
    background-image: radial-gradient(#404040 1px, transparent 1px);
    background-size: 24px 24px;
  }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(30px); }
    to { opacity: 1; transform: translateY(0); }
  }
  
  .animate-fade-up {
    animation: fadeUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  }
  
  .delay-100 { animation-delay: 100ms; }
  .delay-200 { animation-delay: 200ms; }
  .delay-300 { animation-delay: 300ms; }

  @keyframes scroll {
    0% { transform: translateX(0); }
    100% { transform: translateX(-50%); }
  }
  
  .animate-marquee {
    animation: scroll 40s linear infinite;
  }
  
  .hover-pause:hover {
    animation-play-state: paused;
  }
`;

const Preloader = ({ onComplete }) => {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 200);  // Fade in dot
    const t2 = setTimeout(() => setPhase(2), 800);  // Expand to line
    const t3 = setTimeout(() => setPhase(3), 1600); // Expand to screen
    const t4 = setTimeout(() => {
      if (onComplete) onComplete();
    }, 2400);

    return () => {
      clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-neutral-50 overflow-hidden">
      <div 
        className={`bg-neutral-900 transition-all duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] ${
          phase === 0 ? 'w-0 h-1 opacity-0' :
          phase === 1 ? 'w-1 h-1 opacity-100' :
          phase === 2 ? 'w-48 md:w-64 h-1 opacity-100' :
          'w-[100vw] h-[100vh] opacity-100'
        }`}
        style={{ borderRadius: phase === 3 ? '0' : '4px' }}
      ></div>
    </div>
  );
};

const Block = ({ w = 'w-full', h = 'h-4', bg = 'bg-neutral-200', mb = 'mb-3', className = '' }) => (
  <div className={`${w} ${h} ${bg} rounded-md ${mb} ${className}`}></div>
);

const SectionInfo = ({ num, title, rationale, dark = false }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`flex flex-col gap-4 mb-12 md:mb-16 pt-8 border-t w-full relative z-20 ${dark ? 'border-neutral-800 text-white' : 'border-neutral-200 text-neutral-900'}`}>
      <div className="flex justify-between items-start md:items-center w-full">
        <div className="flex flex-col gap-2">
          <span className={`font-mono text-xs font-bold tracking-widest uppercase ${dark ? 'text-neutral-500' : 'text-neutral-400'}`}>
            Section {num}
          </span>
          <h2 className="text-xl md:text-2xl font-semibold tracking-tight">
            {title}
          </h2>
        </div>
        
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`px-3 py-1.5 md:px-4 md:py-2 rounded-md text-[10px] md:text-xs font-bold tracking-wider transition-all duration-300 flex items-center gap-2 flex-shrink-0 ${
            isOpen 
              ? (dark ? 'bg-white text-neutral-900' : 'bg-neutral-800 text-white')
              : (dark ? 'bg-neutral-800 text-neutral-400 hover:bg-neutral-600' : 'bg-neutral-100 text-neutral-500 hover:bg-neutral-200 hover:text-neutral-800')
          }`}
        >
          {isOpen ? 'Close Rationale ✕' : 'Why is this here?'}
        </button>
      </div>

      <div 
        className="transition-all duration-500 ease-in-out overflow-hidden w-full"
        style={{ 
          maxHeight: isOpen ? '500px' : '0px',
          opacity: isOpen ? 1 : 0,
          marginTop: isOpen ? '0.5rem' : '0'
        }}
      >
        <div className={`p-5 md:p-6 rounded-lg ${dark ? 'bg-neutral-800' : 'bg-neutral-50 border border-neutral-200 shadow-sm'}`}>
          <h4 className={`text-[10px] uppercase tracking-widest font-bold mb-2 ${dark ? 'text-neutral-400' : 'text-neutral-400'}`}>
            Strategic Rationale
          </h4>
          <p className={`text-sm md:text-base leading-relaxed font-medium ${dark ? 'text-neutral-300' : 'text-neutral-600'}`}>
            {rationale}
          </p>
        </div>
      </div>
    </div>
  );
};

const HeroSection = () => {
  const [hoverBox, setHoverBox] = useState(null);

  return (
    <section className="relative w-screen h-[100vh] min-h-[800px] flex items-center bg-white border-b border-neutral-200 bg-dot-pattern px-[3vw] pt-20">
      <div className="w-full h-full flex flex-col justify-start max-w-[120rem] mx-auto">
        
        <SectionInfo 
          num="01" 
          title="The Hero Framework" 
          rationale="To immediately establish the apex authority and comprehensive scope of NetZero India. In the fast-evolving climate sector, stakeholders require instant reassurance that they are accessing verified, institution-grade intelligence. This section serves as the digital front door, instantly validating the mandate to shape national frameworks."
        />

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center h-full flex-1 pb-10">
          <div className="flex flex-col items-start w-full opacity-0 animate-fade-up">
            <Block w="w-32 md:w-40" h="h-6 md:h-8" bg="bg-neutral-200" mb="mb-8 md:mb-10" className="rounded-full" />
            
            <Block w="w-full" h="h-14 md:h-20 lg:h-24" bg="bg-neutral-900" mb="mb-4 md:mb-5" />
            <Block w="w-5/6" h="h-14 md:h-20 lg:h-24" bg="bg-neutral-900" mb="mb-8 md:mb-12" />
            
            <Block w="w-3/4" h="h-4 md:h-5" bg="bg-neutral-400" mb="mb-3 md:mb-4" />
            <Block w="w-2/3" h="h-4 md:h-5" bg="bg-neutral-400" mb="mb-3 md:mb-4" />
            <Block w="w-4/5" h="h-4 md:h-5" bg="bg-neutral-400" mb="mb-10 md:mb-12" />
            
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <div className="w-full sm:w-48 h-14 md:h-16 bg-neutral-900 hover:bg-neutral-800 active:scale-[0.98] rounded-lg transition-all duration-200 cursor-pointer flex items-center justify-center">
                <Block w="w-20 md:w-24" h="h-3" bg="bg-neutral-100" mb="mb-0" />
              </div>
              <div className="w-full sm:w-48 h-14 md:h-16 bg-white hover:bg-neutral-50 active:scale-[0.98] border border-neutral-300 rounded-lg transition-all duration-200 cursor-pointer flex items-center justify-center shadow-sm">
                <Block w="w-20 md:w-24" h="h-3" bg="bg-neutral-800" mb="mb-0" />
              </div>
            </div>
          </div>

          <div className="w-full h-full min-h-[400px] max-h-[600px] bg-neutral-50 border border-neutral-200 rounded-2xl relative overflow-hidden flex items-center justify-center p-8 opacity-0 animate-fade-up delay-200 touch-none shadow-sm">
            <div className="absolute inset-0 opacity-40 bg-[linear-gradient(90deg,#a3a3a3_1px,transparent_1px),linear-gradient(180deg,#a3a3a3_1px,transparent_1px)] bg-[size:40px_40px]"></div>
            
            <div className="grid grid-cols-3 gap-4 w-full max-w-md relative z-10">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((box) => (
                <div 
                  key={box}
                  onMouseEnter={() => setHoverBox(box)}
                  onMouseLeave={() => setHoverBox(null)}
                  className={`aspect-square rounded-xl border-2 transition-all duration-300 cursor-crosshair flex items-end p-4 ${
                    hoverBox === box ? 'bg-neutral-800 border-neutral-800 scale-105' : 'bg-white border-neutral-200 hover:border-neutral-400'
                  }`}
                >
                   <Block 
                    w={box % 2 === 0 ? 'w-2/3' : 'w-full'} 
                    h="h-2" 
                    bg={hoverBox === box ? 'bg-neutral-500' : 'bg-neutral-200'} 
                    mb="mb-0" 
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const PartnersMarquee = () => (
  <section className="w-screen pt-20 pb-12 md:pb-20 border-b border-neutral-200 bg-white overflow-hidden px-[3vw]">
    <div className="max-w-[120rem] mx-auto">
      <SectionInfo 
        num="02" 
        title="Trusted Partners Strip" 
        rationale="To borrow and amplify credibility through strategic association with key government bodies, industry leaders, and elite academic peers. Showing who trusts the platform validates the institution instantly before users dive into complex data."
      />
    </div>
    <div className="flex animate-marquee hover-pause whitespace-nowrap min-w-full mt-8">
      <div className="flex gap-16 md:gap-32 px-[3vw] items-center w-full justify-start">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <Block key={`m1-${i}`} w="w-32 md:w-48" h="h-10 md:h-12" bg="bg-neutral-100" mb="mb-0" className="flex-shrink-0" />
        ))}
      </div>
      <div className="flex gap-16 md:gap-32 px-[3vw] items-center w-full justify-start">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <Block key={`m2-${i}`} w="w-32 md:w-48" h="h-10 md:h-12" bg="bg-neutral-100" mb="mb-0" className="flex-shrink-0" />
        ))}
      </div>
    </div>
  </section>
);

const RationaleSection = () => (
  <section className="w-screen py-24 md:py-32 px-[3vw] bg-neutral-50 border-b border-neutral-200">
    <div className="max-w-[120rem] mx-auto">
      <SectionInfo 
        num="03" 
        title="Institutional Rationale" 
        rationale="To provide the historical context, intellectual foundation, and deeper national mission driving the initiative. It shifts the narrative from 'what we do' to 'why our work is critically important for the future of India.' Placed here to bridge the gap between initial trust and hard metrics."
      />
      
      <div className="grid lg:grid-cols-12 gap-12 lg:gap-24 items-center mt-12">
        <div className="lg:col-span-5 w-full aspect-square md:aspect-[4/5] bg-neutral-200 rounded-2xl shadow-inner border border-neutral-300 relative overflow-hidden group">
           <div className="absolute inset-0 bg-neutral-300 transform origin-bottom scale-y-0 group-hover:scale-y-100 transition-transform duration-700 ease-out"></div>
        </div>
        <div className="lg:col-span-7 flex flex-col items-start w-full">
          <Block w="w-full" h="h-4 md:h-5" bg="bg-neutral-400" mb="mb-4" />
          <Block w="w-11/12" h="h-4 md:h-5" bg="bg-neutral-400" mb="mb-4" />
          <Block w="w-full" h="h-4 md:h-5" bg="bg-neutral-400" mb="mb-4" />
          <Block w="w-4/5" h="h-4 md:h-5" bg="bg-neutral-400" mb="mb-10 md:mb-12" />

          <div className="grid sm:grid-cols-2 gap-8 w-full">
            {[1, 2].map(i => (
              <div key={i} className="flex flex-col items-start">
                <Block w="w-12 h-12" h="h-12" bg="bg-neutral-800" mb="mb-6" className="rounded-lg" />
                <Block w="w-3/4" h="h-6 md:h-8" bg="bg-neutral-800" mb="mb-4" />
                <Block w="w-full" h="h-3" bg="bg-neutral-300" mb="mb-3" />
                <Block w="w-5/6" h="h-3" bg="bg-neutral-300" mb="mb-3" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </section>
);

const InteractiveTimeline = () => {
  const [activeStage, setActiveStage] = useState(2);

  return (
    <section className="w-screen py-24 md:py-32 px-[3vw] bg-neutral-900 border-b border-neutral-800 relative bg-dot-pattern-dark">
      <div className="absolute inset-0 bg-neutral-900/80"></div>
      <div className="max-w-[120rem] mx-auto relative z-10">
        
        <SectionInfo 
          num="04" 
          title="Project Roadmap" 
          rationale="To systematically categorize the massive, complex mandate into an actionable timeline. It ensures stakeholders immediately understand the progression from baseline setting and scenario building, all the way to policy integration and outreach."
          dark={true}
        />
        
        <div className="relative mt-16 md:mt-24">
          <div className="absolute top-8 md:top-10 left-0 w-full h-[2px] bg-neutral-800 hidden md:block"></div>
          
          <div className="flex flex-col md:flex-row justify-between gap-12 md:gap-0 relative">
            {[0, 1, 2, 3, 4].map((stage) => (
              <div key={stage} className="flex-1 flex flex-row md:flex-col items-start md:items-center relative group cursor-pointer" onClick={() => setActiveStage(stage)}>
                <div className="absolute left-[31px] top-16 bottom-[-48px] w-[2px] bg-neutral-800 md:hidden"></div>

                <div className={`w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center border-4 transition-all duration-300 relative z-10 bg-neutral-900 flex-shrink-0 ${
                  activeStage === stage ? 'border-neutral-100 scale-110' : 
                  activeStage > stage ? 'border-neutral-500 bg-neutral-800' : 'border-neutral-700 hover:border-neutral-500'
                }`}>
                  <Block w="w-6 md:w-8" h="h-2" bg={activeStage === stage ? 'bg-white' : 'bg-neutral-600'} mb="mb-0" />
                </div>
                
                <div className={`ml-8 md:ml-0 md:mt-8 flex flex-col items-start md:items-center w-full transition-opacity duration-300 ${activeStage === stage ? 'opacity-100' : 'opacity-40 group-hover:opacity-70'}`}>
                  <Block w="w-32 md:w-40" h="h-5 md:h-6" bg="bg-neutral-200" mb="mb-4" className="md:mx-auto" />
                  <Block w="w-full md:w-3/4" h="h-2 md:h-3" bg="bg-neutral-500" mb="mb-2" className="md:mx-auto" />
                  <Block w="w-5/6 md:w-2/3" h="h-2 md:h-3" bg="bg-neutral-500" mb="mb-0" className="md:mx-auto" />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-20 md:mt-32 p-8 md:p-12 border border-neutral-800 bg-neutral-800/50 rounded-2xl">
           <Block w="w-48 md:w-64" h="h-8 md:h-10" bg="bg-white" mb="mb-8" />
           <div className="grid md:grid-cols-2 gap-8 md:gap-16">
              <div className="flex flex-col">
                <Block w="w-full" h="h-3 md:h-4" bg="bg-neutral-500" mb="mb-4" />
                <Block w="w-11/12" h="h-3 md:h-4" bg="bg-neutral-500" mb="mb-4" />
                <Block w="w-4/5" h="h-3 md:h-4" bg="bg-neutral-500" mb="mb-0" />
              </div>
              <div className="flex flex-col gap-4">
                {[1, 2, 3].map(i => (
                  <div key={i} className="flex items-center gap-4">
                    <Block w="w-4 h-4" h="h-4" bg="bg-neutral-600" mb="mb-0" className="rounded-full flex-shrink-0" />
                    <Block w="w-full" h="h-3 md:h-4" bg="bg-neutral-400" mb="mb-0" />
                  </div>
                ))}
              </div>
           </div>
        </div>
      </div>
    </section>
  );
};

const SectorsGrid = () => (
  <section className="w-screen py-24 md:py-32 px-[3vw] bg-white border-b border-neutral-200">
    <div className="max-w-[120rem] mx-auto">
      
      <SectionInfo 
        num="05" 
        title="Core Focus Sectors" 
        rationale="To systematically break down the complex mandate into actionable and navigable domains. Policymakers and researchers arrive with specific agendas (e.g. Transport, Energy, Agriculture); this structural breakdown ensures they immediately find their relevant focus areas without cognitive overload."
      />
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mt-12">
        {[1, 2, 3, 4, 5, 6].map((sector) => (
          <div key={sector} className="group p-8 md:p-10 border border-neutral-200 rounded-2xl hover:bg-neutral-900 transition-colors duration-300 cursor-pointer flex flex-col h-[320px] md:h-[380px] active:scale-[0.98]">
             <Block w="w-16 h-16 md:w-20 md:h-20" h="h-16 md:h-20" bg="bg-neutral-100" mb="mb-8 md:mb-12" className="group-hover:bg-neutral-800 transition-colors" />
             <Block w="w-3/4" h="h-6 md:h-8" bg="bg-neutral-800" mb="mb-6" className="group-hover:bg-white transition-colors" />
             <Block w="w-full" h="h-3 md:h-4" bg="bg-neutral-300" mb="mb-3" className="group-hover:bg-neutral-500 transition-colors" />
             <Block w="w-5/6" h="h-3 md:h-4" bg="bg-neutral-300" mb="mb-3" className="group-hover:bg-neutral-500 transition-colors" />
             
             <div className="mt-auto flex items-center gap-4">
                <Block w="w-24 md:w-32" h="h-3 md:h-4" bg="bg-neutral-200" mb="mb-0" className="group-hover:bg-neutral-600 transition-colors" />
             </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const DataPortalPreview = () => (
  <section className="w-screen py-24 md:py-32 px-[3vw] bg-neutral-50 border-b border-neutral-200">
    <div className="max-w-[120rem] mx-auto">
      
      <SectionInfo 
        num="06" 
        title="Data & Analytics Preview" 
        rationale="To publicly flex the high-end computational and analytical capabilities of the platform. By previewing interactive datasets and modeling inputs, it proves the project possesses the rigorous technological infrastructure required to manage complex climate variables."
      />
      
      <div className="w-full bg-white border border-neutral-200 rounded-2xl shadow-xl overflow-hidden mt-12 flex flex-col min-h-[500px] md:min-h-[700px]">
        <div className="h-12 md:h-16 border-b border-neutral-100 flex items-center px-6 md:px-8 gap-4 bg-neutral-50/50">
          <div className="flex gap-2">
            <Block w="w-3 h-3 md:w-4 md:h-4" h="h-3 md:h-4" bg="bg-neutral-300" mb="mb-0" className="rounded-full" />
            <Block w="w-3 h-3 md:w-4 md:h-4" h="h-3 md:h-4" bg="bg-neutral-300" mb="mb-0" className="rounded-full" />
            <Block w="w-3 h-3 md:w-4 md:h-4" h="h-3 md:h-4" bg="bg-neutral-300" mb="mb-0" className="rounded-full" />
          </div>
          <Block w="w-64 md:w-96" h="h-6 md:h-8" bg="bg-neutral-200" mb="mb-0" className="mx-4" />
        </div>
        
        <div className="flex-1 flex flex-col md:flex-row p-6 md:p-8 gap-8 md:gap-12">
          <div className="w-full md:w-64 lg:w-80 flex flex-col gap-6 md:gap-8 flex-shrink-0 border-b md:border-b-0 md:border-r border-neutral-100 pb-8 md:pb-0 md:pr-8">
            <Block w="w-full" h="h-10 md:h-12" bg="bg-neutral-200" mb="mb-4" />
            <div className="flex flex-col gap-4">
              {[1, 2, 3, 4, 5].map(i => (
                <div key={i} className="flex items-center justify-between">
                  <Block w="w-2/3" h="h-4 md:h-5" bg="bg-neutral-300" mb="mb-0" />
                  <Block w="w-6 h-6 md:w-8 md:h-8" h="h-6 md:h-8" bg="bg-neutral-100" mb="mb-0" className="rounded-md" />
                </div>
              ))}
            </div>
          </div>
          
          <div className="flex-1 flex flex-col h-full min-h-[300px] md:min-h-0">
            <div className="flex justify-between items-end mb-8 md:mb-12">
               <div className="flex flex-col gap-3 md:gap-4 w-1/2">
                 <Block w="w-3/4" h="h-8 md:h-10" bg="bg-neutral-800" mb="mb-0" />
                 <Block w="w-1/2" h="h-4 md:h-5" bg="bg-neutral-300" mb="mb-0" />
               </div>
               <div className="flex gap-4">
                 <Block w="w-24 md:w-32" h="h-10 md:h-12" bg="bg-neutral-100" mb="mb-0" />
                 <Block w="w-24 md:w-32" h="h-10 md:h-12" bg="bg-neutral-900" mb="mb-0" />
               </div>
            </div>
            
            <div className="flex-1 border-b border-l border-neutral-200 flex items-end gap-2 md:gap-4 pt-12">
               {[40, 60, 30, 80, 50, 90, 70, 100, 85, 45].map((h, i) => (
                 <div key={i} className="flex-1 group h-full flex items-end cursor-pointer">
                    <div 
                      className="w-full bg-neutral-200 group-hover:bg-neutral-800 transition-colors duration-300 rounded-t-lg"
                      style={{ height: `${h}%` }}
                    ></div>
                 </div>
               ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const PublicationsGrid = () => (
  <section className="w-screen py-24 md:py-32 px-[3vw] bg-white border-b border-neutral-200">
    <div className="max-w-[120rem] mx-auto">
      
      <SectionInfo 
        num="07" 
        title="Knowledge Hub & Publications" 
        rationale="To distribute the primary intellectual payload of the project. This acts as the central dissemination point for peer-reviewed papers, policy briefs, and working models that fundamentally influence market design and directives."
      />
      
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mt-12">
        {[1, 2, 3, 4].map((item) => (
          <div key={item} className="flex flex-col group cursor-pointer active:scale-[0.98] transition-transform duration-200">
            <div className="w-full aspect-[4/3] bg-neutral-100 rounded-xl mb-6 md:mb-8 group-hover:bg-neutral-200 transition-colors border border-neutral-200"></div>
            <Block w="w-24 md:w-32" h="h-3 md:h-4" bg="bg-neutral-300" mb="mb-4" />
            <Block w="w-full" h="h-5 md:h-6" bg="bg-neutral-800" mb="mb-3" />
            <Block w="w-5/6" h="h-5 md:h-6" bg="bg-neutral-800" mb="mb-6" />
            <Block w="w-32 md:w-40" h="h-3" bg="bg-neutral-400" mb="mb-0" className="mt-auto group-hover:bg-neutral-900 transition-colors" />
          </div>
        ))}
      </div>
    </div>
  </section>
);

const PreFooter = () => (
  <section className="w-screen py-24 md:py-32 px-[3vw] bg-neutral-100 border-b border-neutral-200">
    <div className="max-w-[120rem] mx-auto flex flex-col items-center text-center">
      <SectionInfo 
        num="08" 
        title="Final Call To Action (Pre-Footer)" 
        rationale="To capture high-intent users who have completed the digital journey. Designed to turn convinced stakeholders into active subscribers, newsletter readers, or collaborative partners."
      />
      <div className="mt-12 flex flex-col items-center w-full">
        <Block w="w-20 h-20 md:w-24 md:h-24" h="h-20 md:h-24" bg="bg-neutral-800" mb="mb-8" className="rounded-2xl" />
        <Block w="w-full max-w-2xl" h="h-10 md:h-12" bg="bg-neutral-900" mb="mb-6" />
        <Block w="w-3/4 max-w-lg" h="h-4 md:h-5" bg="bg-neutral-400" mb="mb-10" />
        
        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto justify-center">
          <Block w="w-full sm:w-64" h="h-14 md:h-16" bg="bg-neutral-300" mb="mb-0" className="rounded-lg" />
          <Block w="w-full sm:w-48" h="h-14 md:h-16" bg="bg-neutral-900" mb="mb-0" className="rounded-lg" />
        </div>
      </div>
    </div>
  </section>
);

const AboutPage = () => (
  <div className="w-full animate-fade-up">
    <section className="w-screen py-24 md:py-32 px-[3vw] bg-neutral-50 border-b border-neutral-200 pt-32 md:pt-40">
      <div className="max-w-[120rem] mx-auto">
        <SectionInfo num="A1" title="About: Mission & Methodology" rationale="Explains the 'why' and 'how' of NZI. Details the integrated modelling framework and the complex methodologies used to generate the scenarios." />
        
        <div className="mt-12 mb-16">
          <Block w="w-full max-w-3xl" h="h-12 md:h-16" bg="bg-neutral-900" mb="mb-8" />
          <Block w="w-full max-w-4xl" h="h-4 md:h-5" bg="bg-neutral-400" mb="mb-4" />
          <Block w="w-3/4 max-w-3xl" h="h-4 md:h-5" bg="bg-neutral-400" mb="mb-16" />
        </div>
        
        <div className="w-full aspect-square md:aspect-[21/9] bg-white rounded-2xl border border-neutral-200 flex items-center justify-center mb-12 shadow-sm relative overflow-hidden group">
           <div className="absolute inset-0 bg-dot-pattern opacity-50"></div>
           <div className="relative z-10 flex flex-col items-center gap-6">
             <Block w="w-48 md:w-64" h="h-10 md:h-12" bg="bg-neutral-800" mb="mb-0" className="rounded-xl shadow-lg" />
             <div className="flex gap-12">
               <Block w="w-32 md:w-48" h="h-8 md:h-10" bg="bg-neutral-400" mb="mb-0" className="rounded-lg" />
               <Block w="w-32 md:w-48" h="h-8 md:h-10" bg="bg-neutral-400" mb="mb-0" className="rounded-lg" />
             </div>
           </div>
        </div>
      </div>
    </section>

    <section className="w-screen py-24 md:py-32 px-[3vw] bg-white border-b border-neutral-200">
      <div className="max-w-[120rem] mx-auto">
        <SectionInfo num="A2" title="Core Team & Executive Board" rationale="Builds trust by associating the platform with authoritative figures, principal investigators, and researchers directly responsible for the modelling." />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-12 md:gap-y-16 mt-12">
          {[1,2,3,4,5,6,7,8].map(i => (
            <div key={i} className="flex flex-col items-center text-center group cursor-pointer">
              <Block w="w-24 h-24 md:w-32 md:h-32" h="h-24 md:h-32" bg="bg-neutral-200" mb="mb-6" className="rounded-full group-hover:bg-neutral-300 transition-colors" />
              <Block w="w-full max-w-[12rem]" h="h-4 md:h-5" bg="bg-neutral-800" mb="mb-3" className="group-hover:bg-neutral-900 transition-colors" />
              <Block w="w-3/4 max-w-[8rem]" h="h-3 md:h-4" bg="bg-neutral-400" mb="mb-0" />
            </div>
          ))}
        </div>
      </div>
    </section>

    <section className="w-screen py-24 md:py-32 px-[3vw] bg-neutral-50 border-b border-neutral-200">
      <div className="max-w-[120rem] mx-auto">
        <SectionInfo num="A3" title="Independent Advisory Committee" rationale="Separating the advisory board from the core team proves external validation and oversight. High-profile advisors from global institutions solidify global credibility." />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          {[1, 2, 3, 4, 5, 6].map(i => (
            <div key={i} className="flex items-center gap-4 p-4 border border-neutral-200 rounded-xl bg-white hover:border-neutral-400 transition-colors cursor-pointer">
              <Block w="w-12 h-12 md:w-16 md:h-16" h="h-12 md:h-16" bg="bg-neutral-200" mb="mb-0" className="rounded-full flex-shrink-0" />
              <div className="flex flex-col flex-1">
                <Block w="w-3/4" h="h-4" bg="bg-neutral-800" mb="mb-2" />
                <Block w="w-full" h="h-3" bg="bg-neutral-400" mb="mb-0" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

    <section className="w-screen py-24 md:py-32 px-[3vw] bg-neutral-900 border-b border-neutral-800 bg-dot-pattern-dark relative">
      <div className="absolute inset-0 bg-neutral-900/80"></div>
      <div className="max-w-[120rem] mx-auto relative z-10">
        <SectionInfo num="A4" title="Institutional History & Vision" rationale="Provides the timeline of the project's inception and its long-term strategic vision leading up to the 2070 goals." dark={true} />
        <div className="grid lg:grid-cols-2 gap-16 mt-12">
          <div className="flex flex-col gap-6">
            <Block w="w-full" h="h-8 md:h-10" bg="bg-neutral-200" mb="mb-4" />
            <Block w="w-full" h="h-4" bg="bg-neutral-400" mb="mb-2" />
            <Block w="w-11/12" h="h-4" bg="bg-neutral-400" mb="mb-2" />
            <Block w="w-4/5" h="h-4" bg="bg-neutral-400" mb="mb-8" />
            
            <Block w="w-3/4" h="h-6 md:h-8" bg="bg-neutral-300" mb="mb-4" />
            <Block w="w-full" h="h-4" bg="bg-neutral-500" mb="mb-2" />
            <Block w="w-5/6" h="h-4" bg="bg-neutral-500" mb="mb-2" />
          </div>
          <div className="flex flex-col gap-8 border-l-2 border-neutral-800 pl-8 md:pl-12">
            {[1, 2, 3].map(i => (
              <div key={i} className="relative">
                <div className="absolute -left-[41px] md:-left-[57px] top-0 w-4 h-4 rounded-full bg-neutral-600 border-4 border-neutral-900"></div>
                <Block w="w-24" h="h-4" bg="bg-neutral-500" mb="mb-3" />
                <Block w="w-full" h="h-6" bg="bg-neutral-200" mb="mb-3" />
                <Block w="w-4/5" h="h-3" bg="bg-neutral-600" mb="mb-0" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>

    <section className="w-screen py-24 md:py-32 px-[3vw] bg-white border-b border-neutral-200">
      <div className="max-w-[120rem] mx-auto">
        <SectionInfo num="A5" title="Partners & Funders" rationale="Highlights the consortium of academic, governmental, and financial institutions supporting the initiative." />
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6 md:gap-8 mt-12">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(i => (
            <div key={i} className="aspect-video bg-neutral-50 border border-neutral-200 rounded-xl flex items-center justify-center p-6 grayscale hover:grayscale-0 hover:bg-white hover:shadow-sm transition-all cursor-pointer">
               <Block w="w-full max-w-[8rem]" h="h-8 md:h-10" bg="bg-neutral-300" mb="mb-0" className="rounded-md" />
            </div>
          ))}
        </div>
      </div>
    </section>

    <section className="w-screen py-24 md:py-32 px-[3vw] bg-neutral-50 border-b border-neutral-200">
      <div className="max-w-[120rem] mx-auto">
        <SectionInfo num="A6" title="Annual Compendiums & Governance" rationale="Creates extreme transparency. Allowing users to download annual impact reports shows the PMU operates with high institutional accountability." />
        <div className="grid md:grid-cols-3 gap-8 mt-12">
          {[1, 2, 3].map(i => (
            <div key={i} className="bg-white p-8 rounded-2xl border border-neutral-200 flex flex-col gap-6 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
              <div className="flex justify-between items-start">
                 <Block w="w-16 h-20" h="h-20" bg="bg-neutral-200" mb="mb-0" className="rounded-lg" />
                 <Block w="w-20" h="h-6" bg="bg-neutral-100" mb="mb-0" className="rounded-full" />
              </div>
              <div className="flex flex-col gap-2">
                <Block w="w-full" h="h-6" bg="bg-neutral-800" mb="mb-0" />
                <Block w="w-3/4" h="h-6" bg="bg-neutral-800" mb="mb-0" />
              </div>
              <div className="mt-auto w-full h-12 bg-neutral-900 rounded-lg flex items-center justify-center">
                 <Block w="w-24" h="h-3" bg="bg-white" mb="mb-0" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

    <section className="w-screen py-24 md:py-32 px-[3vw] bg-white border-b border-neutral-200">
      <div className="max-w-[120rem] mx-auto flex flex-col md:flex-row gap-12 lg:gap-24">
        <div className="w-full md:w-1/3">
          <SectionInfo num="A7" title="Careers & Fellowships" rationale="Attracts top-tier academic and operational talent. A dedicated job board shows the institution is growing and well-funded." />
          <Block w="w-full" h="h-4" bg="bg-neutral-400" mb="mb-4" />
          <Block w="w-5/6" h="h-4" bg="bg-neutral-400" mb="mb-8" />
          <Block w="w-48" h="h-12" bg="bg-neutral-900" mb="mb-0" className="rounded-lg" />
        </div>
        <div className="w-full md:w-2/3 flex flex-col gap-4 mt-8 md:mt-0">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="p-6 border border-neutral-200 rounded-xl flex flex-col sm:flex-row justify-between sm:items-center gap-4 hover:border-neutral-400 transition-colors cursor-pointer group">
              <div className="flex flex-col gap-2">
                <Block w="w-64" h="h-6" bg="bg-neutral-800" mb="mb-0" />
                <div className="flex gap-4">
                   <Block w="w-20" h="h-3" bg="bg-neutral-400" mb="mb-0" />
                   <Block w="w-24" h="h-3" bg="bg-neutral-400" mb="mb-0" />
                </div>
              </div>
              <Block w="w-8 h-8" h="h-8" bg="bg-neutral-100" mb="mb-0" className="rounded-full group-hover:bg-neutral-900 transition-colors flex-shrink-0" />
            </div>
          ))}
        </div>
      </div>
    </section>

    <section className="w-screen py-24 md:py-32 px-[3vw] bg-neutral-950 border-b border-neutral-800">
      <div className="max-w-[120rem] mx-auto">
        <SectionInfo num="A8" title="Fieldwork & Facility Gallery" rationale="Humanizes the data. Showing researchers in the field, state-of-the-art server rooms, or stakeholder consultations proves real-world physical activity." dark={true} />
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 mt-12 space-y-6">
           {[300, 450, 250, 400, 300, 500].map((height, i) => (
             <div key={i} className="w-full bg-neutral-800 rounded-xl border border-neutral-700 overflow-hidden relative group cursor-pointer" style={{ height: `${height}px` }}>
               <div className="absolute inset-0 bg-neutral-900/0 group-hover:bg-neutral-900/20 transition-colors"></div>
             </div>
           ))}
        </div>
      </div>
    </section>
  </div>
);

const ResearchPage = () => (
  <div className="w-full animate-fade-up">
    <section className="w-screen py-24 md:py-32 px-[3vw] bg-neutral-50 border-b border-neutral-200 pt-32 md:pt-40">
      <div className="max-w-[120rem] mx-auto flex flex-col lg:flex-row gap-12 lg:gap-20">
        <div className="w-full lg:w-64 flex-shrink-0 flex flex-col gap-4">
           <Block w="w-full" h="h-8 md:h-10" bg="bg-neutral-900" mb="mb-6" />
           {['Energy Supply', 'Transport', 'Industry', 'Agriculture', 'Forestry', 'Residential'].map((sector, i) => (
             <div key={sector} className={`w-full h-12 rounded-lg border flex items-center px-4 cursor-pointer transition-colors ${i === 0 ? 'bg-neutral-900 border-neutral-900' : 'bg-white border-neutral-200 hover:bg-neutral-100'}`}>
                <Block w="w-3/4" h="h-3" bg={i === 0 ? 'bg-white' : 'bg-neutral-500'} mb="mb-0" />
             </div>
           ))}
        </div>
        
        <div className="flex-1">
          <SectionInfo num="R1" title="Sectoral Deep Dive" rationale="Organizes complex publications into digestible topics without overwhelming the user." />
          
          <div className="mt-12">
            <Block w="w-3/4 max-w-2xl" h="h-10 md:h-12" bg="bg-neutral-900" mb="mb-8" />
            <Block w="w-full" h="h-4" bg="bg-neutral-400" mb="mb-4" />
            <Block w="w-5/6" h="h-4" bg="bg-neutral-400" mb="mb-12" />
            
            <div className="w-full h-64 md:h-96 bg-white rounded-2xl border border-neutral-200 flex items-end gap-2 md:gap-4 p-6 md:p-8 mb-12 shadow-sm">
               {[40, 70, 50, 90, 60, 80, 100, 75, 45, 85].map((h, i) => (
                  <div key={i} className="flex-1 bg-neutral-200 hover:bg-neutral-800 transition-colors rounded-t-lg cursor-pointer" style={{ height: `${h}%` }}></div>
               ))}
            </div>
          </div>
        </div>
      </div>
    </section>

    <section className="w-screen py-24 md:py-32 px-[3vw] bg-neutral-900 border-b border-neutral-800 bg-dot-pattern-dark relative">
      <div className="absolute inset-0 bg-neutral-900/80"></div>
      <div className="max-w-[120rem] mx-auto relative z-10">
        <SectionInfo num="R2" title="Interactive Scenario Comparison" rationale="Allows researchers to toggle between 'Baseline' and 'Net Zero 2070' scenarios side-by-side, providing immediate visual impact of policy changes." dark={true} />
        
        <div className="bg-neutral-800 border border-neutral-700 rounded-2xl p-6 md:p-10 mt-12 flex flex-col lg:flex-row gap-8">
           <div className="flex-1 flex flex-col gap-6">
             <div className="flex justify-between items-center bg-neutral-900 p-4 rounded-xl border border-neutral-700">
                <Block w="w-32" h="h-5" bg="bg-neutral-400" mb="mb-0" />
                <Block w="w-20" h="h-8" bg="bg-neutral-700" mb="mb-0" className="rounded-md" />
             </div>
             <div className="w-full h-64 bg-neutral-900/50 rounded-xl border border-neutral-700 border-dashed flex items-end p-4 gap-2">
                {[30, 40, 50, 60, 70].map((h, i) => <div key={i} className="flex-1 bg-neutral-600 rounded-t-sm" style={{height: `${h}%`}}></div>)}
             </div>
           </div>
           
           <div className="hidden lg:flex flex-col items-center justify-center px-4">
             <div className="w-10 h-10 rounded-full bg-neutral-700 flex items-center justify-center border-4 border-neutral-800 z-10 text-white font-bold text-xs">VS</div>
             <div className="w-0.5 h-full bg-neutral-700 absolute"></div>
           </div>

           <div className="flex-1 flex flex-col gap-6">
             <div className="flex justify-between items-center bg-white p-4 rounded-xl border border-neutral-200">
                <Block w="w-48" h="h-5" bg="bg-neutral-900" mb="mb-0" />
                <Block w="w-20" h="h-8" bg="bg-neutral-200" mb="mb-0" className="rounded-md" />
             </div>
             <div className="w-full h-64 bg-neutral-900/50 rounded-xl border border-neutral-700 border-dashed flex items-end p-4 gap-2">
                {[30, 25, 20, 15, 5].map((h, i) => <div key={i} className="flex-1 bg-white rounded-t-sm" style={{height: `${h}%`}}></div>)}
             </div>
           </div>
        </div>
      </div>
    </section>

    <section className="w-screen py-24 md:py-32 px-[3vw] bg-white border-b border-neutral-200">
      <div className="max-w-[120rem] mx-auto">
        <SectionInfo num="R3" title="Actionable Policy Briefs" rationale="Distills 100-page academic papers into 2-page executive summaries for government officials who need rapid, actionable insights." />
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="p-6 border border-neutral-200 rounded-xl bg-neutral-50 hover:bg-white hover:border-neutral-400 transition-all shadow-sm group cursor-pointer flex flex-col h-full">
               <Block w="w-12 h-12" h="h-12" bg="bg-neutral-200" mb="mb-6" className="rounded-lg group-hover:bg-neutral-900 transition-colors" />
               <Block w="w-full" h="h-5" bg="bg-neutral-800" mb="mb-3" />
               <Block w="w-5/6" h="h-5" bg="bg-neutral-800" mb="mb-6" />
               <Block w="w-3/4" h="h-3" bg="bg-neutral-400" mb="mb-8" />
               <div className="mt-auto flex justify-between items-center border-t border-neutral-200 pt-4">
                  <Block w="w-20" h="h-3" bg="bg-neutral-900" mb="mb-0" />
                  <Block w="w-6 h-6" h="h-6" bg="bg-neutral-200" mb="mb-0" className="rounded-full" />
               </div>
            </div>
          ))}
        </div>
      </div>
    </section>

    <section className="w-screen py-24 md:py-32 px-[3vw] bg-neutral-50 border-b border-neutral-200">
      <div className="max-w-[120rem] mx-auto flex flex-col lg:flex-row gap-16">
         <div className="w-full lg:w-1/3">
            <SectionInfo num="R4" title="Methodology & Assumptions" rationale="Provides absolute transparency to academic peers. By publishing the exact mathematical assumptions and models used, NZI defends itself against critique." />
         </div>
         <div className="w-full lg:w-2/3 flex flex-col gap-4 mt-8 lg:mt-0">
            {[1, 2, 3, 4, 5].map(i => (
              <div key={i} className="bg-white border border-neutral-200 rounded-xl p-6 flex justify-between items-center cursor-pointer hover:border-neutral-400 transition-colors">
                 <div className="flex flex-col gap-2 w-3/4">
                    <Block w="w-full max-w-md" h="h-5" bg="bg-neutral-800" mb="mb-0" />
                    <Block w="w-48" h="h-3" bg="bg-neutral-400" mb="mb-0" />
                 </div>
                 <Block w="w-8 h-8" h="h-8" bg="bg-neutral-100" mb="mb-0" className="rounded-full" />
              </div>
            ))}
         </div>
      </div>
    </section>

    <section className="w-screen py-24 md:py-32 px-[3vw] bg-white border-b border-neutral-200">
      <div className="max-w-[120rem] mx-auto">
        <SectionInfo num="R5" title="Case Studies & Real-world Applications" rationale="Bridges the gap between theoretical modeling and practical implementation by showcasing specific regional or sectoral success stories." />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {[1, 2, 3].map(i => (
            <div key={i} className="flex flex-col group cursor-pointer">
              <div className="w-full aspect-[4/3] bg-neutral-100 border border-neutral-200 rounded-xl mb-6 group-hover:bg-neutral-200 transition-colors overflow-hidden relative"></div>
              <Block w="w-32" h="h-3" bg="bg-neutral-400" mb="mb-4" />
              <Block w="w-full" h="h-6 md:h-8" bg="bg-neutral-900" mb="mb-3" />
              <Block w="w-5/6" h="h-6 md:h-8" bg="bg-neutral-900" mb="mb-4" />
              <Block w="w-full" h="h-4" bg="bg-neutral-400" mb="mb-2" />
              <Block w="w-4/5" h="h-4" bg="bg-neutral-400" mb="mb-0" />
            </div>
          ))}
        </div>
      </div>
    </section>

    <section className="w-screen py-24 md:py-32 px-[3vw] bg-neutral-50 border-b border-neutral-200">
      <div className="max-w-[120rem] mx-auto">
        <SectionInfo num="R6" title="Working Papers & Pre-prints" rationale="The repository for all formal, peer-reviewed literature and high-level summaries generated by the project before official publication." />
        <div className="flex flex-col gap-4 mt-12">
          {[1, 2, 3].map(i => (
            <div key={i} className="bg-white p-6 md:p-8 rounded-xl border border-neutral-200 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:border-neutral-400 transition-colors group cursor-pointer shadow-sm">
              <div className="flex flex-col gap-3 flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <Block w="w-24" h="h-4" bg="bg-neutral-200" mb="mb-0" className="rounded-md" />
                  <Block w="w-32" h="h-4" bg="bg-neutral-200" mb="mb-0" className="rounded-md" />
                </div>
                <Block w="w-full max-w-3xl" h="h-6 md:h-8" bg="bg-neutral-800" mb="mb-2" />
                <Block w="w-3/4 max-w-2xl" h="h-4" bg="bg-neutral-400" mb="mb-0" />
              </div>
              <div className="w-full md:w-40 h-12 bg-neutral-100 group-hover:bg-neutral-900 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors">
                <Block w="w-20" h="h-3" bg="bg-neutral-400" mb="mb-0" className="group-hover:bg-white transition-colors" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

    <section className="w-screen py-24 md:py-32 px-[3vw] bg-neutral-900 border-b border-neutral-800">
      <div className="max-w-[120rem] mx-auto">
        <SectionInfo num="R7" title="Training & Capacity Building" rationale="Provides educational resources, workshop recordings, and tutorials to ensure external researchers know how to utilize the platform's complex models." dark={true} />
        <div className="grid md:grid-cols-3 gap-8 mt-12">
           {[1, 2, 3].map(i => (
             <div key={i} className="flex flex-col group cursor-pointer">
               <div className="w-full aspect-video bg-neutral-800 rounded-xl border border-neutral-700 flex items-center justify-center mb-6 group-hover:border-neutral-500 transition-colors">
                  <div className="w-16 h-16 rounded-full bg-neutral-700/50 border border-neutral-600 flex items-center justify-center">
                    <div className="w-0 h-0 border-t-8 border-t-transparent border-l-[12px] border-l-white border-b-8 border-b-transparent ml-1"></div>
                  </div>
               </div>
               <Block w="w-full" h="h-6" bg="bg-neutral-200" mb="mb-3" />
               <Block w="w-3/4" h="h-6" bg="bg-neutral-200" mb="mb-4" />
               <Block w="w-32" h="h-3" bg="bg-neutral-500" mb="mb-0" />
             </div>
           ))}
        </div>
      </div>
    </section>
  </div>
);

const DataPortalPage = () => (
  <div className="w-full animate-fade-up">
    <section className="w-screen py-24 md:py-32 px-[3vw] bg-neutral-900 border-b border-neutral-800 pt-32 md:pt-40 bg-dot-pattern-dark text-white min-h-screen">
      <div className="max-w-[120rem] mx-auto">
         <SectionInfo num="D1" title="Data Portal: Open Catalog" rationale="The core utility of the site. A highly filterable repository of all datasets, assumptions, and scenario outputs for researchers and policymakers." dark={true} />
         
         <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 mt-12">
            <div className="w-full lg:w-80 flex flex-col gap-8 bg-neutral-800 p-6 md:p-8 rounded-xl border border-neutral-700 h-fit">
              <Block w="w-1/2" h="h-6" bg="bg-neutral-500" mb="mb-2" />
              {[1,2,3].map(group => (
                <div key={group} className="flex flex-col gap-4">
                  <Block w="w-2/3" h="h-4" bg="bg-neutral-600" mb="mb-2" />
                  {[1,2,3,4].map(i => (
                    <div key={i} className="flex gap-3 items-center cursor-pointer group">
                       <Block w="w-5 h-5" h="h-5" bg="bg-neutral-700" mb="mb-0" className="rounded-sm flex-shrink-0 group-hover:bg-neutral-500" />
                       <Block w="w-full" h="h-3" bg="bg-neutral-400" mb="mb-0" className="group-hover:bg-neutral-200" />
                    </div>
                  ))}
                </div>
              ))}
            </div>
            
            <div className="flex-1 flex flex-col gap-6">
              <div className="w-full h-14 bg-neutral-800 rounded-xl border border-neutral-700 flex items-center px-6 mb-2">
                 <Block w="w-6 h-6" h="h-6" bg="bg-neutral-600" mb="mb-0" className="rounded-full flex-shrink-0 mr-4" />
                 <Block w="w-64" h="h-4" bg="bg-neutral-600" mb="mb-0" />
              </div>
              
              {[1,2,3,4,5].map(i => (
                <div key={i} className="w-full bg-neutral-800/50 hover:bg-neutral-800 p-6 md:p-8 rounded-xl border border-neutral-700 flex flex-col sm:flex-row justify-between sm:items-center gap-6 transition-colors cursor-pointer group">
                   <div className="flex flex-col gap-3 flex-1">
                     <div className="flex gap-2 mb-1">
                       <Block w="w-16" h="h-5" bg="bg-neutral-600" mb="mb-0" className="rounded-md" />
                       <Block w="w-20" h="h-5" bg="bg-neutral-600" mb="mb-0" className="rounded-md" />
                     </div>
                     <Block w="w-full sm:w-3/4" h="h-5 md:h-6" bg="bg-neutral-200" mb="mb-2" />
                     <Block w="w-full sm:w-1/2" h="h-3" bg="bg-neutral-500" mb="mb-0" />
                   </div>
                   <Block w="w-full sm:w-32" h="h-10 md:h-12" bg="bg-white" mb="mb-0" className="rounded-lg flex-shrink-0 group-hover:bg-neutral-200" />
                </div>
              ))}
            </div>
         </div>
      </div>
    </section>

    <section className="w-screen py-24 md:py-32 px-[3vw] bg-white border-b border-neutral-200">
      <div className="max-w-[120rem] mx-auto">
        <SectionInfo num="D2" title="Live Sectoral Trackers" rationale="Provides a 'dashboard' feel. Shows real-time or frequently updated macro indicators (like current renewable capacity) to keep the portal feeling alive." />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 mt-12">
           {[1, 2, 3, 4].map(i => (
             <div key={i} className="p-8 border border-neutral-200 bg-neutral-50 rounded-2xl flex flex-col items-center justify-center text-center">
               <div className="w-24 h-24 rounded-full border-[8px] border-neutral-200 border-t-neutral-800 mb-6"></div>
               <Block w="w-3/4" h="h-6" bg="bg-neutral-900" mb="mb-3" />
               <Block w="w-1/2" h="h-3" bg="bg-neutral-400" mb="mb-0" />
             </div>
           ))}
        </div>
      </div>
    </section>

    <section className="w-screen py-24 md:py-32 px-[3vw] bg-neutral-800 border-b border-neutral-700">
      <div className="max-w-[120rem] mx-auto">
        <SectionInfo num="D3" title="Spatial Maps & GIS Explorer" rationale="Allows users to visualize scenario outputs geographically, mapping out land-use changes, energy infrastructure grids, and regional emission intensities." dark={true} />
        <div className="w-full h-[500px] md:h-[700px] bg-neutral-900 border border-neutral-700 rounded-2xl mt-12 relative overflow-hidden flex">
          <div className="flex-1 relative bg-dot-pattern-dark opacity-80 flex items-center justify-center">
            <Block w="w-64 h-64 md:w-96 md:h-96" h="h-64 md:h-96" bg="bg-neutral-800" mb="mb-0" className="rounded-full blur-3xl opacity-50" />
          </div>
          <div className="hidden md:flex w-80 bg-neutral-900/90 backdrop-blur border-l border-neutral-700 p-6 flex-col gap-6 relative z-10">
            <Block w="w-3/4" h="h-6" bg="bg-white" mb="mb-4" />
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="flex flex-col gap-3">
                <Block w="w-1/2" h="h-4" bg="bg-neutral-400" mb="mb-2" />
                <div className="w-full h-2 bg-gradient-to-r from-neutral-700 to-white rounded-full mb-2"></div>
                <div className="flex justify-between">
                  <Block w="w-8" h="h-2" bg="bg-neutral-500" mb="mb-0" />
                  <Block w="w-8" h="h-2" bg="bg-neutral-500" mb="mb-0" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>

    <section className="w-screen py-24 md:py-32 px-[3vw] bg-neutral-50 border-b border-neutral-200">
      <div className="max-w-[120rem] mx-auto flex flex-col md:flex-row gap-12">
        <div className="w-full md:w-1/3">
          <SectionInfo num="D4" title="Developer API & Integrations" rationale="Allows third-party researchers or tech companies to hook directly into NZI's datasets automatically, vastly increasing the reach and utility of the data." />
          <Block w="w-48" h="h-12" bg="bg-neutral-900" mb="mb-0" className="rounded-xl mt-8" />
        </div>
        <div className="w-full md:w-2/3 bg-neutral-900 rounded-2xl p-6 md:p-8 font-mono border border-neutral-800 shadow-xl">
           <div className="flex gap-2 mb-6">
             <div className="w-3 h-3 rounded-full bg-neutral-700"></div>
             <div className="w-3 h-3 rounded-full bg-neutral-700"></div>
             <div className="w-3 h-3 rounded-full bg-neutral-700"></div>
           </div>
           <Block w="w-64" h="h-4" bg="bg-neutral-500" mb="mb-4" />
           <Block w="w-1/2" h="h-4" bg="bg-neutral-300" mb="mb-4" />
           <Block w="w-3/4" h="h-4" bg="bg-neutral-400" mb="mb-4" />
           <Block w="w-48" h="h-4" bg="bg-neutral-600" mb="mb-8" />
           <Block w="w-5/6" h="h-4" bg="bg-neutral-300" mb="mb-2" />
           <Block w="w-2/3" h="h-4" bg="bg-neutral-300" mb="mb-0" />
        </div>
      </div>
    </section>

    <section className="w-screen py-24 md:py-32 px-[3vw] bg-white border-b border-neutral-200">
      <div className="max-w-[120rem] mx-auto text-center flex flex-col items-center">
        <SectionInfo num="D5" title="Data Submission Portal" rationale="Opens the platform up to academic crowdsourcing. Other universities can submit their models for review and inclusion, making NZI a central hub." />
        <div className="w-full max-w-3xl mt-12 bg-neutral-50 border-2 border-neutral-200 border-dashed rounded-2xl p-12 md:p-20 flex flex-col items-center justify-center hover:bg-neutral-100 transition-colors cursor-pointer">
           <Block w="w-16 h-16" h="h-16" bg="bg-neutral-300" mb="mb-6" className="rounded-full" />
           <Block w="w-64" h="h-6" bg="bg-neutral-800" mb="mb-4" />
           <Block w="w-48" h="h-3" bg="bg-neutral-400" mb="mb-0" />
        </div>
      </div>
    </section>

    <section className="w-screen py-24 md:py-32 px-[3vw] bg-neutral-100 border-b border-neutral-200">
      <div className="max-w-[120rem] mx-auto">
        <SectionInfo num="D6" title="Citation & Usage Guidelines" rationale="Crucial for academic platforms. Provides clear, copy-pasteable text to ensure NZI gets proper attribution when its data is used in external papers." />
        <div className="bg-white p-6 md:p-8 rounded-xl border border-neutral-200 mt-12 flex justify-between items-center gap-6">
           <div className="flex flex-col gap-3 flex-1">
              <Block w="w-full" h="h-4" bg="bg-neutral-600" mb="mb-0" />
              <Block w="w-3/4" h="h-4" bg="bg-neutral-600" mb="mb-0" />
           </div>
           <Block w="w-12 h-12" h="h-12" bg="bg-neutral-200" mb="mb-0" className="rounded-lg flex-shrink-0" />
        </div>
      </div>
    </section>
  </div>
);

const BlogsPage = () => (
  <div className="w-full animate-fade-up">
    <section className="w-screen py-24 md:py-32 px-[3vw] bg-white border-b border-neutral-200 pt-32 md:pt-40">
      <div className="max-w-[120rem] mx-auto">
        <SectionInfo num="B1" title="Featured Insights & News" rationale="Highlights the most critical, recent updates, op-eds, or major project milestones to keep returning users engaged with fresh content." />
        
        <div className="w-full flex flex-col lg:flex-row gap-8 lg:gap-12 mt-12 group cursor-pointer">
          <div className="w-full lg:w-2/3 aspect-video md:aspect-[21/9] lg:aspect-video bg-neutral-100 border border-neutral-200 rounded-2xl overflow-hidden group-hover:bg-neutral-200 transition-colors"></div>
          <div className="w-full lg:w-1/3 flex flex-col justify-center">
            <Block w="w-32" h="h-6" bg="bg-neutral-200" mb="mb-6" className="rounded-md" />
            <Block w="w-full" h="h-8 md:h-12" bg="bg-neutral-900" mb="mb-4" />
            <Block w="w-5/6" h="h-8 md:h-12" bg="bg-neutral-900" mb="mb-6" />
            <Block w="w-full" h="h-4" bg="bg-neutral-400" mb="mb-3" />
            <Block w="w-full" h="h-4" bg="bg-neutral-400" mb="mb-3" />
            <Block w="w-2/3" h="h-4" bg="bg-neutral-400" mb="mb-8" />
            <div className="flex items-center gap-4 mt-auto">
              <Block w="w-12 h-12" h="h-12" bg="bg-neutral-200" mb="mb-0" className="rounded-full" />
              <div className="flex flex-col gap-2 w-32">
                <Block w="w-full" h="h-3" bg="bg-neutral-800" mb="mb-0" />
                <Block w="w-2/3" h="h-3" bg="bg-neutral-400" mb="mb-0" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section className="w-screen py-24 md:py-32 px-[3vw] bg-neutral-50 border-b border-neutral-200">
      <div className="max-w-[120rem] mx-auto">
        <SectionInfo num="B2" title="Latest Articles Grid" rationale="A standard, scannable feed of all news, blogs, and press releases ordered chronologically." />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 mt-12">
          {[1, 2, 3, 4, 5, 6].map(i => (
            <div key={i} className="flex flex-col group cursor-pointer bg-white p-4 md:p-5 rounded-2xl border border-neutral-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-full aspect-[4/3] bg-neutral-100 rounded-xl mb-6 group-hover:bg-neutral-200 transition-colors"></div>
              <Block w="w-24" h="h-5" bg="bg-neutral-200" mb="mb-4" className="rounded-md" />
              <Block w="w-full" h="h-6 md:h-8" bg="bg-neutral-900" mb="mb-3" />
              <Block w="w-3/4" h="h-6 md:h-8" bg="bg-neutral-900" mb="mb-6" />
              <Block w="w-full" h="h-3" bg="bg-neutral-400" mb="mb-2" />
              <Block w="w-2/3" h="h-3" bg="bg-neutral-400" mb="mb-6" />
              <div className="mt-auto border-t border-neutral-100 pt-4 flex justify-between items-center">
                <Block w="w-24" h="h-3" bg="bg-neutral-400" mb="mb-0" />
                <Block w="w-8 h-8" h="h-8" bg="bg-neutral-100" mb="mb-0" className="rounded-full group-hover:bg-neutral-900 transition-colors" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

    <section className="w-screen py-24 md:py-32 px-[3vw] bg-neutral-900 border-b border-neutral-800">
      <div className="max-w-[120rem] mx-auto">
        <SectionInfo num="B3" title="Podcasts & Video Discussions" rationale="Diversifies content delivery. Highly technical material is often better digested through expert panel videos or podcast discussions." dark={true} />
        <div className="grid md:grid-cols-2 gap-8 mt-12">
          {[1, 2].map(i => (
            <div key={i} className="w-full aspect-video bg-neutral-800 border border-neutral-700 rounded-2xl relative flex items-center justify-center cursor-pointer group hover:border-neutral-500 transition-colors">
               <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                  <div className="w-0 h-0 border-t-[10px] border-t-transparent border-l-[16px] border-l-neutral-900 border-b-[10px] border-b-transparent ml-1"></div>
               </div>
               <div className="absolute bottom-6 left-6 right-6">
                 <Block w="w-3/4" h="h-6" bg="bg-white" mb="mb-2" />
                 <Block w="w-1/2" h="h-3" bg="bg-neutral-400" mb="mb-0" />
               </div>
            </div>
          ))}
        </div>
      </div>
    </section>

    <section className="w-screen py-24 md:py-32 px-[3vw] bg-white border-b border-neutral-200">
      <div className="max-w-[120rem] mx-auto flex flex-col lg:flex-row gap-16">
        <div className="w-full lg:w-1/3">
          <SectionInfo num="B4" title="Events & Webinars" rationale="Shows the institution is a convening power, actively hosting dialogs and public symposiums rather than just publishing papers." />
        </div>
        <div className="w-full lg:w-2/3 flex flex-col gap-6 mt-8 lg:mt-0">
          {[1, 2, 3].map(i => (
            <div key={i} className="flex gap-6 items-center p-6 border border-neutral-200 rounded-xl hover:shadow-md transition-shadow cursor-pointer">
               <div className="w-20 h-24 bg-neutral-100 rounded-lg flex flex-col items-center justify-center border border-neutral-200 flex-shrink-0">
                 <Block w="w-10" h="h-4" bg="bg-neutral-400" mb="mb-2" />
                 <Block w="w-12" h="h-8" bg="bg-neutral-800" mb="mb-0" />
               </div>
               <div className="flex flex-col gap-3 flex-1">
                 <Block w="w-32" h="h-4" bg="bg-neutral-400" mb="mb-0" />
                 <Block w="w-full max-w-md" h="h-6" bg="bg-neutral-900" mb="mb-0" />
                 <Block w="w-48" h="h-3" bg="bg-neutral-500" mb="mb-0" />
               </div>
            </div>
          ))}
        </div>
      </div>
    </section>

    <section className="w-screen py-24 md:py-32 px-[3vw] bg-neutral-50 border-b border-neutral-200">
      <div className="max-w-[120rem] mx-auto">
        <SectionInfo num="B5" title="Guest Columnists & Voices" rationale="Highlights that NZI accepts input from a diverse range of academics and policy experts, positioning it as an inclusive hub of thought leadership." />
        <div className="flex gap-6 overflow-x-auto pb-8 mt-12 snap-x" style={{ scrollbarWidth: 'none' }}>
           {[1, 2, 3, 4, 5].map(i => (
             <div key={i} className="min-w-[280px] bg-white border border-neutral-200 p-8 rounded-xl snap-center flex flex-col items-center text-center cursor-pointer hover:border-neutral-400 transition-colors">
                <Block w="w-24 h-24" h="h-24" bg="bg-neutral-200" mb="mb-6" className="rounded-full" />
                <Block w="w-32" h="h-5" bg="bg-neutral-900" mb="mb-2" />
                <Block w="w-40" h="h-3" bg="bg-neutral-500" mb="mb-6" />
                <Block w="w-full" h="h-10" bg="bg-neutral-100" mb="mb-0" className="rounded-lg" />
             </div>
           ))}
        </div>
      </div>
    </section>

    <section className="w-screen py-24 md:py-32 px-[3vw] bg-white border-b border-neutral-200">
      <div className="max-w-[120rem] mx-auto bg-neutral-900 rounded-3xl p-12 md:p-20 text-center flex flex-col items-center">
        <SectionInfo num="B6" title="Newsletter & Digest Archive" rationale="Captures engaged readers into an owned communication channel, ensuring consistent delivery of new reports directly to their inbox." dark={true} />
        <Block w="w-full max-w-xl" h="h-10" bg="bg-white" mb="mb-6" className="mt-8" />
        <Block w="w-3/4 max-w-lg" h="h-4" bg="bg-neutral-400" mb="mb-10" />
        <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
           <Block w="w-full" h="h-14" bg="bg-neutral-800" mb="mb-0" className="rounded-xl border border-neutral-700" />
           <Block w="w-full sm:w-32" h="h-14" bg="bg-white" mb="mb-0" className="rounded-xl flex-shrink-0" />
        </div>
      </div>
    </section>
  </div>
);

const ContactPage = () => (
  <div className="w-full animate-fade-up">
    <section className="w-screen py-24 md:py-32 px-[3vw] bg-white border-b border-neutral-200 pt-32 md:pt-40">
      <div className="max-w-[120rem] mx-auto w-full">
        <SectionInfo num="C1" title="Get in Touch" rationale="Direct channel for policymakers, media, and researchers to contact the PMU, request specific data runs, or initiate collaborations." />
        
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 mt-12">
          <div className="lg:col-span-5 flex flex-col gap-10">
            <div className="flex flex-col gap-4">
              <Block w="w-full" h="h-10 md:h-12" bg="bg-neutral-900" mb="mb-2" />
              <Block w="w-4/5" h="h-10 md:h-12" bg="bg-neutral-900" mb="mb-6" />
              <Block w="w-full" h="h-4 md:h-5" bg="bg-neutral-400" mb="mb-2" />
              <Block w="w-3/4" h="h-4 md:h-5" bg="bg-neutral-400" mb="mb-8" />
            </div>
            
            <div className="flex flex-col gap-8">
              {[1, 2, 3].map(i => (
                <div key={i} className="flex gap-6 items-start">
                  <Block w="w-12 h-12 md:w-16 md:h-16" h="h-12 md:h-16" bg="bg-neutral-100" mb="mb-0" className="rounded-xl flex-shrink-0" />
                  <div className="flex flex-col gap-3 w-full pt-1">
                    <Block w="w-32" h="h-4 md:h-5" bg="bg-neutral-800" mb="mb-0" />
                    <Block w="w-full max-w-[16rem]" h="h-3 md:h-4" bg="bg-neutral-500" mb="mb-0" />
                    <Block w="w-3/4 max-w-[12rem]" h="h-3 md:h-4" bg="bg-neutral-500" mb="mb-0" />
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="lg:col-span-7 bg-neutral-50 p-8 md:p-12 rounded-2xl border border-neutral-200 shadow-sm flex flex-col gap-6">
             <div className="grid sm:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <Block w="w-24" h="h-3" bg="bg-neutral-500" mb="mb-1" />
                  <Block w="w-full" h="h-12 md:h-14" bg="bg-white" mb="mb-0" className="border border-neutral-200" />
                </div>
                <div className="flex flex-col gap-2">
                  <Block w="w-32" h="h-3" bg="bg-neutral-500" mb="mb-1" />
                  <Block w="w-full" h="h-12 md:h-14" bg="bg-white" mb="mb-0" className="border border-neutral-200" />
                </div>
             </div>
             <div className="flex flex-col gap-2">
                <Block w="w-40" h="h-3" bg="bg-neutral-500" mb="mb-1" />
                <Block w="w-full" h="h-12 md:h-14" bg="bg-white" mb="mb-0" className="border border-neutral-200" />
             </div>
             <div className="flex flex-col gap-2">
                <Block w="w-24" h="h-3" bg="bg-neutral-500" mb="mb-1" />
                <Block w="w-full" h="h-32 md:h-40" bg="bg-white" mb="mb-0" className="border border-neutral-200 rounded-xl" />
             </div>
             <div className="mt-4 w-full sm:w-48 h-12 md:h-14 bg-neutral-900 hover:bg-neutral-800 transition-colors rounded-xl flex items-center justify-center cursor-pointer shadow-sm">
                <Block w="w-24" h="h-3" bg="bg-white" mb="mb-0" />
             </div>
          </div>
        </div>
      </div>
    </section>

    <section className="w-screen py-24 md:py-32 px-[3vw] bg-neutral-50 border-b border-neutral-200">
      <div className="max-w-[120rem] mx-auto w-full">
        <SectionInfo num="C2" title="PMU Headquarters & Hubs" rationale="Provides physical grounding to the institution. Official delegates, stakeholders, and institutional partners often require physical office details for formal correspondence and in-person meetings." />
        
        <div className="grid lg:grid-cols-2 gap-12 mt-12">
          <div className="w-full aspect-[4/3] md:aspect-video lg:aspect-auto lg:h-[500px] bg-neutral-200 rounded-2xl relative overflow-hidden flex items-center justify-center border border-neutral-300 shadow-inner">
             <div className="absolute inset-0 bg-dot-pattern opacity-60"></div>
             <Block w="w-16 h-16" h="h-16" bg="bg-neutral-800" mb="mb-0" className="rounded-full shadow-2xl relative z-10 animate-bounce" />
          </div>
          <div className="flex flex-col justify-center gap-8">
            <Block w="w-full max-w-sm" h="h-8 md:h-10" bg="bg-neutral-900" mb="mb-4" />
            
            {[1, 2].map((loc) => (
              <div key={loc} className="bg-white p-6 md:p-8 rounded-xl border border-neutral-200 shadow-sm flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  <Block w="w-8 h-8" h="h-8" bg="bg-neutral-800" mb="mb-0" className="rounded-md" />
                  <Block w="w-48" h="h-5 md:h-6" bg="bg-neutral-800" mb="mb-0" />
                </div>
                <div className="pl-11">
                  <Block w="w-full" h="h-4" bg="bg-neutral-400" mb="mb-2" />
                  <Block w="w-3/4" h="h-4" bg="bg-neutral-400" mb="mb-6" />
                  <div className="flex gap-4">
                    <Block w="w-32" h="h-3" bg="bg-neutral-500" mb="mb-0" />
                    <Block w="w-32" h="h-3" bg="bg-neutral-500" mb="mb-0" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>

    <section className="w-screen py-24 md:py-32 px-[3vw] bg-neutral-900 border-b border-neutral-800 bg-dot-pattern-dark relative">
      <div className="absolute inset-0 bg-neutral-900/80"></div>
      <div className="max-w-[120rem] mx-auto w-full relative z-10">
        <SectionInfo num="C3" title="Media & Press Inquiries" rationale="A dedicated channel for journalists. Separating press from general inquiries ensures rapid response times for media coverage and provides direct access to brand assets and official statements." dark={true} />
        
        <div className="grid md:grid-cols-3 gap-8 mt-12">
          <div className="md:col-span-1 flex flex-col gap-6 p-8 bg-neutral-800 rounded-2xl border border-neutral-700">
            <Block w="w-16 h-16" h="h-16" bg="bg-neutral-600" mb="mb-4" className="rounded-full" />
            <Block w="w-48" h="h-6" bg="bg-white" mb="mb-2" />
            <Block w="w-32" h="h-4" bg="bg-neutral-400" mb="mb-8" />
            <Block w="w-full" h="h-3" bg="bg-neutral-500" mb="mb-3" />
            <Block w="w-4/5" h="h-3" bg="bg-neutral-500" mb="mb-6" />
            <Block w="w-full h-12" h="h-12" bg="bg-neutral-700" mb="mb-0" className="rounded-xl mt-auto" />
          </div>
          
          <div className="md:col-span-2 grid sm:grid-cols-2 gap-6">
            {[1, 2, 3, 4].map((asset) => (
              <div key={asset} className="bg-neutral-800/50 hover:bg-neutral-800 p-6 rounded-xl border border-neutral-700 transition-colors flex items-center justify-between cursor-pointer group">
                <div className="flex items-center gap-4">
                  <Block w="w-12 h-12" h="h-12" bg="bg-neutral-700" mb="mb-0" className="rounded-lg group-hover:bg-neutral-600 transition-colors" />
                  <div className="flex flex-col gap-2">
                    <Block w="w-32" h="h-4" bg="bg-neutral-200" mb="mb-0" />
                    <Block w="w-20" h="h-3" bg="bg-neutral-500" mb="mb-0" />
                  </div>
                </div>
                <Block w="w-8 h-8" h="h-8" bg="bg-white" mb="mb-0" className="rounded-full group-hover:bg-neutral-300 transition-colors flex-shrink-0" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>

    <section className="w-screen py-24 md:py-32 px-[3vw] bg-white border-b border-neutral-200">
      <div className="max-w-[120rem] mx-auto w-full flex flex-col md:flex-row gap-12 lg:gap-20">
        <div className="w-full md:w-1/3 flex-shrink-0">
          <SectionInfo num="C4" title="Frequently Asked Questions" rationale="Reduces friction and repetitive inquiries for the PMU by preemptively answering common questions regarding data usage, model access, and partnership criteria." />
        </div>
        
        <div className="w-full md:w-2/3 flex flex-col gap-4 pt-8 md:pt-0">
          {[1, 2, 3, 4, 5].map((faq) => (
            <div key={faq} className="w-full border border-neutral-200 rounded-xl p-6 hover:border-neutral-400 transition-colors cursor-pointer group">
              <div className="flex justify-between items-center">
                <Block w="w-3/4 max-w-md" h="h-5 md:h-6" bg="bg-neutral-800" mb="mb-0" className="group-hover:bg-neutral-600 transition-colors" />
                <div className="w-6 h-6 flex items-center justify-center relative">
                  <div className="w-4 h-0.5 bg-neutral-400 absolute"></div>
                  <div className="w-0.5 h-4 bg-neutral-400 absolute"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  </div>
);

const Footer = () => (
  <footer className="w-screen pt-24 md:pt-32 pb-12 px-[3vw] bg-neutral-950 text-white relative z-50">
    <div className="max-w-[120rem] mx-auto">
       
       <SectionInfo 
        num="09" 
        title="Directory & Compliance" 
        rationale="To provide the essential utilitarian architectural anchor for the entire platform. It houses critical compliance data, exhaustive directory links, and legal frameworks, ensuring the complex ecosystem remains fully navigable."
        dark={true}
      />

       <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-12 md:gap-16 mb-20 md:mb-24 mt-16">
          <div className="col-span-2 lg:col-span-2 flex flex-col items-start">
             <Block w="w-16 h-16 md:w-20 md:h-20" h="h-16 md:h-20" bg="bg-neutral-800" mb="mb-6 md:mb-8" className="rounded-2xl" />
             <Block w="w-full max-w-xs" h="h-3 md:h-4" bg="bg-neutral-600" mb="mb-3" />
             <Block w="w-5/6 max-w-xs" h="h-3 md:h-4" bg="bg-neutral-600" mb="mb-3" />
             <Block w="w-4/5 max-w-xs" h="h-3 md:h-4" bg="bg-neutral-600" mb="mb-8 md:mb-10" />
             <div className="flex gap-4">
                {[1, 2, 3, 4].map(icon => (
                  <Block key={icon} w="w-10 h-10 md:w-12 md:h-12" h="h-10 md:h-12" bg="bg-neutral-800" mb="mb-0" className="rounded-full hover:bg-neutral-600 transition-colors cursor-pointer" />
                ))}
             </div>
          </div>
          
          {[
            { title: 'Research & Data', links: 5 },
            { title: 'About the Project', links: 4 },
            { title: 'Media & Resources', links: 4 },
            { title: 'Legal & Policies', links: 5 }
          ].map((col, idx) => (
            <div key={idx} className="col-span-1 flex flex-col items-start">
               <Block w="w-32 md:w-40" h="h-3 md:h-4" bg="bg-neutral-500" mb="mb-6 md:mb-8" />
               {Array.from({ length: col.links }).map((_, linkIdx) => (
                 <Block 
                   key={linkIdx} 
                   w={linkIdx % 2 === 0 ? "w-24 md:w-32" : "w-32 md:w-40"} 
                   h="h-2 md:h-3" 
                   bg="bg-neutral-700" 
                   mb="mb-4 md:mb-5" 
                   className="hover:bg-white cursor-pointer transition-colors" 
                 />
               ))}
            </div>
          ))}
       </div>

       <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 p-8 md:p-10 bg-neutral-900 border border-neutral-800 rounded-2xl mb-16">
          <div className="flex flex-col gap-3">
            <Block w="w-48 md:w-64" h="h-5 md:h-6" bg="bg-white" mb="mb-0" />
            <Block w="w-full max-w-md" h="h-3 md:h-4" bg="bg-neutral-500" mb="mb-0" />
          </div>
          <div className="flex flex-col sm:flex-row w-full lg:w-auto gap-3">
            <Block w="w-full sm:w-64 md:w-80" h="h-12 md:h-14" bg="bg-neutral-800" mb="mb-0" className="rounded-xl border border-neutral-700" />
            <Block w="w-full sm:w-32" h="h-12 md:h-14" bg="bg-white" mb="mb-0" className="rounded-xl cursor-pointer hover:bg-neutral-200 transition-colors" />
          </div>
       </div>

       <div className="border-t border-neutral-800 pt-8 md:pt-10 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
          <Block w="w-64 md:w-80" h="h-3" bg="bg-neutral-600" mb="mb-0" />
          <div className="flex flex-wrap gap-6 md:gap-10">
             {[1, 2, 3, 4].map(bottomLink => (
               <Block key={bottomLink} w="w-20 md:w-28" h="h-2 md:h-3" bg="bg-neutral-600" mb="mb-0" className="hover:bg-white cursor-pointer transition-colors" />
             ))}
          </div>
       </div>
    </div>
  </footer>
);

export default function App() {
  const [showPreloader, setShowPreloader] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentPage, setCurrentPage] = useState('home');

  useEffect(() => {
    document.title = "NZI Annotated Skeleton";
  }, []);

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'research', label: 'Research & Cases' },
    { id: 'data', label: 'Data Portal' },
    { id: 'blogs', label: 'Blogs' }
  ];

  return (
    <>
      <style dangerouslySetInnerHTML={{__html: styleSheet}} />

      {showPreloader && (
        <div className={`fixed inset-0 z-[9999] transition-opacity duration-1000 ease-in-out ${isLoaded ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
          <Preloader onComplete={() => {
            setIsLoaded(true);
            setTimeout(() => setShowPreloader(false), 1000);
          }} />
        </div>
      )}

      <div className={`transition-opacity duration-[1200ms] ${isLoaded ? 'opacity-100' : 'opacity-0 h-screen overflow-hidden'}`}>
        
        <header className="fixed top-0 w-screen z-50 bg-white/90 backdrop-blur-md border-b border-neutral-200 px-[3vw]">
          <div className="max-w-[120rem] mx-auto h-20 md:h-24 flex justify-between items-center">
            <button onClick={() => setCurrentPage('home')} className="hover:opacity-70 transition-opacity">
              <Block w="w-32 md:w-48" h="h-6 md:h-8" bg="bg-neutral-900" mb="mb-0" />
            </button>
            <nav className="hidden lg:flex items-center gap-10">
              <div className="flex gap-8">
                {navLinks.map(link => (
                  <button 
                    key={link.id}
                    onClick={() => setCurrentPage(link.id)}
                    className={`relative text-xs md:text-sm font-bold tracking-widest uppercase transition-all duration-300 ${
                      currentPage === link.id 
                        ? 'text-neutral-900' 
                        : 'text-neutral-400 hover:text-neutral-600'
                    }`}
                  >
                    {link.label}
                    {currentPage === link.id && (
                      <div className="absolute -bottom-1.5 left-0 h-[2px] w-full bg-neutral-900 rounded-full"></div>
                    )}
                  </button>
                ))}
              </div>
              <button onClick={() => setCurrentPage('contact')} className="hover:opacity-90 active:scale-95 transition-all relative">
                <Block w="w-32 md:w-40" h="h-10 md:h-12" bg="bg-neutral-900" mb="mb-0" className="rounded-md" />
              </button>
            </nav>
            <div className="lg:hidden flex flex-col gap-1.5 cursor-pointer p-2">
               <Block w="w-8" h="h-1" bg="bg-neutral-800" mb="mb-0" />
               <Block w="w-8" h="h-1" bg="bg-neutral-800" mb="mb-0" />
            </div>
          </div>
        </header>

        <main>
          {currentPage === 'home' && (
            <div className="animate-fade-up">
              <HeroSection />
              <PartnersMarquee />
              <RationaleSection />
              <InteractiveTimeline />
              <SectorsGrid />
              <DataPortalPreview />
              <PublicationsGrid />
              <PreFooter />
            </div>
          )}
          {currentPage === 'about' && <AboutPage />}
          {currentPage === 'research' && <ResearchPage />}
          {currentPage === 'data' && <DataPortalPage />}
          {currentPage === 'blogs' && <BlogsPage />}
          {currentPage === 'contact' && <ContactPage />}
        </main>

        <Footer />
      </div>
    </>
  );
}
