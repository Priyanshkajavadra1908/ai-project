"use client"

import axios from "axios";
import * as z from "zod"
import React, { useState } from "react";
import { Music } from "lucide-react";
import { useForm } from "react-hook-form";
import Heading from "@/components/Hedding";
import { fromSchema } from './constants';
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { ChatCompletionRequestMessage } from "openai";
import Empty from "@/components/empty";
import { Loader } from "@/components/loader";
import { cn } from "@/lib/utils";



const MusicPage = () => {
    const router = useRouter();
    const [music, setMusic] = useState<string>();
    const form = useForm<z.infer<typeof fromSchema>>({
        resolver: zodResolver(fromSchema),
        defaultValues: {
            prompt: ""
        }
    });

    const isLoading = form.formState.isSubmitting;

    const onSubmit = async (values: z.infer<typeof fromSchema>) => {
        try {
            setMusic(undefined);

            const response = await axios.post("/api/music",values);
            setMusic(response.data.audio)            

            form.reset();
        } catch (error: any) {
            //TODO : Open Pro Modal
            console.log(error);
        } finally {
            router.refresh();
        }
    }

    return (
        <div>
            <Heading title="Music Generation" description="Turn your prompt into music" icon={Music} iconColor="text-emerald-500" bgColor="bg-emerald-500/10" />
            <div className="px-4 lg:px-8">
                <div className="">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="rounded border w-full p-4 px-3 md:px-6 focus-within:shadow-sm grid grid-cols-12 gap-2">
                            <FormField render={({ field }) => (
                                <FormItem className="col-span-12 lg:col-span-10">
                                    <FormControl className="m-0 p-0">
                                        <Input disabled={isLoading} placeholder="piano solo" {...field} className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent" />
                                    </FormControl>
                                </FormItem>
                            )} name="prompt" />
                            <Button className="col-span-12 lg:col-span-2 w-full" disabled={isLoading} >
                                Generate
                            </Button>
                        </form>
                    </Form>
                </div>
                <div className="space-y-4 mt-4">
                    {isLoading && (
                        <div className="p-8 rounded-lg w-full flex items-center justify-center bg-muted">
                            <Loader />
                        </div>
                    )}

                    {!music && !isLoading && (
                                <Empty lable="No Music Generated." />
                        )
                    }

                  {
                    music && (
                        <audio controls className="w-full mt-8"> 
                            <source src={music}/>
                        </audio>
                    )
                  }
                </div>
            </div>
        </div>
    );
}

export default MusicPage;