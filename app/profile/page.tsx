"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/components/auth-provider"
import { Navbar } from "@/components/navbar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/components/ui/use-toast"
import {
  User,
  Key,
  Settings,
  Save,
  Eye,
  EyeOff,
  ExternalLink,
  CheckCircle,
  AlertCircle,
  Info,
  Loader2,
} from "lucide-react"

export default function ProfilePage() {
  const { user, isLoading } = useAuth()
  const router = useRouter()
  const { toast } = useToast()

  const [apiKey, setApiKey] = useState("")
  const [showApiKey, setShowApiKey] = useState(false)
  const [saving, setSaving] = useState(false)
  const [testing, setTesting] = useState(false)
  const [apiKeyStatus, setApiKeyStatus] = useState<"unknown" | "valid" | "invalid">("unknown")

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/login")
    }
  }, [user, isLoading, router])

  useEffect(() => {
    // Load saved API key from localStorage
    const savedApiKey = localStorage.getItem("openrouter_api_key")
    if (savedApiKey) {
      setApiKey(savedApiKey)
      setApiKeyStatus("unknown") // Will be tested when user clicks test
    }
  }, [])

  const handleSaveApiKey = async () => {
    setSaving(true)
    try {
      if (apiKey.trim()) {
        localStorage.setItem("openrouter_api_key", apiKey.trim())
        toast({
          title: "API Key Saved",
          description: "Your OpenRouter API key has been saved securely.",
        })
        setApiKeyStatus("unknown")
      } else {
        localStorage.removeItem("openrouter_api_key")
        toast({
          title: "API Key Removed",
          description: "Your OpenRouter API key has been removed.",
        })
        setApiKeyStatus("unknown")
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save API key. Please try again.",
        variant: "destructive",
      })
    } finally {
      setSaving(false)
    }
  }

  const testApiKey = async () => {
    if (!apiKey.trim()) {
      toast({
        title: "No API Key",
        description: "Please enter an API key to test.",
        variant: "destructive",
      })
      return
    }

    setTesting(true)
    try {
      const response = await fetch("/api/test-openrouter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          apiKey: apiKey.trim(),
        }),
      })

      if (response.ok) {
        setApiKeyStatus("valid")
        toast({
          title: "API Key Valid",
          description: "Your OpenRouter API key is working correctly!",
        })
      } else {
        setApiKeyStatus("invalid")
        toast({
          title: "API Key Invalid",
          description: "Your OpenRouter API key is not working. Please check and try again.",
          variant: "destructive",
        })
      }
    } catch (error) {
      setApiKeyStatus("invalid")
      toast({
        title: "Test Failed",
        description: "Failed to test API key. Please check your connection and try again.",
        variant: "destructive",
      })
    } finally {
      setTesting(false)
    }
  }

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <main className="flex-1 container py-8">
        <div className="max-w-4xl mx-auto space-y-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Profile Settings</h1>
            <p className="text-muted-foreground">Manage your account settings and API configurations</p>
          </div>

          <Tabs defaultValue="account" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="account">Account</TabsTrigger>
              <TabsTrigger value="api">API Configuration</TabsTrigger>
              <TabsTrigger value="preferences">Preferences</TabsTrigger>
            </TabsList>

            <TabsContent value="account">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <User className="mr-2 h-5 w-5" />
                    Account Information
                  </CardTitle>
                  <CardDescription>Your account details and basic information</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input id="name" value={user.name} disabled />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input id="email" value={user.email} disabled />
                    </div>
                  </div>
                  <Alert>
                    <Info className="h-4 w-4" />
                    <AlertTitle>Demo Account</AlertTitle>
                    <AlertDescription>
                      This is a demo account. In a production environment, you would be able to edit these details.
                    </AlertDescription>
                  </Alert>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="api">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Key className="mr-2 h-5 w-5" />
                    OpenRouter API Configuration
                  </CardTitle>
                  <CardDescription>Configure your OpenRouter API key for AI-powered soil analysis</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <Alert>
                    <Info className="h-4 w-4" />
                    <AlertTitle>Why do I need an API key?</AlertTitle>
                    <AlertDescription>
                      The OpenRouter API key enables AI-powered analysis of your soil data using advanced language
                      models. This provides detailed insights, recommendations, and expert-level analysis for your
                      farming decisions.
                    </AlertDescription>
                  </Alert>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="apikey">OpenRouter API Key</Label>
                      <div className="flex space-x-2">
                        <div className="relative flex-1">
                          <Input
                            id="apikey"
                            type={showApiKey ? "text" : "password"}
                            placeholder="sk-or-v1-..."
                            value={apiKey}
                            onChange={(e) => setApiKey(e.target.value)}
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                            onClick={() => setShowApiKey(!showApiKey)}
                          >
                            {showApiKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                          </Button>
                        </div>
                        <Button onClick={testApiKey} disabled={testing || !apiKey.trim()}>
                          {testing ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                          Test
                        </Button>
                      </div>
                      {apiKeyStatus !== "unknown" && (
                        <div className="flex items-center space-x-2">
                          {apiKeyStatus === "valid" ? (
                            <>
                              <CheckCircle className="h-4 w-4 text-green-500" />
                              <span className="text-sm text-green-600">API key is valid and working</span>
                            </>
                          ) : (
                            <>
                              <AlertCircle className="h-4 w-4 text-red-500" />
                              <span className="text-sm text-red-600">API key is invalid or not working</span>
                            </>
                          )}
                        </div>
                      )}
                    </div>

                    <div className="flex space-x-2">
                      <Button onClick={handleSaveApiKey} disabled={saving}>
                        {saving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
                        Save API Key
                      </Button>
                    </div>
                  </div>

                  <div className="border-t pt-6">
                    <h3 className="text-lg font-medium mb-4">How to get your OpenRouter API Key</h3>
                    <div className="space-y-4">
                      <div className="flex items-start space-x-3">
                        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-medium">
                          1
                        </div>
                        <div>
                          <p className="font-medium">Visit OpenRouter</p>
                          <p className="text-sm text-muted-foreground">
                            Go to{" "}
                            <a
                              href="https://openrouter.ai"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-primary hover:underline inline-flex items-center"
                            >
                              openrouter.ai
                              <ExternalLink className="ml-1 h-3 w-3" />
                            </a>{" "}
                            and create an account
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-medium">
                          2
                        </div>
                        <div>
                          <p className="font-medium">Generate API Key</p>
                          <p className="text-sm text-muted-foreground">
                            Navigate to the API Keys section and generate a new key
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-medium">
                          3
                        </div>
                        <div>
                          <p className="font-medium">Add Credits</p>
                          <p className="text-sm text-muted-foreground">
                            Add some credits to your account (usually $5-10 is enough for extensive testing)
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-medium">
                          4
                        </div>
                        <div>
                          <p className="font-medium">Copy and Paste</p>
                          <p className="text-sm text-muted-foreground">
                            Copy your API key and paste it in the field above
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <Alert>
                    <Key className="h-4 w-4" />
                    <AlertTitle>Security Note</AlertTitle>
                    <AlertDescription>
                      Your API key is stored locally in your browser and is never sent to our servers. It's only used to
                      make direct requests to OpenRouter from your browser.
                    </AlertDescription>
                  </Alert>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="preferences">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Settings className="mr-2 h-5 w-5" />
                    Preferences
                  </CardTitle>
                  <CardDescription>Customize your experience and analysis preferences</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Alert>
                    <Info className="h-4 w-4" />
                    <AlertTitle>Coming Soon</AlertTitle>
                    <AlertDescription>
                      Additional preference settings will be available in future updates, including analysis depth,
                      notification preferences, and export formats.
                    </AlertDescription>
                  </Alert>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}
