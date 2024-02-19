export function Home() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-4">
      <h1 className="gradient-heading">
        <div className="flex items-center justify-center">
          I'm&nbsp;
          <span className="heading-lg">Jason Ruesch</span>
        </div>
        <div className="flex items-center justify-center">
          a&nbsp;
          <span className="heading-lg">Senior&nbsp;</span>
          Frontend
        </div>
        <div className="flex items-center justify-center">
          Software&nbsp;
          <span className="heading-lg">Engineer</span>
        </div>
      </h1>
      <p className="max-w-lg text-center sm:max-w-screen-sm lg:max-w-screen-lg">
        This is where I share my passion for creating exceptional user
        experiences through web development. Whether you're here for code,
        collaboration, or just to connect, I'm thrilled to have you.
      </p>
    </div>
  );
}

export default Home;
