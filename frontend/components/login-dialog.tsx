"use client"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Github, X, Wallet, Loader2 } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { AlertCircle } from "lucide-react"

declare global {
  interface Window {
    ethereum?: any
  }
}

interface LoginDialogProps {
  isOpen: boolean
  onClose: () => void
}

export default function LoginDialog({ isOpen, onClose }: LoginDialogProps) {
  const router = useRouter()
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [walletAddress, setWalletAddress] = useState<string | null>(null)
  const [isWalletConnecting, setIsWalletConnecting] = useState(false)
  const [walletError, setWalletError] = useState("")

  const handleOAuthSignIn = async (provider: string) => {
    try {
      setIsLoading(true)
      setError("")

      // 模拟登录延迟
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // 模拟用户数据
      const mockUser = {
        id: "github-123456",
        name: "Mock GitHub User",
        email: "mock@github.com",
        image: "https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png",
      }

      // 模拟登录成功 - 存储用户信息到 localStorage
      localStorage.setItem("mockUser", JSON.stringify(mockUser))

      // 关闭登录对话框
      onClose()

      // 更新会话状态而不刷新页面
      window.dispatchEvent(new Event("mock-auth-change"))
    } catch (err) {
      console.error("Sign in error:", err)
      setError("Failed to sign in. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleWalletConnect = async () => {
    try {
      setIsWalletConnecting(true)
      setWalletError("")

      // 模拟连接延迟
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // 模拟钱包地址
      const mockAddress = "0x71C7656EC7ab88b098defB751B7401B5f6d8976F"
      setWalletAddress(mockAddress)

      // 模拟签名过程
      await new Promise((resolve) => setTimeout(resolve, 800))

      // 模拟用户数据
      const mockUser = {
        id: mockAddress,
        name: `${mockAddress.substring(0, 6)}...${mockAddress.substring(mockAddress.length - 4)}`,
        email: `${mockAddress.toLowerCase()}@ethereum.org`,
        image: `/api/avatar?address=${mockAddress}`,
      }

      // 模拟登录成功 - 存储用户信息到 localStorage
      localStorage.setItem("mockUser", JSON.stringify(mockUser))

      // 关闭登录对话框
      onClose()

      // 更新会话状态而不刷新页面
      window.dispatchEvent(new Event("mock-auth-change"))
    } catch (err) {
      console.error("Wallet connection error:", err)
      setWalletError(err instanceof Error ? err.message : "Failed to connect wallet")
    } finally {
      setIsWalletConnecting(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="fixed left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] sm:max-w-md border border-cyan-900/50 bg-black text-gray-300">
        <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-cyan-500 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-pink-500 to-transparent"></div>

        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-cyan-400 transition-colors"
        >
          <X size={18} />
        </button>

        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center font-cyberpunk text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-pink-500">
            ACCESS TERMINAL
          </DialogTitle>
          <DialogDescription className="text-center text-gray-400">使用 GitHub 账号登录 MCP forge</DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {(error || walletError) && (
            <Alert variant="destructive" className="bg-red-900/20 border border-red-800 text-red-400">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error || walletError}</AlertDescription>
            </Alert>
          )}

          {/* GitHub Login */}
          <div className="flex flex-col items-center justify-center py-4">
            <Button
              variant="outline"
              className="w-full max-w-xs bg-transparent border border-cyan-900/50 hover:border-cyan-500/70 hover:bg-cyan-900/10 text-gray-300 py-6"
              onClick={() => handleOAuthSignIn("github")}
              type="button"
              disabled={isLoading}
            >
              {isLoading ? (
                "Connecting..."
              ) : (
                <>
                  <Github className="mr-2 h-5 w-5" />
                  <span className="text-base">Sign in with GitHub</span>
                </>
              )}
            </Button>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-cyan-900/30"></div>
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="bg-black px-2 text-gray-500 font-mono">OR</span>
              </div>
            </div>

            <Button
              variant="outline"
              className="w-full max-w-xs bg-transparent border border-cyan-900/50 hover:border-cyan-500/70 hover:bg-cyan-900/10 text-gray-300 py-6"
              onClick={handleWalletConnect}
              type="button"
              disabled={isLoading || isWalletConnecting}
            >
              {isWalletConnecting ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  <span className="text-base">Connecting Wallet...</span>
                </>
              ) : (
                <>
                  <Wallet className="mr-2 h-5 w-5" />
                  <span className="text-base">Connect Ethereum Wallet</span>
                </>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
