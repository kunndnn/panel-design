import { useState } from 'react'
import { motion } from 'framer-motion'
import { User, Mail, Phone, MapPin, Globe, Camera, Shield, Bell, Key, Verified, Settings, CreditCard, Apple } from 'lucide-react'
import { Button, Input, Label, Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter, Avatar, Badge } from '../components/ui'
import { cn } from '../lib/utils'

export function Profile() {
  const [isEditing, setIsEditing] = useState(false)

  const user = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    role: 'Senior Product Designer',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face',
    location: 'Silicon Valley, CA',
    phone: '+1 (555) 942-0000',
    website: 'www.johndoe.design',
    bio: 'Multi-disciplinary designer focusing on high-fidelity web experiences and interactive design systems. Coffee lover and dark mode advocate.',
  }

  const sections = [
    { title: 'Personal Info', icon: User, id: 'personal' },
    { title: 'Security', icon: Shield, id: 'security' },
    { title: 'Billing', icon: CreditCard, id: 'billing' },
    { title: 'Notifications', icon: Bell, id: 'notifications' },
  ]

  const [activeSegment, setActiveSegment] = useState('personal')

  return (
    <div className="space-y-8 animate-in max-w-6xl mx-auto">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-3xl font-black tracking-tight bg-linear-to-r from-[hsl(var(--primary))] to-[hsl(var(--primary)/0.6)] bg-clip-text text-transparent">
            Profile Settings
          </h1>
          <p className="text-[hsl(var(--muted-foreground))] font-medium mt-1">
            Update your account details and visual preferences.
          </p>
        </div>
        <div className="flex items-center gap-2 p-1 bg-[hsl(var(--muted)/0.5)] rounded-xl border border-[hsl(var(--border)/0.5)]">
          {sections.map((s) => (
            <button
              key={s.id}
              onClick={() => setActiveSegment(s.id)}
              className={cn(
                'px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-lg transition-all flex items-center gap-2',
                activeSegment === s.id
                  ? 'bg-[hsl(var(--card))] text-[hsl(var(--primary))] shadow-sm'
                  : 'text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))]'
              )}
            >
              <s.icon className="h-3.5 w-3.5" />
              <span className="hidden md:inline">{s.title}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-12">
        {/* Left Column: Sidebar Profile */}
        <div className="lg:col-span-4 space-y-8">
          <Card className="overflow-hidden border-none shadow-2xl relative">
            <div className="h-32 bg-linear-to-br from-[hsl(var(--primary))] to-[hsl(var(--primary)/0.4)]" />
            <CardContent className="pt-0 flex flex-col items-center -mt-16">
              <div className="relative group">
                <Avatar
                  src={user.avatar}
                  alt={user.name}
                  size="xl"
                  className="h-32 w-32 border-8 border-[hsl(var(--background))] shadow-xl"
                />
                <button className="absolute bottom-2 right-2 p-2.5 rounded-xl bg-[hsl(var(--primary))] text-white shadow-lg shadow-[hsl(var(--primary)/0.3)] transition-transform hover:scale-110 active:scale-95">
                  <Camera className="h-4 w-4" />
                </button>
              </div>
              <div className="mt-4 text-center">
                <div className="flex items-center justify-center gap-2">
                  <h3 className="text-2xl font-black">{user.name}</h3>
                  <Verified className="h-5 w-5 text-[hsl(var(--primary))]" />
                </div>
                <p className="text-sm font-bold text-[hsl(var(--muted-foreground))] uppercase tracking-widest mt-1">{user.role}</p>
              </div>

              <div className="w-full mt-8 space-y-4 border-t border-[hsl(var(--border)/0.5)] pt-6">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-[hsl(var(--muted-foreground))] font-bold">Location</span>
                  <span className="font-black">{user.location}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-[hsl(var(--muted-foreground))] font-bold">Level</span>
                  <Badge variant="success" className="font-black">PRO PLAN</Badge>
                </div>
              </div>
            </CardContent>
            <CardFooter className="bg-[hsl(var(--muted)/0.2)] border-none mt-4">
              <Button className="w-full rounded-xl py-6" variant="outline">Preview Public Profile</Button>
            </CardFooter>
          </Card>

          <Card className="border-[hsl(var(--border)/0.5)] bg-[hsl(var(--primary)/0.03)] border-dashed">
            <CardContent className="p-6">
              <h4 className="text-sm font-black uppercase tracking-widest flex items-center gap-2 mb-4">
                <Verified className="h-4 w-4 text-[hsl(var(--primary))]" />
                Verification Status
              </h4>
              <p className="text-sm text-[hsl(var(--muted-foreground))] font-medium leading-relaxed">
                Your account is currently verified. This gives you access to advanced features and analytics tools.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Main Content */}
        <div className="lg:col-span-8 space-y-8">
          <Card className="border-[hsl(var(--border)/0.5)] shadow-xl">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Account Details</CardTitle>
                <CardDescription>Manage your public identity and contact paths.</CardDescription>
              </div>
              <Button onClick={() => setIsEditing(!isEditing)} variant={isEditing ? 'outline' : 'default'} className="rounded-xl px-8">
                {isEditing ? 'Discard Changes' : 'Edit Information'}
              </Button>
            </CardHeader>
            <CardContent className="space-y-8">
              <div className="grid gap-8 sm:grid-cols-2">
                <div className="space-y-3">
                  <Label>Full Display Name</Label>
                  <Input defaultValue={user.name} disabled={!isEditing} icon={User} />
                </div>
                <div className="space-y-3">
                  <Label>Email Address</Label>
                  <Input type="email" defaultValue={user.email} disabled={!isEditing} icon={Mail} />
                </div>
              </div>
              <div className="grid gap-8 sm:grid-cols-2">
                <div className="space-y-3">
                  <Label>Workspace Phone</Label>
                  <Input defaultValue={user.phone} disabled={!isEditing} icon={Phone} />
                </div>
                <div className="space-y-3">
                  <Label>Professional Site</Label>
                  <Input defaultValue={user.website} disabled={!isEditing} icon={Globe} />
                </div>
              </div>
              <div className="space-y-3">
                <Label>Short Biography</Label>
                <textarea
                  rows={4}
                  className={cn(
                    'flex min-h-[120px] w-full rounded-xl border border-[hsl(var(--border)/0.8)] bg-transparent px-4 py-3 text-sm font-medium transition-all group-focus-within:border-[hsl(var(--primary))]',
                    'focus:outline-none focus:ring-2 focus:ring-[hsl(var(--primary)/0.2)]',
                    !isEditing && 'opacity-60 cursor-not-allowed'
                  )}
                  defaultValue={user.bio}
                  disabled={!isEditing}
                />
              </div>
            </CardContent>
            {isEditing && (
              <CardFooter className="flex justify-end gap-3 pt-6 border-t border-[hsl(var(--border)/0.5)]">
                <Button variant="ghost" onClick={() => setIsEditing(false)}>Cancel</Button>
                <Button className="px-8 shadow-lg glow-primary" onClick={() => setIsEditing(false)}>Save Profile</Button>
              </CardFooter>
            )}
          </Card>

          <Card className="border-[hsl(var(--border)/0.5)] border-dashed bg-transparent">
            <CardHeader>
              <CardTitle className="text-lg">Security & Privacy</CardTitle>
              <CardDescription>Last active session: 2 hours ago in San Francisco, US</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between p-4 rounded-xl bg-[hsl(var(--muted)/0.3)]">
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-full bg-[hsl(var(--primary)/0.1)] flex items-center justify-center">
                    <Key className="h-5 w-5 text-[hsl(var(--primary))]" />
                  </div>
                  <div>
                    <p className="text-sm font-black uppercase tracking-wider">Multi-Factor Auth</p>
                    <p className="text-xs text-[hsl(var(--muted-foreground))] mt-0.5 font-bold">Enabled via Authenticator App</p>
                  </div>
                </div>
                <Badge variant="success">SECURE</Badge>
              </div>
              <div className="flex items-center justify-between p-4 rounded-xl border border-[hsl(var(--border)/0.5)] group hover:border-[hsl(var(--primary)/0.5)] transition-all cursor-pointer">
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-full bg-[hsl(var(--muted)/0.5)] flex items-center justify-center group-hover:bg-[hsl(var(--primary)/0.1)] transition-all">
                    <Settings className="h-5 w-5 text-[hsl(var(--muted-foreground))] group-hover:text-[hsl(var(--primary))] transition-all" />
                  </div>
                  <div>
                    <p className="text-sm font-black uppercase tracking-wider">Session Manager</p>
                    <p className="text-xs text-[hsl(var(--muted-foreground))] mt-0.5 font-bold">Manage your active devices</p>
                  </div>
                </div>
                <Button variant="ghost" size="icon" className="group-hover:text-[hsl(var(--primary))]">
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

function ArrowRight(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  )
}
