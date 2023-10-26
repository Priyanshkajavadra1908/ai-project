"use client"

import axios from "axios";
import * as z from "zod"
import React, { useState } from "react";
import { VideoIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import Heading from "@/components/Hedding";
import { fromSchema } from './constants';
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import Empty from "@/components/empty";
import { Loader } from "@/components/loader";
import { cn } from "@/lib/utils";



const VedioPage = () => {
    const router = useRouter();
    const [video, setVideo] = useState<string>();
    const form = useForm<z.infer<typeof fromSchema>>({
        resolver: zodResolver(fromSchema),
        defaultValues: {
            prompt: ""
        }
    });

    const isLoading = form.formState.isSubmitting;

    const onSubmit = async (values: z.infer<typeof fromSchema>) => {
        try {
            setVideo(undefined);

            const response = await axios.post("/api/video",values);
            setVideo(response.data[0])            

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
            <Heading title="Music Generation" description="Turn your prompt into video" icon={VideoIcon} iconColor="text-orange-700" bgColor="bg-orange-700/10" />
            <div className="px-4 lg:px-8">
                <div className="">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="rounded border w-full p-4 px-3 md:px-6 focus-within:shadow-sm grid grid-cols-12 gap-2">
                            <FormField render={({ field }) => (
                                <FormItem className="col-span-12 lg:col-span-10">
                                    <FormControl className="m-0 p-0">
                                        <Input disabled={isLoading} placeholder="clown fish swimming around a coral reef" {...field} className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent" />
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

                    {!video && !isLoading && (
                                <Empty lable="No video Generated." />
                        )
                    }

                  {
                    video && (
                        <video controls className="w-full aspect-video rounded-lg border-black bg-black mt-8"> 
                            <source src={video}/>
                        </video>
                    )
                  }
                </div>
            </div>
        </div>
    );
}

export default VedioPage;