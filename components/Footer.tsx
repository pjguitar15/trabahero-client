import React from 'react'
import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="border-t bg-background py-12">
      <div className="container mx-auto">
        <div className="mb-8">
          <Link href="/" className="text-2xl font-bold">
            TRABAHERO
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          <div>
            <h3 className="font-semibold mb-4">Categories</h3>
            <ul className="space-y-2">
              <li><Link href="/graphics">Graphics & Design</Link></li>
              <li><Link href="/programming">Programming</Link></li>
              <li><Link href="/writing">Writing</Link></li>
              <li><Link href="/video">Video & Animation</Link></li>
              <li><Link href="/music">Music & Audio</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">For Clients</h3>
            <ul className="space-y-2">
              <li><Link href="/how-it-works">How it Works</Link></li>
              <li><Link href="/browse">Browse Services</Link></li>
              <li><Link href="/trust">Trust & Safety</Link></li>
              <li><Link href="/support">Support</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">For Freelancers</h3>
            <ul className="space-y-2">
              <li><Link href="/start">Start Selling</Link></li>
              <li><Link href="/learning">Learning Center</Link></li>
              <li><Link href="/community">Community</Link></li>
              <li><Link href="/resources">Resources</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              <li><Link href="/about">About Us</Link></li>
              <li><Link href="/careers">Careers</Link></li>
              <li><Link href="/press">Press & News</Link></li>
              <li><Link href="/contact">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li><Link href="/privacy">Privacy Policy</Link></li>
              <li><Link href="/terms">Terms of Service</Link></li>
              <li><Link href="/cookies">Cookie Policy</Link></li>
              <li><Link href="/sitemap">Sitemap</Link></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  )
}
