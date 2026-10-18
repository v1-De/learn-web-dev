import { Head } from "./components/Head";
import { MainContent } from "./components/MainContent";
import { Footer } from "./components/Footer";

function App() {
  return (
    <div className="page">
      <Head />
      <MainContent />
      <Footer />
    </div>
  );
}

export default App;
