'use client'
import React, { useEffect, useRef, useTransition } from 'react'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { z } from 'zod'
import { useForm } from "react-hook-form"
import { zodResolver } from '@hookform/resolvers/zod'
import { useSocket } from '@/context/SocketProviders'
import { useSelector } from 'react-redux'
import { RootState } from '@/store/store'
import Message from './Message'

const ChatBox = () => {
    const [isPending, startTransition] = useTransition();
    const { messageUser } = useSocket()
    const { messages, me, remoteSocketId, callAccepted, callEnded } = useSelector((state: RootState) => state.meeting)
    const chatRef = useRef<any>(null);

    const formSchema = z.object({
        message: z.string().min(1, {
            message: "Username must be at least 1 characters.",
        }),
    })

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            message: ''
        }
    });

    useEffect(() => {
        chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }, [messages])

    const onSubmit = (values: z.infer<typeof formSchema>) => {
        const { message } = values
        startTransition(async () => {
            messageUser(message)
        })

        form.reset();
    }


    return (
        <div className='w-full h-[100%] flex flex-col'>
            <div  className="max-h-56 min-h-60 p-2 rounded-3xl w-full flex relative bg-secondary overflow-y-auto">
                {/* <div className="w-full h-full border"> */}

                    <div ref={chatRef} className="flex flex-col gap-0 p-0.5 py-2 w-full h-auto overflow-y-auto min-h-60">
                        {messages?.map((message) => {

                            return (
                                <Message key={message.id} message={message.message} isCurrentUser={message.from === me} />
                            )
                        })}

                        {!messages.length && !callAccepted ?
                            <div className='w-full h-full flex justify-center items-center'>
                                <span className='font-semibold  py-2 px-6 rounded-3xl text-zinc-200'>Connect to a user for chat</span>
                            </div>

                            : !messages.length && callAccepted ?
                                <div className='w-full h-full flex justify-center items-center'>
                                    {/* <span className='font-semibold bg-primary/80 py-1.5 px-5 rounded-3xl text-zinc-200'>Let's Start a chat</span> */}
                                    <span className='font-semibold bg-primary/80 py-1.5 px-5 rounded-3xl text-zinc-200'>Let&apos;s Start a chat</span>
                                </div> : ""
                        }
                    </div>
                {/* </div> */}
            </div>

            <div className="w-full h-[20%] flex justify-between">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}
                        className="flex w-full items-center h-full justify-between">
                        <FormField
                            control={form.control}
                            name="message"
                            render={({ field }) => (
                                <FormItem className='w-full'>
                                    <FormControl>
                                        <Input placeholder="Enter your message"
                                            disabled={!callAccepted || callEnded}
                                            autoComplete='off'
                                            className='border-0 rounded-3xl w-full bg-secondary px-5' {...field} />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <Button type="submit" disabled={!callAccepted || callEnded} className='bg-purple-400 rounded-full absolute right-8'>Submit</Button>
                    </form>
                </Form>
            </div>
        </div>
    )
}

export default ChatBox