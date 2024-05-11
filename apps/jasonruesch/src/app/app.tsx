import { Route, Routes } from 'react-router-dom';

export function App() {
  return (
    <div className="min-h-dvh grid place-content-center p-4">
      <Routes>
        <Route
          path="/"
          element={<h1 className="text-4xl font-bold">Jason Ruesch</h1>}
        />
        <Route
          path="/about"
          element={<h1 className="text-4xl font-bold">About</h1>}
        />
      </Routes>
    </div>
  );
}

export default App;
