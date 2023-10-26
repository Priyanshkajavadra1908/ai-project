"use client"
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { MessageSquare ,ImageIcon ,VideoIcon ,Music ,Code ,Settings ,ArrowRight } from "lucide-react"
import { useRouter } from "next/navigation";
const Dashboardpage = () => {
   const router = useRouter();
   const tools = [
      {
         label: "Conversation",
         icon: MessageSquare,
         color: "text-violet-500",
         bgcolor: "bg-violet-500/10",
         href: "/conversation"
      },
      {
          label : "Image Generations",
          icon : ImageIcon,
          href : "/image",
          color : "text-pink-700",
          bgcolor: "bg-pink-700/10",
      },
      {
          label : "Video Generations",
          icon : VideoIcon,
          href : "/video",
          color : "text-orange-700",
          bgcolor: "bg-orange-700/10"
      },
      {
          label : "Music Generations",
          icon : Music,
          href : "/music",
          color : "text-emerald-500",
          bgcolor: "bg-emerald-500/10"
      },
      {
          label : "Code Generations",
          icon : Code,
          href : "/code",
          color : "text-green-700",
          bgcolor: "bg-green-700/10"
      }
   ]
   return (
      <div>
         <div className="mb-8 space-y-4">
            <h2 className="text-2xl md:text-4xl font-bold text-center">
               Explore The Power of AI
            </h2>
            <p className="text-muted-foreground font-light text-sm md:text-lg text-center">
               Chat with the smartest AI - Experience the power of AI
            </p>
            <div className="px-4 md:px-20 lg:px-32 space-y-4">
               {tools.map((tool) => (
                  <Card onClick={() => router.push(tool.href)} className="p-4 border-black/5 flex items-center justify-between hover:shadow-md transition cursor-pointer" key={tool.href}>
                     <div className="flex items-center gap-x-4 ">
                        <div className={cn("p-2 w-fit rounded-md ", tool.bgcolor)}>
                           <tool.icon className={cn("w-8 h-8", tool.color)} />
                        </div>
                        <div className="font-semibold">
                           {tool.label}
                        </div>
                     </div>
                     <ArrowRight className="w-5 h-5" /> 
                  </Card>
               ))}
            </div>
         </div>
      </div>
   );
}

export default Dashboardpage;