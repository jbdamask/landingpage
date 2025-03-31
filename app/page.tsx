'use client'

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import { Playfair_Display, Inter } from 'next/font/google'
import Image from 'next/image'
import { whyCursorJournalContent } from './content/why-cursor-journal'

const playfair = Playfair_Display({ 
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500'],
  style: ['normal'],
})

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
})

export default function Page() {
  const observerRef = useRef<IntersectionObserver | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '50px'
    });

    document.querySelectorAll('.scroll-animation').forEach((element) => {
      observerRef.current?.observe(element);
    });

    return () => observerRef.current?.disconnect();
  }, []);

  useEffect(() => {
    const loadTally = () => {
      const existingScript = document.querySelector('script[src="https://tally.so/widgets/embed.js"]');
      if (!existingScript) {
        const script = document.createElement('script');
        script.src = "https://tally.so/widgets/embed.js";
        script.async = true;
        script.onload = () => {
          // @ts-ignore
          if (window.Tally) {
            // @ts-ignore
            window.Tally.loadEmbeds();
          }
        };
        document.body.appendChild(script);
      }
    };

    loadTally();
  }, []);

  // Add keyboard event listener for Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedImage(null);
      }
    };

    if (selectedImage) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [selectedImage]);

  return (
    <div className={`flex flex-col min-h-screen bg-black text-foreground bg-dotted-grid ${inter.className}`}>
      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes shimmer {
          0% { background-position: 0% 0; }
          100% { background-position: 200% 0; }
        }

        .fade-in {
          animation: fadeIn 0.8s ease-out forwards;
          opacity: 0;
        }

        .delay-1 { animation-delay: 0.2s; }
        .delay-2 { animation-delay: 0.4s; }
        .delay-3 { animation-delay: 0.6s; }
        
        .glimmer-card {
          position: relative;
          background: rgb(23, 23, 23);
          border-radius: 12px;
          overflow: hidden;
        }
        
        .glimmer-card::before {
          content: '';
          position: absolute;
          inset: -1px;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(0, 128, 128, 0.03),
            rgba(0, 128, 128, 0.06),
            rgba(0, 128, 128, 0.03),
            transparent
          );
          background-size: 200% 100%;
          animation: shimmer 8s ease-in-out infinite;
          pointer-events: none;
        }

        .glimmer-pill {
          position: relative;
          background: rgb(23, 23, 23);
          border-radius: 9999px;
          overflow: hidden;
        }
        
        .glimmer-pill::before {
          content: '';
          position: absolute;
          inset: -1px;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(0, 128, 128, 0.03),
            rgba(0, 128, 128, 0.06),
            rgba(0, 128, 128, 0.03),
            transparent
          );
          background-size: 200% 100%;
          animation: shimmer 8s ease-in-out infinite;
          pointer-events: none;
        }

        .hero-glow {
          position: absolute;
          top: 85%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 140%;
          height: 600px;
          background: radial-gradient(
            circle at center,
            rgba(0, 128, 128, 0.08) 0%,
            rgba(0, 128, 128, 0.03) 35%,
            transparent 70%
          );
          pointer-events: none;
          z-index: 0;
          filter: blur(50px);
        }

        .scroll-animation {
          opacity: 0;
          transform: translateY(20px);
          transition: all 0.8s cubic-bezier(0.22, 1, 0.36, 1);
        }

        .scroll-animation.animate-in {
          opacity: 1;
          transform: translateY(0);
        }

        .scroll-delay-1 { transition-delay: 0.1s; }
        .scroll-delay-2 { transition-delay: 0.2s; }
        .scroll-delay-3 { transition-delay: 0.3s; }

        .modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.9);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 50;
          padding: 2rem;
          backdrop-filter: blur(4px);
        }

        .modal-content {
          position: relative;
          max-width: 90vw;
          max-height: 90vh;
          background: transparent;
          border-radius: 0.75rem;
          overflow: hidden;
        }

        .modal-close {
          position: absolute;
          top: 1rem;
          right: 1rem;
          color: white;
          background: rgba(0, 0, 0, 0.5);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 50%;
          cursor: pointer;
          width: 32px;
          height: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 18px;
          transition: all 0.2s ease;
          z-index: 60;
        }

        .modal-close:hover {
          background: rgba(0, 0, 0, 0.7);
          border-color: rgba(255, 255, 255, 0.4);
          transform: scale(1.1);
        }

        .feature-image {
          width: 100%;
          aspect-ratio: 16/9;
          object-fit: cover;
          border-radius: 0.5rem;
          transition: transform 0.2s, opacity 0.2s;
          cursor: pointer;
          margin-top: 1.5rem;
        }

        .feature-image:hover {
          transform: scale(1.02);
          opacity: 0.9;
        }
      `}</style>

      {/* Navigation */}
      <header className="flex items-center justify-between py-4 px-6 border-b border-neutral-800/50">
        <div className="flex items-center gap-2">
          <img src="/images/cursor-journal-logo_thumbnail.jpg" alt="Cursor Journal Logo" className="w-10 h-10" />
          <Link href="/" className={`text-2xl md:text-3xl font-medium ${playfair.className}`}>
            Cursor Journal
          </Link>
        </div>
        <nav className="flex items-center gap-4">
          <Link href="#features" className="text-neutral-400 hover:text-white transition-colors">Features</Link>
          <Link href="#how-it-works" className="text-neutral-400 hover:text-white transition-colors">How It Works</Link>
          <Link href="#download" className="text-neutral-400 hover:text-white transition-colors">Download</Link>
          <Button 
            size="sm"
            className="bg-gradient-to-r from-[#008080] to-[#20B2AA] hover:opacity-90 text-white"
            onClick={() => {
              window.open('#download', '_self');
            }}
          >
            Download Now
          </Button>
        </nav>
      </header>

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="py-20 px-6 relative">
          <div className="hero-glow" />
          <div className="max-w-[1200px] mx-auto text-center relative z-10">
            {/* Logo Placeholder */}
            <div className="mb-4">
              <img 
                src="/images/cursor-journal-logo_thumbnail.jpg" 
                alt="Cursor Journal Logo" 
                className="w-32 h-32 mx-auto object-contain"
              />
            </div>
            <div className="inline-flex items-center px-6 py-2 text-base font-medium text-[#008080] mb-8 glimmer-pill fade-in bg-[#008080]/10 border border-[#008080]/20 shadow-[0_0_15px_rgba(0,128,128,0.1)]">
              <span className={playfair.className}>Introducing Cursor Journal</span>
            </div>
            <h1 className={`text-4xl md:text-5xl lg:text-6xl font-medium mb-6 tracking-tight fade-in delay-1 ${playfair.className}`}>
              Transform Your Cursor Conversations<br />Into Shareable Content
            </h1>
            <p className="text-lg md:text-xl text-neutral-400 mb-8 fade-in delay-2 max-w-3xl mx-auto">
              Save hours of writing time by automatically creating blog posts, tweets, and work reports.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 fade-in delay-3">
              <Button 
                size="lg" 
                className="rounded-full bg-gradient-to-r from-[#008080] to-[#20B2AA] hover:opacity-90 text-white w-full sm:w-auto"
                onClick={() => {
                  window.open('#download', '_self');
                }}
              >
                Download Free Trial
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="rounded-full border-neutral-700 text-white hover:bg-neutral-800 w-full sm:w-auto"
                onClick={() => {
                  window.open('#learn-more', '_self');
                }}
              >
                Learn More
              </Button>
            </div>
          </div>
        </section>

        {/* Demo Section */}
        <section className="py-20 px-6">
          <div className="max-w-[1200px] mx-auto scroll-animation">
            <div className="glimmer-card">
              <div className="bg-neutral-900 rounded-xl overflow-hidden">
                <div className="flex flex-col md:flex-row h-auto">
                  {/* Chat Conversation Demo */}
                  <div className="w-full p-6 flex flex-col">
                    <div className="flex items-center gap-2 mb-6">
                      <div className="flex items-center gap-2 text-neutral-400 text-sm">
                        <div className="w-3 h-3 rounded-full bg-green-500"></div>
                        <span>Tweet Thread</span>
                      </div>
                      <div className="w-px h-4 bg-neutral-700"></div>
                      <div className="flex items-center gap-2 text-neutral-400 text-sm">
                        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                        <span>Blog Post</span>
                      </div>
                    </div>
                    
                    <div className="flex-1 overflow-y-auto space-y-6">
                      {/* AI Message */}
                      <div className="flex gap-4">
                        <div className="w-10 h-10 rounded-full bg-[#008080]/20 flex items-center justify-center text-[#008080] flex-shrink-0">
                          AI
                        </div>
                        <div className="flex-1 p-4 bg-neutral-800 rounded-lg">
                          <p className="text-sm text-neutral-300">
                            I've analyzed your project data and identified three key trends in your usage patterns.
                          </p>
                        </div>
                      </div>

                      {/* User Message */}
                      <div className="flex gap-4 justify-end">
                        <div className="flex-1 p-4 bg-neutral-800 rounded-lg">
                          <p className="text-sm text-neutral-300">
                            That's interesting! Can you create a summary I can share with my team?
                          </p>
                        </div>
                        <div className="w-10 h-10 rounded-full bg-neutral-700 flex items-center justify-center text-white flex-shrink-0">
                          U
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Why Cursor Journal Section */}
        <section className="py-20 px-6 border-t border-neutral-800">
          <div className="max-w-[1200px] mx-auto">
            <div className="text-center mb-16 scroll-animation">
              <h2 className={`text-3xl md:text-4xl font-medium mb-3 ${playfair.className}`}>{whyCursorJournalContent.title}</h2>
              <p className="text-neutral-400 text-lg">{whyCursorJournalContent.subtitle}</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="scroll-animation scroll-delay-1">
                <div className="bg-neutral-900 p-8 rounded-xl border border-neutral-800/80">
                  <h3 className={`text-2xl font-medium mb-4 ${playfair.className}`}>{whyCursorJournalContent.problem.title}</h3>
                  {whyCursorJournalContent.problem.paragraphs.map((paragraph, index) => (
                    <p key={index} className="text-neutral-400 leading-relaxed mb-4">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>

              <div className="scroll-animation scroll-delay-2">
                <div className="bg-neutral-900 p-8 rounded-xl border border-neutral-800/80">
                  <h3 className={`text-2xl font-medium mb-4 ${playfair.className}`}>{whyCursorJournalContent.solution.title}</h3>
                  {whyCursorJournalContent.solution.paragraphs.map((paragraph, index) => (
                    <p key={index} className="text-neutral-400 leading-relaxed mb-4">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20 px-6 border-t border-neutral-800">
          <div className="max-w-[1200px] mx-auto">
            <div className="text-center mb-16 scroll-animation">
              <h2 className={`text-3xl md:text-4xl font-medium mb-3 ${playfair.className}`}>Features</h2>
              <p className="text-neutral-400 text-lg">Everything you need to transform AI conversations into shareable content.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 relative">
              <div 
                className="bg-neutral-900 p-8 rounded-xl border border-neutral-800/80 hover:border-[#40E0D0]/20 transition-colors scroll-animation scroll-delay-1 group flex flex-col cursor-pointer"
                onClick={(e) => {
                  e.preventDefault();
                  setSelectedImage('/images/cursor-journal-blog.png');
                }}
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-[#40E0D0]/10 text-[#40E0D0] flex items-center justify-center mb-6 group-hover:bg-[#40E0D0]/20 transition-colors">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                      <line x1="3" y1="9" x2="21" y2="9"></line>
                      <line x1="9" y1="21" x2="9" y2="9"></line>
                    </svg>
                  </div>
                  <h3 className={`text-xl font-medium mb-3 group-hover:text-[#40E0D0] transition-colors ${playfair.className}`}>Blog Post Generator</h3>
                  <p className="text-neutral-400 leading-relaxed">
                    Transform your AI conversations into polished blog posts with proper formatting, headings, and code blocks.
                  </p>
                </div>
                <div className="relative mt-auto pt-6">
                  <Image
                    src="/images/cursor-journal-blog.png"
                    alt="Blog Post Example"
                    width={800}
                    height={450}
                    className="feature-image"
                  />
                </div>
              </div>

              <div 
                className="bg-neutral-900 p-8 rounded-xl border border-neutral-800/80 hover:border-[#20B2AA]/20 transition-colors scroll-animation scroll-delay-2 group flex flex-col cursor-pointer"
                onClick={(e) => {
                  e.preventDefault();
                  setSelectedImage('/images/cursor-journal-tweets.png');
                }}
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-[#20B2AA]/10 text-[#20B2AA] flex items-center justify-center mb-6 group-hover:bg-[#20B2AA]/20 transition-colors">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
                    </svg>
                  </div>
                  <h3 className={`text-xl font-medium mb-3 group-hover:text-[#20B2AA] transition-colors ${playfair.className}`}>Twitter-Ready Threads</h3>
                  <p className="text-neutral-400 leading-relaxed">
                    Easily create project update tweets from your AI conversations.
                  </p>
                </div>
                <div className="relative mt-auto pt-6">
                  <Image
                    src="/images/cursor-journal-tweets.png"
                    alt="Twitter Thread Example"
                    width={800}
                    height={450}
                    className="feature-image"
                  />
                </div>
              </div>

              <div 
                className="bg-neutral-900 p-8 rounded-xl border border-neutral-800/80 hover:border-[#008080]/20 transition-colors scroll-animation scroll-delay-3 group flex flex-col cursor-pointer"
                onClick={(e) => {
                  e.preventDefault();
                  setSelectedImage('/images/cursor-journal-report-for-elon.png');
                }}
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-[#008080]/10 text-[#008080] flex items-center justify-center mb-6 group-hover:bg-[#008080]/20 transition-colors">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                      <polyline points="14 2 14 8 20 8"></polyline>
                      <line x1="16" y1="13" x2="8" y2="13"></line>
                      <line x1="16" y1="17" x2="8" y2="17"></line>
                      <polyline points="10 9 9 9 8 9"></polyline>
                    </svg>
                  </div>
                  <h3 className={`text-xl font-medium mb-3 group-hover:text-[#008080] transition-colors ${playfair.className}`}>Reports for Elon</h3>
                  <p className="text-neutral-400 leading-relaxed">
                    Instantly convert your Cursor chats into well-structured summaries of the top five things you did last week (or day, or month).
                  </p>
                </div>
                <div className="relative mt-auto pt-6">
                  <Image
                    src="/images/cursor-journal-report-for-elon.png"
                    alt="Report for Elon Example"
                    width={800}
                    height={450}
                    className="feature-image"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" className="py-20 px-6 border-t border-neutral-800 bg-neutral-900/50">
          <div className="max-w-[1200px] mx-auto text-center">
            <div className="scroll-animation">
              <h2 className={`text-3xl md:text-4xl font-medium mb-4 ${playfair.className}`}>How It Works</h2>
              <p className="text-neutral-400 mb-12 max-w-2xl mx-auto">You may not know it, but your Cursor IDE stores all your conversations in local databases on your computer. Cursor Journal knows how to query these databases, pulling just enough information to tell a story about your work. It then uses OpenAI API's to turn the raw data into comprehensive, well written docs.</p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8 text-left">
              <div className="scroll-animation scroll-delay-1">
                <div className="w-12 h-12 rounded-full bg-[#008080]/20 text-[#008080] flex items-center justify-center mb-4 text-xl font-bold">1</div>
                <h3 className={`text-xl font-medium mb-2 ${playfair.className}`}>Connect with Cursor</h3>
                <p className="text-neutral-400">Install Cursor Journal and connect it to your Cursor AI editor with a single click.</p>
              </div>
              
              <div className="scroll-animation scroll-delay-2">
                <div className="w-12 h-12 rounded-full bg-[#20B2AA]/20 text-[#20B2AA] flex items-center justify-center mb-4 text-xl font-bold">2</div>
                <h3 className={`text-xl font-medium mb-2 ${playfair.className}`}>Have Your Conversations</h3>
                <p className="text-neutral-400">Continue using Cursor AI as you normally would. Cursor Journal works silently in the background.</p>
              </div>
              
              <div className="scroll-animation scroll-delay-3">
                <div className="w-12 h-12 rounded-full bg-[#40E0D0]/20 text-[#40E0D0] flex items-center justify-center mb-4 text-xl font-bold">3</div>
                <h3 className={`text-xl font-medium mb-2 ${playfair.className}`}>Export and Share</h3>
                <p className="text-neutral-400">When you're ready, export your conversation as a blog post, Twitter thread, or documentation with one click.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Download Section */}
        <section id="download" className="py-20 px-6 border-t border-neutral-800 bg-neutral-900/80">
          <div className="max-w-[1200px] mx-auto text-center">
            <div className="scroll-animation">
              <h2 className={`text-3xl md:text-4xl font-medium mb-4 ${playfair.className}`}>Download Now</h2>
              <p className="text-neutral-400 mb-12">Start transforming your AI conversations into shareable content today.</p>
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 scroll-animation">
              <Button 
                size="lg" 
                className="rounded-full bg-gradient-to-r from-[#008080] to-[#20B2AA] hover:opacity-90 text-white w-full sm:w-auto"
              >
                Download Now
              </Button>
            </div>
          </div>
        </section>
      </main>

      {/* Image Modal */}
      {selectedImage && (
        <div 
          className="modal-overlay" 
          onClick={() => setSelectedImage(null)}
          role="dialog"
          aria-modal="true"
          aria-label="Image preview"
        >
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <button 
              className="modal-close" 
              onClick={() => setSelectedImage(null)}
              aria-label="Close modal"
            >
              ✕
            </button>
            <Image
              src={selectedImage}
              alt="Feature Example"
              width={1920}
              height={1080}
              className="rounded-lg"
              style={{ maxHeight: '90vh', width: 'auto' }}
              quality={95}
            />
          </div>
        </div>
      )}

      <footer className="py-8 px-6 border-t border-neutral-800/50 scroll-animation">
        <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-sm text-neutral-400">
            © 2024 Cursor Journal. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-neutral-400 hover:text-white transition-colors">
              <span className="sr-only">Twitter</span>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/>
              </svg>
            </a>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-neutral-400 hover:text-white transition-colors">
              <span className="sr-only">GitHub</span>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
              </svg>
            </a>
            <a href="https://discord.com" target="_blank" rel="noopener noreferrer" className="text-neutral-400 hover:text-white transition-colors">
              <span className="sr-only">Discord</span>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 6h0a3 3 0 0 1 3 3v7a3 3 0 0 1-3 3h-7a3 3 0 0 1-3-3v0"/>
                <path d="M6 18v-7a3 3 0 0 1 3-3h7"/>
                <circle cx="8" cy="12" r="1"/>
                <circle cx="16" cy="12" r="1"/>
              </svg>
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}