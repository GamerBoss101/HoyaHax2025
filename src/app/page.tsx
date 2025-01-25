import RootLayout from './layout'
import SignupPage from './signup/page'

export default function Home() {
  return (
    <RootLayout>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
        <h1 style={{ fontSize: 64, marginBottom: 20 }}>Welcome to Hoya</h1>
        <SignupPage />
      </div>
    </RootLayout>
  )
}
