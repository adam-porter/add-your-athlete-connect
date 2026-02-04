import React from 'react'

// Import Uniform components here
// Example: import { Button, Text } from '@hudl/uniform-web'

function App() {
  return (
    <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
      <h1>Welcome to UX Primer</h1>
      <p>
        This is your starter template for building prototypes with React and Hudl Uniform.
      </p>

      <div style={{ marginTop: '2rem' }}>
        <h2>Getting Started</h2>
        <ol>
          <li>Import Uniform components at the top of this file</li>
          <li>Use them in your JSX below</li>
          <li>Save the file and see changes instantly</li>
        </ol>
      </div>

      <div style={{
        marginTop: '2rem',
        padding: '1rem',
        backgroundColor: '#f0f0f0',
        borderRadius: '8px'
      }}>
        <h3>Example Component Area</h3>
        <p>Replace this section with your Uniform components</p>
        {/* Add your components here */}
      </div>
    </div>
  )
}

export default App
