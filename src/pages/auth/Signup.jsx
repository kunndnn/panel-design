import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Mail, Lock, User, Eye, EyeOff, ShieldCheck } from 'lucide-react'
import { Button, Input, Label, Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui'
import { ThemeToggle } from '@/components/ThemeToggle'

export function Signup() {
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const handleSignup = (e) => {
    e.preventDefault()
    setIsLoading(true)
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      navigate('/login')
    }, 1500)
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-[hsl(var(--background))]">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>

      <div className="w-full max-w-md space-y-8 animate-in">
        <div className="text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-[var(--radius-lg)] bg-gradient-to-br from-[hsl(var(--primary))] to-[hsl(var(--primary)/0.7)] shadow-lg">
            <span className="text-2xl font-bold text-white">A</span>
          </div>
          <h2 className="mt-6 text-3xl font-bold tracking-tight text-[hsl(var(--foreground))]">
            Create an account
          </h2>
          <p className="mt-2 text-sm text-[hsl(var(--muted-foreground))]">
            Join thousands of users managing their business smarter
          </p>
        </div>

        <Card className="border-[hsl(var(--border))] shadow-xl">
          <CardContent className="pt-6">
            <form onSubmit={handleSignup} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First name</Label>
                  <Input id="firstName" placeholder="John" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last name</Label>
                  <Input id="lastName" placeholder="Doe" required />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  icon={Mail}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    icon={Lock}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))]"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                <p className="text-[10px] text-[hsl(var(--muted-foreground))]">
                  Minimum 8 characters with at least one number and one special character.
                </p>
              </div>

              <div className="flex items-start space-x-2 pt-2">
                <input
                  type="checkbox"
                  id="terms"
                  className="mt-1 h-4 w-4 rounded border-[hsl(var(--border))] text-[hsl(var(--primary))] focus:ring-[hsl(var(--ring))]"
                  required
                />
                <label htmlFor="terms" className="text-xs text-[hsl(var(--muted-foreground))]">
                  I agree to the <Link to="/terms" className="text-[hsl(var(--primary))] hover:underline">Terms of Service</Link> and <Link to="/privacy" className="text-[hsl(var(--primary))] hover:underline">Privacy Policy</Link>.
                </label>
              </div>

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? 'Creating account...' : 'Get started'}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <p className="text-center text-sm text-[hsl(var(--muted-foreground))]">
              Already have an account?{' '}
              <Link to="/login" className="font-semibold text-[hsl(var(--primary))] hover:underline">
                Sign in
              </Link>
            </p>
          </CardFooter>
        </Card>

        <div className="flex items-center justify-center gap-2 text-[hsl(var(--muted-foreground))]">
          <ShieldCheck className="h-4 w-4" />
          <span className="text-xs">Secure, encrypted authentication</span>
        </div>
      </div>
    </div>
  )
}
