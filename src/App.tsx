import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import SkinLogForm from './components/SkinLogForm';
import SkinLogList from './components/SkinLogList';
import { useToast } from "@/components/ui/use-toast"
import { ToastAction } from "@/components/ui/toast"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { ModeToggle } from './components/ModeToggle';
import { useApiKey } from './contexts/ApiKeyContext';
import { isTestAiMode } from './lib/utils';
import GentleCleanserPage from './pages/RecommendationsDetail/GentleCleanser';
import LimitDairyPage from './pages/RecommendationsDetail/LimitDairy';
import MeditationPage from './pages/RecommendationsDetail/Meditation';
import AIRecommendationDetail from './pages/AIRecommendationDetail';

function App() {
  const [skinLogs, setSkinLogs] = useState([]);
  const [isTestAi, setIsTestAi] = useState(false);
  const { toast } = useToast()
  const { openaiApiKey, setOpenaiApiKey } = useApiKey();

  useEffect(() => {
    // Load skin logs from local storage on initial load
    const storedLogs = localStorage.getItem('skinLogs');
    if (storedLogs) {
      setSkinLogs(JSON.parse(storedLogs));
    }

    // Determine if we're in test AI mode
    setIsTestAi(isTestAiMode());
  }, []);

  useEffect(() => {
    // Save skin logs to local storage whenever they change
    localStorage.setItem('skinLogs', JSON.stringify(skinLogs));
  }, [skinLogs]);

  const addSkinLog = (newLog) => {
    setSkinLogs([newLog, ...skinLogs]);
    toast({
      title: "Success!",
      description: "Your skin condition has been logged.",
      action: <ToastAction altText="Goto schedule to undo">Undo</ToastAction>,
    })
  };

  return (
    <Router>
      <div className="container mx-auto p-4">
        <ModeToggle />
        <nav className="mb-4">
          <ul className="flex space-x-4">
            <li>
              <Link to="/" className="hover:text-skin-teal">Home</Link>
            </li>
            <li>
              <Link to="/log-skin-condition" className="hover:text-skin-teal">Log Skin Condition</Link>
            </li>
            <li>
              <Link to="/skin-logs" className="hover:text-skin-teal">View Skin Logs</Link>
            </li>
            {isTestAi && (
              <li>
                <Link to="/testai" className="hover:text-skin-teal">Test AI</Link>
              </li>
            )}
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={
            <div>
              <h1 className="text-2xl font-bold mb-4">Skin Condition Tracker</h1>
              <p className="mb-4">Welcome to your personal skin condition tracker. Use the links above to log your skin's condition and view your history.</p>

              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger>What is this?</AccordionTrigger>
                  <AccordionContent>
                    <p className='pb-2'>This is a simple app to track your skin's condition over time.</p>
                    <p className='pb-2'>It uses local storage to save your data, so it's all stored on your computer.</p>
                    <p className='pb-2'>It's open source, so you can view the code <a href="https://github.com/stevepeak/skin-log" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">here</a>.</p>
                    <p className='pb-2'>It's built with React, Tailwind CSS, and Shadcn UI.</p>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>

              <div className="mt-4">
                <h2 className="text-xl font-semibold mb-2">Example Aspect Ratio</h2>
                <AspectRatio ratio={16 / 9}>
                  <img
                    src="https://images.unsplash.com/photo-1587614382231-d9433e61f086?w=800&dpr=2&q=75"
                    alt="Mountains"
                    className="rounded-md object-cover"
                  />
                </AspectRatio>
              </div>
            </div>
          } />
          <Route path="/log-skin-condition" element={<SkinLogForm addSkinLog={addSkinLog} />} />
          <Route path="/skin-logs" element={<SkinLogList skinLogs={skinLogs} />} />
          {isTestAi && (
            <Route path="/testai" element={
              <div>
                <h1 className="text-2xl font-bold mb-4">Test AI Features</h1>
                <p className="mb-4">This page is for testing AI-related features.</p>

                <div className="mb-4">
                  <label htmlFor="apiKey" className="block text-sm font-medium text-gray-700">OpenAI API Key:</label>
                  <input
                    type="password"
                    name="apiKey"
                    id="apiKey"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    value={openaiApiKey}
                    onChange={(e) => setOpenaiApiKey(e.target.value)}
                  />
                </div>
              </div>
            } />
          )}
          
          {/* Dynamic AI Recommendation Detail Pages */}
          <Route path="/recommendations-detail/:type/:id" element={<AIRecommendationDetail />} />
          
          {/* Legacy static recommendation pages (kept for compatibility) */}
          <Route path="/recommendations-detail/gentle-cleanser" element={<GentleCleanserPage />} />
          <Route path="/recommendations-detail/limit-dairy" element={<LimitDairyPage />} />
          <Route path="/recommendations-detail/meditation" element={<MeditationPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
