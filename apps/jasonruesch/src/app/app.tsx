export function App() {
  const packageVersion = import.meta.env.PACKAGE_VERSION;

  return (
    <div>
      <footer>v{packageVersion}</footer>
    </div>
  );
}

export default App;
