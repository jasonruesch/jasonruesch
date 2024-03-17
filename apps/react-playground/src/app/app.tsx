// eslint-disable-next-line @typescript-eslint/no-unused-vars

import { Link, Route, Routes } from 'react-router-dom';
import NxWelcome from './nx-welcome';

export function App() {
  return (
    <div>
      <NxWelcome title="react-playground" />

      {/* START: routes */}
      {/* These routes and navigation have been generated for you */}
      {/* Feel free to move and update them to fit your needs */}
      <br />
      <hr />
      <br />
      <div role="navigation">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/page-2">Page 2</Link>
          </li>
        </ul>
      </div>
      <Routes>
        <Route
          path="/"
          element={
            <div>
              <h2 className="tw-gradient-heading tw-flex tw-items-center tw-justify-center">
                <span className="tw-heading-lg">Gradient</span>
                <span>Heading</span>
              </h2>
              This is the generated root route.{' '}
              <Link to="/page-2">Click here for page 2.</Link>
              <div className="tw-grid-layout">
                <div className="tw-col-span-full tw-space-x-2">
                  <button type="button" className="tw-btn-primary">
                    Primary
                  </button>
                  <button type="button" className="tw-btn-primary tw-btn-small">
                    Primary (small)
                  </button>
                  <button type="button" className="tw-btn-primary" disabled>
                    Primary (disabled)
                  </button>
                </div>
                <div className="tw-col-span-full tw-space-x-2">
                  <button type="button" className="tw-btn-neutral">
                    Neutral
                  </button>
                  <button type="button" className="tw-btn-info">
                    Info
                  </button>
                  <button type="button" className="tw-btn-danger">
                    Danger
                  </button>
                  <button type="button" className="tw-btn-primary tw-btn-icon">
                    +
                  </button>
                  <button
                    type="button"
                    className="tw-btn-primary tw-btn-small tw-btn-icon"
                  >
                    $
                  </button>
                </div>
                <div className="tw-col-span-full tw-space-x-2">
                  <button type="button" className="tw-btn-primary tw-btn-link">
                    Link Button
                  </button>
                  <button
                    type="button"
                    className="tw-btn-primary tw-btn-small tw-btn-link"
                  >
                    Link Button (small)
                  </button>
                  <button
                    type="button"
                    className="tw-btn-primary tw-btn-link"
                    disabled
                  >
                    Link Button (disabled)
                  </button>
                </div>
              </div>
            </div>
          }
        />
        <Route
          path="/page-2"
          element={
            <div>
              <Link to="/">Click here to go back to root page.</Link>
            </div>
          }
        />
      </Routes>
      {/* END: routes */}
    </div>
  );
}

export default App;
