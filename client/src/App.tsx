import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import Admin from "@/pages/Admin";
import Contact from "@/pages/Contact";
import TalkToExpert from "@/pages/TalkToExpert";
import Pricing from "@/pages/Pricing";
import GenericPage from "@/pages/GenericPage";
import UserLogin from "@/pages/UserLogin";
import UserDashboard from "@/pages/UserDashboard";
import UserProfile from "@/pages/UserProfile";
import CompanySetup from "@/pages/CompanySetup";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/login" component={Login} />
      <Route path="/admin" component={Admin} />
      <Route path="/contact" component={Contact} />
      <Route path="/talk-to-expert" component={TalkToExpert} />
      <Route path="/pricing" component={Pricing} />
      <Route path="/app-login" component={UserLogin} />
      <Route path="/dashboard" component={UserDashboard} />
      <Route path="/dashboard/profile" component={UserProfile} />
      <Route path="/dashboard/company" component={CompanySetup} />
      <Route path="/solutions/:slug" component={GenericPage} />
      <Route path="/who-we-serve/:slug" component={GenericPage} />
      <Route path="/resources/:slug" component={GenericPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
