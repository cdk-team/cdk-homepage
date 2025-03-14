"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import {
  AlertTriangle,
  Code,
  Download,
  ExternalLink,
  Github,
  Globe,
  Server,
  Shield,
  Terminal,
  Users,
  Box,
} from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

// Language translations
const translations = {
  en: {
    nav: {
      features: "Features",
      installation: "Installation",
      usage: "Usage",
      documentation: "Documentation",
      architecture: "Architecture",
      contributors: "Contributors",
    },
    hero: {
      badge: "Container Security",
      title: "CDK - Container Penetration Toolkit",
      description:
        "An open-source container penetration toolkit designed for security researchers to uncover vulnerabilities in containerized environments.",
      download: "Download Latest Release",
      viewOnGithub: "View on GitHub",
    },
    features: {
      badge: "Core Capabilities",
      title: "Comprehensive Container Security Toolkit",
      description:
        "CDK provides a suite of tools for container security assessment, vulnerability detection, and penetration testing.",
      cards: {
        evaluation: {
          title: "Container Evaluation",
          description: "Automatically evaluate container security configurations and identify misconfigurations.",
        },
        escape: {
          title: "Escape Techniques",
          description: "Test and validate container escape vulnerabilities with built-in exploitation modules.",
        },
        privilege: {
          title: "Privilege Escalation",
          description: "Discover and exploit privilege escalation paths within containerized environments.",
        },
        k8s: {
          title: "K8s Penetration",
          description: "Specialized tools for Kubernetes cluster penetration testing and security assessment.",
        },
        exploit: {
          title: "Exploit Development",
          description: "Framework for developing and testing new container security exploits.",
        },
        scanning: {
          title: "Automated Scanning",
          description: "Automate security scanning of container images and runtime environments.",
        },
      },
    },
    installation: {
      badge: "Installation",
      title: "Get Started with CDK",
      description: "CDK is easy to install and deploy in your container environments.",
      tabs: {
        binary: "Binary Download",
        source: "From Source",
        docker: "Docker Image",
      },
      binary: {
        title: "Download Pre-built Binary",
        description: "The easiest way to get started with CDK",
        download: "Download Latest Release",
      },
      source: {
        title: "Build From Source",
        description: "For developers who want to build the latest version",
        viewSource: "View Source Code",
      },
      docker: {
        title: "Docker Image",
        description: "Run CDK in a Docker container",
        viewDocker: "View on Docker Hub",
      },
    },
    usage: {
      badge: "Usage Examples",
      title: "How to Use CDK",
      description: "Explore common use cases and commands for container security assessment.",
      sections: {
        basic: "Basic Commands",
        escape: "Container Escape Examples",
        k8s: "Kubernetes Penetration Testing",
      },
    },
    documentation: {
      badge: "Documentation",
      title: "Learn More About CDK",
      description: "Comprehensive documentation and resources to help you master container security.",
      cards: {
        guide: {
          title: "Getting Started Guide",
          description: "Learn the basics of CDK and how to get started with container security assessment.",
          button: "Read Guide",
        },
        wiki: {
          title: "Wiki Documentation",
          description: "Detailed documentation on all CDK modules, features, and exploitation techniques.",
          button: "Browse Wiki",
        },
        contributing: {
          title: "Contributing Guide",
          description: "Learn how to contribute to CDK and help improve container security.",
          button: "Contribute",
        },
        issues: {
          title: "Issue Tracker",
          description: "Report bugs, request features, or get help with CDK.",
          button: "View Issues",
        },
      },
    },
    architecture: {
      badge: "Architecture",
      title: "CDK Integration Architecture",
      description: "Visual representation of how CDK integrates with Kubernetes and Docker environments.",
    },
    contributors: {
      badge: "Contributors",
      title: "Project Contributors",
      description: "CDK is maintained by a dedicated team of security researchers and contributors.",
      maintainers: "Core Maintainers",
    },
    contribution: {
      title: "Contribution Guidelines",
      description: "We welcome contributions from the community. Please follow these guidelines to contribute to CDK.",
      sections: {
        code: "Code Contributions",
        codeDescription: "Submit pull requests with new features, bug fixes, or improvements.",
        docs: "Documentation",
        docsDescription: "Help improve documentation, examples, and tutorials.",
        issues: "Issue Reporting",
        issuesDescription: "Report bugs, vulnerabilities, or suggest new features.",
        security: "Security Disclosures",
        securityDescription: "For security vulnerabilities, please report privately to the maintainers.",
      },
    },
    warning: {
      title: "Security Warning",
      description:
        "CDK is a powerful security tool designed for authorized security testing only. Misuse may violate laws and regulations. Always obtain proper authorization before testing.",
    },
    footer: {
      rights: "All rights reserved.",
      github: "GitHub",
    },
    version: {
      select: "Select Version",
    },
  },
  zh: {
    nav: {
      features: "核心功能",
      installation: "安装指南",
      usage: "使用示例",
      documentation: "文档资源",
      architecture: "架构图",
      contributors: "贡献者",
    },
    hero: {
      badge: "容器安全",
      title: "CDK - 容器渗透工具集",
      description: "一个为安全研究人员设计的开源容器渗透工具包，用于发现容器化环境中的漏洞。",
      download: "下载最新版本",
      viewOnGithub: "在 GitHub 上查看",
    },
    features: {
      badge: "核心能力",
      title: "全面的容器安全工具集",
      description: "CDK 提供了一套用于容器安全评估、漏洞检测和渗透测试的工具。",
      cards: {
        evaluation: {
          title: "容器评估",
          description: "自动评估容器安全配置并识别错误配置。",
        },
        escape: {
          title: "容器逃逸技术",
          description: "使用内置的利用模块测试和验证容器逃逸漏洞。",
        },
        privilege: {
          title: "权限提升",
          description: "发现并利用容器化环境中的权限提升路径。",
        },
        k8s: {
          title: "K8s 渗透",
          description: "专门用于 Kubernetes 集群渗透测试和安全评估的工具。",
        },
        exploit: {
          title: "漏洞利用开发",
          description: "用于开发和测试新容器安全漏洞的框架。",
        },
        scanning: {
          title: "自动化扫描",
          description: "自动化扫描容器镜像和运行时环境。",
        },
      },
    },
    installation: {
      badge: "安装指南",
      title: "开始使用 CDK",
      description: "CDK 易于安装和部署在您的容器环境中。",
      tabs: {
        binary: "二进制下载",
        source: "源码编译",
        docker: "Docker 镜像",
      },
      binary: {
        title: "下载预编译二进制文件",
        description: "开始使用 CDK 的最简单方法",
        download: "下载最新版本",
      },
      source: {
        title: "从源码构建",
        description: "适用于想要构建最新版本的开发者",
        viewSource: "查看源代码",
      },
      docker: {
        title: "Docker 镜像",
        description: "在 Docker 容器中运行 CDK",
        viewDocker: "在 Docker Hub 上查看",
      },
    },
    usage: {
      badge: "使用示例",
      title: "如何使用 CDK",
      description: "探索容器安全评估的常见用例和命令。",
      sections: {
        basic: "基本命令",
        escape: "容器逃逸示例",
        k8s: "Kubernetes 渗透测试",
      },
    },
    documentation: {
      badge: "文档资源",
      title: "了解更多关于 CDK",
      description: "全面的文档和资源，帮助您掌握容器安全。",
      cards: {
        guide: {
          title: "入门指南",
          description: "了解 CDK 的基础知识以及如何开始容器安全评估。",
          button: "阅读指南",
        },
        wiki: {
          title: "Wiki 文档",
          description: "关于所有 CDK 模块、功能和利用技术的详细文档。",
          button: "浏览 Wiki",
        },
        contributing: {
          title: "贡献指南",
          description: "了解如何为 CDK 做出贡献并帮助改进容器安全。",
          button: "参与贡献",
        },
        issues: {
          title: "问题跟踪",
          description: "报告错误、请求功能或获取 CDK 帮助。",
          button: "查看问题",
        },
      },
    },
    architecture: {
      badge: "架构",
      title: "CDK 集成架构",
      description: "CDK 如何与 Kubernetes 和 Docker 环境集成的可视化表示。",
    },
    contributors: {
      badge: "贡献者",
      title: "项目贡献者",
      description: "CDK 由一支专注的安全研究人员和贡献者团队维护。",
      maintainers: "核心维护者",
    },
    contribution: {
      title: "贡献指南",
      description: "我们欢迎社区的贡献。请遵循这些指南为 CDK 做出贡献。",
      sections: {
        code: "代码贡献",
        codeDescription: "提交包含新功能、错误修复或改进的拉取请求。",
        docs: "文档",
        docsDescription: "帮助改进文档、示例和教程。",
        issues: "问题报告",
        issuesDescription: "报告错误、漏洞或建议新功能。",
        security: "安全披露",
        securityDescription: "对于安全漏洞，请私下向维护者报告。",
      },
    },
    warning: {
      title: "安全警告",
      description:
        "CDK 是一个强大的安全工具，仅设计用于授权的安全测试。滥用可能违反法律法规。在测试前务必获得适当的授权。",
    },
    footer: {
      rights: "保留所有权利。",
      github: "GitHub",
    },
    version: {
      select: "选择版本",
    },
  },
}

export default function Home() {
  const [language, setLanguage] = useState<"en" | "zh">("en")
  const t = translations[language]

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
          <div className="flex gap-6 md:gap-10">
            <Link href="/" className="flex items-center space-x-2">
              <Shield className="h-6 w-6" />
              <span className="inline-block font-bold">CDK</span>
            </Link>
            <nav className="hidden gap-6 md:flex">
              <Link
                href="#features"
                className="flex items-center text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
              >
                {t.nav.features}
              </Link>
              <Link
                href="#installation"
                className="flex items-center text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
              >
                {t.nav.installation}
              </Link>
              <Link
                href="#usage"
                className="flex items-center text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
              >
                {t.nav.usage}
              </Link>
              <Link
                href="#documentation"
                className="flex items-center text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
              >
                {t.nav.documentation}
              </Link>
              <Link
                href="#architecture"
                className="flex items-center text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
              >
                {t.nav.architecture}
              </Link>
              <Link
                href="#contributors"
                className="flex items-center text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
              >
                {t.nav.contributors}
              </Link>
            </nav>
          </div>
          <div className="flex flex-1 items-center justify-end space-x-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setLanguage(language === "en" ? "zh" : "en")}
              title={language === "en" ? "Switch to Chinese" : "Switch to English"}
            >
              <Globe className="h-5 w-5" />
              <span className="sr-only">Toggle Language</span>
            </Button>
            <Select defaultValue="v1.5.1">
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder={t.version.select} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="v1.5.1">v1.5.1 (Latest)</SelectItem>
                <SelectItem value="v1.5.0">v1.5.0</SelectItem>
                <SelectItem value="v1.4.0">v1.4.0</SelectItem>
                <SelectItem value="v1.3.0">v1.3.0</SelectItem>
              </SelectContent>
            </Select>
            <nav className="flex items-center space-x-2">
              <Link href="https://github.com/cdk-team/CDK/" target="_blank" rel="noreferrer">
                <Button variant="ghost" size="icon">
                  <Github className="h-5 w-5" />
                  <span className="sr-only">GitHub</span>
                </Button>
              </Link>
            </nav>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-background to-muted">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <Badge variant="outline" className="w-fit">
                    {t.hero.badge}
                  </Badge>
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">{t.hero.title}</h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">{t.hero.description}</p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link href="https://github.com/cdk-team/CDK/releases" target="_blank" rel="noreferrer">
                    <Button className="w-full">
                      <Download className="mr-2 h-4 w-4" />
                      {t.hero.download}
                    </Button>
                  </Link>
                  <Link href="https://github.com/cdk-team/CDK/" target="_blank" rel="noreferrer">
                    <Button variant="outline" className="w-full">
                      <Github className="mr-2 h-4 w-4" />
                      {t.hero.viewOnGithub}
                    </Button>
                  </Link>
                </div>

                <Alert variant="destructive" className="mt-4">
                  <AlertTriangle className="h-4 w-4" />
                  <AlertTitle>{t.warning.title}</AlertTitle>
                  <AlertDescription>{t.warning.description}</AlertDescription>
                </Alert>
              </div>
              <div className="flex items-center justify-center">
                <div className="relative w-full h-[300px] md:h-[400px] lg:h-[500px] rounded-lg overflow-hidden border bg-background p-2">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 opacity-20 rounded-lg"></div>
                  <div className="relative h-full w-full rounded-lg bg-black/90 p-4 text-green-400 font-mono text-sm overflow-hidden">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="h-3 w-3 rounded-full bg-red-500"></div>
                      <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                      <div className="h-3 w-3 rounded-full bg-green-500"></div>
                      <div className="ml-2 text-xs text-gray-400">CDK Terminal</div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex">
                        <span className="text-blue-400 mr-2">$</span>
                        <span className="typing-animation">./cdk evaluate</span>
                      </div>
                      <div>
                        <span>[Information Gathering - System Info]</span>
                      </div>
                      <div>
                        <span>OS: Ubuntu 20.04.3 LTS</span>
                      </div>
                      <div>
                        <span>Kernel: 5.4.0-91-generic</span>
                      </div>
                      <div>
                        <span>Container: Docker</span>
                      </div>
                      <div>
                        <span>...</span>
                      </div>
                      <div>
                        <span>[Information Gathering - Container Info]</span>
                      </div>
                      <div>
                        <span>Container Runtime: docker</span>
                      </div>
                      <div>
                        <span>AppArmor Profile: docker-default</span>
                      </div>
                      <div>
                        <span>Seccomp: enabled</span>
                      </div>
                      <div>
                        <span>User Namespace: disabled</span>
                      </div>
                      <div>
                        <span>...</span>
                      </div>
                      <div className="flex">
                        <span className="text-blue-400 mr-2">$</span>
                        <span className="typing-animation">./cdk run shim-pwn</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <Badge variant="outline" className="w-fit mx-auto">
                  {t.features.badge}
                </Badge>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">{t.features.title}</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed mx-auto">
                  {t.features.description}
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader className="pb-2">
                  <Terminal className="h-6 w-6 mb-2 text-primary" />
                  <CardTitle>{t.features.cards.evaluation.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{t.features.cards.evaluation.description}</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <Box className="h-6 w-6 mb-2 text-primary" />
                  <CardTitle>{t.features.cards.escape.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{t.features.cards.escape.description}</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <Server className="h-6 w-6 mb-2 text-primary" />
                  <CardTitle>{t.features.cards.privilege.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{t.features.cards.privilege.description}</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <Shield className="h-6 w-6 mb-2 text-primary" />
                  <CardTitle>{t.features.cards.k8s.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{t.features.cards.k8s.description}</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <Code className="h-6 w-6 mb-2 text-primary" />
                  <CardTitle>{t.features.cards.exploit.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{t.features.cards.exploit.description}</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <Terminal className="h-6 w-6 mb-2 text-primary" />
                  <CardTitle>{t.features.cards.scanning.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{t.features.cards.scanning.description}</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

      
        <section id="architecture" className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <Badge variant="outline" className="w-fit mx-auto">
                  {t.architecture.badge}
                </Badge>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">{t.architecture.title}</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed mx-auto">
                  {t.architecture.description}
                </p>
              </div>
            </div>


          </div>
        </section>

        <section id="installation" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <Badge variant="outline" className="w-fit mx-auto">
                  {t.installation.badge}
                </Badge>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">{t.installation.title}</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed mx-auto">
                  {t.installation.description}
                </p>
              </div>
            </div>

            <div className="mx-auto max-w-3xl mt-8">
              <Tabs defaultValue="binary" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="binary">{t.installation.tabs.binary}</TabsTrigger>
                  <TabsTrigger value="source">{t.installation.tabs.source}</TabsTrigger>
                  <TabsTrigger value="docker">{t.installation.tabs.docker}</TabsTrigger>
                </TabsList>
                <TabsContent value="binary" className="mt-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>{t.installation.binary.title}</CardTitle>
                      <CardDescription>{t.installation.binary.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="bg-black rounded-md p-4 text-green-400 font-mono text-sm">
                        <div className="flex">
                          <span className="text-blue-400 mr-2">$</span>
                          <span>wget https://github.com/cdk-team/CDK/releases/download/v1.5.1/cdk_linux_amd64</span>
                        </div>
                        <div className="flex mt-2">
                          <span className="text-blue-400 mr-2">$</span>
                          <span>chmod +x cdk_linux_amd64</span>
                        </div>
                        <div className="flex mt-2">
                          <span className="text-blue-400 mr-2">$</span>
                          <span>./cdk_linux_amd64</span>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Link
                        href="https://github.com/cdk-team/CDK/releases"
                        target="_blank"
                        rel="noreferrer"
                        className="w-full"
                      >
                        <Button variant="outline" className="w-full">
                          <Download className="mr-2 h-4 w-4" />
                          {t.installation.binary.download}
                        </Button>
                      </Link>
                    </CardFooter>
                  </Card>
                </TabsContent>
                <TabsContent value="source" className="mt-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>{t.installation.source.title}</CardTitle>
                      <CardDescription>{t.installation.source.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="bg-black rounded-md p-4 text-green-400 font-mono text-sm">
                        <div className="flex">
                          <span className="text-blue-400 mr-2">$</span>
                          <span>git clone https://github.com/cdk-team/CDK.git</span>
                        </div>
                        <div className="flex mt-2">
                          <span className="text-blue-400 mr-2">$</span>
                          <span>cd CDK</span>
                        </div>
                        <div className="flex mt-2">
                          <span className="text-blue-400 mr-2">$</span>
                          <span>make build</span>
                        </div>
                        <div className="flex mt-2">
                          <span className="text-blue-400 mr-2">$</span>
                          <span>./cdk</span>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Link href="https://github.com/cdk-team/CDK/" target="_blank" rel="noreferrer" className="w-full">
                        <Button variant="outline" className="w-full">
                          <Github className="mr-2 h-4 w-4" />
                          {t.installation.source.viewSource}
                        </Button>
                      </Link>
                    </CardFooter>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </section>

        <section id="usage" className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <Badge variant="outline" className="w-fit mx-auto">
                  {t.usage.badge}
                </Badge>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">{t.usage.title}</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed mx-auto">
                  {t.usage.description}
                </p>
              </div>
            </div>

            <div className="mx-auto max-w-4xl mt-8 space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle>{t.usage.sections.basic}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-black rounded-md p-4 text-green-400 font-mono text-sm">
                    <div className="flex">
                      <span className="text-blue-400 mr-2">$</span>
                      <span>./cdk evaluate</span>
                    </div>
                    <div className="mt-2 text-gray-400">
                      # Evaluate the current container environment for security issues
                    </div>

                    <div className="flex mt-4">
                      <span className="text-blue-400 mr-2">$</span>
                      <span>./cdk run</span>
                    </div>
                    <div className="mt-2 text-gray-400"># List all available exploitation modules</div>

                    <div className="flex mt-4">
                      <span className="text-blue-400 mr-2">$</span>
                      <span>./cdk run [module-name]</span>
                    </div>
                    <div className="mt-2 text-gray-400"># Run a specific exploitation module</div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>{t.usage.sections.escape}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-black rounded-md p-4 text-green-400 font-mono text-sm">
                    <div className="flex">
                      <span className="text-blue-400 mr-2">$</span>
                      <span>./cdk run mount-cgroup</span>
                    </div>
                    <div className="mt-2 text-gray-400"># Attempt to escape container using cgroup mount</div>

                    <div className="flex mt-4">
                      <span className="text-blue-400 mr-2">$</span>
                      <span>./cdk run shim-pwn</span>
                    </div>
                    <div className="mt-2 text-gray-400"># Exploit container capabilities to escape</div>

                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>{t.usage.sections.k8s}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-black rounded-md p-4 text-green-400 font-mono text-sm">
                    <div className="flex">
                      <span className="text-blue-400 mr-2">$</span>
                      <span>./cdk run k8s-backdoor-daemonset</span>
                    </div>
                    <div className="mt-2 text-gray-400"># Deploy a backdoor DaemonSet if permissions allow</div>

                    <div className="flex mt-4">
                      <span className="text-blue-400 mr-2">$</span>
                      <span>./cdk run k8s-serviceaccount-scan</span>
                    </div>
                    <div className="mt-2 text-gray-400"># Scan for overprivileged service accounts</div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section id="documentation" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <Badge variant="outline" className="w-fit mx-auto">
                  {t.documentation.badge}
                </Badge>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">{t.documentation.title}</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed mx-auto">
                  {t.documentation.description}
                </p>
              </div>
            </div>

            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2">
              <Link
                href="https://github.com/cdk-team/CDK/blob/main/README.md"
                target="_blank"
                rel="noreferrer"
                className="w-full"
              >
                <Card className="h-full transition-colors hover:bg-muted/50">
                  <CardHeader>
                    <CardTitle>{t.documentation.cards.guide.title}</CardTitle>
                    <CardDescription>{t.documentation.cards.guide.description}</CardDescription>
                  </CardHeader>
                  <CardFooter>
                    <Button variant="ghost" className="w-full justify-between">
                      {t.documentation.cards.guide.button}
                      <ExternalLink className="h-4 w-4 ml-2" />
                    </Button>
                  </CardFooter>
                </Card>
              </Link>

              <Link href="https://github.com/cdk-team/CDK/wiki" target="_blank" rel="noreferrer" className="w-full">
                <Card className="h-full transition-colors hover:bg-muted/50">
                  <CardHeader>
                    <CardTitle>{t.documentation.cards.wiki.title}</CardTitle>
                    <CardDescription>{t.documentation.cards.wiki.description}</CardDescription>
                  </CardHeader>
                  <CardFooter>
                    <Button variant="ghost" className="w-full justify-between">
                      {t.documentation.cards.wiki.button}
                      <ExternalLink className="h-4 w-4 ml-2" />
                    </Button>
                  </CardFooter>
                </Card>
              </Link>

              <Link
                href="https://github.com/cdk-team/CDK/blob/main/CONTRIBUTING.md"
                target="_blank"
                rel="noreferrer"
                className="w-full"
              >
                <Card className="h-full transition-colors hover:bg-muted/50">
                  <CardHeader>
                    <CardTitle>{t.documentation.cards.contributing.title}</CardTitle>
                    <CardDescription>{t.documentation.cards.contributing.description}</CardDescription>
                  </CardHeader>
                  <CardFooter>
                    <Button variant="ghost" className="w-full justify-between">
                      {t.documentation.cards.contributing.button}
                      <ExternalLink className="h-4 w-4 ml-2" />
                    </Button>
                  </CardFooter>
                </Card>
              </Link>

              <Link href="https://github.com/cdk-team/CDK/issues" target="_blank" rel="noreferrer" className="w-full">
                <Card className="h-full transition-colors hover:bg-muted/50">
                  <CardHeader>
                    <CardTitle>{t.documentation.cards.issues.title}</CardTitle>
                    <CardDescription>{t.documentation.cards.issues.description}</CardDescription>
                  </CardHeader>
                  <CardFooter>
                    <Button variant="ghost" className="w-full justify-between">
                      {t.documentation.cards.issues.button}
                      <ExternalLink className="h-4 w-4 ml-2" />
                    </Button>
                  </CardFooter>
                </Card>
              </Link>
            </div>

            <div className="mx-auto max-w-3xl mt-8">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="contribution">
                  <AccordionTrigger className="text-xl font-semibold">{t.contribution.title}</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-4 p-4 bg-muted/50 rounded-lg">
                      <p className="text-muted-foreground">{t.contribution.description}</p>

                      <div className="space-y-2">
                        <h4 className="font-medium">{t.contribution.sections.code}</h4>
                        <p className="text-sm text-muted-foreground">{t.contribution.sections.codeDescription}</p>
                      </div>

                      <div className="space-y-2">
                        <h4 className="font-medium">{t.contribution.sections.docs}</h4>
                        <p className="text-sm text-muted-foreground">{t.contribution.sections.docsDescription}</p>
                      </div>

                      <div className="space-y-2">
                        <h4 className="font-medium">{t.contribution.sections.issues}</h4>
                        <p className="text-sm text-muted-foreground">{t.contribution.sections.issuesDescription}</p>
                      </div>

                      <div className="space-y-2">
                        <h4 className="font-medium">{t.contribution.sections.security}</h4>
                        <p className="text-sm text-muted-foreground">{t.contribution.sections.securityDescription}</p>
                      </div>

                      <Link
                        href="https://github.com/cdk-team/CDK/blob/main/CONTRIBUTING.md"
                        target="_blank"
                        rel="noreferrer"
                      >
                        <Button variant="outline" size="sm" className="mt-2">
                          <ExternalLink className="mr-2 h-4 w-4" />
                          View Full Contribution Guidelines
                        </Button>
                      </Link>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </section>

        <section id="contributors" className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <Badge variant="outline" className="w-fit mx-auto">
                  {t.contributors.badge}
                </Badge>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">{t.contributors.title}</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed mx-auto">
                  {t.contributors.description}
                </p>
              </div>
            </div>

            <div className="mx-auto max-w-4xl mt-8">
              <h3 className="text-xl font-semibold mb-6 text-center">{t.contributors.maintainers}</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <Link href="https://github.com/neargle" target="_blank" rel="noreferrer">
                  <div className="flex flex-col items-center">
                    <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                      <Users className="h-12 w-12 text-primary" />
                    </div>
                    <h4 className="font-medium">Neargle</h4>
                    <p className="text-sm text-muted-foreground">Project Lead</p>
                  </div>
                </Link>
                <div className="flex flex-col items-center">
                  <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                    <Users className="h-12 w-12 text-primary" />
                  </div>
                  <h4 className="font-medium">Cdxy</h4>
                  <p className="text-sm text-muted-foreground">Project Lead</p>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                    <Users className="h-12 w-12 text-primary" />
                  </div>
                  <h4 className="font-medium">Xmzyshypnc</h4>
                  <p className="text-sm text-muted-foreground">Security Researcher</p>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                    <Users className="h-12 w-12 text-primary" />
                  </div>
                  <h4 className="font-medium">Riusksk</h4>
                  <p className="text-sm text-muted-foreground">Security Researcher</p>
                </div>
              </div>

              <div className="mt-12 text-center">
                <Link href="https://github.com/cdk-team/CDK/graphs/contributors" target="_blank" rel="noreferrer">
                  <Button>
                    <Github className="mr-2 h-4 w-4" />
                    View All Contributors
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="w-full border-t py-6 md:py-0">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            © 2023 CDK Team. {t.footer.rights}{" "}
            <Link
              href="https://github.com/cdk-team/CDK/"
              target="_blank"
              rel="noreferrer"
              className="font-medium underline underline-offset-4"
            >
              {t.footer.github}
            </Link>
          </p>
          <div className="flex items-center gap-4">
            <Link href="https://github.com/cdk-team/CDK/" target="_blank" rel="noreferrer">
              <Button variant="ghost" size="icon">
                <Github className="h-4 w-4" />
                <span className="sr-only">GitHub</span>
              </Button>
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}

