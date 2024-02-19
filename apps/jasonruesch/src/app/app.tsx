export function App() {
  const packageVersion = import.meta.env.PACKAGE_VERSION;

  return (
    <div className="min-h-dvh flex flex-col">
      <main className="flex-1"></main>
      <footer className="text-center px-4 py-8">v{packageVersion}</footer>
    </div>
  );
}

export default App;
