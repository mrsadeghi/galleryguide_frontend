import { useState, useEffect } from "react";
import LandingPage from "./LandingPage";
import ContactPage from "./ContactPage";
import ChatApp from "./ChatApp";

export default function App() {
  const [showDemo, setShowDemo] = useState(
    window.location.pathname === "/demo"
  );
  const [contactPlan, setContactPlan] = useState(
    window.location.pathname === "/contact" ? "Pilot" : null
  );

  useEffect(() => {
    const handlePop = () => {
      const path = window.location.pathname;
      setShowDemo(path === "/demo");
      if (path !== "/contact") setContactPlan(null);
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

  const goToContact = (plan) => {
    window.history.pushState({}, "", "/contact");
    setContactPlan(plan);
  };

  const goBackFromContact = () => {
    window.history.pushState({}, "", "/");
    setContactPlan(null);
  };

  if (contactPlan) return <ContactPage plan={contactPlan} onBack={goBackFromContact} />;
  if (showDemo) return <ChatApp onBack={goToHome} />;
  return <LandingPage onEnterDemo={goToDemo} onContact={goToContact} />;
}