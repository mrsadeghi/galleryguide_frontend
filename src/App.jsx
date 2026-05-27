import { useState, useEffect } from "react";
import LandingPage from "./LandingPage";
import ContactPage from "./ContactPage";
import ChatApp from "./ChatApp";

export default function App() {
  const [showDemo, setShowDemo] = useState(
    window.location.pathname === "/demo"
  );
  const [contactPlan, setContactPlan] = useState(null);

  useEffect(() => {
    const handlePop = () => {
      setShowDemo(window.location.pathname === "/demo");
    };
    window.addEventListener("popstate", handlePop);
    return () => window.removeEventListener("popstate", handlePop);
  }, []);

  const goToDemo = () => {
    window.history.pushState({}, "", "/demo");
    setShowDemo(true);
  };

  const goToHome = () => {
    window.history.pushState({}, "", "/");
    setShowDemo(false);
  };

  if (contactPlan) return <ContactPage plan={contactPlan} onBack={() => setContactPlan(null)} />;
  if (showDemo) return <ChatApp onBack={goToHome} />;
  return <LandingPage onEnterDemo={goToDemo} onContact={plan => setContactPlan(plan)} />;
}