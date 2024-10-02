import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Music, Users, Radio, Headphones } from "lucide-react"
import { Appbar } from "./components/Appbar"
import Redirect from "./components/Redirect"

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-900">
      <header className="px-4 lg:px-6 h-16 flex items-center border-b border-gray-800 bg-gradient-to-r from-purple-900 to-indigo-900">
<Appbar/>  
<Redirect/>   
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl/none bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500">
                  Let Fans Choose Your Stream's Music
                </h1>
                <p className="mx-auto max-w-[700px] text-xl text-gray-300 md:text-2xl">
                  Engage your audience like never before with fan-picked soundtracks.
                </p>
              </div>
              <div className="space-x-4">
                <Button className="bg-gradient-to-r from-pink-500 to-purple-600 text-white hover:from-pink-600 hover:to-purple-700 transition-all duration-300">
                  Get Started
                </Button>
                <Button variant="outline" className="text-pink-400 border-pink-400 hover:bg-pink-400/10 transition-all duration-300">
                  Learn More
                </Button>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-800">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-purple-500">
              Key Features
            </h2>
            <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3">
              <div className="flex flex-col items-center space-y-3 text-center p-6 bg-gray-900 rounded-lg shadow-lg hover:shadow-pink-500/20 transition-all duration-300">
                <Users className="h-12 w-12 text-pink-500" />
                <h3 className="text-xl font-bold text-gray-100">Fan Engagement</h3>
                <p className="text-gray-300">Let fans choose your stream's music.</p>
              </div>
              <div className="flex flex-col items-center space-y-3 text-center p-6 bg-gray-900 rounded-lg shadow-lg hover:shadow-purple-500/20 transition-all duration-300">
                <Radio className="h-12 w-12 text-purple-500" />
                <h3 className="text-xl font-bold text-gray-100">Real-time Voting</h3>
                <p className="text-gray-300">Live voting keeps content fresh.</p>
              </div>
              <div className="flex flex-col items-center space-y-3 text-center p-6 bg-gray-900 rounded-lg shadow-lg hover:shadow-indigo-500/20 transition-all duration-300">
                <Headphones className="h-12 w-12 text-indigo-500" />
                <h3 className="text-xl font-bold text-gray-100">Vast Music Library</h3>
                <p className="text-gray-300">Millions of tracks for every taste.</p>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-purple-500">
                  Ready to revolutionize your streams?
                </h2>
                <p className="max-w-[600px] text-gray-300 md:text-xl">
                  Join MusicStreamChoice today and empower your audience.
                </p>
              </div>
              <div className="w-full max-w-sm space-y-2">
                <form className="flex space-x-2">
                  <Input
                    className="max-w-lg flex-1 bg-gray-800 border-gray-700 text-gray-100 placeholder-gray-400 focus:border-pink-500 focus:ring-pink-500"
                    placeholder="Enter your email"
                    type="email"
                  />
                  <Button type="submit" className="bg-gradient-to-r from-pink-500 to-purple-600 text-white hover:from-pink-600 hover:to-purple-700 transition-all duration-300">
                    Sign Up
                  </Button>
                </form>
                <p className="text-xs text-gray-400">
                  By signing up, you agree to our{" "}
                  <Link className="underline underline-offset-2 hover:text-pink-400 transition-colors" href="#">
                    Terms & Conditions
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t border-gray-800 bg-gray-900">
        <p className="text-xs text-gray-400">© 2024 MusicStreamChoice. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs text-gray-400 hover:text-pink-400 transition-colors" href="#">
            Terms of Service
          </Link>
          <Link className="text-xs text-gray-400 hover:text-pink-400 transition-colors" href="#">
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  )
}
