// import { HashRouter as Router, Routes, Route } from "react-router-dom";
// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import Index from "./pages/Index";
// import Designer from "./pages/Designer";
// import Templates from "./pages/Templates";
// import Documentation from "./pages/Documentation";
// import GenerateUI from "./pages/genr";
// import Visualize from "./pages/flowc";
// import Gallery from "./pages/Gallery";
// import NotFound from "./pages/NotFound";

// // VS Code API for communication
// const vscode = (window as any).acquireVsCodeApi();

// // Create a React Query client
// const queryClient = new QueryClient();

// const App = () => {
//   return (
//     <QueryClientProvider client={queryClient}>
//       <Router>
//         <Routes>
//           <Route path="/" element={<Index />} />
//           <Route path="/designer" element={<Designer />} />
//           <Route path="/templates" element={<Templates />} />
//           <Route path="/documentation" element={<Documentation />} />
//           <Route path="/genr" element={<GenerateUI />} />
//           <Route path="/flowc" element={<Visualize />} />
//           <Route 
//             path="/gallery" 
//             element={
//               <Gallery onLoadDesign={(design: any) => {
//                 vscode.postMessage({ command: "saveDrawing", data: design });
//               }} />
//             } 
//           />
//           <Route path="*" element={<NotFound />} />
//         </Routes>
//       </Router>
//     </QueryClientProvider>
//   );
// };

// export default App;


import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Index from "./pages/Index";
import Designer from "./pages/Designer";
import Templates from "./pages/Templates";
// import Documentation from "./pages/Documentation";
//import GenerateUI from "./pages/GenerateUI";
import Gallery from "./pages/Gallery";
import NotFound from "./pages/NotFound";
import GenerateUI from "./pages/genr";
import Visualize from "./pages/flowc";
import Contact from "./pages/contact";
import Docu from "./pages/Doc";

// Create a client
const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/designer" element={<Designer />} />
          <Route path="/templates" element={<Templates />} />
          <Route path="/Doc" element={<Docu />} />
          <Route path="/genr" element={<GenerateUI />} />
          <Route path="/flowc" element={<Visualize />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/gallery" element={<Gallery onLoadDesign={function (design: any): void {
            throw new Error("Function not implemented.");
          } } />} />
          
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </QueryClientProvider>
  );
};

export default App;