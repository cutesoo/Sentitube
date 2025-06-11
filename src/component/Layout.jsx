import React from 'react'

export default function Layout({ children }) {
  return (
    <>
      <Header />
      <div className="container">
        <Nav />
        <main>{children}</main>
      </div>
    </>
  )
}
