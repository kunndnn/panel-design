import { useState } from 'react'
import { User, Mail, Phone, MapPin, Globe, Camera, Shield, Bell, Key } from 'lucide-react'
import { Button, Input, Label, Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter, Avatar, Badge, Dropdown, DropdownTrigger, DropdownContent, DropdownItem } from '@/components/ui'
import { cn } from '@/lib/utils'

export function Profile() {
  const [isEditing, setIsEditing] = useState(false)

  const user = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    role: 'Senior Administrator',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face',
    location: 'San Francisco, CA',
    phone: '+1 (555) 000-0000',
    website: 'www.johndoe.com',
    bio: 'Frontend Architect with a passion for building scalable and maintainable web applications. Experienced in React, Tailwind CSS, and UX design.',
  }

  return (
    <div className="space-y-6 animate-in">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Profile</h1>
          <p className="text-[hsl(var(--muted-foreground))]">
            Manage your personal information and account settings
          </p>
        </div>
        <Button onClick={() => setIsEditing(!isEditing)} variant={isEditing ? 'outline' : 'default'}>
          {isEditing ? 'Cancel' : 'Edit Profile'}
        </Button>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Profile Card */}
        <Card className="lg:col-span-1 border-[hsl(var(--border))]">
          <CardContent className="pt-6">
            <div className="flex flex-col items-center text-center">
              <div className="relative group">
                <Avatar
                  src={user.avatar}
                  alt={user.name}
                  size="xl"
                  className="h-32 w-32 border-4 border-[hsl(var(--background))] shadow-xl"
                />
                <button className="absolute bottom-0 right-0 p-2 rounded-full bg-[hsl(var(--primary))] text-white shadow-lg opacity-0 group-hover:opacity-100 transition-opacity">
                  <Camera className="h-4 w-4" />
                </button>
              </div>
              <h3 className="mt-4 text-xl font-bold">{user.name}</h3>
              <p className="text-sm text-[hsl(var(--muted-foreground))]">{user.role}</p>
              <div className="mt-3 flex flex-wrap justify-center gap-2">
                <Badge variant="success">Active</Badge>
                <Badge variant="outline">Admin</Badge>
              </div>
            </div>

            <div className="mt-8 space-y-4">
              <div className="flex items-center gap-3 text-sm">
                <Mail className="h-4 w-4 text-[hsl(var(--muted-foreground))]" />
                <span>{user.email}</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <MapPin className="h-4 w-4 text-[hsl(var(--muted-foreground))]" />
                <span>{user.location}</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Phone className="h-4 w-4 text-[hsl(var(--muted-foreground))]" />
                <span>{user.phone}</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Globe className="h-4 w-4 text-[hsl(var(--muted-foreground))]" />
                <span className="text-[hsl(var(--primary))] hover:underline cursor-pointer">
                  {user.website}
                </span>
              </div>
            </div>
          </CardContent>
          <CardFooter className="border-t border-[hsl(var(--border))] pt-6">
            <div className="w-full">
              <h4 className="text-sm font-semibold mb-3">Bio</h4>
              <p className="text-sm text-[hsl(var(--muted-foreground))] leading-relaxed">
                {user.bio}
              </p>
            </div>
          </CardFooter>
        </Card>

        {/* Settings / Forms */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>Update your name, email and other public details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="full-name">Full Name</Label>
                  <Input id="full-name" defaultValue={user.name} disabled={!isEditing} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="user-email">Email Address</Label>
                  <Input id="user-email" type="email" defaultValue={user.email} disabled={!isEditing} />
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="user-phone">Phone Number</Label>
                  <Input id="user-phone" defaultValue={user.phone} disabled={!isEditing} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="user-location">Location</Label>
                  <Input id="user-location" defaultValue={user.location} disabled={!isEditing} />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="user-bio">Bio</Label>
                <textarea
                  id="user-bio"
                  rows={4}
                  className={cn(
                    'flex w-full rounded-[var(--radius-md)] border border-[hsl(var(--input))] bg-[hsl(var(--background))] px-3 py-2 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[hsl(var(--ring))] disabled:cursor-not-allowed disabled:opacity-50',
                    !isEditing && 'cursor-not-allowed opacity-50'
                  )}
                  defaultValue={user.bio}
                  disabled={!isEditing}
                />
              </div>
            </CardContent>
            {isEditing && (
              <CardFooter className="flex justify-end gap-3 border-t border-[hsl(var(--border))] pt-6">
                <Button variant="outline" onClick={() => setIsEditing(false)}>Cancel</Button>
                <Button onClick={() => setIsEditing(false)}>Save Changes</Button>
              </CardFooter>
            )}
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Security</CardTitle>
              <CardDescription>Manage your password and security settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-sm font-medium">Change Password</p>
                  <p className="text-xs text-[hsl(var(--muted-foreground))]">
                    Last changed 3 months ago
                  </p>
                </div>
                <Button variant="outline" size="sm">
                  Update
                </Button>
              </div>
              <div className="flex items-center justify-between border-t border-[hsl(var(--border))] pt-6">
                <div className="space-y-1">
                  <p className="text-sm font-medium">Two-Factor Authentication</p>
                  <p className="text-xs text-[hsl(var(--muted-foreground))]">
                    Add an extra layer of security to your account
                  </p>
                </div>
                <Badge variant="secondary">Disabled</Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
